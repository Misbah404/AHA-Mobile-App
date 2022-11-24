import {call, fork, put, take} from 'redux-saga/effects';
import {PRIVACY_POLICY, TERM_AND_CONDITION} from '../actions/ActionTypes';
import {
  privacyPolicySuccess,
  termConditionSuccess,
} from '../actions/contentPageAction';
import {
  callRequest,
  PRIVACY_POLICY as PRIVACY_POLICY_URL,
  TERM_AND_CONDITION as TERM_AND_CONDITION_URL,
} from '../config/WebService';
import { strings } from '../constants';
import ApiSauce from '../services/ApiSauce';

function* privacy_policy() {
  while (true) {
    const {responseCallback} = yield take(PRIVACY_POLICY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        PRIVACY_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response) {
        yield put(privacyPolicySuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* term_condition() {
  while (true) {
    const {responseCallback} = yield take(TERM_AND_CONDITION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        TERM_AND_CONDITION_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response) {
        yield put(termConditionSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(privacy_policy);
  yield fork(term_condition);
}
