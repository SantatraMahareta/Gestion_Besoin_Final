package com.example.besoinEssai.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Departement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long departementId;
    public String nomDepartement;
}
