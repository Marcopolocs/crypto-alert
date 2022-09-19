import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListitemsComponent } from './components/cryptos/all-cryptos-container/crypto-listitems/crypto-listitems.component';
import { CryptoContainerComponent } from './components/cryptos/all-cryptos-container/crypto-container.component';
import { CryptoDetailsComponent } from './components/cryptos/crypto-details/crypto-details.component';
import { CryptoForumComponent } from './components/crypto-forum/crypto-forum.component';
import { AddAlertContainerComponent } from './components/add-alert/add-alert-container.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HistoryAlertsContainerComponent } from './components/history-alerts/history-alerts-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'all-cryptos',
    component: CryptoContainerComponent,
    children: [
      { path: '', component: CryptoListitemsComponent },
      { path: 'details/:name', component: CryptoDetailsComponent },
    ],
  },
  { path: 'add-alert', component: AddAlertContainerComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'alert-history', component: HistoryAlertsContainerComponent },
  {
    path: 'community',
    component: CryptoForumComponent,
  },
  { path: 'sign-up', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '**', redirectTo: '/all-cryptos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
