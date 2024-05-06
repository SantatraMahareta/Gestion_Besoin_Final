import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/Utilisateur';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { NomUtilisateur } from '../models/NomUtilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiServerUrl = 'http://localhost:9000';

  // requestHeader = new  HttpHeaders(
  //   {"No-Auth":"True"}
  // )

  constructor(private http: HttpClient) { }

  public ajoutUtilisateur(utilisateur:Utilisateur): Observable<Utilisateur>{
    return this.http.post<Utilisateur>(`${this.apiServerUrl}/Utilisateur/ajout`,utilisateur);
  }
  public getDeveloppeur(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/Utilisateur/ListerDeveloppeur`);
  }
  public authentification(authentification:AuthenticationRequest): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${this.apiServerUrl}/Utilisateur/authentification`,authentification);
  }
  public recuperNom(email:string): Observable<NomUtilisateur>{
    return this.http.get<NomUtilisateur>(`${this.apiServerUrl}/Utilisateur/recupererNom/${email}`);
  }
}
