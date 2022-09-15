import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-add-alert-container',
  templateUrl: './add-alert-container.component.html',
  styleUrls: ['./add-alert-container.component.css'],
})
export class AddAlertContainerComponent implements OnInit {
  cryptoItems$: Observable<CryptoItem[]> =
    this.cryptoItemsService.mergeFetchedAllCryptoObjects();
  constructor(private cryptoItemsService: CryptoItemsService) {}

  ngOnInit(): void {}
}
