import { HttpParams } from "@angular/common/http";

export const FETCH_CRYPTO_METADATA_HTTP_PARAMS = new HttpParams().set(
  'symbol',
  'BTC,ETH,XRP,LTC,DOGE,SHIB,BNB,USDC,BUSD,DOT,AVAX,MATIC,TRX,DAI,XLM,USDT'
);
