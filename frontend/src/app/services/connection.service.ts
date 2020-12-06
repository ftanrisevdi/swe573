import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConnectionService {
  constructor(private http: HttpClient) {}

  signup(newUser: User, options?: any): Observable<any> {
    return this.http.post(`${environment.api}signup`, newUser);
  }

  signin(user: User, options?: any): Observable<any> {
    return this.http.post(`${environment.api}signin`, user);
  }

  search(): Observable<any> {
    return this.http.get(`${environment.api}search`);
  }
}
