import { Injectable }                           from '@angular/core';
import { Http, Headers, RequestOptions}          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RentInfo} from '../model/rentInfo';

@Injectable()
export class RentedMoviesService {

  constructor(private http: Http) {
  }

  getRentedMovies(): Observable<Array<RentInfo>> {
    return this.http.get('http://localhost:8080/getRented')
      .map(response => response.json());
  }

  returnVhs(rental: RentInfo): Observable<Array<RentInfo>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(rental);
    return this.http.post('http://localhost:8080/returnVhs', body, options)
      .map(response => response.json());
  }
}
