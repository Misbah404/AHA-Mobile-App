import {call, fork, put, take} from 'redux-saga/effects';
import {
  CALCULATE_SHIPMENT_CHARGES,
  CHANGE_ORDER_PRIVACY,
  GET_ORDER_ARTS_HISTORY,
  GET_ORDER_HISTORY,
  GET_ORDER_HISTORY_DETAIL,
  ORDERS_DISPATCH_SHIPPO,
  POST_ORDER,
} from '../actions/ActionTypes';
import {
  calculateShipmentChargesSuccess,
  changeOrderPrivacySuccess,
  getOrderArtsHistorySuccess,
  getOrderHistoryDetailSuccess,
  getOrderHistorySuccess,
  ordersDispatchShippoSuccess,
  postOrderSuccess,
  saveOrderArtsHistortInList,
  saveOrderArtsHistoryDataAgainstKey,
} from '../actions/orderHistoryActions';
import {
  callRequest,
  GET_ORDER_HISTORY as GET_ORDER_HISTORY_URL,
  GET_ORDER_HISTORY_DETAIL as GET_ORDER_HISTORY_DETAIL_URL,
  CHANGE_ORDER_PRIVACY as CHANGE_ORDER_PRIVACY_URL,
  GET_ORDER_ARTS_HISTORY as GET_ORDER_ARTS_HISTORY_URL,
  POST_ORDER as POST_ORDER_URL,
  CALCULATE_SHIPMENT_CHARGES as CALCULATE_SHIPMENT_CHARGES_URL,
  ORDERS_DISPATCH_SHIPPO as ORDERS_DISPATCH_SHIPPO_URL,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  manipulateOrderHistoryList,
  manipulateOrderHistoryDetail,
  manipulateOrderArtsHistoryList,
  manipulateOrderHistoryArtAfterpurchase,
} from '../helpers/orderhistoryhelper';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* postOrder() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_ORDER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_ORDER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        const manipulatedData = manipulateOrderHistoryArtAfterpurchase(
          response?.order?.arts,
        );
        yield put(saveOrderArtsHistortInList(manipulatedData));
        yield put(postOrderSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        util.topAlertError(response?.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getOrderHistory() {
  while (true) {
    const {params, responseCallback} = yield take(GET_ORDER_HISTORY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ORDER_HISTORY_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        const manipulatedData = manipulateOrderHistoryList(response.data);
        yield put(getOrderHistorySuccess(manipulatedData));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}
function* getOrderArtsHistory() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      GET_ORDER_ARTS_HISTORY.REQUEST,
    );
    const {artistID, saveDataAgainstVisitingUserKey = false} = payload;
    try {
      const response = yield call(
        callRequest,
        GET_ORDER_ARTS_HISTORY_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        const manipulatedData = manipulateOrderArtsHistoryList(response.data);
        if (!!saveDataAgainstVisitingUserKey) {
          let data = {
            id: artistID,
            orderArtsHistoryList: manipulatedData,
          };
          yield put(saveOrderArtsHistoryDataAgainstKey(data));
        } else {
          yield put(getOrderArtsHistorySuccess(manipulatedData));
        }
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getOrderHistoryDetail() {
  while (true) {
    const {params, responseCallback} = yield take(
      GET_ORDER_HISTORY_DETAIL.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_ORDER_HISTORY_DETAIL_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (!!response.status) {
        yield put(
          getOrderHistoryDetailSuccess(
            manipulateOrderHistoryDetail(response.data),
          ),
        );
        if (responseCallback)
          responseCallback(manipulateOrderHistoryDetail(response.data));
      } else {
        if (responseCallback) responseCallback(response.data);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* changeOrderPrivacy() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_ORDER_PRIVACY.REQUEST,
    );

    try {
      const response = yield call(
        callRequest,
        CHANGE_ORDER_PRIVACY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(changeOrderPrivacySuccess());
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* calculateShipmentChargers() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CALCULATE_SHIPMENT_CHARGES.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CALCULATE_SHIPMENT_CHARGES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.data);
      } else {
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
        if (responseCallback) responseCallback(response.data);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* ordersDispatchShippo() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ORDERS_DISPATCH_SHIPPO.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        ORDERS_DISPATCH_SHIPPO_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(ordersDispatchShippoSuccess(payload.order_art_ids));
        if (responseCallback) responseCallback(response.status);
        util.topAlert(response?.message);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(postOrder);
  yield fork(getOrderHistory);
  yield fork(getOrderHistoryDetail);
  yield fork(changeOrderPrivacy);
  yield fork(getOrderArtsHistory);
  yield fork(calculateShipmentChargers);
  yield fork(ordersDispatchShippo);
}
