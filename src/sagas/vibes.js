import {call, fork, put,takeLatest, take} from 'redux-saga/effects';
import {GET_VIBES_LIST,SEARCH_VIBES_LIST, SUBMIT_VIBES} from '../actions/ActionTypes';
import {getVibesListSuccess,getVibesListSearchSuccess, submitVibesSuccess} from '../actions/Vibes';
import {
  callRequest,
  GET_VIBES_LIST as GET_VIBES_LIST_URL,
  SUBMIT_VIBES as SUBMIT_VIBES_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {manipulateVibesListData} from '../helpers/vibesAndInterestsHelper';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getVibesList() {
  while (true) {
    const {params, responseCallback} = yield take(GET_VIBES_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_VIBES_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status) {
        yield put(
          getVibesListSuccess(manipulateVibesListData(response?.data ?? [])),
        );
        if (responseCallback) responseCallback(response?.data);
      } else {
        if (responseCallback) responseCallback(response?.status);
        alert(strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* submitVibes() {
  while (true) {
    const {payload, responseCallback} = yield take(SUBMIT_VIBES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SUBMIT_VIBES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        yield put(submitVibesSuccess(payload));
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* searchVibes(action) {
  const {params, responseCallback} = action;

  try {
    const response = yield call(
      callRequest,
      GET_VIBES_LIST_URL,
      {},
      params,
      {},
      ApiSauce,
    );

    if (response) {
      yield put(
          getVibesListSearchSuccess(manipulateVibesListData(response?.data ?? [])),
      );
      if (responseCallback) responseCallback(true, null);
    } else {
      if (responseCallback) responseCallback(null, null);
    }
  } catch (err) {
    if (responseCallback) responseCallback(null, err);

    console.log({err});
  }
}

export default function* root() {
  yield fork(getVibesList);
  yield fork(submitVibes);
  yield takeLatest(SEARCH_VIBES_LIST.REQUEST, searchVibes);

}
