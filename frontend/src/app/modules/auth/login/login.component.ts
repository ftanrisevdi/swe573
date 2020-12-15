import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConnectionService } from 'src/app/services/connection.service';
import { MustMatch } from 'src/app/utils/must-match.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  backendErrors: string;
  isSuccess = false;
  constructor(
    private formBuilder: FormBuilder,
    private connectionService: ConnectionService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    this.backendErrors = '';
    this.isSuccess = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.connectionService.signin(this.loginForm.value).subscribe(
      (data) => {
        this.setCookie(data.token);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        for (const key in error.error) {
          this.backendErrors = `${this.backendErrors} ${error.error[key]}`;
        }
      }
    );
  }
  setCookie(token: string) {
    this.cookieService.set('UserApiToken', `Bearer ${token}`);
  }
}
