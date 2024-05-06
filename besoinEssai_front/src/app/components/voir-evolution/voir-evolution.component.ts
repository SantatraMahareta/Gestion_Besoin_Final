import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDonnees } from 'src/app/models/ChartDonnees';
import { Chart, registerables } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import { BesoinService } from 'src/app/services/besoin.service';
import { Besoin } from 'src/app/models/besoin';

@Component({
  selector: 'app-voir-evolution',
  templateUrl: './voir-evolution.component.html',
  styleUrls: ['./voir-evolution.component.css']
})
export class VoirEvolutionComponent implements OnInit {
  chartDonnees!: ChartDonnees
  p:number = 1
  public besoins!: Besoin[]
  email: string = this.route.snapshot.params['email'].toString();
  recherche: string="";

  constructor(private applicationService: ApplicationService, private besoinService: BesoinService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.evolutionDonnees();
    this.getBesoins();
  }

  evolutionDonnees() :void{
    this.applicationService.donneesData(this.email).subscribe(
      (response: ChartDonnees) =>{
        this.chartDonnees = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }
  public getBesoins(): void {
    this.besoinService.getBesoinEmail(this.email,this.recherche).subscribe(
      (response: Besoin[]) => {
        this.besoins = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
