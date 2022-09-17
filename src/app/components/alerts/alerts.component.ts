import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertsStorageService } from 'src/app/services/alerts-storage.service';
import { AlertItem } from 'src/app/shared/alert-item.interface';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  alertItems$!: Observable<AlertItem[]>;

  constructor(private alertsStorageService: AlertsStorageService) {}

  ngOnInit(): void {
    this.alertsStorageService.fetchAllAlertItems();
    this.alertItems$ = this.alertsStorageService.alertsList$;
  }

  deleteAlertObject(item: AlertItem) {
    if (item.id) {
      const itemId = item.id;
      this.alertsStorageService.deleteAlertItemRequest(itemId);
    }
    const alerts = this.alertsStorageService.alertsList$.getValue();
    const newAlertsList = alerts.filter((alert) => alert.id !== item.id);
    this.alertsStorageService.alertsList$.next(newAlertsList);
  }
}
