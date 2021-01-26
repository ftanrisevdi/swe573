import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ConnectionService } from '../../../services/connection.service';

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
