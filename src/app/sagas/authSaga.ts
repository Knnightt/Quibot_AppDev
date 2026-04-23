import { call, put, takeLatest, select, CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT
} from '../reducers/authReducer';
import { authLogin, authRegister, authMe, authLogout } from '../api/auth';
import { AppState, User, LoginCredentials, RegisterCredentials, LoginResponse, Action } from '../../types';

// Selector to get token from state
const getAuthToken = (state: AppState): string | null => state.auth.token;

// Login Saga
function* loginSaga(action: Action): Generator<CallEffect | PutEffect, void, unknown> {
  try {
    const { email, password } = action.payload as LoginCredentials;
    // authLogin throws on error, returns data directly on success
    const result = yield call(authLogin, { email, password });

    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        token: (result as LoginResponse).token,
        user: (result as LoginResponse).user || null
      }
    });

  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload: (error as Error).message
    });
  }
}

// Register Saga
function* registerSaga(action: Action): Generator<CallEffect | PutEffect, void, unknown> {
  try {
    const { email, password } = action.payload as RegisterCredentials;
    // authRegister throws on error, returns data directly on success
    yield call(authRegister, { email, password });

    yield put({
      type: REGISTER_SUCCESS
    });

  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      payload: (error as Error).message
    });
  }
}

// Get User Saga
function* getUserSaga(): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    // Get token from Redux state
    const token = yield select(getAuthToken);

    // authMe throws on error, returns user data directly on success
    const userData = yield call(authMe, token as string | null);

    yield put({
      type: GET_USER_SUCCESS,
      payload: { user: userData as User }
    });

  } catch (error) {
    yield put({
      type: GET_USER_FAILURE,
      payload: (error as Error).message
    });
  }
}

// Logout Saga
function* logoutSaga(): Generator<SelectEffect | CallEffect, void, unknown> {
  try {
    // Get token from Redux state before clearing
    const token = yield select(getAuthToken);
    yield call(authLogout, token as string | null);
  } catch (error) {
    console.log('Logout error:', error);
  }
}

// Watcher Saga
export function* watchAuth(): Generator {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(GET_USER_REQUEST, getUserSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
