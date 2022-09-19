import { Component, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { WebsocketService } from '../../../../services/web-socket.service';
import { CryptoItem } from '../../../../shared/crypto-item.interface';

const WS_ENDPOINT = 'wss://ws-feed.exchange.coinbase.com';
const secret =
  'wtdcqOCcHpttonO3PwVOXODbZeEhDhA0dcCZt4CMkbiivi2grPfDR/sQpr0YqCl2JZdD0/zyoKkrW962Okg8mA==';
const api_key = '742f5140f84afef89c1c38c587d5c33a';

const request = {
  type: 'subscribe',
  channels: ['ticker'],
  product_ids: ['BTC-USD'],
  signature: btoa(secret),
  key: api_key,
  passphrase: '6v5wfy5lhxg',
  timestamp: Date.now() / 1000,
};

const data = {
  type: 'subscribe',
  product_ids: ['ETH-USD', 'ETH-EUR'],
  channels: [
    // "level2",
    // 'ticker',
    {
      name: 'ticker',
      product_ids: ['ETH-BTC', 'ETH-USD'],
    },
  ],
};

@Component({
  selector: 'app-crypto-listitems',
  templateUrl: './crypto-listitems.component.html',
  styleUrls: ['./crypto-listitems.component.css'],
})
export class CryptoListitemsComponent implements OnInit {
  date$ = this.cryptoItemsService.getDate$;
  cryptoItemAllDetails$: Observable<CryptoItem[]> =
    this.cryptoItemsService.mergeFetchedAllCryptoObjects();

  private messages: Subject<any>;

  constructor(
    private cryptoItemsService: CryptoItemsService,
    private websocketService: WebsocketService,
    private alertsService: AlertsService
  ) {
    this.messages = <Subject<any>>websocketService.connect(WS_ENDPOINT).pipe(
      map((response: MessageEvent): any => {
        let content = JSON.parse(response.data);
        return {
          user: content.user,
          messageContent: content.messageContent,
        };
      })
    );
  }

  ngOnInit(): void {
    this.messages.subscribe((msg: any) => {
      console.log(JSON.stringify(msg));
    });

    setTimeout(() => {
      this.messages.next(JSON.stringify(request));
    }, 2000);

    // setTimeout(() => {
    //   this.messages.next({
    //     "type": "unsubscribe",
    //     "channels": [
    //         "heartbeat"
    //     ]
    // });
    // }, 1000);
  }

  onRefreshPrice(): void {
    this.cryptoItemAllDetails$ =
      this.cryptoItemsService.mergeFetchedAllCryptoObjects();
  }

  pickedCryptoItem(item: CryptoItem): void {
    this.alertsService.setCryptoItem$.next(item);
  }
}
