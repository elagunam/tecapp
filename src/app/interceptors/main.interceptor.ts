import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {DashboardService} from '../modules/dashboard/services/dashboard.service';


@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(
    private dashBoardService: DashboardService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.dashBoardService.logOutApp();
        }
        return throwError( () => err );
      })
    );
  }
}
