import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Departement } from 'src/app/models/Departement';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css']
})
export class AjoutUtilisateurComponent implements OnInit{
  email:string='';
  motDePasse:string='';
  nomComplet:string='';
  nomDepart:string='';
  nouveaudepartement: Departement = {
    nomDepartement: this.nomDepart,
  };
  nouveauUtilisateur: Utilisateur ={
  }
  @Input() isVisible: boolean = false;
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;
  closeSuccessModal() {
    this.router.navigate(['/login']);
    this.isModalVisible = false;
  }  
  closeEchecModal(){
    this.isModalVisible2 = false;
  }
  constructor(private utilisateurService: UtilisateurService,private router: Router) { }
  ngOnInit(): void {
    // this.ajoutUtilisateur();
  }
  ajoutUtilisateur(){
    console.log(this.nomDepart);
    this.nouveauUtilisateur.email = this.email;
    this.nouveauUtilisateur.motDePasse = this.motDePasse;
    this.nouveauUtilisateur.nomComplet = this.nomComplet;
    this.nouveaudepartement.nomDepartement = this.nomDepart;
    this.nouveauUtilisateur.departement = this.nouveaudepartement;
    console.log('departement:',this.nouveauUtilisateur) 
    this.utilisateurService.ajoutUtilisateur(this.nouveauUtilisateur).subscribe(
      (response: Utilisateur) => {
        this.isModalVisible = true
        console.log('Utilisateur enregistré:', response);
      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
        this.isModalVisible2 = true

      }
    )
  }
}
