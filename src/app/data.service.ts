import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<string>('ticker');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(ticker: string) {
    this.messageSource.next(ticker);
  }
}