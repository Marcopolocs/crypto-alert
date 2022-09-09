import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { CryptoItem } from '../../../../shared/crypto-item.interface';

@Component({
  selector: 'app-crypto-listitems',
  templateUrl: './crypto-listitems.component.html',
  styleUrls: ['./crypto-listitems.component.css'],
})
export class CryptoListitemsComponent implements OnInit {
  date$ = this.cryptoItemsService.getDate$;
  cryptoItemAllDetails$: Observable<CryptoItem[]> =
    this.cryptoItemsService.mergeFetchedAllCryptos();

  constructor(public cryptoItemsService: CryptoItemsService) {}

  ngOnInit(): void {}

  onRefreshPrice() {
    this.cryptoItemAllDetails$ =
      this.cryptoItemsService.mergeFetchedAllCryptos();
  }
}
