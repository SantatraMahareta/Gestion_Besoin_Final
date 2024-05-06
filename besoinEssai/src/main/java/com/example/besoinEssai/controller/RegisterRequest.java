package com.example.besoinEssai.controller;

import com.example.besoinEssai.model.Departement;
import com.example.besoinEssai.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ManyToOne;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    public String email;
    public String motDePasse;
    public String nomComplet;
    private Role role;
    private Departement departement;
}
