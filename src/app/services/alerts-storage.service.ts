import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertsStorageService {
  constructor(private http: HttpClient) {}

  postAlertItem() {
    return this.http.post(
      'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/alerts.json',
      {}
    );
  }
}
