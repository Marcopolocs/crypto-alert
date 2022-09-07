import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface searchData {
  data: string[];
  error: string;
}

@Injectable({
  providedIn: 'root',
})
// TODO: Nevezd át CryptoListStateService-re
export class CryptoLocalService {
  storedCryptoNames = new BehaviorSubject<string[]>([]);

  constructor() {}

  settingCryptoNamesIntoSubject(cryptoItem: any): void {
    this.storedCryptoNames.next(cryptoItem);
  }
}
