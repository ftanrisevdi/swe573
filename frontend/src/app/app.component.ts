import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showMenu: boolean;
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private router: Router, private cookieServices: CookieService) {}

  ngOnInit() {
    this.checkUser();
    this.router.events.subscribe({
      next: (e) => {
        if (e instanceof NavigationEnd) {
          this.checkUser();
        }
      },
    });
  }
  checkUser() {
    const decodedToken = this.jwtHelper.decodeToken(
      this.cookieServices.get('UserApiToken')
    );
    this.showMenu = decodedToken && decodedToken.username ? true : false;
    this.showMenu;
  }
}
