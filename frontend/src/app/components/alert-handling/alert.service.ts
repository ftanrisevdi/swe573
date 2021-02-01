import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { AlertModel } from './alert.model';

@Injectable()
export class AlertService {
  message: BehaviorSubject<AlertModel>;

  constructor() {
    this.message = new BehaviorSubject<AlertModel>(null);
  }

  getMessage() {
    return this.message.asObservable().pipe(share());
  }
  setMessage(message) {
    this.message.next(message);
  }
}
