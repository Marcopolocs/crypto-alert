import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsStorageService } from 'src/app/services/alerts-storage.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { AlertItem } from 'src/app/shared/alert-item.interface';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  alertItems$!: Observable<AlertItem[]>;

  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.alertsService.getAlertsList();
    this.alertItems$ = this.alertsService.fetchedAlertsList$;
  }

  editAlertObject(item: AlertItem) {
    this.alertsService.editAlertItem(item);
  }

  deleteAlertObject(item: AlertItem) {
    if (item.id) {
      const itemId = item.id;
      this.alertsService.deleteAlertItem(itemId);
    }
  }
}
