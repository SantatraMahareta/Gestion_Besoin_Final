package com.example.besoinEssai.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;
    @Column(
            name = "nom_application",
            nullable = false,
            unique = true
    )
    private String nomApplication;
}
