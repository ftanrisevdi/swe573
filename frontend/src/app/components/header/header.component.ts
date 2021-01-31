import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input()
  showMenu: boolean;

  constructor(private cookieServices: CookieService, private router: Router) {}

  logout() {
    this.cookieServices.delete('UserApiToken');
    this.router.navigate(['/']);
  }
}
