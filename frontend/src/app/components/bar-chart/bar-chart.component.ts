import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input()
  datasets;
  @Input()
  labels;
  @Input()
  options;
  @Input()
  plugins;
  @Input()
  legend;
  @Input()
  chartType;

  constructor() {}

  ngOnInit(): void {}
}
