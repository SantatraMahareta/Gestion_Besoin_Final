import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutBesoinComponent } from './components//ajout-besoin/ajout-besoin.component';
import { AjoutMessageComponent } from './components//ajout-message/ajout-message.component';
import { AjoutUtilisateurComponent } from './components//ajout-utilisateur/ajout-utilisateur.component';
import { BesoinDsiComponent } from './components//besoin-dsi/besoin-dsi.component';
import { BesoinSrsgbdComponent } from './components//besoin-srsgbd/besoin-srsgbd.component';
import { BesoinSvtfaComponent } from './components//besoin-svtfa/besoin-svtfa.component';
import { BesoinComponent } from './components//besoin/besoin.component';
import { NotificationComponent } from './components//notification/notification.component';
import { ApplicationComponent } from './components//application/application.component';
import { ApplicationDsiComponent } from './components//application-dsi/application-dsi.component';
import { ApplicationSrsbdComponent } from './components//application-srsbd/application-srsbd.component';
import { ApplicationSvtfaComponent } from './components//application-svtfa/application-svtfa.component';
import { VoirEvolutionComponent } from './components/voir-evolution/voir-evolution.component';
import { LoginComponent } from './components/login/login.component';
import { PageAcceuilComponent } from './components/page-acceuil/page-acceuil.component';
import { PageAcceuilSvtfaComponent } from './components/page-acceuil-svtfa/page-acceuil-svtfa.component';
import { PageAcceuilDsiComponent } from './components/page-acceuil-dsi/page-acceuil-dsi.component';
import { RepartirTacheComponent } from './components/repartir-tache/repartir-tache.component';
import { PageAcceuilSrsbdComponent } from './components/page-acceuil-srsbd/page-acceuil-srsbd.component';
import { ListeMessageComponent } from './components/liste-message/liste-message.component';
import { ModificationBesoinComponent } from './components/modification-besoin/modification-besoin.component';
import { CommentaireComponent } from './components/commentaire/commentaire.component';
import { ListeBesoinSvtfaComponent } from './components/liste-besoin-svtfa/liste-besoin-svtfa.component';
import { ApplicationListeBesoinComponent } from './components/application-liste-besoin/application-liste-besoin.component';
import { ApplicationEvolutionComponent } from './components/application-evolution/application-evolution.component';
import { VoirEvolutionScdsiComponent } from './components/voir-evolution-scdsi/voir-evolution-scdsi.component';


const routes: Routes = [

  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},

  {
    path:'',
    children:[
      {path: 'message/:email', component:AjoutMessageComponent},
      {path: 'notification/:email', component:NotificationComponent},
      {path:'ajoutUtilisateur',component:AjoutUtilisateurComponent},
      {path:'ajoutBesoin/:email',component:AjoutBesoinComponent},
      {path:'besoin/:applicationId/:email',component:BesoinComponent},
      {path:'besoinSvtfa/:applicationId/:email',component:BesoinSvtfaComponent},
      {path:'besoinDsi/:applicationId/:email',component:BesoinDsiComponent},
      {path:'modification/:besoinId/:applicationId/:email',component:ModificationBesoinComponent},
      {path:'repartir/:email',component:RepartirTacheComponent},
      {path:'application/:email',component:ApplicationComponent},
      {path:'applicationSvtfa/:email',component:ApplicationSvtfaComponent},
      {path:'applicationDsi/:email',component:ApplicationDsiComponent},
      {path:'applicationSrsbd/:email',component:ApplicationSrsbdComponent},
      {path:'chart/:email',component:VoirEvolutionComponent},
      {path:'acceuil/:email',component:PageAcceuilComponent},
      {path:'acceuilSvtfa/:email',component:PageAcceuilSvtfaComponent},
      {path:'acceuilDsi/:email',component:PageAcceuilDsiComponent},
      {path:'acceuilSrsbd/:email',component:PageAcceuilSrsbdComponent},
      {path:'listeMessage/:email',component:ListeMessageComponent},
      {path:'commentaire/:besoinId/:applicationId',component:CommentaireComponent},
      {path:'listerBesoin/:applicationId/:email',component:ListeBesoinSvtfaComponent},
      {path:'applicationListe/:email',component:ApplicationListeBesoinComponent},
      {path:'applicationEvolution/:email',component:ApplicationEvolutionComponent},
      {path:'voirEvolution/:applicationId/:email',component:VoirEvolutionScdsiComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
