// @flow

import {
  DEVICE_TOKEN_NOTIFICATION,
  GET_NOTIFICATIONS,
  NOTIFICATIONS_COUNT,
  INCREASE_DECREASE_NOTIFICATION_COUNT,
  NOTIFICATION_COUNT_READ,
} from './ActionTypes';

export function getNotificationRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_NOTIFICATIONS.REQUEST,
  };
}

export function getNotificationSuccess(data) {
  return {
    data,
    type: GET_NOTIFICATIONS.SUCCESS,
  };
}
export function deviceNotificationTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DEVICE_TOKEN_NOTIFICATION.REQUEST,
  };
}

export function deviceNotificationTokenSuccess(data) {
  return {
    data,
    type: DEVICE_TOKEN_NOTIFICATION.SUCCESS,
  };
}
export function notificationsCountRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: NOTIFICATIONS_COUNT.REQUEST,
  };
}

export function notificationsCountSuccess(data) {
  return {
    data,
    type: NOTIFICATIONS_COUNT.SUCCESS,
  };
}
export function notificationCountIncDec(data) {
  return {
    data,
    type: INCREASE_DECREASE_NOTIFICATION_COUNT,
  };
}
export function notificationCountRead(data) {
  return {
    data,
    type: NOTIFICATION_COUNT_READ,
  };
}
