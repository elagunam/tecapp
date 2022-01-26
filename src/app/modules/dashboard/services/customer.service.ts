import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  

  constructor(
    private http: HttpClient,
    private dashBoardService: DashboardService
  ) { }

  searchCustomer(params:any): Observable<any> {
    params.token = this.dashBoardService.getToken();
    return this.http.post(environment.customer_api+'customer/search', params);
  }

  saveCustomer(params:any): Observable<any> {
    params.token = this.dashBoardService.getToken();
    return this.http.post(environment.customer_api+'customer/save', params);
  }

  getCustomerById(id: number): Observable<any> {
    let params = {token: this.dashBoardService.getToken()};
    return this.http.post(environment.customer_api+'customer/'+id, params);
  }

}
