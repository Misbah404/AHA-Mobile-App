import {call, fork, put,takeLatest, take} from 'redux-saga/effects';
import {GET_INTERESTS_LIST,SEARCH_INTERESTS_LIST, SUBMIT_INTERESTS} from '../actions/ActionTypes';
import {
  getInterestsListSuccess,
  submitInterestsSuccess,
  getInterestsListSearchSuccess
} from '../actions/Interests';
import {
  callRequest,
  GET_INTERESTS_LIST as GET_INTERESTS_LIST_URL,
  SUBMIT_INTERESTS as SUBMIT_INTERESTS_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {manipulateInterestListData} from '../helpers/vibesAndInterestsHelper';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getInterestsList() {
  while (true) {
    const {params,responseCallback} = yield take(GET_INTERESTS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_INTERESTS_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getInterestsListSuccess(manipulateInterestListData(response.data)),
        );
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* submitInterests() {
  while (true) {
    const {payload, responseCallback} = yield take(SUBMIT_INTERESTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SUBMIT_INTERESTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        yield put(submitInterestsSuccess(payload));
      } else {
        if (responseCallback) responseCallback(response.status);
        alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}


function* searchInterests(action) {
  const {params, responseCallback} = action;

  try {
    const response = yield call(
      callRequest,
      GET_INTERESTS_LIST_URL,
      {},
      params,
      {},
      ApiSauce,
    );

    if (response) {
      yield put(
          getInterestsListSearchSuccess(manipulateInterestListData(response.data)),
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
  yield fork(getInterestsList);
  yield fork(submitInterests);
  yield takeLatest(SEARCH_INTERESTS_LIST.REQUEST, searchInterests);

}
