import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { CoreModule } from 'src/app/core.module';

const routes: Routes = [
  {
    path: ':itemId',
    component: DetailComponent,
  },
  {
    path: '',
    component: HistoryComponent,
  },
];

@NgModule({
  declarations: [HistoryComponent, DetailComponent],
  imports: [CoreModule, CommonModule, RouterModule.forChild(routes)],
})
export class HistoryModule {}
