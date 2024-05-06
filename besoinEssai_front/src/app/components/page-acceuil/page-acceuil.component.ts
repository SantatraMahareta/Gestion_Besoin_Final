import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { MessageService } from 'src/app/services/message.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-page-acceuil',
  templateUrl: './page-acceuil.component.html',
  styleUrls: ['./page-acceuil.component.css']
})
export class PageAcceuilComponent implements OnInit{
  public messages!: Message[];
  nombreMessage: number = 0;
  nomUtilisateur!:NomUtilisateur;
  email: string = this.route.snapshot.params['email'].toString();

  @Input() isVisible: boolean = false;
  isSuccessModalVisible: boolean = false;
  Ouvrir() {
    this.isSuccessModalVisible = !this.isSuccessModalVisible;
  } 


  constructor(private messageService:MessageService,private utilisateurService:UtilisateurService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
    this.recupererNom();
    this.getMessages();
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
public naviguerNotification(){
  this.router.navigate(['/notification', this.email]);
}
public naviguerApplication(){
  this.router.navigate(['/application',this.email]);
}
public naviguerChart(){
  this.router.navigate(['/chart', this.email]);
}
public naviguerMessage(){
  this.router.navigate(['/listeMessage', this.email]);
}
public Deconnexion(){
  this.router.navigate(['/login']);
}
}
