package com.example.besoinEssai.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
//@Table(name = "sous_besoin")
public class SousBesoin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long sousbesoinId;
    public String titreSousbesoin;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "besoin_id")
    private Besoin besoin;
}
