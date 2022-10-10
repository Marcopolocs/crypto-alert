import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css'],
})
export class CryptoDetailsComponent implements OnInit {
  cryptoName!: string | null;
  cryptoItem$ = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private cryptoItemsService: CryptoItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.cryptoName = params.get('name');
      this.getCryptoDetails();
    });
  }

  getCryptoDetails() {
    this.cryptoItemsService
      .finalCryptoObjects()
      .subscribe((everyCryptoItem) => {
        this.cryptoItem$.next(
          everyCryptoItem.find((cryptoItem: CryptoItem) => {
            return cryptoItem.slug === this.cryptoName;
          })
        );
      });
  }

  backToAllCryptosPage() {
    this.router.navigate(['all-cryptos']);
  }
}
