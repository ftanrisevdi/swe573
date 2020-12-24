import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ConnectionService } from '../../../services/connection.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('cloud')
  cloud: ElementRef;
  result$: Observable<any>;
  searchForm: FormGroup;
  submitted = false;
  data = [];
  words = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels = [];
  barChartType: ChartType = 'bar';
  barChartPlugins = [];
  barChartData = [];

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
    this.result$ = this.connectionService
      .search(this.searchForm.get('key').value)
      .pipe(share());
    this.result$.subscribe((result) => {
      // this.connectionService.activeResults = {
      //   twits: result.data.twits,
      //   details: JSON.parse(result.data.rawData),
      //   wordCount: result.data.wordCount,
      // };
      this.cloud.nativeElement.innerHTML = '';
      for (let i = 0; i < result.data.wordCount.length; i++) {
        this.wordCloud(result.data.wordCount[i]);
        if (result.data.wordCount[i][1] != 1) {
          this.barChartLabels.push(result.data.wordCount[i][0]);
          this.words.push(result.data.wordCount[i][1]);
        }
      }
      this.barChartData.push({
        data: this.words,
        label: 'Words',
      });
    });
  }
  ngAfterViewInit() {
    this.data.forEach((row) => {
      this.wordCloud(row);
    });
  }

  wordCloud(row) {
    this.cloud.nativeElement.insertAdjacentHTML(
      'beforeend',
      `<span class="cloud__text" style="font-size:${row[1] + 10}px;top:${
        Math.floor(Math.random() * 400) + 1
      }px;left:${
        Math.floor(Math.random() * 1200) + 1
      }px; color:${this.getRandomColor()}; z-index:${row[1]}">${row[0]}</span>`
    );
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
