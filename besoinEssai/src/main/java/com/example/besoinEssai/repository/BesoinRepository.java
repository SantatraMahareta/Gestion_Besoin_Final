package com.example.besoinEssai.repository;

import com.example.besoinEssai.model.Application;
import com.example.besoinEssai.model.Besoin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;



// Interface définissant les méthodes de base pour accéder à la base de données pour l'entité Besoin
public interface BesoinRepository extends JpaRepository <Besoin,Long> {
    // Recherche un Besoin par son titre
    Besoin findByTitreBesoin(String tireBesoin);

    Besoin findByBesoinId(Long besoinId);
    // Requête personnalisée pour trouver tous les Besoins liés à une Application avec une validation client spécifique
    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id WHERE"
            +" d.application_id = :applicationId and LOWER(validation_client) ='non valide'", nativeQuery = true)
    public List<Besoin> findByApplication(@Param("applicationId") Long applicationId);

    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id WHERE d.application_id = :applicationId", nativeQuery = true)
//    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id WHERE d.application_id = :applicationId and LOWER(validation_client) ='non valide'", nativeQuery = true)

    public List<Besoin> findByApplicationSrsbd(@Param("applicationId") Long applicationId);

    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id WHERE d.application_id = :applicationId", nativeQuery = true)
    public Optional<Besoin> findByApplication2(@Param("applicationId") Long applicationId);


    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id WHERE d.application_id = :applicationId and validation_client ='valide' and LOWER(validation_svtfa) ='non valide'", nativeQuery = true)
    public List<Besoin> findByValidationClient(@Param("applicationId") Long applicationId);

    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id WHERE d.application_id = :applicationId and validation_svtfa ='valide' and LOWER(validation_dsi) ='non valide'", nativeQuery = true)
    public List<Besoin> findByValidationSvtfa(@Param("applicationId") Long applicationId);

    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id WHERE d.application_id = :applicationId and validation_svtfa ='valide'", nativeQuery = true)
    public List<Besoin> findByValidationSvtfaRechercheId(@Param("applicationId") Long applicationId);
    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id JOIN utilisateur a ON u.utilisateur_utilisateur_id = a.utilisateur_id WHERE validation_svtfa ='valide' and u.developpeurs_utilisateur_id IS NULL", nativeQuery = true)
    public List<Besoin> findByValidationSvtfa2();

    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id WHERE d.application_id = :applicationId and validation_dsi ='valide'", nativeQuery = true)
    public List<Besoin> findByValidationDsi(@Param("applicationId") Long applicationId);


    @Query(value = "SELECT COUNT(CASE WHEN LOWER(etat_besoin) = 'pas traite' THEN 1 ELSE NULL END) AS pas_traite_count, COUNT(CASE WHEN LOWER(etat_besoin) = 'traite' THEN 1 ELSE NULL END) AS traite_count FROM besoin WHERE besoin_id = :besoin_id ", nativeQuery = true)
    int findByBesoinId_Chart(@Param("besoin_id") Long besoin_id);

    @Query(value = "SELECT u.* FROM besoin u JOIN utilisateur d ON u.utilisateur_utilisateur_id = d.utilisateur_id WHERE d.email = :email", nativeQuery = true)
    List<Besoin> findByEmail(@Param("email") String email);

    // Méthode pour faire un recherche
    @Query(value = "SELECT u.* FROM besoin u "
            + "JOIN utilisateur d ON u.utilisateur_utilisateur_id = d.utilisateur_id "
            + "JOIN application a ON u.application_application_id = a.application_id "
            + "WHERE d.email = :email "
            + "AND (u.titre_besoin LIKE %:recherche% OR a.nom_application LIKE %:recherche%)", nativeQuery = true)
    List<Besoin> findByEmailRecherche(@Param("email") String email, @Param("recherche") String recherche);

    @Query(value = "select DISTINCT email from besoin b join utilisateur u on b.svtfa_utilisateur_utilisateur_id = u.utilisateur_id " +
            "join application a on a.application_id = b.application_application_id where a.application_id = :applicationId", nativeQuery = true)
    String findNomByApp(@Param("applicationId") Long applicationId);
    @Query(value = "SELECT u.* FROM besoin u JOIN application d ON u.application_application_id = d.application_id"
            +" WHERE d.application_id = :applicationId and validation_svtfa ='valide'"
            +"AND (u.titre_besoin LIKE %:recherche% OR d.nom_application LIKE %:recherche%)", nativeQuery = true)
    List<Besoin> findByValidationSvtfaRecherche(@Param("applicationId") Long applicationId, @Param("recherche") String recherche);

}

