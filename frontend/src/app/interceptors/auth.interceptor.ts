import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    if (this.cookieService.get('UserApiToken')) {
      const authToken = this.cookieService.get('UserApiToken');

      authReq = req.clone({
        headers: req.headers.set('Authorization', authToken),
      });
    }

    return next.handle(authReq);
  }
}
