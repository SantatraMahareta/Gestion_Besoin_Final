import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Besoin } from 'src/app/models/besoin';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { BesoinService } from 'src/app/services/besoin.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-repartir-tache',
  templateUrl: './repartir-tache.component.html',
  styleUrls: ['./repartir-tache.component.css']
})
export class RepartirTacheComponent implements OnInit{
  nomUtilisateur!:NomUtilisateur
  public besoins!: Besoin[];
  public utilisateurs!: Utilisateur[];
  email: string = this.route.snapshot.params['email'].toString();
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
    this.getDeveloppeur();
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
    public getDeveloppeur():void{
      this.utilisateurService.getDeveloppeur().subscribe(
        (response: Utilisateur[]) =>{
          this.utilisateurs = response;
        },
        (error: HttpErrorResponse) =>{
          alert(error.message);
        }
      )
    }
    public getBesoins(): void{
      this.besoinService.getBesoinDsi2().subscribe(
        (response: Besoin[]) =>{
          this.besoins = response;
        },
        (error: HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }
    recupererDev(besoin: Besoin): void {
      if (besoin.besoinId !== undefined) {
        const utilisateurDev: Utilisateur = {
          nomComplet: this.nom
        };
        console.log(utilisateurDev);
        this.besoinService.recupererDev(besoin.besoinId, utilisateurDev).subscribe(
          (response: Besoin) => {
            this.isModalVisible = true
            console.log("Développeur ajouté", response);
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

    public naviguerAcceuil(){
      this.router.navigate(['/acceuilDsi',this.email]);
    }
    public Deconnexion(){
      this.router.navigate(['/login']);
    }
}
