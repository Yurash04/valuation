import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import { CompanyGraphComponent } from '../company-graph/company-graph.component'

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css'],
  // providers: [DataService]
})
export class CompanySearchComponent implements OnInit {

  sector: string = 'Technology';
  ticker: string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(ticker => this.ticker = ticker)
    this.data.currentMessage.subscribe(sector => this.sector = sector)
  }

  sectorHandler(event:any) {
    let value = event.target.value;
    this.sector = value;
  }

  tickerHandler(event: any) {
    let value = event.target.value;
    this.ticker = value;
  }

  newTicker() {
    this.data.changeMessage(this.ticker);
  }

  newSector() {
    this.data.changeSector(this.sector);
  }

}
