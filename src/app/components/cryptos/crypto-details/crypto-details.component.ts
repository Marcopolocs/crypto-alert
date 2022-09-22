import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css'],
})
export class CryptoDetailsComponent implements OnInit {
  cryptoName!: string;
  cryptoItem$ = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private cryptoItemsService: CryptoItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cryptoName = this.route.snapshot.params['name'];
    this.route.paramMap
      .pipe(
        map((params: any) => {
          this.getCryptoDetails();
          this.cryptoName = params.get('name');
        })
      )
      .subscribe();
  }

  // getCryptoDetails() {
  //   this.cryptoItemsService
  //     .mergingSingleCryptoDataForDetailsPage()
  //     .subscribe((cryptoItem) => this.cryptoItem$.next(cryptoItem));
  // }

  getCryptoDetails() {
    this.cryptoItemsService
      .mergeFetchedAllCryptoObjects()
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
