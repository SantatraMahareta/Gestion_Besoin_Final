import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Besoin } from '../models/besoin';
import { Commentaire } from '../models/Commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiServerUrl = 'http://localhost:9000';
  constructor(private http: HttpClient) { }

  public enregistrerCommentaire(besoinId:number,commentaire:Commentaire): Observable<Commentaire>{
    return this.http.post<Commentaire>(`${this.apiServerUrl}/commentaire/enregistrer/${besoinId}`,commentaire);
  }
  public afficheCommentaire(email:string): Observable<Commentaire[]>{
    return this.http.get<Commentaire[]>(`${this.apiServerUrl}/commentaire/listerComs/${email}`)
  }

  public afficheCommentaireNonLu(email:string): Observable<Commentaire[]>{
    return this.http.get<Commentaire[]>(`${this.apiServerUrl}/commentaire/listerComsNonLu/${email}`)
  }

  public marquerCommeLu(commentaireId:number): Observable<Commentaire>{
    return this.http.put<Commentaire>(`${this.apiServerUrl}/commentaire/lu/${commentaireId}`,{});
  }
}
