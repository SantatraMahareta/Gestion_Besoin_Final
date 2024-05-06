import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application-dsi',
  templateUrl: './application-dsi.component.html',
  styleUrls: ['./application-dsi.component.css']
})
export class ApplicationDsiComponent implements OnInit{
  applications!: Application[]
  nomUtilisateur!:NomUtilisateur
  name!:number
  email: string = this.route.snapshot.params['email'].toString();
  constructor(private utilisateurService:UtilisateurService,private applicationService:ApplicationService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
      this.getApplication()
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
  public naviguerAcceuil(){
    this.router.navigate(['/acceuilDsi',this.email]);
  }

  public naviguerBesoin(applicationId: number|undefined): void {
    this.router.navigate(['/besoinDsi', applicationId, this.email]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
}
