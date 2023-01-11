import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store/src';
import { AlertItem } from 'src/app/shared/alert-item.interface';
import {
  createAlert,
  deleteAlert,
  loadAlerts,
  updateAlert,
} from './alert.actions';

const updateAlertFn = (alerts: AlertItem[], updatedAlertItem: AlertItem) =>
  alerts.map((alert) => {
    return alert.id === updatedAlertItem.id
      ? Object.assign({}, alert, updatedAlertItem)
      : alert;
  });

export interface State {
  alertList: AlertItem[];
  error: string | null;
  status: 'loading' | 'error' | 'success' | 'not_asked';
}

export const initialState: State = {
  alertList: [],
  error: null,
  status: 'not_asked',
};

export const alertReducer = createReducer(
  initialState,
  on(loadAlerts, (state) => ({
    ...state,
    alertList: [...state.alertList],
  })),
  on(createAlert, (state, { alertObject }) => ({
    ...state,
    alertList: [...state.alertList, alertObject],
  })),
  on(deleteAlert, (state, { alertObject }) => ({
    ...state,
    alertList: state.alertList.filter((alert) => alert.id !== alertObject.id),
  })),
  on(updateAlert, (state, { updatedAlertObject }) => ({
    ...state,
    alertList: updateAlertFn(state.alertList, updatedAlertObject),
  }))
);
