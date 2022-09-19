import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsStorageService } from 'src/app/services/alerts-storage.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { AlertItem } from 'src/app/shared/alert-item.interface';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-add-alert-container',
  templateUrl: './add-alert-container.component.html',
  styleUrls: ['./add-alert-container.component.css'],
})
export class AddAlertContainerComponent implements OnInit {
  cryptoItems$: Observable<CryptoItem[]> =
    this.cryptoItemsService.mergeFetchedAllCryptoObjects();
  pickedCryptoItem!: CryptoItem | null;
  newCreatedAlertItemList: AlertItem[] = [];

  constructor(
    private cryptoItemsService: CryptoItemsService,
    private alertsStorageService: AlertsStorageService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.alertsService.setCryptoItem$.subscribe((item) => {
      this.pickedCryptoItem = item;
    });
  }

  onPostObject(item: AlertItem) {
    this.alertsStorageService.postAlertItem(item);
    this.newCreatedAlertItemList.push(item);

    setTimeout(() => {
      this.newCreatedAlertItemList.shift();
    }, 3000);
  }
}
