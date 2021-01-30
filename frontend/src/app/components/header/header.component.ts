import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  showMenu: boolean;
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private cookieServices: CookieService, private router: Router) {}

  ngOnInit(): void {
    const decodedToken = this.jwtHelper.decodeToken(
      this.cookieServices.get('UserApiToken')
    );
    this.showMenu = decodedToken.username;
  }
  logout() {
    this.cookieServices.delete('UserApiToken');
    this.router.navigate(['/']);
  }
}
