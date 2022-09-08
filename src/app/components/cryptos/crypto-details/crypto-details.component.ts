import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css'],
})
export class CryptoDetailsComponent implements OnInit {
  cryptoName!: string;
  cryptoItem$ = new BehaviorSubject<any>(null);

  constructor(
    private route: ActivatedRoute,
    private cryptoItemsService: CryptoItemsService
  ) {}

  ngOnInit(): void {
    this.cryptoName = this.route.snapshot.params['name'];

    this.cryptoItemsService
      .mergeFetchedObjects()
      .subscribe((everyCryptoItem) => {
        this.cryptoItem$.next(
          everyCryptoItem.find(
            (cryptoItem: CryptoItem) => cryptoItem.slug === this.cryptoName
          )
        );
      });
  }
}
