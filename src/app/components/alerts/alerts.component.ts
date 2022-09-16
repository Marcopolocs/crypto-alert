import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.alertItems$ = this.alertsStorageService.fetchAllAlertItems();
  }
}
