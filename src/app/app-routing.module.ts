import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListitemsComponent } from './components/cryptos/all-cryptos-container/crypto-listitems/crypto-listitems.component';
import { CryptoContainerComponent } from './components/cryptos/all-cryptos-container/crypto-container.component';
import { CryptoDetailsComponent } from './components/cryptos/crypto-details/crypto-details.component';
import { CryptoForumComponent } from './components/crypto-forum/crypto-forum.component';
import { AddAlertComponent } from './components/add-alert/add-alert.component';

const routes: Routes = [
  { path: '', redirectTo: '/all-cryptos', pathMatch: 'full' },
  {
    path: 'all-cryptos',
    component: CryptoContainerComponent,
    children: [
      { path: '', component: CryptoListitemsComponent },
      { path: 'details/:name', component: CryptoDetailsComponent },
    ],
  },
  { path: 'add-alert', component: AddAlertComponent },
  { path: 'community', component: CryptoForumComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
