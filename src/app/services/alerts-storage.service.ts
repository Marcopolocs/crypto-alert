import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AlertItem } from '../shared/alert-item.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertsStorageService {
  FB_URL =
    'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/alertsList';
  alertsList$ = new BehaviorSubject<AlertItem[]>([]);
  constructor(private http: HttpClient) {}

  postAlertItemInDatabase(alertData: AlertItem) {
    this.http
      .post<AlertItem>(`${this.FB_URL}.json`, alertData)
      .subscribe((respData) => {
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

  fetchAllAlertItemsFromDatabase() {
    this.http
      .get<{ [key: string]: AlertItem }>(`${this.FB_URL}.json`)
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

  updateAlertItemInDatabase(updatedAlertItem: AlertItem): void {
    this.http
      .put(`${this.FB_URL}/${updatedAlertItem.id}.json`, updatedAlertItem)
      .subscribe();
  }

  deleteAlertItemInDatabase(key: string): void {
    this.http.delete(`${this.FB_URL}/${key}.json`).subscribe();
  }
}
