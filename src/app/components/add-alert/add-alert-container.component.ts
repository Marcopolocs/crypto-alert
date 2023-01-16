import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { AlertItem } from 'src/app/shared/alert-item.interface';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';
import { createAlert } from '../alerts/store/alert.actions';

@Component({
  selector: 'app-add-alert-container',
  templateUrl: './add-alert-container.component.html',
  styleUrls: ['./add-alert-container.component.css'],
})
export class AddAlertContainerComponent implements OnInit {
  cryptoItems$: Observable<CryptoItem[]> =
    this.cryptoItemsService.finalCryptoObjects();
  selectedCryptoItem!: CryptoItem | null;
  createdAlertItemPopupList: AlertItem[] = [];

  constructor(
    private cryptoItemsService: CryptoItemsService,
    private alertsService: AlertsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // DO I HAVE TO UNSUBSCRIBE WITH ONDESTROY? IT EMITS ONLY ONE DATA SO IT SHOULD NOT BE NECESSARY RIGHT? OR...
    this.alertsService.setCryptoItem$.subscribe((item) => {
      this.selectedCryptoItem = item;
    });
  }

  onPostObject(item: AlertItem) {
    this.store.dispatch(createAlert({ alertObject: item }));

    this.createdAlertItemPopupList.push(item);
    this.onHidePopupWindow();

    // this.alertsStorageService.postAlertItemInDatabase(item);
  }

  onHidePopupWindow() {
    setTimeout(() => {
      this.createdAlertItemPopupList.shift();
    }, 3000);
  }
}
