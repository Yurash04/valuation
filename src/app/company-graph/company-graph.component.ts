import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { ThrowStmt } from '@angular/compiler';

declare let TradingView: any;

@Component({
  selector: 'app-company-graph',
  templateUrl: './company-graph.component.html',
  styleUrls: ['./company-graph.component.css'],
  // providers: [DataService]
})


export class CompanyGraphComponent implements OnInit, DoCheck, AfterViewInit {

  changeDetected: boolean = false;
  changeCounter: number = 0;
  tickerPrev: string = '';
  ticker: string = '';

  // ticker: string = 'TSLA';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(ticker => this.ticker = ticker)
  }

  ngAfterViewInit() {
    new TradingView.widget({
      "width": 580,
      "height": 190,
      "symbol": "NASDAQ:AAPL",
      "interval": "D",
      "timezone": "America/Los_Angeles",
      "theme": "light",
      "style": "3",
      "locale": "uk",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": true,
      "allow_symbol_change": true,
      "container_id": "chart"
      });
  }

  ngDoCheck() {
    if (this.ticker === 'default ticker' || this.ticker === this.tickerPrev) {
      // console.log('NGDOCHECK = FALSE')
    } else {
      // console.log('NGDOCHECK = TRUE')
      new TradingView.widget({
        "width": 580,
        "height": 190,
        "symbol": "NASDAQ:" + this.ticker,
        "interval": "D",
        "timezone": "America/Los_Angeles",
        "theme": "light",
        "style": "3",
        "locale": "uk",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true,
        "allow_symbol_change": true,
        "container_id": "chart"
        }); 
        this.tickerPrev = this.ticker;
    }
  }

  // ngAfterViewInit() {

  //   new TradingView.widget({
  //   "width": 580,
  //   "height": 190,
  //   "symbol": "NASDAQ:AAPL",
  //   "interval": "D",
  //   "timezone": "America/Los_Angeles",
  //   "theme": "light",
  //   "style": "3",
  //   "locale": "uk",
  //   "toolbar_bg": "#f1f3f6",
  //   "enable_publishing": false,
  //   "hide_top_toolbar": true,
  //   "hide_legend": true,
  //   "allow_symbol_change": true,
  //   "container_id": "chart"
  //   });    
  // }

  //   @Output() displayChart() {
  //     new TradingView.widget({
  //     "width": 580,
  //     "height": 190,
  //     "symbol": "NASDAQ:" + this.ticker,
  //     "interval": "D",
  //     "timezone": "America/Los_Angeles",
  //     "theme": "light",
  //     "style": "3",
  //     "locale": "uk",
  //     "toolbar_bg": "#f1f3f6",
  //     "enable_publishing": false,
  //     "hide_top_toolbar": true,
  //     "hide_legend": true,
  //     "allow_symbol_change": true,
  //     "container_id": "chart"
  //     }); 
  // }
}



// <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
// <script type="text/javascript"></script>