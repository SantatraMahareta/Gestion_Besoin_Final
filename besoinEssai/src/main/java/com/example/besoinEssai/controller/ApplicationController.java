package com.example.besoinEssai.controller;

import com.example.besoinEssai.model.Application;
import com.example.besoinEssai.model.ChartDonnees;
import com.example.besoinEssai.model.NomApplication;
import com.example.besoinEssai.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/application")
public class ApplicationController {
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }
    @GetMapping("/lister/{email}")
    public ResponseEntity<List<Application>> listerApplication(@PathVariable String email){
        List<Application> application = applicationService.listageApp(email);
        return ResponseEntity.ok(application);
    }
    @GetMapping("/lister")
    public ResponseEntity<List<Application>> listerApplication2(){
        List<Application> application = applicationService.listageApp2();
        return ResponseEntity.ok(application);
    }
    @GetMapping("/listerSrsbd")
    public ResponseEntity<List<Application>> listerApplicationSrsbd(){
        List<Application> application = applicationService.listageAppSrsbd();
        return ResponseEntity.ok(application);
    }

    @GetMapping("/chart/{email}")
    public ResponseEntity<ChartDonnees> valeurChart(@PathVariable String email){
        ChartDonnees chartData = applicationService.valeurChart(email);
        return ResponseEntity.ok(chartData);
    }
    @GetMapping("/listeDonnesApp/{AppId}")
    public ResponseEntity<ChartDonnees> valeurChart(@PathVariable int AppId){
        ChartDonnees chartData = applicationService.donnesApp(AppId);
        return ResponseEntity.ok(chartData);
    }
    @GetMapping("/nomApp/{AppId}")
    public ResponseEntity<NomApplication> nomApp(@PathVariable int AppId){
        NomApplication nom = applicationService.recupererNomApp(AppId);
        return ResponseEntity.ok(nom);
    }
}
