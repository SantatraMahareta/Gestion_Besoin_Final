import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Message } from '../models/Message';
import { Observable, Subject, interval } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiServerUrl = 'http://localhost:9000';
  constructor(private http: HttpClient) { 
   }
  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  public ajoutMessage(email:string,message:Message): Observable<Message>{
    return this.http.post<Message>(`${this.apiServerUrl}/message/ajout/${email}`,message)
  }
  public getMessage(email:string): Observable<Message[]>{
    return this.http.get<Message[]>(`${this.apiServerUrl}/message/lister/${email}`);
  }

  public afficheMessageNonLu(email:string): Observable<Message[]>{
    return this.http.get<Message[]>(`${this.apiServerUrl}/message/listerMessageNonLu/${email}`)
  }

  public marquerCommeLu(messageId:number): Observable<Message>{
    return this.http.put<Message>(`${this.apiServerUrl}/message/lu/${messageId}`,{})
    }
}
