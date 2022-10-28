import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CryptosRoutingModule } from './cryptos-routing.module';

import { CryptoContainerComponent } from './all-cryptos-container/crypto-container.component';
import { CryptoItemComponent } from './all-cryptos-container/crypto-listitems/crypto-item/crypto-item.component';
import { CryptoListitemsComponent } from './all-cryptos-container/crypto-listitems/crypto-listitems.component';
import { CryptoDetailsComponent } from './crypto-details/crypto-details.component';

@NgModule({
  declarations: [
    CryptoListitemsComponent,
    CryptoItemComponent,
    CryptoDetailsComponent,
    CryptoContainerComponent,
  ],
  imports: [SharedModule, ReactiveFormsModule, CryptosRoutingModule],
})
export class CryptosModule {}
