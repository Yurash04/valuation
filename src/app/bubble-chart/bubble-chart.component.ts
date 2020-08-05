import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from  'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, DoCheck {

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

  constructor(private data: DataService, public httpClient: HttpClient) { }

  url2 = 'https://script.google.com/macros/s/AKfycbysVaQUXohiHfW18V-mZV8AwYMjfI_E1S7HYyculA7m0A-N0BA/exec';


  // sectorData = [
  //   {
  //     financial: 1,
  //     utilities: 1,
  //     communicationServices: 1,
  //     basicMaterials: 1,
  //     energy: 1,
  //     industrials: 1,
  //     consumerDefensive: 1,
  //     healthcare: 1,
  //     realEstate: 1,
  //     technology: 1,
  //     consumerCyclical: 1
  //   }
  // ]

  newSpe() {
    this.data.changeSpe(this.spe);
  }

  sendGetRequest2(){
    this.httpClient.get(this.url2).subscribe((res)=>{
      this.arrObj = res['user'];
      console.log(this.arrObj);
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

  updateChart() {


    // rgb(250, 145, 137, 0.3)
    // rgb(250, 145, 137, 1)

  }

  ngOnInit() {
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
    this.data.currentName.subscribe(name => this.name = name)
    this.data.currentSector.subscribe(sector => this.sector = sector)
    this.data.currentcpe.subscribe(cpe => this.cpe = cpe)
    this.data.currentMarketCap.subscribe(marketCap => this.marketCap = marketCap)
    this.data.currentEarnings.subscribe(earnings => this.earnings = earnings)
    this.data.currentspe.subscribe(spe => this.spe = spe)

    this.sendGetRequest2()
    setTimeout(() => {
      this.showChart()
    }, 4000);
  }

  ngDoCheck() {
    if (this.sector !== 'sector') {
      for (this.chartCounter = 0; this.chartCounter < this.arrObj.length; this.chartCounter++) {
        if (this.arrObj[this.chartCounter]['id'] === this.sector) {
          this.spe = this.arrObj[this.chartCounter]['name']
          this.newSpe();
          this.updateChart();
        }
      }
    }
  }
}
