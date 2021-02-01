import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers: HttpHeaders;
    let cloneRequest: HttpRequest<any>;

    headers = req.headers;
    cloneRequest = req.clone({
      headers,
    });

    return next.handle(cloneRequest).pipe(
      catchError((response) => {
        let message = '';
        Object.keys(response.error).forEach((item) => {
          message = message + response.error[item] + ' ';
        });
        this.alertService.message.next({ message });

        return throwError(response);
      })
    );
  }
}
