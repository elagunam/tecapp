import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }


  checkSessionStatus(): Observable<boolean>| Promise<boolean>| boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }else{
      return true;
    }
  }
}
