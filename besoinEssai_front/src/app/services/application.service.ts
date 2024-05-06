import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Application } from '../models/Application';
import { ChartDonnees } from '../models/ChartDonnees';
import { NomApplication } from '../models/NomApplication';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiServerUrl = 'http://localhost:9000';
  constructor(private http: HttpClient) { }

  public getApplication(email:string): Observable<Application[]>{
    return this.http.get<Application[]>(`${this.apiServerUrl}/application/lister/${email}`);
  }
  public getApplication2(): Observable<Application[]>{
    return this.http.get<Application[]>(`${this.apiServerUrl}/application/lister`);
  }
  public getApplicationSrsbd(): Observable<Application[]>{
    return this.http.get<Application[]>(`${this.apiServerUrl}/application/listerSrsbd`);
  }

  public donneesData(email:string): Observable<ChartDonnees>{
    return this.http.get<ChartDonnees>(`${this.apiServerUrl}/application/chart/${email}`);
  }

  
  public donneesDataApp(applicationId:number): Observable<ChartDonnees>{
    return this.http.get<ChartDonnees>(`${this.apiServerUrl}/application/listeDonnesApp/${applicationId}`);
  }
  public recuperNomApp(applicationId:number): Observable<NomApplication>{
    return this.http.get<NomApplication>(`${this.apiServerUrl}/application/nomApp/${applicationId}`);
  }
}
