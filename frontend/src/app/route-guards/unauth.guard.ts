import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UnauthGuard implements CanActivate {
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private cookieServices: CookieService, private router: Router) {}

  canActivate(): boolean {
    const userToken = this.cookieServices.get('UserApiToken');
    if (userToken) {
      const decodedToken = this.jwtHelper.decodeToken(userToken);
      if (decodedToken.username) {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
    return true;
  }
}
