import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AlertsStorageService } from 'src/app/services/alerts-storage.service';
import { AlertItem } from 'src/app/shared/alert-item.interface';
import {
  createAlert,
  createAlertFailure,
  createAlertSuccess,
  loadAlerts,
  loadAlertsFailure,
  loadAlertsSuccess,
} from './alert.actions';

@Injectable()
export class AlertEffects {
  constructor(
    private actions$: Actions,
    private alertsStorage: AlertsStorageService
  ) {}

  loadAlerts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAlerts),
      switchMap(() => {
        return this.alertsStorage.fetchAllAlertItemsFromDatabase().pipe(
          map((alerts) => {
            const allAlerts = this.getAllAlertItems(alerts);
            console.log(allAlerts);
            return loadAlertsSuccess({ alertList: allAlerts });
          }),
          catchError((error) => of(loadAlertsFailure({ error: error })))
        );
      })
    );
  });

  getAllAlertItems(alerts: { [key: string]: AlertItem }) {
    const list: AlertItem[] = [];
    for (const [key, value] of Object.entries(alerts)) {
      list.push(value);
    }
    return list;
  }

  createAlert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createAlert),
      switchMap((action) => {
        return this.alertsStorage
          .postAlertItemInDatabase(action.alertObject)
          .pipe(
            map((alert) => {
              const updatedItem = this.assignFirebaseIdToItemId(
                action.alertObject,
                alert.name
              );
              return createAlertSuccess({ alertObject: updatedItem });
            }),
            catchError((error) => of(createAlertFailure({ error: error })))
          );
      })
    );
  });

  assignFirebaseIdToItemId(alertItem: AlertItem, firebaseID: string) {
    return { ...alertItem, id: firebaseID };
  }
}
