package com.example.besoinEssai.service;

import com.example.besoinEssai.model.Besoin;
import com.example.besoinEssai.model.Commentaire;
import com.example.besoinEssai.model.Utilisateur;
import com.example.besoinEssai.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentaireService {
    private final BesoinRepository besoinRepository;
    private final CommentaireRepository commentaireRepository;
    private final UtilisateurRepository utilisateurRepository;

    public CommentaireService(BesoinRepository besoinRepository, CommentaireRepository commentaireRepository, UtilisateurRepository utilisateurRepository) {
        this.besoinRepository = besoinRepository;
        this.commentaireRepository = commentaireRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    // Méthodes pour ajouter un commentaire
    public Commentaire enregistrerCommentaire2(Long besoinId, Commentaire commentaire) {
        Besoin besoin = besoinRepository.findByBesoinId(besoinId);
        String emailBesoin = besoin.getUtilisateur().getEmail();
        commentaire.setUtilisateurEmetteur(emailBesoin);

        Utilisateur utilisateurDestinataire = commentaire.getUtilisateurDestinataire();
        Optional<Utilisateur> utilisateurDestinataireExistant = utilisateurRepository.findByEmail(utilisateurDestinataire.getEmail());

        if (utilisateurDestinataireExistant.isPresent()) {
            commentaire.setUtilisateurDestinataire(utilisateurDestinataireExistant.get());
            commentaire.setBesoin(besoin);
            return commentaireRepository.save(commentaire);
        } else {
            throw new IllegalArgumentException("L'utilisateur destinataire spécifié n'existe pas.");
        }
    }
    // Méthodes pour lister les commentaires non lu
    public List<Commentaire> listeCommentaire(String email){
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(email);
        List<Commentaire> commentaire = commentaireRepository.findByUtilisateurDestinataire(utilisateur);
        return commentaire;
    }

    public Commentaire ajoutCommentaire(Long utilisateurId, Commentaire commentaire) {
        Utilisateur utilisateur = utilisateurRepository.findByUtilisateurId(utilisateurId);
        Utilisateur utilisateurDestinataire = commentaire.getUtilisateurDestinataire();
        Optional<Utilisateur> utilisateurDestinataireExistant = utilisateurRepository.findByEmail(utilisateurDestinataire.getEmail());
        commentaire.setEstLu(false);

        if (utilisateurDestinataireExistant.isPresent()) {
            commentaire.setUtilisateurDestinataire(utilisateurDestinataireExistant.get());
            return commentaireRepository.save(commentaire);
        } else {
            throw new IllegalArgumentException("L'utilisateur destinataire spécifié n'existe pas.");
        }
    }


    public List<Commentaire> listeCommentaireNonLu(String email){
//        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(email);
        List<Commentaire> commentaire = commentaireRepository.findCommentaireByemail(email);
        return commentaire;
    }
    public Commentaire CommenterMarquerLu(Long commentaireId){
        Commentaire commentaire = commentaireRepository.findByCommentId(commentaireId);
        commentaire.setEstLu(Boolean.parseBoolean("true"));
        return commentaireRepository.save(commentaire);
    }
}
