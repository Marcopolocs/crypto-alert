import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAlertContainerComponent } from '../add-alert/add-alert-container.component';
import { AlertPanelComponent } from '../add-alert/alert-panel/alert-panel.component';
import { AlertPopupComponent } from '../add-alert/alert-popup/alert-popup.component';
import { AlertItemComponent } from './alert-item/alert-item.component';
import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts.component';

@NgModule({
  declarations: [
    AlertPanelComponent,
    AddAlertContainerComponent,
    AlertsComponent,
    AlertItemComponent,
    AlertPopupComponent,
  ],
  imports: [AlertsRoutingModule, SharedModule],
})
export class AlertsModule {}
