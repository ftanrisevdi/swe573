import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

export interface SearchModel {
  key: string;
  tweetCount: number;
}

@Injectable()
export class DataService {
  activeResults;
  constructor(private http: HttpClient) {}

  signup(newUser: User, options?: any): Observable<any> {
    return this.http.post(`${environment.api}signup`, newUser);
  }

  signin(user: User, options?: any): Observable<any> {
    return this.http.post(`${environment.api}signin`, user);
  }

  search(search: SearchModel): Observable<any> {
    return this.http.get(
      `${environment.api}search?key=${search.key}&tweetCount=${search.tweetCount}`
    );
  }
  history(): Observable<any> {
    return this.http.get(`${environment.api}history`);
  }

  logById(id: number): Observable<any> {
    return this.http.get(`${environment.api}history/${id}`);
  }
}
