import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddAlertContainerComponent } from './components/add-alert/add-alert-container.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HistoryAlertsContainerComponent } from './components/history-alerts/history-alerts-container.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'sign-up', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '**', redirectTo: '/all-cryptos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
