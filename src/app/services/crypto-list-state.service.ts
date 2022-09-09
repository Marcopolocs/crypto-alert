import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CryptoItem } from '../shared/crypto-item.interface';

export interface searchData {
  data: string[];
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class CryptoListStateService {
  storedCryptoItems = new BehaviorSubject<CryptoItem[]>([]);

  constructor() {}

  settingCryptoItemsIntoSubject(cryptoItem: any): void {
    this.storedCryptoItems.next(cryptoItem);
  }
}
