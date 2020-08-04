import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CompanySearchComponent } from './company-search/company-search.component';
import { CompanyDataComponent } from './company-data/company-data.component';
import { CompanyGraphComponent } from './company-graph/company-graph.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { IndustryChartComponent } from './industry-chart/industry-chart.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatIconModule } from '@angular/material/icon';



// import { DataService } from './data.service'

@NgModule({
  declarations: [
    AppComponent,
    CompanySearchComponent,
    CompanyDataComponent,
    CompanyGraphComponent,
    BubbleChartComponent,
    IndustryChartComponent,
    HeaderComponent,
    // MatIconModule
    // DataService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
