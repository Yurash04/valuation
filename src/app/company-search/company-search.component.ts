import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { compilePipeFromRender2 } from '@angular/compiler/src/render3/r3_pipe_compiler';
// import { CompanyGraphComponent } from '../company-graph/company-graph.component'

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css'],
  // providers: [DataService]
})
export class CompanySearchComponent implements OnInit {

  url = 'https://script.googleusercontent.com/macros/echo?user_content_key=MNPlUb79VZbcCW_Kb3SxAQOnMzAY6H9c3R_CPxur-wKW7IGdPDPKxcm8BQ36OIu0SWtyp9badeUr8YY2pwxi8OYCBV_KcwL3m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPYIPrBKywBVDnxCDjPONW7doHU0md5BvZo1kHaKACPfP6g9GpfTquYNqAFn0clxmzOmbnRGq-tk&lib=MKW69gY4kOtdNR0B8SCVgJvb40_iwiMa0';
  goog = 'https://docs.google.com/spreadsheets/d/1YhBGmsGfShb_fjChlhBJEa-h05-5qMJ53MACspqhfRM/edit#gid=265852777&range=A1'
  yahooProfile = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/TSLA?modules=assetProfile';
  yahooKeyStatistics = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v10/finance/quoteSummary/TSLA?modules=defaultKeyStatistics'
  yahooV7 = 'https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=TSLA';


  ticker: string;
  name: string;
  sector: string;
  cev: number;
  cevebitda: number;
  cebitda: number = this.cev / this.cevebitda;
  cpe: number;
  cpbv: number;
  lastClose: number;
  marketCap: number;
  earnings: number;
  spe: number;

  competitors = [];

  constructor(private data: DataService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
    this.data.currentName.subscribe(name => this.name = name)
    this.data.currentSector.subscribe(sector => this.sector = sector)
    this.data.currentcpe.subscribe(cpe => this.cpe = cpe)
    this.data.currentMarketCap.subscribe(marketCap => this.marketCap = marketCap)
    this.data.currentEarnings.subscribe(earnings => this.earnings = earnings)
    this.sendGetRequest();
    this.getYahooPrice();
    this.testRequest();
  }

  newTicker() { this.data.changeTicker(this.ticker); }
  newName() { this.data.changeName(this.name); }
  newSector() { this.data.changeSector(this.sector);}
  newCpe() { this.data.changeCpe(this.cpe);}
  newMarketCap() { this.data.changeMarketCap(this.marketCap); }
  newEarnings() { this.data.changeEarnings(this.earnings); }
  newSpe() { this.data.changeSpe(this.spe); }

  newData() {
    this.newTicker()
    this.newName()
    this.newSector()
    this.newCpe()
    this.newMarketCap()
    this.newEarnings()
    this.newSpe()
  }

  getYahooPrice() {
    this.httpClient.get(this.yahooV7).subscribe((res)=>{

      this.name = res.quoteResponse.result[0].shortName;
      this.marketCap = res.quoteResponse.result[0].marketCap;
      this.cpe = res.quoteResponse.result[0].trailingPE;
      this.cpbv = res.quoteResponse.result[0].priceToBook;
      this.lastClose = res.quoteResponse.result[0].regularMarketPreviousClose;


      console.log(`Name = ${this.name}`);
      console.log(`Company P/E = ${this.cpe}`);
      console.log(`Market cap = ${this.marketCap}`);
      console.log(`Price / Book Value = ${this.cpbv}`);
      console.log(`last close = ${this.lastClose}`);

    })

    this.httpClient.get(this.yahooProfile).subscribe((res) => {

      this.sector = res.quoteSummary.result[0].assetProfile.industry;

      console.log(`Sector = ${this.sector}`);
    })

    this.httpClient.get(this.yahooKeyStatistics).subscribe((res) => {

      this.cev = res.quoteSummary.result[0].defaultKeyStatistics.enterpriseValue.raw;

      console.log(`Enterprise Value = ${this.cev}`);
    })
  }

  sendGetRequest(){
    this.httpClient.get(this.url).subscribe((res)=>{
      console.log(res)
      this.ticker = res['user'][1].name;
      this.name = res['user'][2].name;
      this.sector = res['user'][0].name;
      this.cpe = res['user'][3].name;
      this.marketCap = res['user'][4].name;
      this.earnings = res['user'][5].name;
      this.newTicker();
      this.newName();
      this.newSector();
      this.newCpe();
      this.newMarketCap();
      this.newEarnings();
      this.CompsRequest();
      
    });
  }; 

  CompsRequest() {
    this.competitors = [];

    const finnhub = require('finnhub');
 
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "bsn5lqvrh5r9m81doh30" // Replace this
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.companyPeers(this.ticker, (error, data, response) => {
      for (let i = 1; i < 7; i++) {
        this.competitors.push(data[i]);
      }
      console.log(this.competitors);
    });
  }

}

