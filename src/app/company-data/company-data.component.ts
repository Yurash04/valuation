import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { dependenciesFromGlobalMetadata } from '@angular/compiler/src/render3/r3_factory';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css'],
  // providers: [DataService]
})
export class CompanyDataComponent implements OnInit, DoCheck {

  url = 'https://script.google.com/macros/s/AKfycbz9iCIK9oL5DFIeFZlXjthlv_54k3EYLFRfPaRzjhQ7pOZCqt4/exec';
  

  // companyData = {
  //   "tick": "TSLA",
  //   "pe": 764.16,
  //   "marketcap": 276747124500,
  //   "eps": 1.94,
  //   "shares": 186362000,
  //   "earnings": 361542280
  // }

  ticker: string;
  name: string;
  ev: number;
  cevebitda: number;
  ebitda: number;
  sevebitda: number;
  marketCap: number;
  fairValue: number = null;
  fairValueShow: string = '0';
  difference: number = 0;
  differenceShow: string = '0';
  
  constructor(private data: DataService, public httpClient: HttpClient) { }

  ngOnInit()  {
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker);
    this.data.currentName.subscribe(name => this.name = name);
    this.data.currentCEvEbitda.subscribe(cevebitda => this.cevebitda = Math.round(cevebitda));
    this.data.currentEv.subscribe(ev => this.ev = Math.round(ev));
    this.data.currentEbitda.subscribe(ebitda => this.ebitda = ebitda);
    this.data.currentSEvEbitda.subscribe(sevebitda => this.sevebitda = Math.round(sevebitda));

    // this.loadData();
  }

  ngDoCheck() {
    if (this.sevebitda) {
      this.calcFairValue();
    }
  }

  sendGetRequest(){
    let tick: string;
    this.httpClient.get(this.url).subscribe((res)=>{
      tick = res['user'][0].id;
      this.ticker = tick;
      console.log(res['user']);
      // let newTicker: string = res.user;
    });
  }

  calcFairValue() {
    this.fairValue = Math.round(this.ebitda * this.sevebitda / 1000000);
    this.fairValueShow = this.fairValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    this.difference = Math.round((this.ev / 1000000) - this.fairValue);
    this.differenceShow = this.difference.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

}
