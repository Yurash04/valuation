import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css'],
  // providers: [DataService]
})
export class CompanyDataComponent implements OnInit {

  companyData = [
    {
        "tick": "TSLA",
        "pe": 764.16,
        "marketcap": 276747124500,
        "eps": 1.94,
        "shares": 186362000,
        "earnings": 361542280
    }
  ]

  marketCap: number = Math.round(this.companyData[0]['marketcap'] / 1000000);
  earnings: number = Math.round(this.companyData[0]['earnings'] / 1000000);
  companyPE: number = this.companyData[0]['pe'];
  industryPE: number = 34.93;
  fairValue: number = null;

  ticker: string = this.companyData[0]['tick'];
  
  constructor(private data: DataService) { }

  ngOnInit()  {
    console.log('company data oninit was called!')
    this.data.currentMessage.subscribe(ticker => this.ticker = ticker)
  }

  calcFairValue() {
    this.fairValue = Math.round(this.earnings * this.industryPE);
    return this.fairValue;
  }

}
