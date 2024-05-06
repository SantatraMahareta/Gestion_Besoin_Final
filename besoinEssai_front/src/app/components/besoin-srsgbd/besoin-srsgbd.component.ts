import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Besoin } from '../models/besoin';
// import { BesoinService } from '../services/besoin.service';
import { ActivatedRoute } from '@angular/router';
import { Besoin } from 'src/app/models/besoin';
import { BesoinService } from 'src/app/services/besoin.service';

@Component({
  selector: 'app-besoin-srsgbd',
  templateUrl: './besoin-srsgbd.component.html',
  styleUrls: ['./besoin-srsgbd.component.css']
})
export class BesoinSrsgbdComponent implements OnInit{
  constructor(private besoinService: BesoinService,private route:ActivatedRoute){}
  public besoins!: Besoin[];
  applicaionId:number=+this.route.snapshot.params['applicationId'];
  ngOnInit(): void {
      
  }
  public getBesoins():void{
    this.besoinService.getBesoinSrsgbd(this.applicaionId).subscribe(
      (response: Besoin[]) => {
        this.besoins = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  onValid(besoin: Besoin): void {
    if (besoin.besoinId !== undefined) {
      this.besoinService.validerBesoinSrsgbd(besoin.besoinId).subscribe(
        (response: Besoin) => {
          console.log('Besoin validé:', response);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      console.error("Le champ 'besoinId' est undefined.");
    }
  }
}
