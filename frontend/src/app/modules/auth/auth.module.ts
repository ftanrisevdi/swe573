import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionService } from 'src/app/services/connection.service';
import { RegisterComponent } from './register/register.component';
import { CookieService } from 'ngx-cookie-service';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  providers: [CookieService],
  imports: [ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
