package com.example.besoinEssai.controller;

import com.example.besoinEssai.model.Besoin;
import com.example.besoinEssai.model.Commentaire;
import com.example.besoinEssai.service.CommentaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commentaire")
public class CommentaireControlleur {
    private final CommentaireService commentaireService;

    public CommentaireControlleur(CommentaireService commentaireService) {
        this.commentaireService = commentaireService;
    }
    @PostMapping("/enregistrer/{besoinId}")
    public ResponseEntity<Commentaire> enregistrercoms(@PathVariable Long besoinId, @RequestBody Commentaire nouveauCommentaire){
        Commentaire commentaire = commentaireService.enregistrerCommentaire2(besoinId,nouveauCommentaire);
        return ResponseEntity.ok(commentaire);
    }
    @GetMapping("/listerComs/{email}")
    public ResponseEntity<List<Commentaire>> listerComs(@PathVariable String email){
        List<Commentaire> commentaire = commentaireService.listeCommentaire(email);
        return ResponseEntity.ok(commentaire);
    }
    @GetMapping("/listerComsNonLu/{email}")
    public ResponseEntity<List<Commentaire>> listerComsNonLu(@PathVariable String email){
        List<Commentaire> commentaire = commentaireService.listeCommentaireNonLu(email);
        return ResponseEntity.ok(commentaire);
    }
    @PutMapping("/lu/{commentaireId}")
    public ResponseEntity<Commentaire> marquerCommeLu(@PathVariable Long commentaireId){
        Commentaire commentaire = commentaireService.CommenterMarquerLu(commentaireId);
        return ResponseEntity.ok(commentaire);
    }
}
