import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAlertContainerComponent } from '../add-alert/add-alert-container.component';
import { AlertPanelComponent } from '../add-alert/alert-panel/alert-panel.component';
import { AlertPopupComponent } from '../add-alert/alert-popup/alert-popup.component';
import { AlertItemComponent } from './alert-item/alert-item.component';
import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts.component';
import { AlertEffects } from './store/alert.effects';
import { alertReducer } from './store/alert.reducer';

@NgModule({
  declarations: [
    AlertPanelComponent,
    AddAlertContainerComponent,
    AlertsComponent,
    AlertItemComponent,
    AlertPopupComponent,
  ],
  imports: [
    AlertsRoutingModule,
    SharedModule,
    StoreModule.forFeature('alerts', alertReducer),
    EffectsModule.forFeature([AlertEffects]),
  ],
})
export class AlertsModule {}
