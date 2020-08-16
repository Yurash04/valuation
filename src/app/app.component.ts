import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {

  ticker: string;
  sector: string;
  companyName: string;
  marketCap: number;
  
  constructor( private data: DataService ) {}

  ngOnInit() {
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
  }
}
