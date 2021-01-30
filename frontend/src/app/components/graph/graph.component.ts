import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
declare var sigma;
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input()
  data: any;

  nodes = {};
  g = {
    nodes: [],
    edges: [],
  };
  s;

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.data.length; i++) {
      for (let k = 0; k < this.data[i]['hashtags'].length; k++) {
        if (this.nodes[this.data[i]['hashtags'][k]['text']]) {
          this.nodes[this.data[i]['hashtags'][k]['text']]['count'] =
            this.nodes[this.data[i]['hashtags'][k]['text']]['count'] + 1;
        } else {
          this.nodes[this.data[i]['hashtags'][k]['text']] = {
            count: 1,
            ids: [],
          };
        }
        const key = Object.keys(this.nodes).length || 0;
        this.nodes[this.data[i]['hashtags'][k]['text']]['ids'].push('n' + key);
      }
    }
    let i = 0;
    for (const key in this.nodes) {
      if (Object.prototype.hasOwnProperty.call(this.nodes, key)) {
        this.g.nodes.push({
          id: 'n' + i,
          label: key,
          labelThreshold: 0,
          x: Math.random(),
          y: Math.random(),
          size: this.nodes[key]['count'],
          color:
            '#' +
            (
              Math.floor(Math.random() * 16777215).toString(16) + '000000'
            ).substr(0, 6),
        });
        if (this.nodes[key]['ids'].length > 1) {
          for (let index = 0; index < this.nodes[key]['ids'].length; index++) {
            if (index + 1 != this.nodes[key]['ids'].length) {
              this.g.edges.push({
                id: 'e' + i + index,
                source: this.nodes[key]['ids'][index],
                target: this.nodes[key]['ids'][index + 1],
                color: '#ccc',
              });
            }
          }
        }
      }
      i++;
    }
  }
  ngAfterViewInit(): void {
    this.s = new sigma({
      graph: this.g,
      container: 'graph-container',
    });
  }
}
