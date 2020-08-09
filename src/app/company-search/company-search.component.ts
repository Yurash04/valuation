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
  cev: number;
  cevebitda: number;
  cebitda: number = this.cev / this.cevebitda;
  cpe: number;
  cpbv: number;
  lastClose: number;
  marketCap: number;
  earnings: number;
  spe: number;

  yahooProfile = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=assetProfile';
  yahooKeyStatistics = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=defaultKeyStatistics'
  yahooV7 = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.ticker;
  finhubSector = 'https://finnhub.io/api/v1/stock/profile2?symbol=' + this.ticker + '&token=bsn5lqvrh5r9m81doh30';

  // Upadtes Links for the apis
  updateLinks() {
    
  }
  

  // Competirors tickers
  competitors = [];

  constructor(private data: DataService, public httpClient: HttpClient) { }

  ngOnInit() {
    //this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
    this.data.currentName.subscribe(name => this.name = name)
    this.data.currentSector.subscribe(sector => this.sector = sector)
    this.data.currentcpe.subscribe(cpe => this.cpe = cpe)
    this.data.currentMarketCap.subscribe(marketCap => this.marketCap = marketCap)
    this.data.currentEarnings.subscribe(earnings => this.earnings = earnings)
  }

  // update the properties in other components
  newTicker() { this.data.changeTicker(this.ticker); }
  newName() { this.data.changeName(this.name); }
  newSector() { this.data.changeSector(this.sector);}
  newCpe() { this.data.changeCpe(this.cpe);}
  newMarketCap() { this.data.changeMarketCap(this.marketCap); }
  newEarnings() { this.data.changeEarnings(this.earnings); }
  newSpe() { this.data.changeSpe(this.spe); }

  // Global update throughout components
  updateProperties() {
    this.newTicker();
    this.newName();
    this.newSector();
    this.newCpe();
    this.newMarketCap();
    this.newEarnings();
    this.newSpe();
  };

  updateTicker(event: any) {
    this.ticker = event.target.value;
    this.newTicker();
    console.log(this.ticker);
    console.log(typeof(this.ticker));
    this.yahooProfile = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=assetProfile';
    this.yahooKeyStatistics = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.ticker + '?modules=defaultKeyStatistics'
    this.yahooV7 = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.ticker;
    
  }

  checkFunction() {
    console.log(this.ticker);
    console.log(this.sector);
    console.log(this.name);
  }

  // 1st request - takes the ticker and receives the data on a given company
  getMainCompanyData() {
    this.httpClient.get(this.yahooV7).subscribe((res) => {

      this.name = res.quoteResponse.result[0].shortName;
      this.marketCap = res.quoteResponse.result[0].marketCap;
      this.cpe = res.quoteResponse.result[0].trailingPE;
      this.cpbv = res.quoteResponse.result[0].priceToBook;
      this.lastClose = res.quoteResponse.result[0].regularMarketPreviousClose;
      this.exchange = res.quoteResponse.result[0].fullExchangeName;
      this.updateProperties();
  
      console.log('=======================')
      console.log('1st REQUEST BABY')
      console.log(`Name = ${this.name}`);
      console.log(`Company P/E = ${this.cpe}`);
      console.log(`Market cap = ${this.marketCap}`);
      console.log(`Price / Book Value = ${this.cpbv}`);
      console.log(`last close = ${this.lastClose}`);
      console.log(`Exchange = ${this.exchange}`);
      console.log('=======================')
  
    })
  };

  // 2nd request - returns the sector in which operates company
  getCompanySector() {
    this.httpClient.get(this.yahooProfile).subscribe((res) => {

      this.sector = res.quoteSummary.result[0].assetProfile.sector;
  
      console.log(`Sector = ${this.sector}`);
      console.log('2nd REQUEST BABY')
      console.log('===============')
    })
  };
  
  // 3rd request - returns Enterprise Value of a given company
  getCompanyEV() {
    this.httpClient.get(this.yahooKeyStatistics).subscribe((res) => {

      this.cevebitda = res.quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt;
  
      console.log(`EV/EBITDA = ${this.cevebitda}`);
      console.log('3rd REQUEST BABY')
      console.log('================')
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

        this.competitors.push(data[i]);
      }
      console.log('The competitors are: ' + this.competitors);
      console.log('4th REQUEST BABY')
      console.log('================')
    });
  }

  // 5th request - get competitors financial data
  getCompetitorsFinancialData() {
    let shortName: string;
    let evEbitda: string;
    
    for (let i = 1; i < this.competitors.length; i++) {
      this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + this.competitors[i]).subscribe((res) => {
        shortName = res.quoteResponse.result[0].shortName;
        console.log(`===============`);
        console.log(shortName);
      })
      this.httpClient.get('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/' + this.competitors[i] + '?modules=defaultKeyStatistics').subscribe((res) => {
        evEbitda  = res.quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt;
        console.log(`EV/EBITDA = ${evEbitda}`);
        console.log(`===============`);
      })
    }  


    for (let i = 1; i < this.competitors.length; i++) {
        

    }
  }
  // FUNCTION THAT EXECUTES all the 5 requests
  globalUpdate() {

    this.getMainCompanyData();
    setTimeout(() => {
      this.getCompanySector();
    }, 3000);
    setTimeout(() => {
      this.getCompanyEV();
    }, 6000);
    setTimeout(() => {
      this.getCompetitorsTickers();
    }, 8000);
    setTimeout(() => {
      this.getCompetitorsFinancialData();
    }, 10000);
    
  }

}

