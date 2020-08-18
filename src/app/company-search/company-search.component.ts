import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { getLocaleDayNames } from '@angular/common';
import { async } from 'rxjs';
import { resolve } from 'path';

// import { CompanyGraphComponent } from '../company-graph/company-graph.component'

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css'],
  // providers: [DataService]
})
export class CompanySearchComponent implements OnInit {

  // Main company's properties
  ticker: string = '';
  name: string;
  sector: string;
  exchange: string;
  ev: number;
  cevebitda: number;
  ebitda: number;
  marketCap: number;

  // Competirors
  competitorsTickers = [];
  competitors: Array<object> = [];
  sevebitda: number;

  yahooProfile = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=assetProfile';
  yahooKeyStatistics = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=defaultKeyStatistics'
  yahooV7 = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.ticker;
  finhubSector = 'https://finnhub.io/api/v1/stock/profile2?symbol=' + this.ticker + '&token=bsn5lqvrh5r9m81doh30';

  constructor(private data: DataService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.receiveNewProperties();
    // this.fn().then();
  }

  // Function that subscribes to the new values
  receiveNewProperties() {
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker);
    this.data.currentName.subscribe(name => this.name = name);
    this.data.currentSector.subscribe(sector => this.sector = sector);
    this.data.currentMarketCap.subscribe(marketCap => this.marketCap = marketCap);
    this.data.currentExchange.subscribe(exchange => this.exchange = exchange);
    this.data.currentEv.subscribe(ev => this.ev = ev);
    this.data.currentCEvEbitda.subscribe(cevebitda => this.cevebitda = cevebitda);
    this.data.currentEbitda.subscribe(ebitda => this.ebitda = ebitda);
  }

  // Function that updates the properties in other components
  newTicker() { this.data.changeTicker(this.ticker) };
  newName() { this.data.changeName(this.name) };
  newSector() { this.data.changeSector(this.sector) };
  newMarketCap() { this.data.changeMarketCap(this.marketCap) };
  newExchange() { this.data.changeExchange(this.exchange) };
  newEv() { this.data.changeEv(this.ev) };
  newEvEbitda() { this.data.changeEvEbitda(this.cevebitda) };
  newEbitda() { this.data.changeEbitda(this.ebitda) };
  newSEvEbitda() { this.data.changeSEvEbitda(this.sevebitda) };

  // // Global update throughout components
  // updateProperties() {
  //   this.newTicker();
  //   this.newName();
  //   this.newSector();
  //   this.newEbitda();
  //   this.newEvEbitda();
  //   this.newExchange();
  //   this.newMarketCap();
  //   this.newSEvEbitda();
  // };

  // Function that receives the new ticker input
  updateTicker(event: any) {
    this.ticker = event.target.value;
    // this.newTicker();
  }

  // Function that updates the API links
  updateLinks() {
    this.yahooProfile = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=assetProfile';
    this.yahooKeyStatistics = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=defaultKeyStatistics';
    this.yahooV7 = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.ticker;  
  }
  
  // 1st request - takes the ticker and gets name and exchange for a given company
  getMainCompanyData() {
    this.updateLinks();
    this.newTicker();

    this.httpClient.get(this.yahooV7).subscribe((res) => {

      this.name = (res as any).quoteResponse.result[0].shortName;
      this.marketCap = (res as any).quoteResponse.result[0].marketCap;
      this.exchange = (res as any).quoteResponse.result[0].fullExchangeName;
      if (this.exchange === 'NasdaqGS') {
        this.exchange = 'NASDAQ';
      } else { this.exchange = 'NYSE' };
      console.log(this.exchange);
      this.newExchange();
      this.newName();
  
    })
  };

  // 2nd request - getes the sector in which company operates
  getCompanySector() {
    this.httpClient.get(this.yahooProfile).subscribe((res) => {

      this.sector = (res as any).quoteSummary.result[0].assetProfile.sector;
      if (this.sector === 'Consumer Cyclical') { this.sector = 'Consumer Discretionary' };
      if (this.sector === 'Technology') { this.sector = 'Information Technology' };
      if (this.sector === 'Healthcare') { this.sector = 'Health Care' };
      if (this.sector === 'Consumer Defensive') { this.sector = 'Consumer Staples' };
      if (this.sector === 'Financial Services') { this.sector = 'Financials' };
      if (this.sector === 'Basic Materials') { this.sector = 'Materials' };
      this.newSector();
    })
  };
  
  // 3rd request - gets EV, EV/EBITDA and EBITDA for a given company
  getCompanyEV() {

    this.httpClient.get(this.yahooKeyStatistics).subscribe((res) => {

      this.cevebitda = (res as any).quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt;
      this.ev = (res as any).quoteSummary.result[0].defaultKeyStatistics.enterpriseValue.raw;
      this.ebitda = this.ev / this.cevebitda;
      this.newEvEbitda();
      this.newEv();
      this.newEbitda();
  
      // console.log(`EV = ${this.ev}`);
      // console.log(`EV/EBITDA = ${this.cevebitda}`);
      // console.log(`EBITDA = ${this.ebitda}`);
      // console.log('=======================')
    })
  };
  

  // 4th request - gets main competitors' tickers
  getCompetitorsTickers() {

    this.competitorsTickers = [];

    const finnhub = require('finnhub');
 
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "bsn5lqvrh5r9m81doh30";
    const finnhubClient = new finnhub.DefaultApi();

      finnhubClient.companyPeers(this.ticker, (error, data, response) => {
      for (let i = 1; i < 15; i++) {
        if (!data[i]) break;

        this.competitorsTickers.push(data[i]);
      }

      console.log('The competitors are: ' + this.competitorsTickers);
      console.log('=======================')
    });
  }

  async getStockName(ticker: string) {
    return await new Promise(resolve => this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + ticker).subscribe((res) => {
      resolve((res as any).quoteResponse.result[0].shortName )}));

  };

  async getStockEvEb(ticker: string) {
    return await new Promise(resolve => this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + ticker + '?modules=defaultKeyStatistics').subscribe((res) => {
      resolve((res as any).quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt)}));
  };

  // async fn() {

  //   console.log('here begins asyc!')
  //   const name = await this.getStockName();
  //   console.log(name);
  //   console.log('did you see me? :)')

  // }

 
  // 5th request - get competitors financial data

  async getCompsFinancialData() {
    console.log('WE ARE IN geTtinG data!')

    this.competitors = [];

    let name: any;
    let evEb: any;

    for (let i = 0; i < this.competitorsTickers.length - 1; i++) {

      name = await this.getStockName(this.competitorsTickers[i]);

      evEb = await this.getStockEvEb(this.competitorsTickers[i]);
      console.log(evEb);
      // if (evEb < 0) continue;

      this.competitors.push({
        ticker: this.competitorsTickers[i],
        companyName: name,
        evEbitda: evEb
      })
      console.log(this.competitors[i]);
    }
    this.calcAverageEvEb();
  }

  // 6th function - calculates average ev/ebitda in sector
  calcAverageEvEb() {
    console.log('BEGAN AVERAGE')

    let sum = 0;
    let iSum = 0;
    for (let i = 0; i < this.competitors.length; i++) {
      if (parseInt(this.competitors[i]['evEbitda']) > 0) {
        sum += parseInt(this.competitors[i]['evEbitda']);
        iSum++;
        console.log(sum);
      };
    }
    this.sevebitda = sum / iSum;

    this.newSEvEbitda();

    console.log('FINISHED AVERAGE')
    console.log(this.competitors);
  }

  // FUNCTION THAT EXECUTES all the 5 requests
  globalUpdate() {

    this.getMainCompanyData();
    this.getCompanySector();
    this.getCompanyEV();
    this.getCompetitorsTickers();
    setTimeout(() => {
      this.getCompsFinancialData();
    }, 700)
    
  }
}

