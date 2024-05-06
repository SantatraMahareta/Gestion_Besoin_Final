package com.example.besoinEssai.repository;

import com.example.besoinEssai.model.Commentaire;
import com.example.besoinEssai.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentaireRepository extends JpaRepository<Commentaire,Long> {
//    Commentaire findByUtilisateurDestinataire(Utilisateur utilisateurId);
    public List<Commentaire> findAllByUtilisateurDestinataire(Utilisateur utilisateurDestinataire);

    List<Commentaire> findByUtilisateurDestinataire(Optional<Utilisateur> utilisateur);

    @Query(value = "Select * from commentaire c join utilisateur u on c.utilisateur_destinataire_utilisateur_id = u.utilisateur_id where c.est_lu = false and u.email =:email", nativeQuery = true)
    List<Commentaire> findCommentaireByemail(@Param("email")String email);

    @Query(value = "Select * from commentaire c join utilisateur u on c.utilisateur_destinataire_utilisateur_id = u.utilisateur_id where c.commentaire_id =:commentaireId", nativeQuery = true)
    Commentaire findByCommentId(@Param("commentaireId")Long commentaireId);
}
