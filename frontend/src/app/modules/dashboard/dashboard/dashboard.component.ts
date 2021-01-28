import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DagreNodesOnlyLayout, Edge, Layout, Node } from '@swimlane/ngx-graph';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ConnectionService } from '../../../services/connection.service';
import { stepRound } from './customStepCurved';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  result$: Observable<any>;
  searchForm: FormGroup;
  submitted = false;

  public curve: any = stepRound;
  public layout: Layout = new DagreNodesOnlyLayout();
  public links: Edge[] = [
    {
      id: 'a',
      source: 'first',
      target: 'second',
      label: 'is parent of',
    },
    {
      id: 'b',
      source: 'first',
      target: 'third',
      label: 'custom label',
    },
    {
      id: 'c',
      source: 'first',
      target: 'fourth',
      label: 'custom label',
    },
  ];
  public nodes: Node[] = [
    {
      id: 'first',
      label: 'A',
    },
    {
      id: 'second',
      label: 'B',
    },
    {
      id: 'third',
      label: 'C',
    },
    {
      id: 'fourth',
      label: 'D',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private connectionService: ConnectionService
  ) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      tweetCount: [100, [Validators.required]],
    });
  }
  get f() {
    return this.searchForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    this.result$ = this.connectionService
      .search({
        key: this.searchForm.get('key').value,
        tweetCount: this.searchForm.get('tweetCount').value,
      })
      .pipe(share());
  }
}
