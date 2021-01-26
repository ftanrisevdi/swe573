import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { ConnectionService } from '../../../services/connection.service';
import { ChartOptions, ChartType } from 'chart.js';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

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
  words = [];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels = [];
  barChartType: ChartType = 'bar';
  barChartPlugins = [];
  barChartData = [];
  barChartLegend = true;

  sub: Subscription;

  options: CloudOptions = {
    width: window.innerWidth,
    height: 400,
    overflow: false,
  };
  data: CloudData[] = [];

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
    if (this.result$) {
      this.sub.unsubscribe();
    }
    this.result$ = this.connectionService
      .search({
        key: this.searchForm.get('key').value,
        tweetCount: this.searchForm.get('tweetCount').value,
      })
      .pipe(share());
    this.sub = this.result$.subscribe((result) => {
      this.barChartLabels = [];
      this.words = [];
      this.data = [];
      result.data.twits.forEach((element) => this.makeLinkTree(element));

      for (let i = 0; i < result.data.wordCount.length; i++) {
        this.data.push({
          text: result.data.wordCount[i][0],
          weight: result.data.wordCount[i][1],
          color: this.getRandomColor(),
        });
        this.barChartLabels.push(result.data.wordCount[i][0]);
        this.words.push(result.data.wordCount[i][1]);
      }

      this.barChartData.push({
        data: this.words,
        label: 'Words',
      });
    });
  }
  makeLinkTree(twit) {
    for (let key in twit.annotations) {
      twit.text = twit.text.replace(
        key,
        `<a href="https://en.wikipedia.org/wiki/${twit.annotations[key][
          'link'
        ].replace(' ', '_')}" target="_blank">${key}</a>`
      );
    }
    return twit;
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
