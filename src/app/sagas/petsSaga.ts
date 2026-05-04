import { call, put, takeLatest, select, CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  GET_PETS_REQUEST,
  GET_PETS_SUCCESS,
  GET_PETS_FAILURE,
  GET_PET_REQUEST,
  GET_PET_SUCCESS,
  GET_PET_FAILURE,
  CREATE_PET_REQUEST,
  CREATE_PET_SUCCESS,
  CREATE_PET_FAILURE,
  UPDATE_PET_REQUEST,
  UPDATE_PET_SUCCESS,
  UPDATE_PET_FAILURE,
  DELETE_PET_REQUEST,
  DELETE_PET_SUCCESS,
  DELETE_PET_FAILURE,
} from '../reducers/petsReducer';
import { getPets, getPet, createPet, updatePet, deletePet } from '../api/pets';
import { AppState, Pet, CreatePetRequest, UpdatePetRequest, Action } from '../../types';

// Selector to get token from state
const getAuthToken = (state: AppState): string | null => state.auth.token;

// Get Pets Saga
function* getPetsSaga(): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const pets = yield call(getPets, token as string | null);

    yield put({
      type: GET_PETS_SUCCESS,
      payload: pets as Pet[],
    });
  } catch (error) {
    yield put({
      type: GET_PETS_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Get Pet Saga
function* getPetSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    const pet = yield call(getPet, token as string | null, id);

    yield put({
      type: GET_PET_SUCCESS,
      payload: pet as Pet,
    });
  } catch (error) {
    yield put({
      type: GET_PET_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Create Pet Saga
function* createPetSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const petData = action.payload as CreatePetRequest;
    const pet = yield call(createPet, token as string | null, petData);

    yield put({
      type: CREATE_PET_SUCCESS,
      payload: pet as Pet,
    });
  } catch (error) {
    yield put({
      type: CREATE_PET_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Update Pet Saga
function* updatePetSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const { id, petData } = action.payload as { id: number; petData: UpdatePetRequest };
    const pet = yield call(updatePet, token as string | null, id, petData);

    yield put({
      type: UPDATE_PET_SUCCESS,
      payload: pet as Pet,
    });
  } catch (error) {
    yield put({
      type: UPDATE_PET_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Delete Pet Saga
function* deletePetSaga(action: Action): Generator<SelectEffect | CallEffect | PutEffect, void, unknown> {
  try {
    const token = yield select(getAuthToken);
    const id = action.payload as number;
    yield call(deletePet, token as string | null, id);

    yield put({
      type: DELETE_PET_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: DELETE_PET_FAILURE,
      payload: (error as Error).message,
    });
  }
}

// Watcher Saga
export function* watchPets(): Generator {
  yield takeLatest(GET_PETS_REQUEST, getPetsSaga);
  yield takeLatest(GET_PET_REQUEST, getPetSaga);
  yield takeLatest(CREATE_PET_REQUEST, createPetSaga);
  yield takeLatest(UPDATE_PET_REQUEST, updatePetSaga);
  yield takeLatest(DELETE_PET_REQUEST, deletePetSaga);
}
