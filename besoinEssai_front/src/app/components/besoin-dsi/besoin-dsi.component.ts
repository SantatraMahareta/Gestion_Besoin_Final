import { Component, Input, OnInit } from '@angular/core';
import { Besoin } from 'src/app/models/besoin';
import { BesoinService } from 'src/app/services/besoin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-besoin-dsi',
  templateUrl: './besoin-dsi.component.html',
  styleUrls: ['./besoin-dsi.component.css']
})
export class BesoinDsiComponent implements OnInit{
  p:number = 1
  public besoins!: Besoin[];
  applicaionId:number=+this.route.snapshot.params['applicationId'];
  email: string = this.route.snapshot.params['email'].toString();
  public utilisateurs!: Utilisateur[];
  nom:string= '';
  utilisateurDev:Utilisateur = {
    nomComplet : this.nom
    };
  @Input() isVisible: boolean = false;
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;
  closeSuccessModal() {
    this.isModalVisible = false;
  }  
  closeEchecModal(){
    this.isModalVisible2 = false;
  }
  constructor(private besoinService:BesoinService,private utilisateurService:UtilisateurService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
      this.getBesoins();
  }
  public getBesoins(): void{
    this.besoinService.getBesoinDsi(this.applicaionId).subscribe(
      (response: Besoin[]) =>{
        this.besoins = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  onValid(besoin: Besoin):  void{
    if(besoin.besoinId !== undefined){
      this.besoinService.validerBesoinDsi(besoin.besoinId).subscribe(
        (response: Besoin) => {
          this.isModalVisible = true
          console.log('Besoin Valide:',response);
        },
        (error: HttpErrorResponse) => {
          // alert(error.message);
          this.isModalVisible2 = true

        }
      );
    }else{
      console.error("Le champ 'besoinId' est undefined");
    }
  }

  public naviguerAcceuil(){
    this.router.navigate(['/acceuilDsi',this.email]);
  }

  public naviguerRepartir(){
    this.router.navigate(['/repartir',this.email]);
  }
  public naviguerApplication(){
    this.router.navigate(['/applicationDsi',this.email]);
  }
  public naviguerChart(){
    this.router.navigate(['/applicationEvolution',this.email]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }

}
  

