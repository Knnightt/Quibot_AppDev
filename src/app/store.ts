import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { AppState, Action } from '../types';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store
export const store: Store<AppState, Action> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run saga
sagaMiddleware.run(rootSaga);
