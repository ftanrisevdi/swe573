import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from '../../../services/connection.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  twits$: Observable<any>;

  constructor(private connectionService: ConnectionService) {}

  ngOnInit(): void {}
  search() {
    this.twits$ = this.connectionService.search();
  }
}
