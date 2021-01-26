import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';

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
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HistoryModule {}
