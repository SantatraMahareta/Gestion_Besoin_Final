package com.example.besoinEssai.repository;

import com.example.besoinEssai.model.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartementRepository extends JpaRepository<Departement,Long> {
    Departement findByNomDepartement(String nomDepartement);
}
