import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private http: HttpClient,
    private dashBoardService: DashboardService
  ) { }

  saveAccount(params:any): Observable<any>{ 
    const token = this.dashBoardService.getToken();
    return this.http.post(environment.operative_api+'cuentaAhorro/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json?auth='+token, params);
  }

  getCustomerAccounts(): Observable<any>{ 
    const token = this.dashBoardService.getToken();
    return this.http.get(environment.operative_api+'cuentaAhorro/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json?auth='+token);
  }

  makeMovement(params: any): Observable<any>{
    const token = this.dashBoardService.getToken();
    return this.http.post(environment.operative_api+'transacciones/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json?auth='+token, params);
  }



  /*searchCustomer(params:any): Observable<any> {
    params.token = this.dashBoardService.getToken();
    return this.http.post(environment.customer_api+'customer/search', params);
  }*/
}
