import { NgModule } from '@angular/core';
import { ResultComponent } from './components/result/result.component';
import { ChartsModule } from 'ng2-charts';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [ResultComponent, BarChartComponent],
  imports: [TagCloudModule, ChartsModule],
  exports: [ResultComponent, BarChartComponent],
})
export class CoreModule {}
