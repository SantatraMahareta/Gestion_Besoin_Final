package com.example.besoinEssai.controller;

import com.example.besoinEssai.model.*;
import com.example.besoinEssai.service.BesoinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// Déclaration de la classe du contrôleur REST
@RestController
@RequestMapping("/besoin")
public class BesoinController {
    private final BesoinService besoinService;

    public BesoinController(BesoinService besoinService) {
        this.besoinService = besoinService;
    }

    // Endpoint pour ajouter un nouveau besoin
    @PostMapping("/ajouter")
    public ResponseEntity<Besoin> ajoutBesoin(@RequestBody Besoin besoin) {
       Besoin noubeauBesooin = besoinService.ajouterBesoin(besoin);
        return ResponseEntity.ok(noubeauBesooin);
    }
    // Endpoint pour lister les besoins en fonction de l'ID d'application
    @GetMapping("/lister/{applicationId}")
    public ResponseEntity<List<Besoin>> listerBesoin(@PathVariable Long applicationId){
        List<Besoin> listeBesoin = besoinService.listerBesoin(applicationId);
        return ResponseEntity.ok(listeBesoin);
    }
    @GetMapping("/listerSvtfa/{applicationId}")
    public ResponseEntity<List<Besoin>> listerBesoinValideClient(@PathVariable Long applicationId){
        List<Besoin> listeBesoin = besoinService.listerBesoinValideClient(applicationId);
        return ResponseEntity.ok(listeBesoin);
    }
    @GetMapping("/listerDsi/{applicationId}")
    public ResponseEntity<List<Besoin>> listerBesoinValideSvtfa(@PathVariable Long applicationId){
        List<Besoin> listeBesoin = besoinService.listerBesoinValideSvtfa(applicationId);
        return ResponseEntity.ok(listeBesoin);
    }

    @GetMapping("/listerDsiRecherche/{applicationId}")
    public ResponseEntity<List<Besoin>> listerBesoinValideSvtfaRecherche(@PathVariable Long applicationId, @RequestParam(required = false) String recherche){
        List<Besoin> listeBesoin = besoinService.listerBesoinValideSvtfaRecherche(applicationId, recherche);
        return ResponseEntity.ok(listeBesoin);
    }

    @GetMapping("/listerDsi")
    public ResponseEntity<List<Besoin>> listerBesoinSvtfa(){
        List<Besoin> listeBesoin = besoinService.listerBesoinSvtfa();
        return ResponseEntity.ok(listeBesoin);
    }


    @GetMapping("/listerBesoin/{email}")
    public ResponseEntity<List<Besoin>> listerBesoinSvtfa(@PathVariable String email, @RequestParam(required = false) String recherche) {
        List<Besoin> listeBesoin = besoinService.listerBesoinEmail(email, recherche);
        return ResponseEntity.ok(listeBesoin);
    }



    @GetMapping("/listerSrsgbd/{applicationId}")
    public ResponseEntity<List<Besoin>> listerBesoinValideDsi(@PathVariable Long applicationId){
        List<Besoin> listeBesoin = besoinService.listerBesoinValideDsi(applicationId);
        return ResponseEntity.ok(listeBesoin);
    }
    @PutMapping("/validerClient/{besoinId}")
    public ResponseEntity<Besoin> validerBesoinClient(@PathVariable Long besoinId){
        Besoin besoin = besoinService.validerBesoinClient(besoinId);
        return ResponseEntity.ok(besoin);
    }
    @PutMapping("/validerSvtfa/{besoinId}")
    public ResponseEntity<Besoin> validerBesoinSvtfa(@PathVariable Long besoinId){
        Besoin besoin = besoinService.validerBesoinSvtfa(besoinId);
        return ResponseEntity.ok(besoin);
    }
    @PutMapping("/validerDsi/{besoinId}")
        public ResponseEntity<Besoin> validerBesoinDsi(@PathVariable Long besoinId){
            Besoin besoin = besoinService.validerBesoinDsi(besoinId);
            return ResponseEntity.ok(besoin);
    }
    @PutMapping("/validerSrsgbd/{applicationId}")
    public ResponseEntity<List<Besoin>> validerBesoinSrsgbd(@PathVariable Long applicationId){
        List<Besoin> besoin = besoinService.validerBesoinSrsbd(applicationId);
        return ResponseEntity.ok(besoin);
    }
    @PostMapping("/developpeur/{besoinId}")
    public ResponseEntity<Besoin> recupererDeveloppeuraBesoin(@PathVariable Long besoinId,@RequestBody Utilisateur besoin){
        Besoin besoinnou = besoinService.assignerDeveloppeurBesoin(besoinId,besoin);
        return ResponseEntity.ok(besoinnou);
    }
    @PostMapping("/assigner/{besoinId}")
    public ResponseEntity<Besoin> assignerDeveloppeurABesoin(@PathVariable Long besoinId, @RequestBody String nomUtilisateur) {
        Besoin besoin = besoinService.assignerDeveloppeur(besoinId, nomUtilisateur);

            return ResponseEntity.ok(besoin);

    }
    @PutMapping("/modifier/{besoinId}")
    public ResponseEntity<Besoin> modifierBesoin(@PathVariable Long besoinId, @RequestBody Besoin besoin) {
        Besoin besoin2 = besoinService.modifierBesoin(besoinId,besoin);
        return ResponseEntity.ok(besoin2);
    }
    @DeleteMapping("/supprimer/{besoinId}")
    public void supprimerBesoin(@PathVariable Long besoinId) {
        besoinService.supprimerBesoin(besoinId);
    }
    @GetMapping("/listerNomSvtfa/{applicationId}")
    public ResponseEntity<EmailSvtfa> recupererNomSvtfa(@PathVariable Long applicationId){
        EmailSvtfa email = besoinService.nomSvtfa(applicationId);
        return ResponseEntity.ok(email);
    }
    }