import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';

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
            (cryptoItem: any) => cryptoItem.slug === this.cryptoName
          )
        );
      });
  }
}
