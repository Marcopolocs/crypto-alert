import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { AlertItem } from 'src/app/shared/alert-item.interface';
import { deleteAlert, loadAlerts } from './store/alert.actions';
import { selectAllAlerts } from './store/alert.selectors';
import { AlertState } from './store/alert.store';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  alertItemList$: Observable<AlertItem[]> = this.store.select(selectAllAlerts);

  constructor(
    private alertsService: AlertsService,
    private store: Store<AlertState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadAlerts());
  }

  editAlertObject(item: AlertItem) {
    this.alertsService.editAlertItem(item);
  }

  deleteAlertObject(item: AlertItem) {
    this.store.dispatch(deleteAlert({ alertObject: item }));

    // Delete when the store is fully set as this part is no longer necessary
    const itemId = item.id;
    this.alertsService.deleteAlertItem(itemId);
  }
}
