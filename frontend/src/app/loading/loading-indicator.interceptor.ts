import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingIndicatorService } from './loading-indicator.service';

@Injectable()
export class LoadingIndicatorInterceptor implements HttpInterceptor {
  constructor(private loadingIndicatorService: LoadingIndicatorService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const hideLoadingKey = 'x-dont-show-loading';
    let headers: HttpHeaders;

    if (req.headers.get(hideLoadingKey)) {
      headers = req.headers.delete(hideLoadingKey);
    } else {
      headers = req.headers;
      this.loadingIndicatorService.increaseRequestCounter();
    }

    const request: HttpRequest<any> = req.clone({
      headers,
    });

    return next.handle(request).pipe(
      catchError((error: any, caught: any) => {
        throw error;
      }),
      finalize(() => {
        this.loadingIndicatorService.decreaseRequestCounter();
      })
    );
  }
}
