import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AlertItem } from '../shared/alert-item.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertsStorageService {
  constructor(private http: HttpClient) {
    this.fetchAllAlertItems();
  }

  postAlertItem(alertData: AlertItem) {
    this.http
      .post<AlertItem>(
        'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/alertsList.json',
        alertData
      )
      .subscribe();
  }

  fetchAllAlertItems() {
    this.http
      .get<any>(
        'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/alertsList.json'
      )
      .pipe(
        map((responseData) => {
          console.log(responseData);
        })
      )
      .subscribe();
  }
}
