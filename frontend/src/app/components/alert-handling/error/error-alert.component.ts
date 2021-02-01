import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
@Component({
  selector: 'error-alert',
  templateUrl: './error-alert.component.html',
})
export class ErrorAlertComponent implements OnInit {
  @Input()
  message: string;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    this.alertService.message.next(null);
  }
}
