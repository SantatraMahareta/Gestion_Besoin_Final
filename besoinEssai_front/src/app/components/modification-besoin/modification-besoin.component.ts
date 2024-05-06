import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Besoin } from 'src/app/models/besoin';
import { BesoinService } from 'src/app/services/besoin.service';

@Component({
  selector: 'app-modification-besoin',
  templateUrl: './modification-besoin.component.html',
  styleUrls: ['./modification-besoin.component.css']
})
export class ModificationBesoinComponent implements OnInit{

  titre: string = '';
  description: string = '';
  nouveauBesoin: Besoin = {
    // utilisateur: this.utilisateurEmail
  }
  applicaionId:number=+this.route.snapshot.params['applicationId'];
  email: string = this.route.snapshot.params['email'].toString();

  besoinId:number=+this.route.snapshot.params['besoinId'];
  @Input() isVisible: boolean = false;
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;
  closeSuccessModal() {
    this.naviguerApplication();
    this.isModalVisible = false;

  }  
  closeEchecModal(){
    this.isModalVisible2 = false;
  }
  constructor(private besoinService: BesoinService,private route:ActivatedRoute,private router: Router) { }
  ngOnInit(): void {
  }
  modifierBesoin(): void {

    this.nouveauBesoin.titreBesoin = this.titre;
    this.nouveauBesoin.descriptionBesoin = this.description;
    this.besoinService.modificationBesoin(this.besoinId,this.nouveauBesoin).subscribe(
      (response: Besoin) => {
        this.isModalVisible = true
        console.log('Besoin enregistré:', response);
      },
      (error: HttpErrorResponse) => {
        this.isModalVisible2 = true
        // alert(error.message);
      }
    )
  }

  public naviguerApplication(){
    this.router.navigate(['/listerBesoin',this.applicaionId,this.email]);
  }
}
