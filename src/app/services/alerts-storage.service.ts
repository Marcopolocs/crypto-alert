import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AlertItem } from '../shared/alert-item.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertsStorageService {
  alertsList$ = new BehaviorSubject<AlertItem[]>([]);
  constructor(private http: HttpClient) {}

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
      .get<{ [key: string]: AlertItem }>(
        'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/alertsList.json'
      )
      .pipe(
        map((responseData) => {
          const alertItems: AlertItem[] = [];
          for (const key in responseData) {
            alertItems.push({ ...responseData[key], id: key });
          }
          return alertItems;
        }),
        tap((data) => {
          this.alertsList$.next(data);
        })
      )
      .subscribe();
  }

  deleteAlertItemRequest(key: string) {
    this.http
      .delete(
        `https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/alertsList/${key}.json`
      )
      .subscribe();
  }
}
