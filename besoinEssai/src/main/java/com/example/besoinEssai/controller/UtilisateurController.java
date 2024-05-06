package com.example.besoinEssai.controller;

import com.example.besoinEssai.model.AuhenticationRequest;
import com.example.besoinEssai.model.AuthenticationResponse;
import com.example.besoinEssai.model.NomUtilisateur;
import com.example.besoinEssai.model.Utilisateur;
import com.example.besoinEssai.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/Utilisateur")
public class UtilisateurController {
    private final UtilisateurService utilisateurService;

//    public UtilisateurController(UtilisateurService utilisateurService) {
//        this.utilisateurService = utilisateurService;
//    }
//
//    @PostMapping("/ajout")
//    public ResponseEntity<Utilisateur> ajouterUtilisateur(@RequestBody Utilisateur utilisateur){
//        Utilisateur nouveauUtilisateur = utilisateurService.ajoutUtilisateur(utilisateur);
//        return ResponseEntity.ok(nouveauUtilisateur);
//    }
    @GetMapping("/ListerDeveloppeur")
    public ResponseEntity<List<Utilisateur>> listerDeveloppeur(){
        List<Utilisateur> utilisateurs = utilisateurService.listerUtilisateur();
        return ResponseEntity.ok(utilisateurs);
    }

    @PostMapping("/ajout")
    public ResponseEntity<AuthenticationResponse> ajout(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(utilisateurService.enregistrementUtilisateur(request));
    }
    @PostMapping("/authentification")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuhenticationRequest request
    ){
        return ResponseEntity.ok(utilisateurService.authentification(request));
    }

    @GetMapping("/recupererNom/{email}")
    public ResponseEntity<NomUtilisateur> recupererNom(@PathVariable String email){
        NomUtilisateur utilisateur = utilisateurService.recuperer(email);
        return ResponseEntity.ok(utilisateur);
    }
}
