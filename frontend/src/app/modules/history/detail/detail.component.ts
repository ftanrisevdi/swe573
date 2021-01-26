import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ChartOptions, ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailComponent implements OnInit {
  log$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService
  ) {}
  ngOnInit(): void {
    const id: number = parseInt(this.route.snapshot.params.itemId, 10);
    this.log$ = this.connectionService.logById(id);
  }
}
