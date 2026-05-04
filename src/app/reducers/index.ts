import { combineReducers, Reducer } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import customersReducer from './customersReducer';
import petsReducer from './petsReducer';
import appointmentsReducer from './appointmentsReducer';
import staffReducer from './staffReducer';
import dashboardReducer from './dashboardReducer';
import { AppState, Action } from '../../types';

const rootReducer: Reducer<AppState, Action> = combineReducers({
  auth: authReducer,
  users: usersReducer,
  customers: customersReducer,
  pets: petsReducer,
  appointments: appointmentsReducer,
  staff: staffReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
