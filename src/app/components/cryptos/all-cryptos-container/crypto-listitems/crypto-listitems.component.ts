import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { CryptoLocalService } from 'src/app/services/crypto-local.service';

@Component({
  selector: 'app-crypto-listitems',
  templateUrl: './crypto-listitems.component.html',
  styleUrls: ['./crypto-listitems.component.css'],
})
export class CryptoListitemsComponent implements OnInit {
  date$ = this.cryptoItemsService.getDate$;
  cryptoItemAllDetails$: Observable<any> =
    this.cryptoItemsService.mergeFetchedObjects();

  constructor(
    public cryptoItemsService: CryptoItemsService,
    private cryptoLocalService: CryptoLocalService
  ) {}

  ngOnInit(): void {}

  onRefreshPrice() {
    this.cryptoItemAllDetails$ = this.cryptoItemsService.mergeFetchedObjects();
  }
}
