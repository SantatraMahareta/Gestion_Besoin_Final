import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Besoin } from 'src/app/models/besoin';
import { BesoinService } from 'src/app/services/besoin.service';

@Component({
  selector: 'app-liste-besoin-svtfa',
  templateUrl: './liste-besoin-svtfa.component.html',
  styleUrls: ['./liste-besoin-svtfa.component.css']
})
export class ListeBesoinSvtfaComponent implements OnInit{
  public besoins!: Besoin[];
  applicaionId:number=+this.route.snapshot.params['applicationId'];
  p:number = 1
  email: string = this.route.snapshot.params['email'].toString();
  constructor(private besoinService: BesoinService,private route:ActivatedRoute,private router: Router) {}


  @Input() isVisible: boolean = false;
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;
  closeSuccessModal() {
    // this.naviguerListe();
    this.isModalVisible = false;

  }  
  closeEchecModal(){
    this.isModalVisible2 = false;
  }
  ngOnInit(): void {
    this.getBesoins();
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
  supprimerBesoin(besoin: Besoin){
    if (besoin.besoinId !== undefined) {
      this.besoinService.supprimerBesoin(besoin.besoinId).subscribe(
        (response: Besoin) => {
          this.isModalVisible = true
          console.log('Besoin supprimer:', response);
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
  modifierBesoin(besoin:Besoin){

      this.router.navigate(['/modification', besoin.besoinId,this.applicaionId,this.email]);
  
  }

  
  public naviguerAcceuil(){
    this.router.navigate(['/acceuilSvtfa',this.email]);
  }
  public naviguerCreation(){
    this.router.navigate(['/ajoutBesoin', this.email]);
  }
  public naviguerApplication(){
    this.router.navigate(['/applicationSvtfa', this.email]);
  }
  public naviguerListe(){
    this.router.navigate(['/applicationListe', this.email]);
  }
  public naviguerInformer(){
    this.router.navigate(['/message', this.email]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
}
