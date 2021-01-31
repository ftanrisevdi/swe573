import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { DetailComponent } from './modules/history/detail/detail.component';
import { HistoryComponent } from './modules/history/history/history.component';
import { AuthGuard } from './route-guards/auth.guard';
import { UnauthGuard } from './route-guards/unauth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'history/:itemId',
    component: DetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
