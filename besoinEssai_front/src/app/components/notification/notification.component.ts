import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from 'src/app/models/Commentaire';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  commentaires!:Commentaire[];
  nomUtilisateur!:NomUtilisateur;
  nombreCommentaire: number = 0;

  // id:number = +this.route.snapshot.params['id'];    
  email: string = this.route.snapshot.params['email'].toString();
  constructor(private utilisateurService:UtilisateurService,private commentaireService:CommentaireService,private route:ActivatedRoute,private router: Router,private location: Location){}

  ngOnInit(): void {
    this.recupererNom();
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

  marquerCommeLu(commentaire:Commentaire){
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
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
  retour(): void {
    this.location.back();
  }
}
