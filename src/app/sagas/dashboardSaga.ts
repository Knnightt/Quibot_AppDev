import { call, put, takeLatest, select, CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAILURE,
} from '../reducers/dashboardReducer';
import { getDashboardStats } from '../api/dashboard';
import { AppState, DashboardStat } from '../../types';

// Selector to get token from state
const getAuthToken = (state: AppState): string | null => state.auth.token;

// Get Dashboard Saga
function* getDashboardSaga(): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const stats = yield call(getDashboardStats, token as string | null);

    yield put({
      type: GET_DASHBOARD_SUCCESS,
      payload: stats as DashboardStat[],
    });
  } catch (error) {
    yield put({
      type: GET_DASHBOARD_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Watcher Saga
export function* watchDashboard(): Generator {
  yield takeLatest(GET_DASHBOARD_REQUEST, getDashboardSaga);
}
