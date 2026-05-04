import { call, put, takeLatest, select, CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
  GET_STAFF_FAILURE,
  GET_STAFF_MEMBER_REQUEST,
  GET_STAFF_MEMBER_SUCCESS,
  GET_STAFF_MEMBER_FAILURE,
  CREATE_STAFF_REQUEST,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILURE,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAILURE,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAILURE,
} from '../reducers/staffReducer';
import { getStaff, getStaffMember, createStaff, updateStaff, deleteStaff } from '../api/staff';
import { AppState, Staff, CreateStaffRequest, UpdateStaffRequest, Action } from '../../types';

// Selector to get token from state
const getAuthToken = (state: AppState): string | null => state.auth.token;

// Get Staff Saga
function* getStaffSaga(): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const staff = yield call(getStaff, token as string | null);

    yield put({
      type: GET_STAFF_SUCCESS,
      payload: staff as Staff[],
    });
  } catch (error) {
    yield put({
      type: GET_STAFF_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Get Staff Member Saga
function* getStaffMemberSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    const staffMember = yield call(getStaffMember, token as string | null, id);

    yield put({
      type: GET_STAFF_MEMBER_SUCCESS,
      payload: staffMember as Staff,
    });
  } catch (error) {
    yield put({
      type: GET_STAFF_MEMBER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Create Staff Saga
function* createStaffSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const staffData = action.payload as CreateStaffRequest;
    const staffMember = yield call(createStaff, token as string | null, staffData);

    yield put({
      type: CREATE_STAFF_SUCCESS,
      payload: staffMember as Staff,
    });
  } catch (error) {
    yield put({
      type: CREATE_STAFF_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Update Staff Saga
function* updateStaffSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const { id, staffData } = action.payload as { id: number; staffData: UpdateStaffRequest };
    const staffMember = yield call(updateStaff, token as string | null, id, staffData);

    yield put({
      type: UPDATE_STAFF_SUCCESS,
      payload: staffMember as Staff,
    });
  } catch (error) {
    yield put({
      type: UPDATE_STAFF_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Delete Staff Saga
function* deleteStaffSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    yield call(deleteStaff, token as string | null, id);

    yield put({
      type: DELETE_STAFF_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: DELETE_STAFF_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Watcher Saga
export function* watchStaff(): Generator {
  yield takeLatest(GET_STAFF_REQUEST, getStaffSaga);
  yield takeLatest(GET_STAFF_MEMBER_REQUEST, getStaffMemberSaga);
  yield takeLatest(CREATE_STAFF_REQUEST, createStaffSaga);
  yield takeLatest(UPDATE_STAFF_REQUEST, updateStaffSaga);
  yield takeLatest(DELETE_STAFF_REQUEST, deleteStaffSaga);
}
