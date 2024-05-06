import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/AuthenticationRequest';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email:string='';
  motDePasse:string='';
  authentification: AuthenticationRequest ={}
  errorMessages: string[] = [];
  constructor(private utilisateurService: UtilisateurService,private router: Router,private roleService:RoleService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


  Authentification() {
    this.authentification.email = this.email;
    this.authentification.motDePasse = this.motDePasse;
  
    this.utilisateurService.authentification(this.authentification).subscribe(
      (response: AuthenticationResponse) => {
        console.log('Utilisateur authentifié:', response);

        this.roleService.getRole(this.email).subscribe((role: Role) => {
          if (role.nomRole === "CLIENT") {
            this.router.navigate(['/acceuil', this.email]);
          } else if (role.nomRole === "SVTFA") {
            this.router.navigate(['/acceuilSvtfa', this.email]);
          } else if (role.nomRole === "SCDSI") {
            this.router.navigate(['/acceuilDsi', this.email]);
          } else if (role.nomRole === "SRSBD") {
            this.router.navigate(['/acceuilSrsbd', this.email]);
          }
        });
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }
  

private handleError(error: HttpErrorResponse) {
  this.clearErrors();
  if (error.status === 403) {
    this.errorMessages.push('Nom d\'utilisateur ou mot de passe incorrect.');
  } else {
    this.errorMessages.push('Une erreur inattendue s\'est produite.');
  }
}
private clearErrors() {
  this.errorMessages = [];
}
}
