import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/Application';
import { Commentaire } from 'src/app/models/Commentaire';
import { Message } from 'src/app/models/Message';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { ApplicationService } from 'src/app/services/application.service';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { MessageService } from 'src/app/services/message.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-application-liste-besoin',
  templateUrl: './application-liste-besoin.component.html',
  styleUrls: ['./application-liste-besoin.component.css']
})
export class ApplicationListeBesoinComponent {
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
  nombreCommentaire: number = 0;  applications!: Application[]
  name!:number;
  constructor(private commentaireService:CommentaireService,private messageService:MessageService,private utilisateurService:UtilisateurService,private applicationService:ApplicationService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
      this.recupererNom();
      this.getApplication()
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
  getApplication():void{
    this.applicationService.getApplication2().subscribe(
      (response: Application[]) => {
        this.applications = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public naviguerNotification(){
    this.router.navigate(['/notification', this.email]);
  }
  public naviguerMessage(){
    this.router.navigate(['/listeMessage', this.email]);
  }
  public naviguerBesoin(applicationId: number | undefined): void {
    this.router.navigate(['/listerBesoin', applicationId, this.email]);
  }
  public naviguerAcceuil(){
    this.router.navigate(['/acceuilSvtfa',this.email]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
}
