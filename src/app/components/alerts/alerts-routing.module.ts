import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlertContainerComponent } from '../add-alert/add-alert-container.component';
import { HistoryAlertsContainerComponent } from '../history-alerts/history-alerts-container.component';
import { AlertsComponent } from './alerts.component';

const alertsRoutes: Routes = [
  { path: 'add-alert', component: AddAlertContainerComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'alert-history', component: HistoryAlertsContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(alertsRoutes)],
})
export class AlertsRoutingModule {}
