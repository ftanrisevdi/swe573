import {
  ComponentFactoryResolver,
  Directive,
  OnInit,
  ViewContainerRef,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core';
import { ErrorAlertComponent } from './error/error-alert.component';
import { Observable } from 'rxjs';
import { AlertService } from './alert.service';
import { AlertModel } from './alert.model';

@Directive({
  selector: '[alert]',
})
export class AlertDirective implements OnInit {
  message: Observable<AlertModel>;
  component: ComponentRef<any>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private alertService: AlertService
  ) {
    this.message = this.alertService.getMessage();
  }
  ngOnInit() {
    this.message.subscribe((result) => {
      if (this.component) {
        this.component.destroy();
        this.component = undefined;
      }
      if (result && result.message) {
        let component: any = ErrorAlertComponent;

        const factory = this.resolver.resolveComponentFactory(component);
        this.component = this.container.createComponent(factory);
        const domElem = (this.component.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
        document.querySelector('body').appendChild(domElem);

        this.component.instance.message = result.message;
      }
    });
  }
}
