import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
// import { CompanyGraphComponent } from '../company-graph/company-graph.component'

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css'],
  // providers: [DataService]
})
export class CompanySearchComponent implements OnInit {

  url = 'https://script.googleusercontent.com/macros/echo?user_content_key=MNPlUb79VZbcCW_Kb3SxAQOnMzAY6H9c3R_CPxur-wKW7IGdPDPKxcm8BQ36OIu0SWtyp9badeUr8YY2pwxi8OYCBV_KcwL3m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPYIPrBKywBVDnxCDjPONW7doHU0md5BvZo1kHaKACPfP6g9GpfTquYNqAFn0clxmzOmbnRGq-tk&lib=MKW69gY4kOtdNR0B8SCVgJvb40_iwiMa0';

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
    // this.sendGetRequest()
  }

  // sendGetRequest(){
  //   let tick: string;
  //   this.httpClient.get(this.url).subscribe((res)=>{
  //       tick = res.user[0].id;
  //       this.ticker = tick;
  //       console.log(this.ticker);
  //       // let newTicker: string = res.user;
  //   });
  // }

  newTicker() {
    this.data.changeMessage(this.ticker);
  }

  newSector() {
    this.data.changeSector(this.sector);
  }

}
