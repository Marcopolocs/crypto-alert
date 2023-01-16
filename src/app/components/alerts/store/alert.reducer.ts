import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';
import { AlertItem } from 'src/app/shared/alert-item.interface';
import {
  createAlert,
  createAlertFailure,
  createAlertSuccess,
  deleteAlert,
  deleteAlertFailure,
  deleteAlertSuccess,
  loadAlerts,
  loadAlertsFailure,
  loadAlertsSuccess,
  updateAlert,
} from './alert.actions';

const updateAlertFn = (alerts: AlertItem[], updatedAlertItem: AlertItem) =>
  alerts.map((alert) => {
    return alert.id === updatedAlertItem.id
      ? Object.assign({}, alert, updatedAlertItem)
      : alert;
  });

export interface AlertListState {
  alertList: AlertItem[];
  error: string | null;
  status: 'loading' | 'error' | 'success' | 'not_asked';
}

export const initialState: AlertListState = {
  alertList: [],
  error: null,
  status: 'not_asked',
};

export const alertReducer = createReducer(
  initialState,
  // Loading Alerts list
  on(loadAlerts, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadAlertsSuccess, (state, action) => ({
    ...state,
    alertList: [...action.alertList],
    error: null,
    status: 'success',
  })),
  on(loadAlertsFailure, (state) => ({
    ...state,
    error: state.error,
    status: 'error',
  })),

  // Creating Alert item
  on(createAlert, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(createAlertSuccess, (state, { alertObject }) => ({
    ...state,
    alertList: [...state.alertList, alertObject],
    error: null,
    status: 'success',
  })),
  on(createAlertFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // Deleting Alert item
  on(deleteAlert, (state, { alertObject }) => ({
    ...state,
    status: 'loading',
  })),
  on(deleteAlertSuccess, (state, { alertObject }) => ({
    ...state,
    alertList: state.alertList.filter((alert) => alert.id !== alertObject.id),
    status: 'success',
  })),
  on(deleteAlertFailure, (state, { alertObject }) => ({
    ...state,
    error: state.error,
    status: 'error',
  })),

  // Updating Alert item
  on(updateAlert, (state, { updatedAlertObject }) => ({
    ...state,
    alertList: updateAlertFn(state.alertList, updatedAlertObject),
  }))
);
