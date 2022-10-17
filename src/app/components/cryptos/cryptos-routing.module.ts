import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoContainerComponent } from './all-cryptos-container/crypto-container.component';
import { CryptoListitemsComponent } from './all-cryptos-container/crypto-listitems/crypto-listitems.component';
import { CryptoDetailsComponent } from './crypto-details/crypto-details.component';

const cryptosRoutes: Routes = [
  {
    path: 'all-cryptos',
    component: CryptoContainerComponent,
    children: [
      { path: '', component: CryptoListitemsComponent },
      { path: 'details/:name', component: CryptoDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cryptosRoutes)],
  exports: [RouterModule],
})
export class CryptosRoutingModule {}
