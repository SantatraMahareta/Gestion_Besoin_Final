import { Component, Input, OnInit } from '@angular/core';
import { Application } from 'src/app/models/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BesoinService } from 'src/app/services/besoin.service';
import { Besoin } from 'src/app/models/besoin';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { EmailSvtfa } from 'src/app/models/EmailSvtfa';
import { NomApplication } from 'src/app/models/NomApplication';
import { NomUtilisateur } from 'src/app/models/NomUtilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-application-srsbd',
  templateUrl: './application-srsbd.component.html',
  styleUrls: ['./application-srsbd.component.css']
})
export class ApplicationSrsbdComponent implements OnInit{
  applications!: Application[]
  nomUtilisateur!:NomUtilisateur
  name!:number;
  emailSvtfa:EmailSvtfa = {}
  utilisateurDest: Utilisateur = {
    // email:this.emailDestinataire
  };
  email: string = this.route.snapshot.params['email'].toString();
  nouveauMessage:Message ={
    // dateMessage: new Date()
  }
  @Input() isVisible: boolean = false;
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;
  closeSuccessModal() {
    this.isModalVisible = false;
  }  
  closeEchecModal(){
    this.isModalVisible2 = false;
  }
  nomApplication: NomApplication ={}
  constructor(private utilisateurService:UtilisateurService,private applicationService:ApplicationService,private besoinService: BesoinService,private messageService: MessageService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
      this.getApplication()
      this.recupererNom()
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
    this.applicationService.getApplicationSrsbd().subscribe(
      (response: Application[]) => {
        this.applications = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  onValid(application: Application): void {
    const applicationId: number | undefined = application.applicationId;
  
    if (applicationId !== undefined) {
      this.applicationService.recuperNomApp(applicationId).subscribe(
        (nomApp: NomApplication) =>{
          this.nomApplication.nomApp = nomApp.nomApp
          this.besoinService.recupererNom(applicationId).subscribe(
            (nom: EmailSvtfa) => {
              this.emailSvtfa.email = nom.email;
              this.besoinService.validerBesoinSrsgbd(applicationId).subscribe(
                (response: Besoin) => {
                  this.isModalVisible = true
                  console.log('Besoin valide:', response);
                  this.nouveauMessage.texteMessage = "L'application "+ this.nomApplication.nomApp+' deploye';
                  this.utilisateurDest.email = this.emailSvtfa.email;
                  this.nouveauMessage.utilisateurDestinataire = this.utilisateurDest;
                  this.nouveauMessage.dateMessage = new Date();
                
                  this.messageService.ajoutMessage(this.email, this.nouveauMessage).subscribe(
                    (messageResponse: Message) => {
                      console.log('Message enregistré:', messageResponse);
                    },
                    (messageError: HttpErrorResponse) => {
                      alert(messageError.message);
                    }
                  );
                },
                (error: HttpErrorResponse) => {
                  this.isModalVisible2 = true
                  // alert(error.message);
                }
              );
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      )

    } else {
      console.error("Le champ 'besoinId' est undefined.");
    }
  }
  public naviguerAcceuil(){
    this.router.navigate(['/acceuilSrsbd',this.email]);
  }
  public Deconnexion(){
    this.router.navigate(['/login']);
  }
}
