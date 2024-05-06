package com.example.besoinEssai.repository;

import com.example.besoinEssai.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,Long> {
    Application findByNomApplication(String nomApplication);
//
//    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'traite' THEN 1 ELSE NULL END) AS traite_count FROM besoin b JOIN application a ON b.application_application_id = a.application_id JOIN utilisateur u ON u.utilisateur_id = b.utilisateur_utilisateur_id WHERE u.email = :email group by a.application_id",nativeQuery = true)
//    int findByApplicationIdTraite(@Param("email") String email);
//    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'pas traite' THEN 1 ELSE NULL END) AS pas_traite_count FROM besoin b JOIN application a ON b.application_application_id = a.application_id JOIN utilisateur u ON u.utilisateur_id = b.utilisateur_utilisateur_id WHERE u.email = :email group by a.application_id",nativeQuery = true)
//    int findByApplicationIdNonTraite(@Param("email") String email);
//
//    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'en cours' THEN 1 ELSE NULL END) AS pas_traite_count FROM besoin b JOIN application a ON b.application_application_id = a.application_id JOIN utilisateur u ON u.utilisateur_id = b.utilisateur_utilisateur_id WHERE u.email = :email group by a.application_id",nativeQuery = true)
//    int findByApplicationIdEnCours(@Param("email") String email);
    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'fini' THEN 1 ELSE NULL END) AS traite_count FROM besoin b JOIN application a ON b.application_application_id = a.application_id JOIN utilisateur u ON u.utilisateur_id = b.utilisateur_utilisateur_id WHERE u.email = :email ",nativeQuery = true)
    int findByApplicationIdTraite(@Param("email") String email);

    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'pas traite' THEN 1 ELSE NULL END) AS pas_traite_count FROM besoin b JOIN application a ON b.application_application_id = a.application_id JOIN utilisateur u ON u.utilisateur_id = b.utilisateur_utilisateur_id WHERE u.email = :email ",nativeQuery = true)
    int findByApplicationIdNonTraite(@Param("email") String email);

    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'en cours' THEN 1 ELSE NULL END) AS pas_traite_count FROM besoin b JOIN application a ON b.application_application_id = a.application_id JOIN utilisateur u ON u.utilisateur_id = b.utilisateur_utilisateur_id WHERE u.email = :email ",nativeQuery = true)
    int findByApplicationIdEnCours(@Param("email") String email);
    @Query(value = "SELECT DISTINCT a.* FROM application a JOIN besoin b ON b.application_application_id = a.application_id JOIN utilisateur u ON u.utilisateur_id = b.utilisateur_utilisateur_id WHERE u.email = :email",nativeQuery = true)
    List<Application> findByEmail(String email);



    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'fini' THEN 1 ELSE NULL END) AS traite_count FROM besoin b WHERE b.application_application_id = :appId ",nativeQuery = true)

    int findByApplicationTraite(@Param("appId")int appId);
    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'en cours' THEN 1 ELSE NULL END) AS pas_traite_count FROM besoin b WHERE b.application_application_id = :appId ",nativeQuery = true)

    int findByApplicationNonTraite(@Param("appId")int appId);
    @Query(value = "SELECT COUNT(CASE WHEN LOWER(b.etat_besoin) = 'en cours' THEN 1 ELSE NULL END) AS pas_traite_count FROM besoin b WHERE b.application_application_id = :appId ",nativeQuery = true)

    int findByApplicationEnCours(@Param("appId")int appId);

    @Query(value = "SELECT nom_application from application where application_id = :appId",nativeQuery = true)
    String findNomById(@Param("appId")int appId);
    @Query(value = "SELECT DISTINCT a.* FROM application a JOIN besoin b ON b.application_application_id = a.application_id WHERE LOWER(validation_srsgbd) ='non valide'",nativeQuery = true)

    List<Application> findByValidation();
}
