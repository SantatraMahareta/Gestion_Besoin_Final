package com.example.besoinEssai.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Data
// Lombok annotation pour générer automatiquement un constructeur sans arguments.
@NoArgsConstructor
// Lombok annotation pour générer automatiquement un constructeur avec tous les arguments.
@AllArgsConstructor
// Annotation JPA (Java Persistence API) indiquant que cette classe est une entité à persister en base de données.
@Entity
// Lombok annotation pour générer automatiquement un builder pattern.
@Builder
public class Utilisateur implements UserDetails {

    // Annotation JPA indiquant que cette propriété est la clé primaire de l'entité.
    @Id
    // Annotation JPA indiquant que la génération de la clé primaire doit être gérée automatiquement par la base de données.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Identifiant unique de l'utilisateur.
    public Long utilisateurId;

    // Annotation JPA indiquant que cette propriété est mappée à une colonne de la table en base de données.
    @Column(
            name = "email",
            nullable = false,
            unique = true
    )
    // Adresse e-mail de l'utilisateur.
    public String email;

    // Mot de passe de l'utilisateur.
    public String motDePasse;

    // Annotation JPA pour spécifier la configuration de la colonne "nom_complet" en base de données.
    @Column(
            name = "nom_complet",
            nullable = false,
            unique = true
    )
    // Nom complet de l'utilisateur.
    public String nomComplet;

    // Annotation JPA indiquant une relation Many-to-One avec l'entité Role.
    @ManyToOne
    // Rôle de l'utilisateur.
    private Role role;

    // Annotation JPA indiquant une relation Many-to-One avec l'entité Departement.
    @ManyToOne
    // Département auquel l'utilisateur est associé.
    private Departement departement;

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = new BCryptPasswordEncoder().encode(motDePasse);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.nomRole));
    }

    @Override
    public String getPassword() {
        return motDePasse;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
