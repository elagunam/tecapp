import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  loginWhithEmail(params:any): Observable<any> {
    return this.http.post(environment.auth_api, params);
  }
}
