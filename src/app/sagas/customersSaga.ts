import { call, put, takeLatest, select, CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE,
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
} from '../reducers/customersReducer';
import { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } from '../api/customers';
import { AppState, Customer, CreateCustomerRequest, UpdateCustomerRequest, Action } from '../../types';

// Selector to get token from state
const getAuthToken = (state: AppState): string | null => state.auth.token;

// Get Customers Saga
function* getCustomersSaga(): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const customers = yield call(getCustomers, token as string | null);

    yield put({
      type: GET_CUSTOMERS_SUCCESS,
      payload: customers as Customer[],
    });
  } catch (error) {
    yield put({
      type: GET_CUSTOMERS_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Get Customer Saga
function* getCustomerSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    const customer = yield call(getCustomer, token as string | null, id);

    yield put({
      type: GET_CUSTOMER_SUCCESS,
      payload: customer as Customer,
    });
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Create Customer Saga
function* createCustomerSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const customerData = action.payload as CreateCustomerRequest;
    const customer = yield call(createCustomer, token as string | null, customerData);

    yield put({
      type: CREATE_CUSTOMER_SUCCESS,
      payload: customer as Customer,
    });
  } catch (error) {
    yield put({
      type: CREATE_CUSTOMER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Update Customer Saga
function* updateCustomerSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const { id, customerData } = action.payload as { id: number; customerData: UpdateCustomerRequest };
    const customer = yield call(updateCustomer, token as string | null, id, customerData);

    yield put({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: customer as Customer,
    });
  } catch (error) {
    yield put({
      type: UPDATE_CUSTOMER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Delete Customer Saga
function* deleteCustomerSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    yield call(deleteCustomer, token as string | null, id);

    yield put({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: DELETE_CUSTOMER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Watcher Saga
export function* watchCustomers(): Generator {
  yield takeLatest(GET_CUSTOMERS_REQUEST, getCustomersSaga);
  yield takeLatest(GET_CUSTOMER_REQUEST, getCustomerSaga);
  yield takeLatest(CREATE_CUSTOMER_REQUEST, createCustomerSaga);
  yield takeLatest(UPDATE_CUSTOMER_REQUEST, updateCustomerSaga);
  yield takeLatest(DELETE_CUSTOMER_REQUEST, deleteCustomerSaga);
}
