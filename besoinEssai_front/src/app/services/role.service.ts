import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiServerUrl = 'http://localhost:9000';
  constructor(private http: HttpClient) { }
  public getRole(email:String): Observable<Role> {
    return this.http.get<Role>(`${this.apiServerUrl}/role/listeRole/${email}`);
  }
}
