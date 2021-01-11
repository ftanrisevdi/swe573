import { Component, ViewEncapsulation } from '@angular/core';
import { faHandPointLeft } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'frontend';
  faHandPointLeft = faHandPointLeft;
}
