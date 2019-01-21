import { call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { REHYDRATE } from 'redux-persist';
import { fetchUsers } from "../../utils/api";
import { SagaIterator } from 'redux-saga';
import { setLoaded, setUsers } from "../actions/rootActions";

import ACTIONS from '../../constants/actionTypes';

function* rehydrateSaga({ type, payload }): SagaIterator {
  yield put(setLoaded(false));

  const { root: { count } } = yield select();
  const { users, limit } = yield call(fetchUsers, { count });

  yield put(setUsers({ users, limit }));
  yield put(setLoaded(true));
}

function* fetchDataSaga() {
  yield put(setLoaded(false));
  yield delay(1000);

  const { root: { filter, count, sortBy, sortOrder, offset } } = yield select();

  const { users, limit } = yield call(fetchUsers, { filter, count, sortBy, sortOrder, offset });

  yield put(setUsers({ users, limit }));
  yield put(setLoaded(true));
}

function* mySaga() {
  // fetch autocompletion on location input
  yield takeLatest(REHYDRATE, rehydrateSaga);

  yield takeLatest([
    ACTIONS.CHANGE_SORT_ORDER,
    ACTIONS.SET_FILTER,
  ], fetchDataSaga)
}

export default mySaga;
