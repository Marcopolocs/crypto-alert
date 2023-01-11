import { createAction, props } from '@ngrx/store/src';
import { AlertItem } from 'src/app/shared/alert-item.interface';

/////////////////////////////////////////////////////
// Actions for loading Alerts on entering Alerts page
export const loadAlerts = createAction('[Alerts Page] Alerts Load');
export const loadAlertsSuccess = createAction(
  '[Alerts API] Alerts Load Success',
  props<{ alertList: AlertItem[] }>()
);
export const loadAlertsFailure = createAction(
  '[Alerts API] Alerts Load Failure',
  props<{ error: string }>()
);

/////////////////////////////
// Actions for creating Alert
export const createAlert = createAction('[Alerts Page] Create Alert');
export const createAlertSuccess = createAction(
  '[Alerts API] Create Alert Success',
  props<{ alertObject: AlertItem }>()
);
export const createAlertFailure = createAction(
  '[Alerts API] Create Alert Failure',
  props<{ error: string }>()
);

/////////////////////////////
// Actions for deleting Alert
export const deleteAlert = createAction(
  '[Alerts Page] Delete Alert',
  props<{ alertObject: AlertItem }>()
);
export const deleteAlertSuccess = createAction(
  '[Alerts Page] Delete Alert Success',
  props<{ alertObject: AlertItem }>()
);
export const deleteAlertFailure = createAction(
  '[Alerts Page] Delete Alert Failure',
  props<{ alertObject: AlertItem }>()
);

/////////////////////////////
// Actions for updating Alert
export const updateAlert = createAction(
  '[Alerts Page] Update Alert',
  props<{ updatedAlertObject: AlertItem }>()
);
export const updateAlertSuccess = createAction(
  '[Alerts Page] Update Alert Success',
  props<{ updatedAlertObject: AlertItem }>()
);
export const updateAlertFailure = createAction(
  '[Alerts Page] Update Alert Failure',
  props<{ updatedAlertObject: AlertItem }>()
);
