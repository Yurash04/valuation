import { Component, OnInit } from '@angular/core';
import { Chart } from  'node_modules/chart.js';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {

  sector: string;

  sectorData = [
    {
        "financial": "0.44",
        "utilities": "21.84",
        "communicationServices": "22.75",
        "basicMaterials": "28.96",
        "energy": "25.95",
        "industrials": "27.20",
        "consumerDefensive": "28.00",
        "healthcare": "29.60",
        "realEstate": "32.68",
        "technology": "36.05",
        "consumerCyclical": "36.35"
    }
  ]

  data = [
    this.sectorData[0]['financial'], 
    this.sectorData[0]['utilities'], 
    this.sectorData[0]['communicationServices'], 
    this.sectorData[0]['basicMaterials'], 
    this.sectorData[0]['energy'], 
    this.sectorData[0]['industrials'], 
    this.sectorData[0]['consumerDefensive'], 
    this.sectorData[0]['healthcare'], 
    this.sectorData[0]['realEstate'], 
    this.sectorData[0]['technology'], 
    this.sectorData[0]['consumerCyclical']
  ];
 
  constructor() { }

  ngOnInit() {
    let myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['Fin.', 'Ut.', 'Serv.', 'Mater.', 'Energy', 'Ind.', 'Defens.', 'Health', 'R. E.', 'Tech.', 'Cycl.', ],
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
