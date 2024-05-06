package com.example.besoinEssai.repository;

import com.example.besoinEssai.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);
//    @Query(value = "SELECT * FROM Utilisateur  WHERE nom_complet = :email",nativeQuery = true)
//    Utilisateur findByEmail2(String email);
    @Query(value = "SELECT * FROM Utilisateur  WHERE nom_complet = :nomComplet",nativeQuery = true)
    Utilisateur findByNom(@Param("nomComplet") String nomComplet);
    @Query(value = "SELECT nom_complet FROM Utilisateur  WHERE email = :email",nativeQuery = true)
    String findByEmailNom(String email);

    Utilisateur findByUtilisateurId(Long utilisateurId);
//    Utilisateur findById(Long utilisateurId);

//    Utilisateur findByUtilisateurId(Long utilisateurId);
    @Query(value = "SELECT u.* FROM Utilisateur u JOIN Departement d ON u.departement_departement_id = d.departement_id WHERE d.nom_departement = 'SCDSI'", nativeQuery = true)
    public List<Utilisateur> findByDepartement();

//    UserDetails findByEmail(String username);

//    Utilisateur findByemail

}
