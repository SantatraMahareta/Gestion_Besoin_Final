import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { MessageService } from 'src/app/services/message.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-liste-message',
  templateUrl: './liste-message.component.html',
  styleUrls: ['./liste-message.component.css']
})
export class ListeMessageComponent implements OnInit{
  public messages!: Message[];
  email: string = this.route.snapshot.params['email'].toString();
  nombreMessage: number = 0;
  nomUtilisateur!:NomUtilisateur;
  constructor(private utilisateurService:UtilisateurService, private messageService:MessageService,private route:ActivatedRoute,private router: Router,private location: Location){}
  ngOnInit(): void {
    this.getMessages();
    this.recupererNom();

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
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
  retour(): void {
    this.location.back();
  }
}
