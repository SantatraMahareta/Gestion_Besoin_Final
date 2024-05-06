package com.example.besoinEssai.repository;

import com.example.besoinEssai.model.Commentaire;
import com.example.besoinEssai.model.Message;
import com.example.besoinEssai.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message,Long> {
    List<Message> findByUtilisateurDestinataire(Optional<Utilisateur> utilisateur);


    @Query(value = "Select * from message m join utilisateur u on m.utilisateur_destinataire_utilisateur_id = u.utilisateur_id where m.est_lu = false and u.email =:email", nativeQuery = true)
    List<Message> findMessageByemail(@Param("email")String email);

    @Query(value = "Select * from message m join utilisateur u on m.utilisateur_destinataire_utilisateur_id = u.utilisateur_id where m.message_id =:messageId", nativeQuery = true)
    Message findByMessageId(@Param("messageId")Long messageId);
}
