import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from  'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, DoCheck
 {

  sector: string;
  ticker: string = 'AAPL';
  obj: object;
  hasChanged: boolean;
  sectorsList = [
    "Financials",
    "Information Technology", 
    "Communication Services", 
    "Consumer Discretionary", 
    "Consumer Staples",
    "Energy",
    "Health Care",
    "Materials",
    "Industrials",
    "Utilities",
    "Real Estate"
  ];
  chartData: Array<number> = [];
  chartCounter: number = 0;
  prevSector: string;

  bodyColors: Array<string> = [
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
  ];

  borderColors: Array<string> = [
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
  ];

  constructor(private data: DataService, public httpClient: HttpClient) { }

  showChart() {
    let myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['Fin.', 'Tech.', 'Commun.', 'Discr', 'Staples', 'Energy', 'Health', 'Mater.', 'Ind.', 'Ut.', 'R. E.',],
          datasets: [{
              label: 'Average yield YTD by sector',
              data: this.chartData,
              backgroundColor: this.bodyColors,
              borderColor: this.borderColors,
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

  determineSector() {
    if (this.prevSector !== this.sector) {
      for (let i = 0; i < this.sectorsList.length; i++) {
        if (this.sectorsList[i] === this.sector) {
          this.chartCounter = i;
        }
      } 
      this.prevSector = this.sector;
    }
  }

  updateChart() {

    this.determineSector();

    this.bodyColors = [
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
    ];

    this.borderColors = [
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
    ]

    this.bodyColors[this.chartCounter] = 'rgb(250, 145, 137, 0.3)';
    this.borderColors[this.chartCounter] = 'rgb(250, 145, 137, 1)';

    this.showChart();

  }

  getYields() {
    var obj = obj;
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        obj = JSON.parse(this.responseText)
      }
    });

    xhr.open("GET", "https://alpha-vantage.p.rapidapi.com/query?function=SECTOR");
    xhr.setRequestHeader("x-rapidapi-host", "alpha-vantage.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "72f75c9d27msh668692a47ef8476p1602eejsn860fa5e11005");

    xhr.send(data);

    setTimeout(() => {
      for (let i = 0; i < 11; i++) {
        let str;
        str = obj["Rank F: Year-to-Date (YTD) Performance"][this.sectorsList[i]];
        this.chartData[i] = parseFloat(str);
      }
    }, 2000);

    
  }

  ngOnInit() {
    this.data.currentSector.subscribe(sector => this.sector = sector)
    this.getYields();
    setTimeout(() => {
      this.showChart();
    }, 4000);
  }

  ngDoCheck() {
    if (this.sector && this.sector !== this.prevSector) {
      this.updateChart();
    }
  }
}
