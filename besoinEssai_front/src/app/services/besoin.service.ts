import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Besoin } from '../models/besoin';
import { Utilisateur } from '../models/Utilisateur';
import { EmailSvtfa } from '../models/EmailSvtfa';

@Injectable({
  providedIn: 'root'
})
export class BesoinService {

  private apiServerUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  // Récupérer la liste des besoins pour une application spécifique
  public getBesoin(applicationId: number): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(`${this.apiServerUrl}/besoin/lister/${applicationId}`);
  }

  // Récupérer la liste des besoins pour l'application SVTFA
  public getBesoinSvtfa(applicationId: number): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(`${this.apiServerUrl}/besoin/listerSvtfa/${applicationId}`);
  }

  // Récupérer la liste des besoins pour l'application DSI
  public getBesoinDsi(applicationId: number): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(`${this.apiServerUrl}/besoin/listerDsi/${applicationId}`);
  }

  // Récupérer la liste des besoins pour l'application DSI (méthode alternative)
  public getBesoinDsi2(): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(`${this.apiServerUrl}/besoin/listerDsi`);
  }

  // Récupérer la liste des besoins pour l'application SRSGDB
  public getBesoinSrsgbd(applicationId: number): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(`${this.apiServerUrl}/besoin/listerSrsgbd/${applicationId}`);
  }

  // Valider un besoin côté client
  public validerBesoinClient(besoinId: number): Observable<Besoin> {
    return this.http.put<Besoin>(`${this.apiServerUrl}/besoin/validerClient/${besoinId}`, {});
  }

  // Valider un besoin côté SVTFA
  public validerBesoinSvtfa(besoinId: number): Observable<Besoin> {
    return this.http.put<Besoin>(`${this.apiServerUrl}/besoin/validerSvtfa/${besoinId}`, {});
  }

  // Valider un besoin côté DSI
  public validerBesoinDsi(besoinId: number): Observable<Besoin> {
    return this.http.put<Besoin>(`${this.apiServerUrl}/besoin/validerDsi/${besoinId}`, {});
  }

  // Valider un besoin côté SRSGDB
  public validerBesoinSrsgbd(applicaionId: number): Observable<Besoin> {
    return this.http.put<Besoin>(`${this.apiServerUrl}/besoin/validerSrsgbd/${applicaionId}`, {});
  }

  // Ajouter un besoin
  public ajoutBesoin(besoin: Besoin): Observable<Besoin> {
    return this.http.post<Besoin>(`${this.apiServerUrl}/besoin/ajouter`, besoin);
  }

  // Récupérer le développeur pour un besoin spécifique
  public recupererDev(besoinId: number, utilisateur: Utilisateur): Observable<Besoin> {
    return this.http.post<Besoin>(`${this.apiServerUrl}/besoin/developpeur/${besoinId}`, utilisateur);
  }

  // Modifier un besoin
  public modificationBesoin(besoinId: number, besoin: Besoin): Observable<Besoin> {
    return this.http.put<Besoin>(`${this.apiServerUrl}/besoin/modifier/${besoinId}`, besoin);
  }

  // Supprimer un besoin
  public supprimerBesoin(besoinId: number): Observable<Besoin> {
    return this.http.delete<Besoin>(`${this.apiServerUrl}/besoin/supprimer/${besoinId}`);
  }

  // Récupérer la liste des besoins filtrée par email
  public getBesoinEmail(email: string, recherche: string): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(`${this.apiServerUrl}/besoin/listerBesoin/${email}?recherche=${recherche}`);
  }

  // Récupérer le nom associé à une application SVTFA
  public recupererNom(applicaionId: number): Observable<EmailSvtfa> {
    return this.http.get<EmailSvtfa>(`${this.apiServerUrl}/besoin/listerNomSvtfa/${applicaionId}`);
  }

  // Récupérer la liste des besoins filtrée par email pour une application spécifique
  public getBesoinEmailParApp(applicaionId: number, recherche: string): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(`${this.apiServerUrl}/besoin/listerDsiRecherche/${applicaionId}?recherche=${recherche}`);
  }
}
