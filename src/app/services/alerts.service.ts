import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CryptoItem } from '../shared/crypto-item.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  setCryptoItem$ = new BehaviorSubject<CryptoItem | null>(null);
  constructor() {}
}
