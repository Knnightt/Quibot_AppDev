import { combineReducers, Reducer } from 'redux';
import authReducer from './authReducer';
import { AppState, Action } from '../../types';

const rootReducer: Reducer<AppState, Action> = combineReducers({
  auth: authReducer,
});

export default rootReducer;
