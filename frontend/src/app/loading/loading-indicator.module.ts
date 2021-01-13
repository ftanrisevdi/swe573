import { NgModule } from '@angular/core';
import { LoadingIndicatorService } from './loading-indicator.service';
import { LoadingFieldDirective } from './loading.directive';

@NgModule({
  declarations: [LoadingFieldDirective],
  providers: [LoadingIndicatorService],
  exports: [LoadingFieldDirective],
})
export class LoadingIndicatorModule {}
