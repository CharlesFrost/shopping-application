import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpUserEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import {catchError, tap} from 'rxjs/operators';

const TOKEN_HEADER = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class InceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (req.url === 'http://localhost:8080/login') {
      return next.handle(req);
    }
    if (this.token.getToken() != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err && err.status === 403) {
        this.router.navigate(['']);
        this.token.signOut();
      }
      return Observable.throw(err);
    }));
  }
}

