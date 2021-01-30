import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoadingIndicatorInterceptor } from './loading/loading-indicator.interceptor';
import { LoadingIndicatorModule } from './loading/loading-indicator.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { DetailComponent } from './modules/history/detail/detail.component';
import { HistoryComponent } from './modules/history/history/history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './components/result/result.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { GraphComponent } from './components/graph/graph.component';
import { AuthGuard } from './route-guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DetailComponent,
    HistoryComponent,
    ResultComponent,
    BarChartComponent,
    RegisterComponent,
    GraphComponent,
    HeaderComponent,
  ],
  imports: [
    NgxGraphModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingIndicatorModule,
    TagCloudModule,
    ChartsModule,
  ],
  providers: [
    AuthGuard,
    ConnectionService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingIndicatorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
