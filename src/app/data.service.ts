import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class DataService {

  private tickerSource = new BehaviorSubject<string>('ticker');
  currentTicker = this.tickerSource.asObservable();

  private nameSource = new BehaviorSubject<string>('stock');
  currentName = this.nameSource.asObservable();

  private sectorSource = new BehaviorSubject<string>('');
  currentSector = this.sectorSource.asObservable();

  private prevSectorSource = new BehaviorSubject<boolean>(false);
  currentPrevSector = this.prevSectorSource.asObservable();

  private marketCapSource = new BehaviorSubject<number>(1);
  currentMarketCap = this.marketCapSource.asObservable();

  private exchangeSource = new BehaviorSubject<string>('exchange');
  currentExchange = this.exchangeSource.asObservable();

  private evSource = new BehaviorSubject<number>(1);
  currentEv = this.evSource.asObservable();

  private cEvEbitdaSource = new BehaviorSubject<number>(1);
  currentCEvEbitda = this.cEvEbitdaSource.asObservable();

  private ebitdaSource = new BehaviorSubject<number>(1);
  currentEbitda = this.ebitdaSource.asObservable();

  private sEvEbitdaSource = new BehaviorSubject<number>(0);
  currentSEvEbitda = this.sEvEbitdaSource.asObservable();



  constructor() { }

  changeTicker(ticker: string) {
    this.tickerSource.next(ticker);
  }

  changeName(name: string) {
    this.nameSource.next(name);
  }

  changeSector(sector: string) {
    this.sectorSource.next(sector);
  }

  changePrevSector(prevSector: boolean) {
    this.prevSectorSource.next(prevSector);
  }

  changeMarketCap(marketCap: number){
    this.marketCapSource.next(marketCap);
  }

  changeExchange(exchange: string){
    this.exchangeSource.next(exchange);
  }

  changeEv(ev: number){
    this.evSource.next(ev);
  }

  changeEvEbitda(evEbitda: number){
    this.cEvEbitdaSource.next(evEbitda);
  }

  changeEbitda(ebitda: number){
    this.ebitdaSource.next(ebitda);
  }

  changeSEvEbitda(sEvEbitda: number){
    this.sEvEbitdaSource.next(sEvEbitda);
  }

}