import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-page-acceuil-dsi',
  templateUrl: './page-acceuil-dsi.component.html',
  styleUrls: ['./page-acceuil-dsi.component.css']
})
export class PageAcceuilDsiComponent implements OnInit{
  nomUtilisateur!:NomUtilisateur;
  email: string = this.route.snapshot.params['email'].toString();
  constructor(private utilisateurService:UtilisateurService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
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
