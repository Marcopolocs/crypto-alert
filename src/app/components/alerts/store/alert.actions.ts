import { createAction, props } from '@ngrx/store/src';
import { AlertItem } from 'src/app/shared/alert-item.interface';

export const loadAlerts = createAction('[Alerts Page] Enter');

export const createAlert = createAction(
  '[Alerts Page] Create Alert',
  props<{ alertObject: AlertItem }>()
);

export const deleteAlert = createAction(
  '[Alerts Page] Delete Alert',
  props<{ alertObject: AlertItem }>()
);

export const updateAlert = createAction(
  '[Alerts Page] Update Alert',
  props<{ updatedAlertObject: AlertItem }>()
);
