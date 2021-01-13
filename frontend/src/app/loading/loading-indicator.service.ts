import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingIndicatorService {
  private requestCounter = 0;
  requestCounterBS: BehaviorSubject<number> = new BehaviorSubject<number>(this.requestCounter);

  constructor() {}

  getRequestCounter(): Observable<number> {
    return this.requestCounterBS.asObservable();
  }

  increaseRequestCounter(): void {
    this.requestCounter++;
    this.requestCounterBS.next(this.requestCounter);
  }

  decreaseRequestCounter(): void {
    if (this.requestCounter === 0) {
      return;
    }

    this.requestCounter--;
    this.requestCounterBS.next(this.requestCounter);
  }
  clear(): void {
    this.requestCounter = 0;
    this.requestCounterBS.next(this.requestCounter);
  }
}
