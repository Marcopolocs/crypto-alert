import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, retry } from 'rxjs';
import { FETCH_CRYPTO_METADATA_HTTP_PARAMS } from '../constants/fetch-crypto-metadata-http-params.constants';
import { FETCH_CRYPTOS_HTTP_PARAMS } from '../constants/fetch-cryptos-http-params.constants';
import { CryptoItem } from '../shared/crypto-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CryptoItemsService {
  getDate$ = new BehaviorSubject<string>('');
  // cryptoParam!: string;

  constructor(private http: HttpClient) {}

  private fetchingAllCryptoPriceDetails() {
    return this.http
      .get<any>(
        'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',
        {
          headers: {
            'X-CMC_PRO_API_KEY': '3d4f7c0c-5ad5-4156-8199-d94f16f8eacf',
          },
          params: FETCH_CRYPTOS_HTTP_PARAMS,
        }
      )
      .pipe(
        map((fetchedItems) => {
          const newItemList: any = [];
          this.destructureNestedCryptoArrays(fetchedItems.data).forEach(
            (item: any) => {
              const formattedObject =
                this.structuringNewCryptoPriceDetailsObject(item);
              newItemList.push(formattedObject);
            }
          );
          this.getDate$.next(this.formattedDate());
          return this.sortCryptoItemsByRank(newItemList);
        })
      );
  }

  private sortCryptoItemsByRank(newItemList: any) {
    newItemList.sort((a: any, b: any) => a.rank - b.rank);
    return newItemList;
  }

  private destructureNestedCryptoArrays(dataObject: any) {
    const cryptoItems: any = Object.values(dataObject);
    const items: any = [];
    cryptoItems.forEach((item: any) => {
      const [nestedItem] = item;
      items.push(nestedItem);
    });
    return items;
  }

  private fetchingMetadata() {
    return this.http
      .get<any>('https://pro-api.coinmarketcap.com/v2/cryptocurrency/info', {
        headers: {
          'X-CMC_PRO_API_KEY': '3d4f7c0c-5ad5-4156-8199-d94f16f8eacf',
        },
        params: FETCH_CRYPTO_METADATA_HTTP_PARAMS,
      })
      .pipe(
        retry(3),
        map((fetchedItems) => {
          const newItemList: any[] = [];
          this.destructureNestedCryptoArrays(fetchedItems.data).forEach(
            (item: any) => {
              const newObject = this.structuringNewMetadataObject(item);
              newItemList.push(newObject);
            }
          );
          return newItemList;
        })
      );
  }

  private structuringNewMetadataObject(item: any) {
    const newObject = {
      id: item.id,
      description: item.description,
      logoPath: item.logo,
      officialWebsite: item.urls.website[0],
      reddit: item.urls.reddit,
      twitter: item.urls.twitter,
    };
    return newObject;
  }

  private structuringNewCryptoPriceDetailsObject(item: any) {
    const newItem = {
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
      volume24h: this.formattedPrice(+item.quote.USD.volume_24h.toFixed(2)),
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
    return newItem;
  }

  public finalCryptoObjects(): Observable<CryptoItem[]> {
    return forkJoin(
      this.fetchingAllCryptoPriceDetails(),
      this.fetchingMetadata()
    ).pipe(
      map(([prices, details]) =>
        this.mergeDetailsAndMetaDataObjects(prices, details)
      )
    );
  }

  private mergeDetailsAndMetaDataObjects(prices: any, details: any) {
    const mergedObjects: CryptoItem[] = [];
    prices.forEach((item: any) => {
      const currentDetailObject = details.find(
        (detailObject: any) => detailObject.id === item.id
      );
      mergedObjects.push({
        ...item,
        ...currentDetailObject,
      });
    });
    return mergedObjects;
  }

  private formattedPrice(price: number): number | string {
    if (price >= 300) {
      const item = +price.toFixed(0);
      const newItem = new Intl.NumberFormat('en-US').format(item);
      return newItem;
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
    return +price;
  }

  private formattedPercentage(percentage: number): number | null {
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

  private formattedDate(): string {
    return new Date().toString();
  }
}

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

// fetchingSingleCryptoPricesForDetailsPage() {
//   return this.http
//     .get<any>(
//       `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${this.cryptoParam}`,
//       {
//         headers: {
//           'X-CMC_PRO_API_KEY': '3d4f7c0c-5ad5-4156-8199-d94f16f8eacf',
//         },
//       }
//     )
//     .pipe(
//       map((fetchedItem) => {
//         const { data: dataObject, status: statusObject } = fetchedItem;
//         const cryptoItem: any = Object.values(dataObject);
//         const [destructuredCryptoItem] = cryptoItem;
//         return this.structuringNewCryptoPriceDetailsObject(
//           destructuredCryptoItem
//         );
//       })
//     );
// }

// fetchingSingleCryptoMetadataForDetailsPage() {
//   return this.http
//     .get<any>(
//       `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=${this.cryptoParam}`,
//       {
//         headers: {
//           'X-CMC_PRO_API_KEY': '3d4f7c0c-5ad5-4156-8199-d94f16f8eacf',
//         },
//       }
//     )
//     .pipe(
//       map((fetchedItem) => {
//         const { data: dataObject, status: statusObject } = fetchedItem;
//         const cryptoItem: any = Object.values(dataObject);
//         const [destructuredCryptoItem] = cryptoItem;
//         return this.structuringNewMetadataObject(destructuredCryptoItem);
//       })
//     );
// }

// setSingleCryptoItemParam(item: string) {
//   this.cryptoParam = item;
// }

// mergingSingleCryptoDataForDetailsPage() {
//   return forkJoin(
//     this.fetchingSingleCryptoPricesForDetailsPage(),
//     this.fetchingSingleCryptoMetadataForDetailsPage()
//   ).pipe(
//     map(([prices, details]) => {
//       const mergedObjects = { ...prices, ...details };
//       return mergedObjects;
//     })
//   );
// }
