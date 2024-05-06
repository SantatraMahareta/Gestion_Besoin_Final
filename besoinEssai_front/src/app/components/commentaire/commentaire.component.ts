import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Besoin } from 'src/app/models/besoin';
import { Commentaire } from 'src/app/models/Commentaire';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { CommentaireService } from 'src/app/services/commentaire.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit{
  email1:string ='';
  coms:string='';
  utilisateurDest: Utilisateur = {
    email:this.email1
  };
  nouveauComs: Commentaire = {
    texteCommentaire:'',
    dateCommentaire: new Date(),
  }
  applicaionId:number=+this.route.snapshot.params['applicationId'];
  besoinId:number=+this.route.snapshot.params['besoinId'];
  @Input() isVisible: boolean = false;
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;
  closeSuccessModal() {
    this.isModalVisible = false;
    this.naviguerBesoin()
  }  
  closeEchecModal(){
    this.isModalVisible2 = false;
  }
  constructor(private commentaireService:CommentaireService,private route:ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  emettreCommentaire(): void {
    if (this.besoinId !== undefined) {
      console.log('coms:', this.coms);
      console.log('email:', this.email1);
      this.nouveauComs.texteCommentaire = this.coms;
      this.nouveauComs.dateCommentaire = new Date();
      this.utilisateurDest.email = this.email1;
      console.log('utilisateurDest:', this.utilisateurDest);
      this.nouveauComs.utilisateurDestinataire = this.utilisateurDest;
      console.log('nouveauComs:', this.nouveauComs);
      this.commentaireService.enregistrerCommentaire(this.besoinId, this.nouveauComs).subscribe(
        (response: Commentaire = this.nouveauComs) => {
          this.isModalVisible = true
          console.log('Commentaire enregistré:', response);
          this.coms = '';
          this.email1 = '';
        },
        (error: HttpErrorResponse) => {
          // alert(error.message);
          this.isModalVisible2 = true

        }
        
      );
    } else {
      console.error("Le champ 'besoinId' est undefined.");
        }
  }


  public naviguerBesoin(){
    this.router.navigate(['/besoin',this.applicaionId]);
  }
}
