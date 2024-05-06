package com.example.besoinEssai.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Role {
    // Annotation indiquant que le champ suivant est la clé primaire de l'entité.
    @Id
    // Annotation spécifiant la stratégie de génération de la clé primaire (auto-incrément dans ce cas).
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Champ représentant l'identifiant du rôle.
    public Long roleId;
    // Champ représentant le nom du rôle.
    public String nomRole;
}
