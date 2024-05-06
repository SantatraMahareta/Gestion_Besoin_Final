package com.example.besoinEssai.service;

import com.example.besoinEssai.model.*;
import com.example.besoinEssai.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class BesoinService {
    private final BesoinRepository besoinRepository;
    private final ApplicationRepository applicationRepository;
    private final UtilisateurRepository utilisateurRepository;
    // Injection des dépendances via le constructeur
    @Autowired
    public BesoinService(BesoinRepository besoinRepository, SousBesoinRepository sousBesoinRepository, ApplicationRepository applicationRepository, CommentaireRepository commentaireRepository, UtilisateurRepository utilisateurRepository) {
        this.besoinRepository = besoinRepository;
        this.applicationRepository = applicationRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    // Méthode pour ajouter un besoin
public Besoin ajouterBesoin(Besoin besoin) {
    // Définir les valeurs par défaut
    besoin.setEtatBesoin("Pas traite");
    besoin.setPriorite("basse");
    besoin.setValidationClient("Non valide");
    besoin.setValidationSvtfa("Non valide");
    besoin.setValidationDsi("Non valide");
    besoin.setValidationSrsgbd("Non valide");

    Besoin besoinExistant = besoinRepository.findByTitreBesoin(besoin.getTitreBesoin());
    Application application = besoin.getApplication();
    Utilisateur utilisateur = besoin.getUtilisateur();
    Utilisateur svtfaUtilisateur = besoin.getSvtfaUtilisateur();
    // Vérifier si l'application existe déjà
    Application applicationExistant = applicationRepository.findByNomApplication(application.getNomApplication());
    if (applicationExistant == null) {
        // Si l'application n'existe pas, enregistrez-la
        applicationExistant = applicationRepository.save(application);
    }
    // Affecter l'application existante ou nouvellement enregistrée au besoin
    besoin.setApplication(applicationExistant);

    // Vérifier si l'utilisateur existe déjà
    Optional<Utilisateur> utilisateurExistant = utilisateurRepository.findByEmail(utilisateur.getEmail());
    Optional<Utilisateur> utilisateurSvtfaExistant = utilisateurRepository.findByEmail(svtfaUtilisateur.getEmail());
    if (utilisateurExistant.isPresent() && utilisateurSvtfaExistant.isPresent()) {
        // Si l'utilisateur existe, utilisez-le
        besoin.setUtilisateur(utilisateurExistant.get());
        besoin.setSvtfaUtilisateur(utilisateurSvtfaExistant.get());
    }
    Besoin enregistrerBesoin;
    if (besoinExistant != null) {
        // Si un besoin avec le même titre existe, mettez à jour ses sous-besoins
        enregistrerBesoin = besoinRepository.save(besoinExistant);
    } else {
        // Sinon, enregistrez le nouveau besoin
        enregistrerBesoin = besoinRepository.save(besoin);
    }
    return enregistrerBesoin;
}
    // Méthodes pour lister les besoins par application
    public List<Besoin> listerBesoin(Long applicationId){
        List<Besoin> besoin = besoinRepository.findByApplication(applicationId);
        return besoin;
    }

    public List<Besoin> listerBesoinValideClient(Long applicationId){
        List<Besoin> besoin = besoinRepository.findByValidationClient(applicationId);
        return besoin;
    }

    public List<Besoin> listerBesoinValideSvtfa(Long applicationId){
        List<Besoin> besoin = besoinRepository.findByValidationSvtfa(applicationId);
        return besoin;
    }
    public List<Besoin> listerBesoinValideDsi(Long applicationId){
        List<Besoin> besoin = besoinRepository.findByValidationDsi(applicationId);
        return besoin;
    }
    // Méthodes pour valider les besoins d'un client
    public Besoin validerBesoinClient(Long besoinId){
        Besoin besoin = besoinRepository.findByBesoinId(besoinId);
        besoin.setValidationClient("valide");
        return besoinRepository.save(besoin);
    }
    public Besoin validerBesoinDsi(Long besoinId){
        Besoin besoin = besoinRepository.findByBesoinId(besoinId);
        besoin.setValidationDsi("valide");
        besoin.setEtatBesoin("Fini");
        return besoinRepository.save(besoin);
    }
    public Besoin validerBesoinSvtfa(Long besoinId){
        Besoin besoin = besoinRepository.findByBesoinId(besoinId);
        besoin.setValidationSvtfa("valide");
        besoin.setEtatBesoin("En cours");
        return besoinRepository.save(besoin);
    }
    public List<Besoin> validerBesoinSrsbd(Long applicationId) {
        List<Besoin> besoins = besoinRepository.findByApplicationSrsbd(applicationId);

        for (Besoin besoin : besoins) {
            besoin.setValidationSrsgbd("valide");
        }

        return besoinRepository.saveAll(besoins);
    }
    public Besoin assignerDeveloppeurBesoin(Long besoinId, Utilisateur developpeur) {
        String nomUtilisateur = developpeur.getNomComplet();
        Utilisateur ut = utilisateurRepository.findByNom(nomUtilisateur);
        Besoin besoinnou = besoinRepository.findByBesoinId(besoinId);
        if (ut != null){
        besoinnou.setDeveloppeurs(ut);
        }
        return besoinRepository.save(besoinnou);
    }

    // Méthode pour assigner un développeur à un besoin
    public Besoin assignerDeveloppeur(Long besoinId, String developpeur) {
        Utilisateur ut = utilisateurRepository.findByNom(developpeur);
        Besoin besoinnou = besoinRepository.findByBesoinId(besoinId);
        if (ut != null){
            besoinnou.setDeveloppeurs(ut);
        }
        return besoinRepository.save(besoinnou);
    }

    public List<Besoin> listerBesoinSvtfa() {
        List<Besoin> besoin = besoinRepository.findByValidationSvtfa2();
        return besoin;
    }
    public Besoin modifierBesoin(Long besoinId,Besoin besoin){
        Besoin besoinExistant = besoinRepository.findByBesoinId(besoinId);
        besoinExistant.setDescriptionBesoin(besoin.getDescriptionBesoin());
        besoinExistant.setTitreBesoin(besoin.getTitreBesoin());
        return besoinRepository.save(besoinExistant);
    }
    public void supprimerBesoin(Long besoinId){
        besoinRepository.deleteById(besoinId);
    }

    public List<Besoin> listerBesoinEmail(String email, String recherche) {
        List<Besoin> besoins;

        if (recherche != null) {
            besoins = besoinRepository.findByEmailRecherche(email, recherche);
        } else {
            besoins = besoinRepository.findByEmail(email);
        }

        return besoins;
    }
    public EmailSvtfa nomSvtfa(Long applicationId){
        EmailSvtfa email = new EmailSvtfa();
        email.setEmail(besoinRepository.findNomByApp(applicationId));
        return email;
    }

    public List<Besoin> listerBesoinValideSvtfaRecherche(Long applicationId, String recherche) {
        List<Besoin> besoins ;
        if (recherche != null) {
            besoins = besoinRepository.findByValidationSvtfaRecherche(applicationId,recherche);
        } else {
            besoins = besoinRepository.findByValidationSvtfaRechercheId(applicationId);
        }

        return besoins;
    }
}






