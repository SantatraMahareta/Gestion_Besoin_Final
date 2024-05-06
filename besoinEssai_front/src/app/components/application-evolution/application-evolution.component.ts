import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/Application';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { ApplicationService } from 'src/app/services/application.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-application-evolution',
  templateUrl: './application-evolution.component.html',
  styleUrls: ['./application-evolution.component.css']
})
export class ApplicationEvolutionComponent {
  applications!: Application[]
  nomUtilisateur!:NomUtilisateur
  name!:number;
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
      function (error: HttpErrorResponse) {
        alert(error.message);
      }
    )
  }

  
  public naviguerEvolution(applicationId: number | undefined): void {
    this.router.navigate(['/voirEvolution', applicationId, this.email]);
  }
  public naviguerAcceuil(){
    this.router.navigate(['/acceuilDsi',this.email]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
}
