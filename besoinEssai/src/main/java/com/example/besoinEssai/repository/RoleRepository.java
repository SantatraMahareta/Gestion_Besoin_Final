package com.example.besoinEssai.repository;

import com.example.besoinEssai.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByNomRole(String nomRole);

    @Query(value = "SELECT * FROM role r join utilisateur u on u.role_role_id = r.role_id WHERE u.email = :email",nativeQuery = true)
    Role findByemail(@Param("email")String email);
}
