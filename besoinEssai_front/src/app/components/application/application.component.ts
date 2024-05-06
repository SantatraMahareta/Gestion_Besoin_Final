import { Component, Input, OnInit } from '@angular/core';
import { Application } from 'src/app/models/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit{
  applications!: Application[]; // Liste des applications
  nomUtilisateur!: NomUtilisateur; // Informations sur l'utilisateur
  nombreMessage: number = 0; // Nombre de messages non lus
  messages!: Message[]; // Liste des messages
  name!: number; // Variable inutilisée (non utilisée dans le code actuel)
  email: string = this.route.snapshot.params['email'].toString(); // Adresse email de l'utilisateur
  @Input() isVisible: boolean = false; // Propriété pour gérer la visibilité d'un élément
  isSuccessModalVisible: boolean = false; // Propriété pour gérer la visibilité d'une modal de succès

  // Méthode pour ouvrir ou fermer la modal de succès
  Ouvrir() {
    this.isSuccessModalVisible = !this.isSuccessModalVisible;
  } 

  // Constructeur du composant avec injection de dépendances des services et du routeur
  constructor(
    private messageService: MessageService,
    private utilisateurService: UtilisateurService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getApplication(); // Récupération de la liste des applications
    this.recupererNom(); // Récupération des informations sur l'utilisateur
    this.getMessages(); // Récupération de la liste des messages
  }

  // Méthode pour récupérer la liste des messages non lus de l'utilisateur
  public getMessages(): void {
    this.messageService.afficheMessageNonLu(this.email).subscribe(
      (response: Message[]) => {
        this.messages = response; // Assignation de la liste des messages
        this.nombreMessage = this.messages.length; // Calcul du nombre de messages non lus
      },
      (error: HttpErrorResponse) => {
        alert(error.message); // Gestion des erreurs
      }
    );
  }

  // Méthode pour récupérer les informations sur l'utilisateur
  public recupererNom(): void {
    this.utilisateurService.recuperNom(this.email).subscribe(
      (response: NomUtilisateur) => {
        this.nomUtilisateur = response; // Assignation des informations sur l'utilisateur
      },
      (error: HttpErrorResponse) => {
        alert(error.message); // Gestion des erreurs
      }
    );
  }

  // Méthode pour récupérer la liste des applications de l'utilisateur
  getApplication(): void {
    this.applicationService.getApplication(this.email).subscribe(
      (response: Application[]) => {
        this.applications = response; // Assignation de la liste des applications
      },
      (error: HttpErrorResponse) => {
        alert(error.message); // Gestion des erreurs
      }
    );
  }

  // Méthode pour marquer un message comme lu
  marquerCommeLu(message: Message): void {
    if (message.messageId !== undefined) {
      this.messageService.marquerCommeLu(message.messageId).subscribe(
        (response: Message) => {
          console.log('Commentaire Lu: ', response); // Affichage du message lu dans la console
        },
        (error: HttpErrorResponse) => {
          alert(error.message); // Gestion des erreurs
        }
      );
    } else {
      console.error("Le champ 'commentaireId' est undefined."); // Gestion d'une erreur potentielle
    }
  }

  // Méthode pour naviguer vers la page des messages
  public naviguerMessage(): void {
    this.router.navigate(['/listeMessage', this.email]); // Navigation vers la page des messages
  }

  // Méthode pour naviguer vers la page des besoins liés à une application spécifique
  public naviguerBesoin(applicationId: number | undefined): void {
    this.router.navigate(['/besoin', applicationId, this.email]); // Navigation vers la page des besoins
  }

  // Méthode pour naviguer vers la page d'accueil
  public naviguerAcceuil(): void {
    this.router.navigate(['/acceuil', this.email]); // Navigation vers la page d'accueil
  }

  // Méthode pour effectuer la déconnexion
  public Deconnexion(): void {
    this.router.navigate(['/login']); // Navigation vers la page de connexion
  }
}
