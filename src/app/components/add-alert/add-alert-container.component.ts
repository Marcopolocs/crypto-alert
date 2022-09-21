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
  createdAlertItemPopupList: AlertItem[] = [];

  constructor(
    private cryptoItemsService: CryptoItemsService,
    private alertsStorageService: AlertsStorageService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    // DO I HAVE TO UNSUBSCRIBE HERE? IT EMITS ONLY ONE DATA SO IT SHOULD NOT BE NECESSARY RIGHT? OR...
    this.alertsService.setCryptoItem$.subscribe((item) => {
      this.pickedCryptoItem = item;
    });
  }

  onPostObject(item: AlertItem) {
    this.alertsStorageService.postAlertItem(item);
    this.createdAlertItemPopupList.push(item);
    // This could have been solved using a boolean value which we set dynamically
    // but I found the shift method to be useful for such cases
    setTimeout(() => {
      this.createdAlertItemPopupList.shift();
    }, 3000);
  }
}
