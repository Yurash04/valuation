import { Component, OnInit } from '@angular/core';
import { Chart } from  'node_modules/chart.js';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {

  data = [31, 34, 31, 51, 12, 18, 32, 24, 28, 31, 21.];
 
  constructor() { }

  ngOnInit() {
    let myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['R. E.', 'Tech.', 'Energy', 'Fin.', 'Ind.', 'Cycl.', 'Serv.', 'Mater.', 'Health', 'Ut.', 'Defens.'],
          datasets: [{
              label: 'Average P/E by industry',
              data: this.data,
              backgroundColor: [
                  'rgb(157, 209, 251, 0.4)',
                  'rgb(133, 197, 250, 0.4)',
                  'rgb(108, 186, 249, 0.4)',
                  'rgb(84, 174, 248, 0.4)',
                  'rgb(59, 162, 247, 0.4)',
                  'rgb(35, 151, 246, 0.4)',
                  'rgb(10, 139, 245, 0.4)',
                  'rgb(9, 125, 220, 0.4)',
                  'rgb(8, 111, 196, 0.4)',
                  'rgb(7, 97, 171, 0.3)',
                  'rgb(6, 84, 147, 0.3)'
                  
                  
                  
              ],
              borderColor: [
                'rgb(157, 209, 251, 1)',
                'rgb(133, 197, 250, 1)',
                'rgb(108, 186, 249, 1)',
                'rgb(84, 174, 248, 1)',
                'rgb(59, 162, 247, 1)',
                'rgb(35, 151, 246, 1)',
                'rgb(10, 139, 245, 1)',
                'rgb(9, 125, 220, 1)',
                'rgb(8, 111, 196, 1)',
                'rgb(7, 97, 171, 1)',
                'rgb(6, 84, 147, 1)'
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }

}
