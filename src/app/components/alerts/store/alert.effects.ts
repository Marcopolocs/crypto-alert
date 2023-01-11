import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertsStorageService } from 'src/app/services/alerts-storage.service';

@Injectable()
export class AlertEffects {
  constructor(
    private actions$: Actions,
    private alertsStorage: AlertsStorageService
  ) {}
}
