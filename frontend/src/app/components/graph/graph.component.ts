import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input()
  data: any;

  nodes = {};

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
    this.data.entities.hashtags.forEach((element) => {
      this.nodes[element] = this.nodes[element] ? this.nodes[element]++ : 1;
    });
    var i,
      s,
      N = 10,
      E = 50,
      g = {
        nodes: [],
        edges: [],
      };

    // Generate a random graph:
    for (i = 0; i < N; i++)
      g.nodes.push({
        id: 'n' + i,
        label: 'Node ' + i,
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        color: '#666',
      });

    for (i = 0; i < E; i++)
      g.edges.push({
        id: 'e' + i,
        source: 'n' + ((Math.random() * N) | 0),
        target: 'n' + ((Math.random() * N) | 0),
        size: Math.random(),
        color: '#ccc',
      });
  }
}
