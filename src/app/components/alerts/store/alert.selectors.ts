import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlertState } from './alert.store';

export const selectAlerts = createFeatureSelector<AlertState>('alerts');
export const selectAllAlerts = createSelector(
  selectAlerts,
  (state: AlertState) => {
    console.log(state);
    return state.alertList.alertList;
  }
);

export const selectASD = createSelector(selectAlerts, (state: AlertState) => {
  console.log(state);
  return state.asdState;
});

// const appState = {
//   alerts: {
//     alertList: {
//       alertList,
//       status,
//       error,
//     },
//     asd: {},
//   },
//   comments: {},
// };
