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

  sector: string;
  ticker: string = 'AAPL';
  name: string;
  cpe: number;
  marketCap: number;
  earnings: number;
  spe: number;

  constructor(private data: DataService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
    this.data.currentName.subscribe(name => this.name = name)
    this.data.currentSector.subscribe(sector => this.sector = sector)
    this.data.currentcpe.subscribe(cpe => this.cpe = cpe)
    this.data.currentMarketCap.subscribe(marketCap => this.marketCap = marketCap)
    this.data.currentEarnings.subscribe(earnings => this.earnings = earnings)
  }

  // tickerHandler(event: any) {
  //   let value = event.target.value;
  //   this.ticker = value;
  //   // this.sendGetRequest()
  // }

  // sectorHandler(event:any) {
  //   let value = event.target.value;
  //   this.sector = value;
  // }


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
    this.data.changeTicker(this.ticker);
  }

  newName() {
    this.data.changeName(this.name);
  }

  newSector() {
    this.data.changeSector(this.sector);
  }

  newCpe() {
    this.data.changeCpe(this.cpe);
  }

  newMarketCap() {
    this.data.changeMarketCap(this.marketCap);
  }

  newEarnings() {
    this.data.changeEarnings(this.earnings);
  }

  newSpe() {
    this.data.changeSpe(this.spe);
  }

  sendGetRequest(){
    this.httpClient.get(this.url).subscribe((res)=>{
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

      setTimeout(() => {
        this.checkFunction()
      }, 3000);
    });
  }

  checkFunction() {
    console.log(this.ticker);
    console.log(this.name);
    console.log(this.sector);
    console.log(this.cpe);
    console.log(this.marketCap);
    console.log(this.earnings);
    // console.log(this.spe);
  }

  postToGoogle() {
    var field1 = $("#sector option:selected").text();
    var field2 = $("#tickerField").val();
    

    if(field1 == ""){
    alert('Please Fill The Ticker');
    document.getElementById("tickerField").focus();
    return false;
    }

    // if(field3 == "" || field3.length > 10 || field3.length < 10){
    // alert('Please Fill Your Mobile Number');
    // document.getElementById("mobField").focus();
    // return false;
    // }

    $.ajax({
      url: "https://docs.google.com/forms/d/e/1FAIpQLSff_pw2D7wYSLTpOsKexdSZVo3GfJvmtU1CbHtXHrCUHkUC2Q/formResponse?",
      data: {"entry.264375094": field1, "entry.895664410": field2},
      type: "POST",
      dataType: "xml",
      success: function(d) { $('#success-msg').show() },
      error: function(x, y, z) { 
        // $('#form').hide();
        console.log('Something went wrong!')
      }
    });
    setTimeout(() => {
      this.sendGetRequest()
    }, 6000);
    return false;
  }

  

}

