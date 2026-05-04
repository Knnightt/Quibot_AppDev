import { call, put, takeLatest, select, CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  GET_APPOINTMENTS_REQUEST,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAILURE,
  GET_APPOINTMENT_REQUEST,
  GET_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILURE,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAILURE,
} from '../reducers/appointmentsReducer';
import { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment } from '../api/appointments';
import { AppState, Appointment, CreateAppointmentRequest, UpdateAppointmentRequest, Action } from '../../types';

// Selector to get token from state
const getAuthToken = (state: AppState): string | null => state.auth.token;

// Get Appointments Saga
function* getAppointmentsSaga(): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const appointments = yield call(getAppointments, token as string | null);

    yield put({
      type: GET_APPOINTMENTS_SUCCESS,
      payload: appointments as Appointment[],
    });
  } catch (error) {
    yield put({
      type: GET_APPOINTMENTS_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Get Appointment Saga
function* getAppointmentSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    const appointment = yield call(getAppointment, token as string | null, id);

    yield put({
      type: GET_APPOINTMENT_SUCCESS,
      payload: appointment as Appointment,
    });
  } catch (error) {
    yield put({
      type: GET_APPOINTMENT_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Create Appointment Saga
function* createAppointmentSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const appointmentData = action.payload as CreateAppointmentRequest;
    const appointment = yield call(createAppointment, token as string | null, appointmentData);

    yield put({
      type: CREATE_APPOINTMENT_SUCCESS,
      payload: appointment as Appointment,
    });
  } catch (error) {
    yield put({
      type: CREATE_APPOINTMENT_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Update Appointment Saga
function* updateAppointmentSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const { id, appointmentData } = action.payload as { id: number; appointmentData: UpdateAppointmentRequest };
    const appointment = yield call(updateAppointment, token as string | null, id, appointmentData);

    yield put({
      type: UPDATE_APPOINTMENT_SUCCESS,
      payload: appointment as Appointment,
    });
  } catch (error) {
    yield put({
      type: UPDATE_APPOINTMENT_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Delete Appointment Saga
function* deleteAppointmentSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    yield call(deleteAppointment, token as string | null, id);

    yield put({
      type: DELETE_APPOINTMENT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: DELETE_APPOINTMENT_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Watcher Saga
export function* watchAppointments(): Generator {
  yield takeLatest(GET_APPOINTMENTS_REQUEST, getAppointmentsSaga);
  yield takeLatest(GET_APPOINTMENT_REQUEST, getAppointmentSaga);
  yield takeLatest(CREATE_APPOINTMENT_REQUEST, createAppointmentSaga);
  yield takeLatest(UPDATE_APPOINTMENT_REQUEST, updateAppointmentSaga);
  yield takeLatest(DELETE_APPOINTMENT_REQUEST, deleteAppointmentSaga);
}
