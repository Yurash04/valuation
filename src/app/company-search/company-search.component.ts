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
  cevebitda: number;
  marketCap: number;

  // Competirors tickers
  competitorsTickers = [];
  competitors: Array<object> = [];

  yahooProfile = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=assetProfile';
  yahooKeyStatistics = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=defaultKeyStatistics'
  yahooV7 = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.ticker;
  finhubSector = 'https://finnhub.io/api/v1/stock/profile2?symbol=' + this.ticker + '&token=bsn5lqvrh5r9m81doh30';

  constructor(private data: DataService, public httpClient: HttpClient) { }

  ngOnInit() {
    //this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
    this.data.currentName.subscribe(name => this.name = name)
    this.data.currentSector.subscribe(sector => this.sector = sector)
    this.data.currentMarketCap.subscribe(marketCap => this.marketCap = marketCap)
    // this.fn().then();
  }

  // update the properties in other components
  newTicker() { this.data.changeTicker(this.ticker) }
  newName() { this.data.changeName(this.name) }
  newSector() { this.data.changeSector(this.sector) }
  newMarketCap() { this.data.changeMarketCap(this.marketCap) }

  // Global update throughout components
  updateProperties() {
    this.newTicker();
    this.newName();
    this.newSector();
    this.newMarketCap();
  };

  updateTicker(event: any) {
    this.ticker = event.target.value;
    this.newTicker();
    this.yahooProfile = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=assetProfile';
    this.yahooKeyStatistics = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=defaultKeyStatistics';
    this.yahooV7 = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.ticker;
    
  }

  // 1st request - takes the ticker and receives the data on a given company
  getMainCompanyData() {
    this.httpClient.get(this.yahooV7).subscribe((res) => {

      this.name = (res as any).quoteResponse.result[0].shortName;
      this.marketCap = (res as any).quoteResponse.result[0].marketCap;
      this.exchange = (res as any).quoteResponse.result[0].fullExchangeName;
      this.updateProperties();
  
      // console.log('=======================')
      // console.log('1st REQUEST BABY')
      // console.log(`Name = ${this.name}`);
      // console.log(`Company P/E = ${this.cpe}`);
      // console.log(`Market cap = ${this.marketCap}`);
      // console.log(`Price / Book Value = ${this.cpbv}`);
      // console.log(`last close = ${this.lastClose}`);
      // console.log(`Exchange = ${this.exchange}`);
      // console.log('=======================')
  
    })
  };

  // 2nd request - returns the sector in which operates company
  getCompanySector() {
    this.httpClient.get(this.yahooProfile).subscribe((res) => {

      this.sector = (res as any).quoteSummary.result[0].assetProfile.sector;
  
      // console.log(`Sector = ${this.sector}`);
    })
  };
  
  // 3rd request - returns Enterprise Value of a given company
  getCompanyEV() {
    this.httpClient.get(this.yahooKeyStatistics).subscribe((res) => {

      this.cevebitda = (res as any).quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt;
  
      // console.log(`EV/EBITDA = ${this.cevebitda}`);
    })
  };
  

  // 4th request - get main competitors' tickers
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

      console.log(this.competitorsTickers);

      // console.log('The competitors are: ' + this.competitors);
    });
  }

  getStockName = (ticker) => {
    return new Promise(resolve => this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + ticker).subscribe((res) => {
      resolve((res as any).quoteResponse.result[0].shortName )}));

  };

  getStockEvEb = (ticker) => {
    return new Promise(resolve => this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + ticker + '?modules=defaultKeyStatistics').subscribe((res) => {
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

    this.competitors = [];

    let name: any;
    let evEb: any;

    console.log('here begins the async func')

    for (let i = 0; i < this.competitorsTickers.length; i++) {

      name = await this.getStockName(this.competitorsTickers[i]);

      evEb = await this.getStockEvEb(this.competitorsTickers[i]);
      if (evEb < 0) continue;

      this.competitors.push({
        ticker: this.competitorsTickers[i],
        companyName: name,
        evEbitda: evEb
      })
      console.log(this.competitors[i]);
    }
    console.log(this.competitors);
  }

  // 6th function - calculates average ev/ebitda in sector
  calcAverageEvEb() {
    
  }

  // FUNCTION THAT EXECUTES all the 5 requests
  globalUpdate() {

    this.getMainCompanyData();
    console.log('1st Function was executed')

    setTimeout(() => {
      this.getCompanySector();
      console.log('2nd Function was executed')
    }, 2000);

    setTimeout(() => {
      this.getCompanyEV();
      console.log('3rd Function was executed')
    }, 3000);

    setTimeout(() => {
      this.getCompetitorsTickers();
      console.log('4th Function was executed')
    }, 4000);

    setTimeout(() => {
      this.getCompsFinancialData();
      console.log('4th Function was executed')
    }, 5000);

    // setTimeout(() => {
    //   this.getCompetitorsFinancialData();
    //   console.log('5th Function was executed')
    // }, 5000);
    
  }

}

