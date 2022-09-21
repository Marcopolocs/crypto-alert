import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertItem } from '../shared/alert-item.interface';
import { AlertPanelEnum } from '../shared/alert.enum';
import { CryptoItem } from '../shared/crypto-item.interface';
import { AlertsStorageService } from './alerts-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  setCryptoItem$ = new BehaviorSubject<CryptoItem | null>(null);
  setEditedCryptoItem!: AlertItem;
  alertPanelType$ = new BehaviorSubject<AlertPanelEnum>(AlertPanelEnum.CREATE);
  fetchedAlertsList$!: Observable<AlertItem[]>;

  constructor(private alertsStorageService: AlertsStorageService) {}

  settingEditedCryptoItem(item: AlertItem) {
    this.setEditedCryptoItem = item;
  }

  getAlertsList() {
    this.alertsStorageService.fetchAllAlertItems();
    this.fetchedAlertsList$ = this.alertsStorageService.alertsList$;
  }

  editAlertItem(item: AlertItem) {
    this.alertsStorageService.updateAlertItem(item);
    const alertsList = this.alertsStorageService.alertsList$.getValue();

    const updatedAlertsList: AlertItem[] = alertsList.map((alertItem) => {
      if (alertItem.id === item.id) {
        return {
          ...alertItem,
          cryptoName: item.cryptoName,
          isGreater: item.isGreater,
          price: item.price,
        };
      }
      return alertItem;
    });
    this.alertsStorageService.alertsList$.next(updatedAlertsList);
  }

  deleteAlertItem(itemId: string) {
    this.alertsStorageService.deleteAlertItem(itemId);

    const alerts = this.alertsStorageService.alertsList$.getValue();
    const newAlertsList = alerts.filter((alert) => alert.id !== itemId);
    this.alertsStorageService.alertsList$.next(newAlertsList);
  }
}
