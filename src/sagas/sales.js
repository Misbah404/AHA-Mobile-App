import {call, fork, put, takeLatest, take} from 'redux-saga/effects';
import {
  SALES_HISTORY,
  SALES_HISTORY_STATUS,
  SALES_ORDER_CHANGE,
  SALES_ORDER_HISTORY_DETAILS,
} from '../actions/ActionTypes';
import {
  salesHistoryStatusSuccess,
  salesHistorySuccess,
  salesOrderHistoryDetailsSuccess,
  salesStatusChangeSuccess,
} from '../actions/SalesActions';
import {
  callRequest,
  SALES_HISTORY as SALES_HISTORY_URL,
  SALES_HISTORY_STATUS as SALES_HISTORY_STATUS_URL,
  SALES_ORDER_HISTORY_DETAILS as SALES_ORDER_HISTORY_DETAILS_URL,
  SALES_ORDER_CHANGE as SALES_ORDER_CHANGE_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {manipulateSaleHistoryData} from '../helpers/salesHelper';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getSalesHistory() {
  while (true) {
    const {params, responseCallback} = yield take(SALES_HISTORY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SALES_HISTORY_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status) {
        yield put(
          salesHistorySuccess(manipulateSaleHistoryData(response?.data ?? [])),
        );
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response?.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* getSalesStatusHistory() {
  while (true) {
    const {params, responseCallback} = yield take(SALES_HISTORY_STATUS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SALES_HISTORY_STATUS_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status) {
        yield put(salesHistoryStatusSuccess(response?.data ?? []));
        if (responseCallback) responseCallback(response?.data);
      } else {
        if (responseCallback) responseCallback(response?.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* salesOrderHistoryDetails() {
  while (true) {
    const {params, responseCallback} = yield take(
      SALES_ORDER_HISTORY_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        SALES_ORDER_HISTORY_DETAILS_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status) {
        yield put(salesOrderHistoryDetailsSuccess(response?.data ?? []));
        if (responseCallback) responseCallback(response?.data);
      } else {
        if (responseCallback) responseCallback(response?.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* salesOrderStatusChange() {
  while (true) {
    const {payload, responseCallback} = yield take(SALES_ORDER_CHANGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SALES_ORDER_CHANGE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status) {
        // yield put(salesStatusChangeSuccess(response?.data ?? []));
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(response?.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(getSalesHistory);
  yield fork(getSalesStatusHistory);
  yield fork(salesOrderHistoryDetails);
  yield fork(salesOrderStatusChange);
}
