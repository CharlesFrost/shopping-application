import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post(this.url + '/login', credentials, {'responseType': 'text'});
  }

  isAuthenticated(): boolean {
    return (this.token.getToken() !== null && this.token.getToken() !== '');
  }
}
