import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { Application } from 'src/app/models/Application';
import { Besoin } from 'src/app/models/besoin';
import { BesoinService } from 'src/app/services/besoin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Message } from 'src/app/models/Message';
import { Commentaire } from 'src/app/models/Commentaire';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-ajout-besoin',
  templateUrl: './ajout-besoin.component.html',
  styleUrls: ['./ajout-besoin.component.css']
})
export class AjoutBesoinComponent implements OnInit {
  nomApp: string = '';
  email: string = '';
  titre: string = '';
  description: string = '';
  nombreMessage: number = 0;
  nombreCommentaire: number = 0;
  nomUtilisateur!:NomUtilisateur;
  public messages!: Message[];
  commentaires!:Commentaire[];
  emailSvtfa: string = this.route.snapshot.params['email'].toString();

  utilisateurEmail: Utilisateur = {
  };
  utilisateurSvtfa: Utilisateur ={}
  nomApplication: Application = {
  }
  nouveauBesoin: Besoin = {
  }

  @Input() isVisible: boolean = false;
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;
  closeSuccessModal() {
    this.isModalVisible = false;
  }  
  closeEchecModal(){
    this.isModalVisible2 = false;
  }
  isSuccessModalVisible: boolean = false;
  isSuccess2ModalVisible: boolean = false;

  Ouvrir() {
    this.isSuccessModalVisible = !this.isSuccessModalVisible;
  } 
  Ouvrir2() {
    this.isSuccess2ModalVisible = !this.isSuccess2ModalVisible;
  } 
  constructor(private commentaireService:CommentaireService,
    private messageService:MessageService,private utilisateurService:UtilisateurService,
    private besoinService: BesoinService,
    private route:ActivatedRoute,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.recupererNom();
    this.getMessages();
    this.getCommentaires()
  }
  public getCommentaires(): void{
    this.commentaireService.afficheCommentaireNonLu(this.emailSvtfa).subscribe(
      (response: Commentaire[]) =>{
        this.commentaires = response;
        this.nombreCommentaire = this.commentaires.length
        console.log(this.commentaires);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getMessages():void{
    this.messageService.afficheMessageNonLu(this.emailSvtfa).subscribe(
      (response: Message[]) =>{
        this.messages = response;
        this.nombreMessage = this.messages.length
        console.log(this.messages);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public recupererNom():void{
    this.utilisateurService.recuperNom(this.emailSvtfa).subscribe(
      (response: NomUtilisateur) => {
        this.nomUtilisateur = response;
        },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  ajoutBesoin(): void {
    console.log(this.email);
    this.nouveauBesoin.titreBesoin = this.titre;
    this.nouveauBesoin.dateCreation = new Date
    this.nomApplication.nomApplication = this.nomApp;
    this.nouveauBesoin.application = this.nomApplication;
    this.utilisateurEmail.email = this.email
    this.nouveauBesoin.utilisateur = this.utilisateurEmail;
    this.utilisateurSvtfa.email = this.emailSvtfa;
    this.nouveauBesoin.svtfaUtilisateur = this.utilisateurSvtfa;
    console.log(this.utilisateurEmail);
    console.log(this.nomApplication);
    this.nouveauBesoin.descriptionBesoin = this.description;
    this.besoinService.ajoutBesoin(this.nouveauBesoin).subscribe(
      (response: Besoin) => {
        console.log('Besoin enregistré:', response);
        this.isModalVisible = true
      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
        this.isModalVisible2 = true
      }
    )
  }
  marquerCommeLu(message:Message){
    if(message.messageId !== undefined){
      this.messageService.marquerCommeLu(message.messageId).subscribe(
      
        (response:Message) =>{
          console.log('Commentaire Lu: ',response)
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }else {
    console.error("Le champ 'commentaireId' est undefined.");
  }
  }
  marquerCommeLuComs(commentaire:Commentaire){
    if(commentaire.commentaireId !== undefined){
      this.commentaireService.marquerCommeLu(commentaire.commentaireId).subscribe(
        (response:Commentaire) =>{
          console.log('Commentaire Lu: ',response)
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }else {
    console.error("Le champ 'commentaireId' est undefined.");
  }
  }
  public naviguerMessage(){
    this.router.navigate(['/listeMessage', this.emailSvtfa]);
  }
  public naviguerNotification(){
    this.router.navigate(['/notification', this.emailSvtfa]);
  }
  public naviguerAcceuil(){
    this.router.navigate(['/acceuilSvtfa',this.emailSvtfa]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
}
