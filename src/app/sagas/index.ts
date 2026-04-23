import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import { watchAuth } from './authSaga';

export default function* rootSaga(): Generator<AllEffect<ForkEffect>, void, unknown> {
  yield all([
    fork(watchAuth),
  ]);
}
