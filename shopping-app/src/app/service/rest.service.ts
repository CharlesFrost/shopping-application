import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {List} from './list';
import {Observable} from 'rxjs';
import {Archieve} from './archieve';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private GET_ALL_URL = 'http://localhost:8080/api/list';
  private POST_ARCHIEVE = 'http://localhost:8080/api/archives';

  constructor(private http: HttpClient) {}

  getAll(): Observable<List[]> {
    return this.http.get<List[]>(this.GET_ALL_URL);
  }

  save(list: List): Observable<any> {
    return this.http.post(this.GET_ALL_URL, list);
  }

  delete(product: List): Observable<any> {
    return this.http.delete(this.GET_ALL_URL + '/' + product.id );
  }

  saveArchive(price: number): Observable<any> {
    return this.http.post(this.POST_ARCHIEVE, { price: price });
  }

  getAllArchives() {
    return this.http.get<Archieve[]>(this.POST_ARCHIEVE);
  }
}
