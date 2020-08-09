import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from  'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit
 {

  sector: string;
  ticker: string = 'AAPL';
  name: string;
  cpe: number;
  marketCap: number;
  earnings: number;
  spe: number;
  arrObj: Array<object>;
  chartData: Array<number> = [];
  chartCounter: number = 0;
  prevSector: boolean;

  constructor(private data: DataService, public httpClient: HttpClient) { }

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
  ]

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
  ]

  url2 = 'https://script.google.com/macros/s/AKfycbysVaQUXohiHfW18V-mZV8AwYMjfI_E1S7HYyculA7m0A-N0BA/exec';

  newSpe() {
    this.data.changeSpe(this.spe);
  }

  sendGetRequest2(){
    this.httpClient.get(this.url2).subscribe((res)=>{
      this.arrObj = res['user'];
      for (let i = 0; i < this.arrObj.length; i++) {
        this.chartData.push(parseInt(this.arrObj[i]['name']));
      }
      this.newSpe();
    });
  }

  showChart() {
    let myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['Fin.', 'Ut.', 'Serv.', 'Mater.', 'Energy', 'Ind.', 'Defens.', 'Health', 'R. E.', 'Tech.', 'Cycl.', ],
          datasets: [{
              label: 'Average P/E by industry',
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

  updateChart() {
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
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
});

xhr.open("GET", "https://alpha-vantage.p.rapidapi.com/query?function=SECTOR");
xhr.setRequestHeader("x-rapidapi-host", "alpha-vantage.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "72f75c9d27msh668692a47ef8476p1602eejsn860fa5e11005");

xhr.send(data);
  }

  ngOnInit() {
    console.log('ng on init was called')
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
    this.data.currentName.subscribe(name => this.name = name)
    this.data.currentSector.subscribe(sector => this.sector = sector)
    this.data.currentPrevSector.subscribe(prevSector => this.prevSector = prevSector)
    this.data.currentcpe.subscribe(cpe => this.cpe = cpe)
    this.data.currentMarketCap.subscribe(marketCap => this.marketCap = marketCap)
    this.data.currentEarnings.subscribe(earnings => this.earnings = earnings)
    this.data.currentspe.subscribe(spe => this.spe = spe)

    this.sendGetRequest2();
    this.showChart();
    // this.getYields();
  }
}
