import { Injectable }                           from '@angular/core';
import { Http, Headers, RequestOptions}          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Vhs} from '../model/vhs';
import {Genre} from '../model/genre';
import {Rent} from '../model/rent';

@Injectable()
export class AvailableMoviesService {

  constructor(private http: Http) {
  }

  getAllGenres(): Observable<Array<Genre>> {
    return this.http.get('http://localhost:8080/getAllGenres')
      .map(response => response.json());
  }

  getAvailableMovies(): Observable<Array<Vhs>> {
    return this.http.get('http://localhost:8080/getAvailableMovies')
      .map(response => response.json());
  }

  createMovie(movie: Vhs): Observable<Array<Vhs>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(movie);
    return this.http.post('http://localhost:8080/createMovie', body, options)
      .map(response => response.json());
  }

  editMovie(movie: Vhs): Observable<Vhs> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(movie);
    return this.http.post('http://localhost:8080/editMovie', body, options)
      .map(response => response.json());
  }

  deleteMovie(movie: Vhs): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(movie);
    return this.http.post('http://localhost:8080/deleteMovie', body, options)
      .map(response => response.json());
  }

  rentVhs(rental: Rent): Observable<Rent> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  let body = JSON.stringify(rental);
  return this.http.post('http://localhost:8080/rentVhs', body, options)
    .map(response => response.json());
  }
}
