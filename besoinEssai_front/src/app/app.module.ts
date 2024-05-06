import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BesoinComponent } from './components/besoin/besoin.component';
import { HttpClientModule } from '@angular/common/http';
import { BesoinService } from './services/besoin.service';
import { FormsModule } from '@angular/forms';
import { AjoutBesoinComponent } from './components/ajout-besoin/ajout-besoin.component';
import { AjoutUtilisateurComponent } from './components/ajout-utilisateur/ajout-utilisateur.component';
import { AjoutMessageComponent } from './components/ajout-message/ajout-message.component';
import { NotificationComponent } from './components/notification/notification.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderClientComponent } from './components/header-client/header-client.component';
import { HeaderDsiComponent } from './components/header-dsi/header-dsi.component';
import { HeaderSrsgbdComponent } from './components/header-srsgbd/header-srsgbd.component';
import { BesoinSvtfaComponent } from './components/besoin-svtfa/besoin-svtfa.component';
import { BesoinDsiComponent } from './components/besoin-dsi/besoin-dsi.component';
import { BesoinSrsgbdComponent } from './components/besoin-srsgbd/besoin-srsgbd.component';
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationSvtfaComponent } from './components/application-svtfa/application-svtfa.component';
import { ApplicationDsiComponent } from './components/application-dsi/application-dsi.component';
import { ApplicationSrsbdComponent } from './components/application-srsbd/application-srsbd.component';
import { VoirEvolutionComponent } from './components/voir-evolution/voir-evolution.component';
import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './components/login/login.component';
import { PageAcceuilComponent } from './components/page-acceuil/page-acceuil.component';
import { PageAcceuilSvtfaComponent } from './components/page-acceuil-svtfa/page-acceuil-svtfa.component';
import { PageAcceuilDsiComponent } from './components/page-acceuil-dsi/page-acceuil-dsi.component';
import { RepartirTacheComponent } from './components/repartir-tache/repartir-tache.component';
import { PageAcceuilSrsbdComponent } from './components/page-acceuil-srsbd/page-acceuil-srsbd.component';
import { RouterModule } from '@angular/router';
import { ListeMessageComponent } from './components/liste-message/liste-message.component';
import { ModificationBesoinComponent } from './components/modification-besoin/modification-besoin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentaireComponent } from './components/commentaire/commentaire.component';
import { ListeBesoinSvtfaComponent } from './components/liste-besoin-svtfa/liste-besoin-svtfa.component';
import { ApplicationListeBesoinComponent } from './components/application-liste-besoin/application-liste-besoin.component';
import { ApplicationEvolutionComponent } from './components/application-evolution/application-evolution.component';
import { VoirEvolutionScdsiComponent } from './components/voir-evolution-scdsi/voir-evolution-scdsi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgToastModule } from 'ng-angular-popup';
@NgModule({
  declarations: [
    AppComponent,
    BesoinComponent,
    AjoutBesoinComponent,
    AjoutUtilisateurComponent,
    AjoutMessageComponent,
    NotificationComponent,
    HeaderComponent,
    HeaderClientComponent,
    HeaderDsiComponent,
    HeaderSrsgbdComponent,
    BesoinSvtfaComponent,
    BesoinDsiComponent,
    BesoinSrsgbdComponent,
    ApplicationComponent,
    ApplicationSvtfaComponent,
    ApplicationDsiComponent,
    ApplicationSrsbdComponent,
    VoirEvolutionComponent,
    LoginComponent,
    PageAcceuilComponent,
    PageAcceuilSvtfaComponent,
    PageAcceuilDsiComponent,
    RepartirTacheComponent,
    PageAcceuilSrsbdComponent,
    ListeMessageComponent,
    ModificationBesoinComponent,
    CommentaireComponent,
    ListeBesoinSvtfaComponent,
    ApplicationListeBesoinComponent,
    ApplicationEvolutionComponent,
    VoirEvolutionScdsiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    RouterModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    NgxPaginationModule,
    MatDialogModule,
    NgToastModule,

  ],
  providers: [BesoinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
