import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';

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
    this.competitors = [];

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

  //IMPORTANT FUNC
  getData() {

    let name: string;
    let evEb: number;

    for (let i = 0; i < this.competitorsTickers.length - 1; i++) {

      this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.competitorsTickers[i]).subscribe((res) => {
        name = (res as any).quoteResponse.result[0].shortName
      })
      console.log(name);

      this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.competitorsTickers[i] + '?modules=defaultKeyStatistics').subscribe((res) => {
        evEb = (res as any).quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt;
        console.log(evEb);
      })
      console.log(evEb);

      this.competitors.push({
        ticker: this.competitorsTickers[i],
        companyName: name,
        evEbitda: evEb
      })
      console.log(this.competitors[i]);
    }
    console.log(this.competitors);
  }

  // 5th request - get competitors financial data
  getCompetitorsFinancialData() {
    let shortName: string;
    let evEbitda: string;
    
    for (let i = 1; i < this.competitors.length; i++) {
      this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.competitors[i]).subscribe((res) => {
        shortName = (res as any).quoteResponse.result[0].shortName;
        console.log(shortName);
      })

      this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.competitors[i] + '?modules=defaultKeyStatistics').subscribe((res) => {
        evEbitda  = (res as any).quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt;
        console.log(evEbitda);
      })
    }  
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
      this.getData();
      console.log('4th Function was executed')
    }, 7000);

    // setTimeout(() => {
    //   this.getCompetitorsFinancialData();
    //   console.log('5th Function was executed')
    // }, 5000);
    
  }

}

