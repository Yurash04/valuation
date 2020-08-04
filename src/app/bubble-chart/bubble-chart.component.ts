import { Component, OnInit } from '@angular/core';
import { Chart } from  'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {

  url2 = 'https://script.google.com/macros/s/AKfycbysVaQUXohiHfW18V-mZV8AwYMjfI_E1S7HYyculA7m0A-N0BA/exec';

  sector: string;
  data: Array<number> = [];

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
 
  constructor(public httpClient: HttpClient) { }

  sendGetRequest2(){
    let arr: Array<string>;
    this.httpClient.get(this.url2).subscribe((res)=>{
      arr = res['user'];
      for (let i = 0; i < arr.length; i++) {
        this.data.push(parseInt(arr[i]['name']));
      }
    });
  }

  showChart() {
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

  ngOnInit() {
    this.sendGetRequest2()
    console.log(this.data);
    setTimeout(() => {
      this.showChart()
    }, 3000);
  }
   


}
