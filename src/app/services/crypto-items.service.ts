import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { CryptoItem } from '../shared/crypto-item.interface';
import { CryptoLocalService } from './crypto-local.service';

@Injectable({
  providedIn: 'root',
})
export class CryptoItemsService implements OnInit {
  // API Documentation (COINMARKETCAP)
  // https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest

  // API Documentation (COINBASE)
  // https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication#api-key-permissions

  // API KEY (COINBASE)
  // 742f5140f84afef89c1c38c587d5c33a
  // API SECRET (COINBASE)
  // wtdcqOCcHpttonO3PwVOXODbZeEhDhA0dcCZt4CMkbiivi2grPfDR/sQpr0YqCl2JZdD0/zyoKkrW962Okg8mA==
  // API Passphrase (COINBASE)
  // 6v5wfy5lhxg

  getDate$ = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private cryptoLocalService: CryptoLocalService
  ) {}

  ngOnInit(): void {}

  fetchAllCryptos() {
    const idParams = new HttpParams()
      .set(
        'symbol',
        'BTC,ETH,XRP,LTC,DOGE,SHIB,BNB,USDC,BUSD,DOT,AVAX,MATIC,TRX,DAI,XLM,USDT'
      )
      .set('skip_invalid', true);

    return this.http
      .get<any>(
        'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',
        {
          headers: {
            'X-CMC_PRO_API_KEY': '3d4f7c0c-5ad5-4156-8199-d94f16f8eacf',
          },
          params: idParams,
        }
      )
      .pipe(
        map((fetchedItems) => {
          const { data: dataObject, status: statusObject } = fetchedItems;
          const cryptoItems: any = Object.values(dataObject);

          this.getDate$.next(this.formattedDate());

          const items: any = [];

          cryptoItems.forEach((item: any) => {
            const [itemPieces] = item;
            items.push(itemPieces);
          });

          const newItemList: any = [];

          items.forEach((item: any) => {
            const formattedObject = {
              id: item.id,
              name: item.name,
              symbol: item.symbol,
              price: this.formattedPrice(item.quote.USD.price),
              percentChange1h: this.formattedPercentage(
                item.quote.USD.percent_change_1h
              ),
              percentChange24h: this.formattedPercentage(
                item.quote.USD.percent_change_24h
              ),
              percentChange7d: +item.quote.USD.percent_change_7d.toFixed(2),
              percentChange30d: +item.quote.USD.percent_change_30d.toFixed(2),
              volume24h: this.formattedPrice(
                +item.quote.USD.volume_24h.toFixed(2)
              ),
              marketCap: this.formattedPrice(item.quote.USD.market_cap),
              circulatingSupply: this.formattedPrice(
                Math.round(item.circulating_supply)
              ),
              maxSupply: this.formattedPrice(Math.round(item.max_supply)),
              totalSupply: this.formattedPrice(Math.round(item.total_supply)),
              rank: item.cmc_rank,
              slug: item.slug,
              latestUpdate: item.last_updated,
            };
            newItemList.push(formattedObject);
          });

          newItemList.sort((a: any, b: any) => a.rank - b.rank);
          return newItemList;
        })
      );
  }

  fetchMetadata() {
    const idParams = new HttpParams().set(
      'symbol',
      'BTC,ETH,XRP,LTC,DOGE,SHIB,BNB,USDC,BUSD,DOT,AVAX,MATIC,TRX,DAI,XLM,USDT'
    );
    return this.http
      .get<any>('https://pro-api.coinmarketcap.com/v2/cryptocurrency/info', {
        headers: {
          'X-CMC_PRO_API_KEY': '3d4f7c0c-5ad5-4156-8199-d94f16f8eacf',
        },
        params: idParams,
      })
      .pipe(
        map((fetchedItems) => {
          const { status, data: metadata } = fetchedItems;
          const cryptoItems: any = Object.values(metadata);

          const items: any[] = [];

          cryptoItems.forEach((item: any) => {
            const [itemPieces] = item;
            items.push(itemPieces);
          });

          const newItemList: any[] = [];

          items.forEach((item) => {
            const newObject = {
              id: item.id,
              description: item.description,
              logoPath: item.logo,
              officialWebsite: item.urls.website[0],
              reddit: item.urls.reddit,
              twitter: item.urls.twitter,
            };
            newItemList.push(newObject);
          });

          return newItemList;
        })
      );
  }

  mergeFetchedObjects(): Observable<CryptoItem[]> {
    return forkJoin(this.fetchAllCryptos(), this.fetchMetadata()).pipe(
      map(([prices, details]) => {
        const mergedObjects: CryptoItem[] = [];
        const cryptoNames: string[] = [];

        prices.forEach((item: any) => {
          const currentDetailObject = details.find(
            (detailObject: any) => detailObject.id === item.id
          );
          mergedObjects.push({
            ...item,
            ...currentDetailObject,
          });
          cryptoNames.push(item.symbol);
        });

        this.cryptoLocalService.settingCryptoNamesIntoSubject(cryptoNames);

        return mergedObjects;
      })
    );
  }

  formattedPrice(price: number): string | number {
    if (price >= 300) {
      const item = +price.toFixed(0);
      return new Intl.NumberFormat('en-US').format(item);
    }
    if (price < 300 && price >= 10) {
      return +price.toFixed(2);
    }
    if (price < 10 && price > 0.1) {
      return +price.toFixed(5);
    }
    if (price <= 0.1) {
      return +price.toFixed(8);
    }
    return price;
  }

  formattedPercentage(percentage: number): number | null {
    if (percentage >= 0.01) {
      return +percentage.toFixed(2);
    }
    if (percentage < 0.01 && percentage > 0) {
      return +percentage.toFixed(3);
    }

    if (percentage <= 0 && percentage > -0.01) {
      return +percentage.toFixed(3);
    }
    if (percentage <= -0.01) {
      return +percentage.toFixed(2);
    }
    return null;
  }

  formattedDate(): string {
    return new Date().toString();
  }
}
