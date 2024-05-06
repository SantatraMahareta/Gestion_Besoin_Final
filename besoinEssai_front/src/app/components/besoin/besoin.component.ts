import { Component, Input, OnInit } from '@angular/core';
import { Besoin } from 'src/app/models/besoin';
import { BesoinService } from 'src/app/services/besoin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Commentaire } from 'src/app/models/Commentaire';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationComponent } from '../application/application.component';

@Component({
  selector: 'app-besoin',
  templateUrl: './besoin.component.html',
  styleUrls: ['./besoin.component.css']
})
export class BesoinComponent implements OnInit {
  p:number = 1
  afficherFormulaireCommentaire = false;
  application!: ApplicationComponent
  public besoins!: Besoin[];
  applicaionId:number=+this.route.snapshot.params['applicationId'];
  email: string = this.route.snapshot.params['email'].toString();
  email1:string ='';
  coms:string='';
  utilisateurDest: Utilisateur = {
    email:this.email1
  };
  nouveauComs: Commentaire = {
    texteCommentaire:'',
    dateCommentaire: new Date(),
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
  constructor(private besoinService: BesoinService, private commentaireService: CommentaireService,private route:ActivatedRoute,private router: Router) {}
  public afficherFormulaireDeCommentaire() {
    this.afficherFormulaireCommentaire = true;
  }
  public getBesoins(): void {
    this.besoinService.getBesoin(this.applicaionId).subscribe(
      (response: Besoin[]) => {
        this.besoins = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getBesoins();
  }

onValid(besoin: Besoin): void {
  if (besoin.besoinId !== undefined) {
    this.besoinService.validerBesoinClient(besoin.besoinId).subscribe(
      (response: Besoin) => {
        this.isModalVisible = true
        console.log('Besoin validé:', response);
      },
      (error: HttpErrorResponse) => {
        this.isModalVisible2 = true
        // alert(error.message);
      }
    );
  } else {
    console.error("Le champ 'besoinId' est undefined.");
  }
}

emettreCommentaire(besoin: Besoin): void {
  if (besoin.besoinId !== undefined) {
    console.log('coms:', this.coms);
    console.log('email:', this.email1);
    this.nouveauComs.texteCommentaire = this.coms;
    this.nouveauComs.dateCommentaire = new Date();
    this.utilisateurDest.email = this.email1;
    console.log('utilisateurDest:', this.utilisateurDest);
    this.nouveauComs.utilisateurDestinataire = this.utilisateurDest;
    console.log('nouveauComs:', this.nouveauComs);
    this.commentaireService.enregistrerCommentaire(besoin.besoinId, this.nouveauComs).subscribe(
      (response: Commentaire = this.nouveauComs) => {
        console.log('Commentaire enregistré:', response);
        this.coms = '';
        this.email1 = '';
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      
    );
  } else {
    console.error("Le champ 'besoinId' est undefined.");
  }
  this.afficherFormulaireCommentaire = false;
}

commenterBesoin(besoin:Besoin){

  this.router.navigate(['/commentaire', besoin.besoinId,this.applicaionId]);

}

public naviguerApplication(){
  this.router.navigate(['/application',this.email]);
}
public naviguerChart(){
  this.router.navigate(['/chart',this.email]);
}


public naviguerAcceuil(){
  this.router.navigate(['/acceuil',this.email]);
}
public Deconnexion(){
  this.router.navigate(['/login']);
}


}
