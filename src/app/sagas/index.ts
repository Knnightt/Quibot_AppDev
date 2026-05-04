import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import { watchAuth } from './authSaga';
import { watchUsers } from './usersSaga';
import { watchCustomers } from './customersSaga';
import { watchPets } from './petsSaga';
import { watchAppointments } from './appointmentsSaga';
import { watchStaff } from './staffSaga';
import { watchDashboard } from './dashboardSaga';

export default function* rootSaga(): Generator<AllEffect<ForkEffect>, void, unknown> {
  yield all([
    fork(watchAuth),
    fork(watchUsers),
    fork(watchCustomers),
    fork(watchPets),
    fork(watchAppointments),
    fork(watchStaff),
    fork(watchDashboard),
  ]);
}
