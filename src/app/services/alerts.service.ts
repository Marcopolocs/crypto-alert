import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertItem } from '../shared/alert-item.interface';
import { AlertPanelEnum } from '../shared/alert.enum';
import { CryptoItem } from '../shared/crypto-item.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  setCryptoItem$ = new BehaviorSubject<CryptoItem | null>(null);
  setEditedCryptoItem!: AlertItem;
  alertPanelType$ = new BehaviorSubject<AlertPanelEnum>(AlertPanelEnum.CREATE);
  constructor() {}

  settingEditedCryptoItem(item: AlertItem) {
    this.setEditedCryptoItem = item;
  }
}
