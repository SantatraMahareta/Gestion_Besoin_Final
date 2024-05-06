import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Besoin } from 'src/app/models/besoin';
import { ChartDonnees } from 'src/app/models/ChartDonnees';
import { ApplicationService } from 'src/app/services/application.service';
import { BesoinService } from 'src/app/services/besoin.service';

@Component({
  selector: 'app-voir-evolution-scdsi',
  templateUrl: './voir-evolution-scdsi.component.html',
  styleUrls: ['./voir-evolution-scdsi.component.css']
})
export class VoirEvolutionScdsiComponent {
  chartDonnees!: ChartDonnees
  public besoins!: Besoin[]
  id: number =+this.route.snapshot.params['applicationId'];;
  recherche: string="";
  email: string = this.route.snapshot.params['email'].toString();

  constructor(private applicationService: ApplicationService, private besoinService: BesoinService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.evolutionDonnees();
    this.getBesoins();
  }

  evolutionDonnees() :void{
    this.applicationService.donneesDataApp(this.id).subscribe(
      (response: ChartDonnees) =>{
        this.chartDonnees = response;
      },
      function (error: HttpErrorResponse) {
        alert(error.message);
      }
    )
  }

  public getBesoins(): void{
    this.besoinService.getBesoinEmailParApp(this.id,this.recherche).subscribe(
      (response: Besoin[]) =>{
        this.besoins = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
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
