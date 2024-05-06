
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Besoin } from 'src/app/models/besoin';
import { BesoinService } from 'src/app/services/besoin.service';

@Component({
  selector: 'app-besoin-svtfa',
  templateUrl: './besoin-svtfa.component.html',
  styleUrls: ['./besoin-svtfa.component.css']
})
export class BesoinSvtfaComponent implements OnInit {
  constructor(private besoinService: BesoinService, private route: ActivatedRoute, private router: Router) { }
 // Déclaration des variables de classe
 p: number = 1; // Variable utilisée pour la pagination
 public besoins!: Besoin[]; // Tableau des besoins à afficher
 applicaionId: number = +this.route.snapshot.params['applicationId']; // Identifiant de l'application récupéré depuis l'URL
 email: string = this.route.snapshot.params['email'].toString(); // Adresse email récupérée depuis l'URL
 @Input() isVisible: boolean = false; // Propriété utilisée pour gérer la visibilité d'un élément (peut être supprimée si non utilisée)
 isModalVisible: boolean = false; // Propriété utilisée pour gérer la visibilité du premier modal
 isModalVisible2: boolean = false; // Propriété utilisée pour gérer la visibilité du deuxième modal
 closeSuccessModal() {
  this.isModalVisible = false;
} 
closeEchecModal(){
  this.isModalVisible2 = false;
}
 // Méthode appelée lors de l'initialisation du composant
 ngOnInit(): void {
   this.getBesoins(); // Appel de la méthode pour récupérer les besoins
 }

 // Méthode pour récupérer les besoins associés à une application
 public getBesoins(): void {
   this.besoinService.getBesoinSvtfa(this.applicaionId).subscribe(
     // En cas de succès, la réponse est assignée à la variable besoins
     (response: Besoin[]) => {
       this.besoins = response;
     },
     // En cas d'erreur, une alerte est affichée avec le message d'erreur
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
 }

 // Méthode appelée lors de la validation d'un besoin
 onValid(besoin: Besoin): void {
   if (besoin.besoinId !== undefined) {
     this.besoinService.validerBesoinSvtfa(besoin.besoinId).subscribe(
       // En cas de succès, le premier modal est affiché et le résultat est logué dans la console
       (response: Besoin) => {
         this.isModalVisible = true;
         console.log('Besoin validé:', response);
       },
       // En cas d'erreur, le deuxième modal est affiché et une alerte est affichée avec le message d'erreur
       (error: HttpErrorResponse) => {
         this.isModalVisible2 = true;
         // alert(error.message);
       }
     );
   } else {
     console.error("Le champ 'besoinId' est undefined.");
   }
 }

 // Méthode pour supprimer un besoin
 supprimerBesoin(besoin: Besoin): void {
   if (besoin.besoinId !== undefined) {
     this.besoinService.supprimerBesoin(besoin.besoinId).subscribe(
       // En cas de succès, le résultat est logué dans la console
       (response: Besoin) => {
         console.log('Besoin supprimé:', response);
       },
       // En cas d'erreur, une alerte est affichée avec le message d'erreur
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
   } else {
     console.error("Le champ 'besoinId' est undefined.");
   }
 }

 // Méthode pour naviguer vers la modification d'un besoin
 modifierBesoin(besoin: Besoin): void {
   // Redirection vers la page de modification avec l'identifiant du besoin
   this.router.navigate(['/modification', besoin.besoinId]);
 }

 // Méthode pour naviguer vers la page d'accueil de l'application SVTFA
 public naviguerAcceuil(): void {
   this.router.navigate(['/acceuilSvtfa', this.email]);
 }

 // Méthode pour naviguer vers la page de création d'un besoin
 public naviguerCreation(): void {
   this.router.navigate(['/ajoutBesoin', this.email]);
 }

 // Méthode pour naviguer vers la page des applications SVTFA
 public naviguerApplication(): void {
   this.router.navigate(['/applicationSvtfa', this.email]);
 }

 // Méthode pour naviguer vers la liste des applications
 public naviguerListe(): void {
   this.router.navigate(['/applicationListe', this.email]);
 }

 // Méthode pour naviguer vers la page d'information
 public naviguerInformer(): void {
   this.router.navigate(['/message', this.email]);
 }
  public Deconnexion() {
    this.router.navigate(['/login']);
  }
}
