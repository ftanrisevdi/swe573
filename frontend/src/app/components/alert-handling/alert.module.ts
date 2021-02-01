import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDirective } from './alert.directive';
import { ErrorAlertComponent } from './error/error-alert.component';
import { AlertService } from './alert.service';

@NgModule({
  declarations: [ErrorAlertComponent, AlertDirective],
  imports: [CommonModule],
  exports: [AlertDirective, ErrorAlertComponent],
  providers: [AlertService],
  entryComponents: [ErrorAlertComponent],
})
export class AlertHandlingModule {}
