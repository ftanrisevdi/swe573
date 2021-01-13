import { Directive, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoadingIndicatorService } from './loading-indicator.service';

@Directive({
  selector: '[loadingField]',
})
export class LoadingFieldDirective implements OnInit {
  busy: Observable<number>;
  constructor(
    private loadingIndicatorService: LoadingIndicatorService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.busy = this.loadingIndicatorService.getRequestCounter();
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    let opened = false;
    this.busy.subscribe((result) => {
      setTimeout(() => {
        const isLoadingExist: boolean = !!window.document.getElementById(
          'loading'
        );
        if (result === 1 && !opened && !isLoadingExist) {
          opened = true;
          const elem = `<loading id="loading"><i class="icon-spinner icon-spin icon-large"></i></loading>`;
          const body = window.document.querySelector('body');
          body.insertAdjacentHTML('beforeend', elem);
        } else if (result === 0 && opened && isLoadingExist) {
          window.document
            .querySelector('body')
            .removeChild(window.document.getElementById('loading'));
          opened = false;
        }
      }, 10);
    });
  }
}
