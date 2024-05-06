package com.example.besoinEssai.service;

import com.example.besoinEssai.model.*;
import com.example.besoinEssai.controller.RegisterRequest;
import com.example.besoinEssai.repository.DepartementRepository;
import com.example.besoinEssai.repository.RoleRepository;
import com.example.besoinEssai.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UtilisateurService {
    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository roleRepository;
    private final DepartementRepository departementRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Méthode pour lister les utilisateurs par département
    public List<Utilisateur> listerUtilisateur(){
        List<Utilisateur> utilisateurs = utilisateurRepository.findByDepartement();
        return utilisateurs;
    }
    // Méthode pour l'authentification des utilisateurs
    public AuthenticationResponse authentification(AuhenticationRequest request) {
        // Authentification via le gestionnaire d'authentification Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getMotDePasse()
                )
        );
        // Récupération de l'utilisateur depuis la base de données
        var utilisateur = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        // Génération d'un jeton JWT pour l'utilisateur authentifié
        var jwtToken = jwtService.generateToken(utilisateur);
        // Retour de la réponse d'authentification avec le jeton
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    // Méthode pour enregistrer un nouvel utilisateur
    public AuthenticationResponse enregistrementUtilisateur(RegisterRequest request) {
        // Extraction du nom du département et conversion en majuscules
        String dep = request.getDepartement().getNomDepartement();
        String departement1 = dep.toUpperCase();
        // Recherche du département existant dans la base de données
        Departement departementExistant = departementRepository.findByNomDepartement(dep.toUpperCase());
        // Recherche du rôle existant dans la base de données
        Role roleExistant = roleRepository.findByNomRole(departement1);

        // Création du département s'il n'existe pas
        if (departementExistant == null) {
            departementExistant = new Departement();
            departementExistant.setNomDepartement(dep.toUpperCase());
            departementExistant = departementRepository.save(departementExistant);
        }

        // Création du rôle en fonction du département s'il n'existe pas
        if (roleExistant == null) {
            if (departement1.equals("SCDSI")) {
                roleExistant = new Role();
                roleExistant.setNomRole("SCDSI");
            } else if (departement1.equals("SVTFA")) {
                roleExistant = new Role();
                roleExistant.setNomRole("SVTFA");
            } else if (departement1.equals("SRSBD")) {
                roleExistant = new Role();
                roleExistant.setNomRole("SRSBD");
            } else {
                Role clientRole = roleRepository.findByNomRole("CLIENT");
                if (clientRole == null) {
                    clientRole = new Role();
                    clientRole.setNomRole("CLIENT");
                    clientRole = roleRepository.save(clientRole);
                }
                roleExistant = clientRole;
            }
            roleExistant = roleRepository.save(roleExistant);
        }

        // Création de l'utilisateur avec les détails fournis dans la demande
        Utilisateur utilisateur = Utilisateur.builder()
                .nomComplet(request.getNomComplet())
                .email(request.getEmail())
                .motDePasse(passwordEncoder.encode(request.getMotDePasse()))
                .role(roleExistant)
                .departement(departementExistant)
                .build();

        // Enregistrement de l'utilisateur dans la base de données
        utilisateurRepository.save(utilisateur);

        // Génération d'un jeton JWT pour l'utilisateur enregistré
        String jwtToken = jwtService.generateToken(utilisateur);

        // Retour de la réponse d'authentification avec le jeton
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    // Méthode pour récupérer le nom complet de l'utilisateur par email
    public NomUtilisateur recuperer(String email){
        NomUtilisateur utilisateur = new NomUtilisateur();
        utilisateur.setNomComplet(utilisateurRepository.findByEmailNom(email));
        return utilisateur;
    }
}
