import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css'],
  // providers: [DataService]
})
export class CompanyDataComponent implements OnInit {

  marketCap: number = 277000;
  earnings: number = 368;
  companyPE: number = 736;
  industryPE: number = 34.93;
  fairValue: number = null;

  ticker: string;
  
  constructor(private data: DataService) { }

  ngOnInit()  {
    console.log('company data oninit was called!')
    this.data.currentMessage.subscribe(ticker => this.ticker = ticker)
  }

  calcFairValue() {
    this.fairValue = (this.earnings * this.industryPE);
    return this.fairValue;
  }

}
