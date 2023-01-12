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
    return this.http.post<{ name: string }>(`${this.FB_URL}.json`, alertData);
  }

  // postAlertItemInDatabase(alertData: AlertItem) {
  //   this.http
  //     .post<{ name: string }>(`${this.FB_URL}.json`, alertData)
  //     .subscribe((respData) => {
  //       this.updateLocalAlertsContainer(alertData, respData);
  //     });
  // }

  updateLocalAlertsContainer(alertData: AlertItem, respData: { name: string }) {
    const addFirebaseIdToCommentObject = {
      ...alertData,
      id: Object.values(respData)[0],
    };
    const retrieveItemsFromSubject: AlertItem[] = this.alertsList$.getValue();
    retrieveItemsFromSubject.push(addFirebaseIdToCommentObject);
    this.alertsList$.next(retrieveItemsFromSubject);
  }

  fetchAllAlertItemsFromDatabase() {
    return this.http.get<{ [key: string]: AlertItem }>(`${this.FB_URL}.json`);
  }

  // fetchAllAlertItemsFromDatabase() {
  //   return this.http
  //     .get<{ [key: string]: AlertItem }>(`${this.FB_URL}.json`)
  //     .pipe(
  //       map((responseData) => this.assignFirebaseIdToItemId(responseData)),
  //       tap((data) => {
  //         this.alertsList$.next(data);
  //       })
  //     )

  // }

  assignFirebaseIdToItemId(respData: { [key: string]: AlertItem }) {
    const alertItems: AlertItem[] = [];
    for (const key in respData) {
      alertItems.push({ ...respData[key], id: key });
    }
    return alertItems;
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
