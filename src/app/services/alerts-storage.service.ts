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
      .subscribe((respData) => {
        console.log(respData);

        const addFirebaseIdToCommentObject = {
          ...alertData,
          id: Object.values(respData)[0],
        };
        const retrieveItemsFromSubject: AlertItem[] =
          this.alertsList$.getValue();
        retrieveItemsFromSubject.push(addFirebaseIdToCommentObject);
        this.alertsList$.next(retrieveItemsFromSubject);
        console.log(this.alertsList$.getValue());
      });
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

  updateAlertItem(updatedAlertItem: AlertItem): void {
    console.log(updatedAlertItem);
    this.http
      .put(
        `https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/alertsList/${updatedAlertItem.id}.json`,
        updatedAlertItem
      )
      .subscribe();
  }

  deleteAlertItem(key: string): void {
    this.http
      .delete(
        `https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/alertsList/${key}.json`
      )
      .subscribe();
  }
}
