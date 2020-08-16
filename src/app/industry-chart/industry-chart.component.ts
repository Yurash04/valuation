import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

declare let TradingView: any;

@Component({
  selector: 'app-industry-chart',
  templateUrl: './industry-chart.component.html',
  styleUrls: ['./industry-chart.component.css'],
  // providers: [DataService]
})
export class IndustryChartComponent implements OnInit {

  ticker: string;

  constructor(private data: DataService) { }

  ngOnInit()  {
    console.log()
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
  }

  ngAfterViewInit() {
    new TradingView.widget(
        {
        "container_id": "sector-chart",
        "autosize": true,
        "symbol": "CURRENCYCOM:US500",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "3",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true,
        "allow_symbol_change": true,
        });
  }

  

}
