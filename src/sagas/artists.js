import {call, fork, put, take} from 'redux-saga/effects';
import {
  GET_ARTISTS_LIST,
  GET_USER_DETAILS_BY_ID_REQUEST,
} from '../actions/ActionTypes';
import {
  getArtistsListSuccess,
  getUserDetailsByIDSuccess,
} from '../actions/artistActions';
import {
  callRequest,
  GET_ARTISTS_LIST as GET_ARTISTS_LIST_URL,
  GET_USER_DETAILS_BY_ID as GET_USER_DETAILS_BY_ID_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  manipulateArtistObject,
  manipulateArtistsListData,
} from '../helpers/artistHelper';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getArtistsList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_ARTISTS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ARTISTS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getArtistsListSuccess(manipulateArtistsListData(response.data)),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getUsetDetailsByID() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_USER_DETAILS_BY_ID_REQUEST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_USER_DETAILS_BY_ID_URL,
        {},
        payload,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback)
          responseCallback(manipulateArtistObject(response.data));
        yield put(
          getUserDetailsByIDSuccess(manipulateArtistObject(response.data)),
        );
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(getArtistsList);
  yield fork(getUsetDetailsByID);
}
