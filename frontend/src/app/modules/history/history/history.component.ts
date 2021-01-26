import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HistoryComponent implements OnInit {
  list$: Observable<any>;
  constructor(private connectionService: ConnectionService) {}
  ngOnInit(): void {
    this.list$ = this.connectionService.history();
  }
}
