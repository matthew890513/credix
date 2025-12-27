import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const AUTH_API = environment.API_ENDPOINT_HTTPS + '/credits';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CreditsService {
  constructor(private http: HttpClient) {}

  getCredits(): Observable<any> {
      return this.http.get(
        AUTH_API,
        httpOptions
      );
    }

}
