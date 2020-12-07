import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConnectionService } from '../../../services/connection.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  twits$: Observable<any>;
  searchForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
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
    this.twits$ = this.connectionService.search(
      this.searchForm.get('key').value
    );
  }
}
