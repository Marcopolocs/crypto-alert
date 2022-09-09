import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface searchData {
  data: string[];
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class CryptoListStateService {
  storedCryptoNames = new BehaviorSubject<string[]>([]);

  constructor() {}

  settingCryptoNamesIntoSubject(cryptoItem: any): void {
    this.storedCryptoNames.next(cryptoItem);
  }
}
