package com.example.besoinEssai.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Entity
@Data
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long commentaireId;
    public String texteCommentaire;
    public Date dateCommentaire;
    private String utilisateurEmetteur;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Utilisateur utilisateurDestinataire;
    @ManyToOne
    @JsonBackReference
    private Besoin besoin;
    private boolean estLu;
}
