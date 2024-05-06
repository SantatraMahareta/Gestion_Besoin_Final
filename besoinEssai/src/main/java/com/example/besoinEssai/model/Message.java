package com.example.besoinEssai.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Message {
    // Identifiant unique du message généré automatiquement
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long messageId;

    // Le texte du message
    public String texteMessage;

    // Date à laquelle le message a été créé
    public Date dateMessage;

    // Nom de l'utilisateur émetteur du message
    private String utilisateurEmetteur;

    // Utilisation d'une relation Many-to-One avec la classe Utilisateur
    // Cascade.PERSIST indique que les opérations de persistance
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Utilisateur utilisateurDestinataire;

    // Indique si le message a été lu ou non
    private boolean estLu;
}
