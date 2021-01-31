import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultComponent implements OnInit {
  @Input()
  result;
  words = [];
  data: CloudData[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  barChartLabels = [];
  barChartType: ChartType = 'bar';
  barChartPlugins = [];
  barChartData = [];
  barChartLegend = true;

  options: CloudOptions = {
    width: window.innerWidth / 2 - 100,
    overflow: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.barChartLabels = [];
    this.words = [];
    this.data = [];
    for (let i = 0; i < this.result.data.word_count.length; i++) {
      this.data.push({
        text: this.result.data.word_count[i][0],
        weight: this.result.data.word_count[i][1],
        color: this.getRandomColor(),
      });
      this.barChartLabels.push(this.result.data.word_count[i][0]);
      this.words.push(this.result.data.word_count[i][1]);
    }
    this.result.data.cooked.forEach((element) => this.makeLinkTree(element));
    this.barChartData.push({
      data: this.words,
      label: 'Words',
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
