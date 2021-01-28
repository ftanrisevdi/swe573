import { Component, Input, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input()
  result;
  words = [];
  data: CloudData[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels = [];
  barChartType: ChartType = 'bar';
  barChartPlugins = [];
  barChartData = [];
  barChartLegend = true;

  options: CloudOptions = {
    width: window.innerWidth,
    height: 400,
    overflow: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.barChartLabels = [];
    this.words = [];
    this.data = [];
    if (
      this.result?.data?.twits &&
      typeof this.result.data.twits === 'string'
    ) {
      this.result.data.twits = JSON.parse(this.result.data.twits);
    }
    if (
      this.result?.data?.cooked &&
      typeof this.result.data.cooked === 'string'
    ) {
      this.result.data.cooked = JSON.parse(this.result.data.cooked);
    }
    if (
      this.result?.data?.wordCount &&
      typeof this.result.data.wordCount === 'string'
    ) {
      this.result.data.wordCount = JSON.parse(this.result.data.wordCount);
    }
    console.log(this.result.data);
    this.result.data.twits.forEach((element) => {
      console.log(element.entities.hashtags);
    });
    for (let i = 0; i < this.result.data.wordCount.length; i++) {
      this.data.push({
        text: this.result.data.wordCount[i][0],
        weight: this.result.data.wordCount[i][1],
        color: this.getRandomColor(),
      });
      this.barChartLabels.push(this.result.data.wordCount[i][0]);
      this.words.push(this.result.data.wordCount[i][1]);
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
