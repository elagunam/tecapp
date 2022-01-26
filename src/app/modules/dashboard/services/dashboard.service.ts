import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private router: Router
  ) { }

  logOutApp(){
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this.router.navigate(['/login']);
  }

  getUserName(): string{
    const identityString = localStorage.getItem('identity');
    return identityString+'';
  }

  getToken(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null){
      return '';
    }
    return token;
  }


}
