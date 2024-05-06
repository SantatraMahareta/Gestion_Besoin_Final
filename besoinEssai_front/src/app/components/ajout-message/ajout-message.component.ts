import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Commentaire } from 'src/app/models/Commentaire';
import { Message } from 'src/app/models/Message';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { MessageService } from 'src/app/services/message.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
@Component({
  selector: 'app-ajout-message',
  templateUrl: './ajout-message.component.html',
  styleUrls: ['./ajout-message.component.css']
})
export class AjoutMessageComponent implements OnInit{
  public messages!: Message[];
  nomUtilisateur!:NomUtilisateur;
  texte:string ='';
  emailDestinataire:string='';
  utilisateurDest: Utilisateur = {
  };
  commentaires!:Commentaire[];
  email: string = this.route.snapshot.params['email'].toString();
  @Input() isVisible: boolean = false;
  isSuccessModalVisible: boolean = false;
  isSuccess2ModalVisible: boolean = false;
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;
  closeSuccessModal() {
    this.isModalVisible = false;
  }  
  closeEchecModal(){
    this.isModalVisible2 = false;
  }
  nombreMessage: number = 0;
  nombreCommentaire: number = 0;
  nouveauMessage:Message ={
  }
  Ouvrir() {
    this.isSuccessModalVisible = !this.isSuccessModalVisible;
  } 
  Ouvrir2() {
    this.isSuccess2ModalVisible = !this.isSuccess2ModalVisible;
  }
  constructor(private commentaireService:CommentaireService,private utilisateurService:UtilisateurService,private messageService: MessageService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
    this.getMessages();
    this.recupererNom();
    this.getCommentaires()
  }
  public recupererNom():void{
    this.utilisateurService.recuperNom(this.email).subscribe(
      (response: NomUtilisateur) => {
        this.nomUtilisateur = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  ajoutMessage(){
    this.nouveauMessage.dateMessage = new Date();
    this.nouveauMessage.texteMessage = this.texte;
    this.utilisateurDest.email = this.emailDestinataire;
    this.nouveauMessage.utilisateurDestinataire = this.utilisateurDest;
    this.messageService.ajoutMessage(this.email,this.nouveauMessage).subscribe(
      (response: Message) => {
        this.isModalVisible = true
        console.log('Message enregistré:', response);
      },
      (error: HttpErrorResponse) => {
        this.isModalVisible2 = true
        // alert(error.message);
      }
    )
  }
  public getMessages(): void{
    this.messageService.afficheMessageNonLu(this.email).subscribe(
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
  public getCommentaires(): void{
    this.commentaireService.afficheCommentaireNonLu(this.email).subscribe(
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
    this.router.navigate(['/listeMessage', this.email]);
  }
  public naviguerNotification(){
    this.router.navigate(['/notification', this.email]);
  }
  public naviguerAcceuil(){
    this.router.navigate(['/acceuilSvtfa',this.email]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
}
