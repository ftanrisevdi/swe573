import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/services/connection.service';
import { MustMatch } from 'src/app/utils/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  backendErrors: string;
  isSuccess = false;
  constructor(
    private formBuilder: FormBuilder,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  submit() {
    this.submitted = true;
    this.backendErrors = '';
    this.isSuccess = false;
    if (this.registerForm.invalid) {
      return;
    }
    this.connectionService.signup(this.registerForm.value).subscribe(
      (data) => {
        this.isSuccess = true;
      },
      (error) => {
        for (const key in error.error) {
          this.backendErrors = `${this.backendErrors} ${error.error[key]}`;
        }
      }
    );
  }
}
