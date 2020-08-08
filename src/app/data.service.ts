import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class DataService {

  private tickerSource = new BehaviorSubject<string>('ticker');
  currentTicker = this.tickerSource.asObservable();

  private nameSource = new BehaviorSubject<string>('name');
  currentName = this.nameSource.asObservable();

  private sectorSource = new BehaviorSubject<string>('sector');
  currentSector = this.sectorSource.asObservable();

  private prevSectorSource = new BehaviorSubject<boolean>(false);
  currentPrevSector = this.prevSectorSource.asObservable();

  private cpeSource = new BehaviorSubject<number>(1);
  currentcpe = this.cpeSource.asObservable();

  private marketCapSource = new BehaviorSubject<number>(1);
  currentMarketCap = this.marketCapSource.asObservable();

  private earningsSource = new BehaviorSubject<number>(1);
  currentEarnings = this.earningsSource.asObservable();

  private speSource = new BehaviorSubject<number>(1);
  currentspe = this.speSource.asObservable();

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

  changeCpe(cpe: number){
    this.cpeSource.next(cpe);
  }

  changeMarketCap(marketCap: number){
    this.marketCapSource.next(marketCap);
  }

  changeEarnings(e: number){
    this.earningsSource.next(e);
  }

  changeSpe(spe: number){
    this.speSource.next(spe);
  }
}