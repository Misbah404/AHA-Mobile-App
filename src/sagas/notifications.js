import {call, fork, put, take} from 'redux-saga/effects';
import {
  GET_NOTIFICATIONS,
  DEVICE_TOKEN_NOTIFICATION,
  NOTIFICATIONS_COUNT,
} from '../actions/ActionTypes';
import {
  getNotificationSuccess,
  notificationsCountSuccess,
} from '../actions/NotificationsActions';
import {
  callRequest,
  GET_NOTIFICATIONS as GET_NOTIFICATIONS_URL,
  DEVICE_TOKEN_NOTIFICATION as DEVICE_TOKEN_NOTIFICATION_URL,
  NOTIFICATIONS_COUNT as NOTIFICATIONS_COUNT_URL,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {manipulateListNotification} from '../helpers/notificationsHelper';
import {manipulateNotificationList} from '../helpers/notifications';

function* getNotification() {
  while (true) {
    const {params, responseCallback} = yield take(GET_NOTIFICATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATIONS_URL,
        '',
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getNotificationSuccess(manipulateNotificationList(response.data)),
        );
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        // util.topAlertError(response?.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}
function* deviceNotificationToken() {
  while (true) {
    const {payload, responseCallback} = yield take(
      DEVICE_TOKEN_NOTIFICATION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DEVICE_TOKEN_NOTIFICATION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deviceNotificationTokenSuccess(response.data));
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
function* getNotificationCount() {
  while (true) {
    const {payload, responseCallback} = yield take(NOTIFICATIONS_COUNT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        NOTIFICATIONS_COUNT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(notificationsCountSuccess(response.data));
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

export default function* root() {
  yield fork(getNotification);
  yield fork(deviceNotificationToken);
  yield fork(getNotificationCount);
}
