package com.example.besoinEssai.service;

import com.example.besoinEssai.model.Application;
import com.example.besoinEssai.model.ChartDonnees;
import com.example.besoinEssai.model.NomApplication;
import com.example.besoinEssai.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    // Méthode pour lister les applications associées à un utilisateur par son email
    @Transactional
    public List<Application> listageApp(String email){
        List<Application> applications = applicationRepository.findByEmail(email);
        return applications;
    }

    // Méthode pour lister toutes les applications
    @Transactional
    public List<Application> listageApp2(){
        List<Application> applications = applicationRepository.findAll();
        return applications;
    }

    // Méthode pour récupérer les données pour le tableau de bord fonction de l'email de l'utilisateur
    @Transactional
    public ChartDonnees valeurChart(String email) {
        ChartDonnees chartData = new ChartDonnees();

        int totalTraite = applicationRepository.findByApplicationIdTraite(email);
        int totalPasTraite = applicationRepository.findByApplicationIdNonTraite(email);
        int totalEnCours = applicationRepository.findByApplicationIdEnCours(email);

        int total = totalTraite + totalPasTraite + totalEnCours;

        if (total > 0) {
            double pourcentageTraite = ((double) totalTraite / total) * 100;
            double pourcentagePasTraite = ((double) totalPasTraite / total) * 100;
            double pourcentageEnCours = ((double) totalEnCours / total) * 100;

            chartData.setFiniCount(pourcentageTraite);
            chartData.setPasTraiteCount(pourcentagePasTraite);
            chartData.setEncours(pourcentageEnCours);
        }

        return chartData;
    }

    public ChartDonnees donnesApp(int AppId) {
        ChartDonnees chartData = new ChartDonnees();

        int totalTraite = applicationRepository.findByApplicationTraite(AppId);
        int totalPasTraite = applicationRepository.findByApplicationNonTraite(AppId);
        int totalEnCours = applicationRepository.findByApplicationEnCours(AppId);

        int total = totalTraite + totalPasTraite + totalEnCours;

        if (total > 0) {
            double pourcentageTraite = ((double) totalTraite / total) * 100;
            double pourcentagePasTraite = ((double) totalPasTraite / total) * 100;
            double pourcentageEnCours = ((double) totalEnCours / total) * 100;

            chartData.setFiniCount(pourcentageTraite);
            chartData.setPasTraiteCount(pourcentagePasTraite);
            chartData.setEncours(pourcentageEnCours);
        }

        return chartData;
    }

    public NomApplication recupererNomApp(int AppId){
        NomApplication nom = new NomApplication();
        nom.setNomApp(applicationRepository.findNomById(AppId));
        return nom;
    }

    public List<Application> listageAppSrsbd() {
        List<Application> applications = applicationRepository.findByValidation();
        return applications;
    }
}
