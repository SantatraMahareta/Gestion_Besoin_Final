package com.example.besoinEssai.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Entity
@Data

public class Besoin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long besoinId;
    @Column(unique = true)
    public String titreBesoin;
    public String descriptionBesoin;
    public String priorite;
    public String etatBesoin;
    @Temporal(TemporalType.DATE)
    public Calendar dateCreation;
    public String validationClient;
    public String validationSvtfa;
    public String validationDsi;
    public String validationSrsgbd;
    @ManyToOne
    private Utilisateur utilisateur;
    @ManyToOne
    private Utilisateur developpeurs;
    @ManyToOne
    private Utilisateur svtfaUtilisateur;
    @JsonManagedReference
    @OneToMany(mappedBy = "besoin", cascade = CascadeType.PERSIST)
    private List<Commentaire> commentaires = new ArrayList<>();
    @ManyToOne
    private Application application;
}
