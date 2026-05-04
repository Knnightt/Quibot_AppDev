import { call, put, takeLatest, select, CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../reducers/usersReducer';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../api/users';
import { AppState, User, CreateUserRequest, UpdateUserRequest, Action } from '../../types';

// Selector to get token from state
const getAuthToken = (state: AppState): string | null => state.auth.token;

// Get Users Saga
function* getUsersSaga(): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const users = yield call(getUsers, token as string | null);

    yield put({
      type: GET_USERS_SUCCESS,
      payload: users as User[],
    });
  } catch (error) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Get User Saga
function* getUserSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    const user = yield call(getUser, token as string | null, id);

    yield put({
      type: GET_USER_SUCCESS,
      payload: user as User,
    });
  } catch (error) {
    yield put({
      type: GET_USER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Create User Saga
function* createUserSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const userData = action.payload as CreateUserRequest;
    const user = yield call(createUser, token as string | null, userData);

    yield put({
      type: CREATE_USER_SUCCESS,
      payload: user as User,
    });
  } catch (error) {
    yield put({
      type: CREATE_USER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Update User Saga
function* updateUserSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const { id, userData } = action.payload as { id: number; userData: UpdateUserRequest };
    const user = yield call(updateUser, token as string | null, id, userData);

    yield put({
      type: UPDATE_USER_SUCCESS,
      payload: user as User,
    });
  } catch (error) {
    yield put({
      type: UPDATE_USER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Delete User Saga
function* deleteUserSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    yield call(deleteUser, token as string | null, id);

    yield put({
      type: DELETE_USER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: DELETE_USER_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Watcher Saga
export function* watchUsers(): Generator {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(GET_USER_REQUEST, getUserSaga);
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(DELETE_USER_REQUEST, deleteUserSaga);
}
