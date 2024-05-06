import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from 'src/app/models/Commentaire';
import { Message } from 'src/app/models/Message';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { MessageService } from 'src/app/services/message.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-page-acceuil-svtfa',
  templateUrl: './page-acceuil-svtfa.component.html',
  styleUrls: ['./page-acceuil-svtfa.component.css']
})
export class PageAcceuilSvtfaComponent implements OnInit{
  nomUtilisateur!:NomUtilisateur;
  public messages!: Message[];
  commentaires!:Commentaire[];
  email: string = this.route.snapshot.params['email'].toString();
  @Input() isVisible: boolean = false;
  isSuccessModalVisible: boolean = false;
  isSuccess2ModalVisible: boolean = false;

  Ouvrir() {
    this.isSuccessModalVisible = !this.isSuccessModalVisible;
  } 
  Ouvrir2() {
    this.isSuccess2ModalVisible = !this.isSuccess2ModalVisible;
  } 
  nombreMessage: number = 0;
  nombreCommentaire: number = 0;
  constructor(private commentaireService:CommentaireService,private messageService:MessageService,private utilisateurService:UtilisateurService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
    this.recupererNom();
    this.getMessages();
    this.getCommentaires()
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
  public getMessages():void{
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

  public naviguerNotification(){
    this.router.navigate(['/notification', this.email]);
  }
  public naviguerCreation(){
    this.router.navigate(['/ajoutBesoin', this.email]);
  }
  public naviguerApplication(){
    this.router.navigate(['/applicationSvtfa', this.email]);
  }
  public naviguerListe(){
    this.router.navigate(['/applicationListe', this.email]);
  }
  public naviguerInformer(){
    this.router.navigate(['/message', this.email]);
  }
  public naviguerMessage(){
    this.router.navigate(['/listeMessage', this.email]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
}
