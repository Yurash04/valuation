import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css'],
  // providers: [DataService]
})
export class CompanyDataComponent implements OnInit {

  url = 'https://script.google.com/macros/s/AKfycbz9iCIK9oL5DFIeFZlXjthlv_54k3EYLFRfPaRzjhQ7pOZCqt4/exec';
  

  companyData = {
    "tick": "TSLA",
    "pe": 764.16,
    "marketcap": 276747124500,
    "eps": 1.94,
    "shares": 186362000,
    "earnings": 361542280
  }

  companyPE: number;
  marketCap: number;
  earnings: number = Math.round(this.companyData['earnings'] / 1000000);
  industryPE: number;
  fairValue: number = null;

  ticker: string;
  
  constructor(private data: DataService, public httpClient: HttpClient) { }

  ngOnInit()  {
    this.data.currentTicker.subscribe(ticker => this.ticker = ticker)
    // this.loadData();
  }

  // sendGetRequest2(){
  //   // let tick: string;
  //   this.httpClient.get(this.url2).subscribe((res)=>{
  //       // tick = res.user[0].id;
  //       console.log(res);
  //       // let newTicker: string = res.user;
  //   });
  // }

  sendGetRequest(){
    let tick: string;
    this.httpClient.get(this.url).subscribe((res)=>{
      tick = res['user'][0].id;
      this.ticker = tick;
      console.log(res['user']);
      // let newTicker: string = res.user;
    });
  }

  updateSectors() {

  }

  // loadData() {
  //   let url="https://docs.google.com/spreadsheet/pub?key=p_2PACX-1vSO_IxePVb-ju0vWGjeaYlMKY7EfpOo2eFvZ1zlp-aHr_7EV68BzbeswQzT6P5c2ukEz2LHXoWoc7XR&single=true&gid=0&range=A1&output=csv";
  //   xmlhttp = new XMLHttpRequest();
  //   xmlhttp.onreadystatechange = function() {
  //     if(xmlhttp.readyState == 4 && xmlhttp.status==200){
  //       document.getElementById("display").innerHTML = xmlhttp.responseText;
  //     }
  //   };
  //   xmlhttp.open("GET",url,true);
  //   xmlhttp.send(null);
  // }

  // calcFairValue() {
  //   // this.getGoogleSheet();
  //   this.fairValue = Math.round(this.earnings * this.industryPE);
  //   return this.fairValue;
  // }

  // simpleFunc() {
  //   let result = $.getJSON(this.url,{}, function (d) { console.log(d); });
  //   console.log(result);
  // }

  // myCallback(url) {
  //   let result = $.getJSON(url, (d) => console.log(d) );
  //   console.log(result.responseText);
  // }


  // getGoogleSheet() {
  //   $.ajax("https://docs.google.com/spreadsheets/d/e/2PACX-1vSO_IxePVb-ju0vWGjeaYlMKY7EfpOo2eFvZ1zlp-aHr_7EV68BzbeswQzT6P5c2ukEz2LHXoWoc7XR/pubhtml?gid=0&single=true").done(function(result) {
  //     console.log(JSON.parse(result));
  //   })
  // }

}
