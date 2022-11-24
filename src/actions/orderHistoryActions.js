// @flow

import {
  ORDER_HISTORY_DETAIL,
  POST_ORDER,
  GET_ORDER_HISTORY,
  GET_ORDER_HISTORY_DETAIL,
  CHANGE_ORDER_PRIVACY,
  GET_ORDER_ARTS_HISTORY,
  SAVE_ORDER_ART_HISTORY_AGAINST_USER_KEY,
  SAVE_ORDER_ARTS_HISTORY_IN_LIST,
  CALCULATE_SHIPMENT_CHARGES,
  ORDERS_DISPATCH_SHIPPO,
} from './ActionTypes';

export function orderHistoryDetail(orderID) {
  return {
    orderID,
    type: ORDER_HISTORY_DETAIL,
  };
}

export function postOrderRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_ORDER.REQUEST,
  };
}

export function postOrderSuccess(data) {
  return {
    data,
    type: POST_ORDER.SUCCESS,
  };
}

export function getOrderHistoryRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_ORDER_HISTORY.REQUEST,
  };
}

export function getOrderHistorySuccess(data) {
  return {
    data,
    type: GET_ORDER_HISTORY.SUCCESS,
  };
}
export function getOrderArtsHistoryRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: GET_ORDER_ARTS_HISTORY.REQUEST,
  };
}
export function saveOrderArtsHistortInList(data) {
  return {
    data,
    type: SAVE_ORDER_ARTS_HISTORY_IN_LIST,
  };
}
export function saveOrderArtsHistoryDataAgainstKey(data) {
  return {
    data,
    type: SAVE_ORDER_ART_HISTORY_AGAINST_USER_KEY,
  };
}

export function getOrderArtsHistorySuccess(data) {
  return {
    data,
    type: GET_ORDER_ARTS_HISTORY.SUCCESS,
  };
}

export function getOrderHistoryDetailRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_ORDER_HISTORY_DETAIL.REQUEST,
  };
}

export function getOrderHistoryDetailSuccess(data) {
  return {
    data,
    type: GET_ORDER_HISTORY_DETAIL.SUCCESS,
  };
}

export function changeOrderPrivacyRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_ORDER_PRIVACY.REQUEST,
  };
}

export function changeOrderPrivacySuccess(data) {
  return {
    data,
    type: CHANGE_ORDER_PRIVACY.SUCCESS,
  };
}

export function calculateShipmentChargesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CALCULATE_SHIPMENT_CHARGES.REQUEST,
  };
}

export function calculateShipmentChargesSuccess(data) {
  return {
    data,
    type: CALCULATE_SHIPMENT_CHARGES.SUCCESS,
  };
}

export function ordersDispatchShippoRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ORDERS_DISPATCH_SHIPPO.REQUEST,
  };
}

export function ordersDispatchShippoSuccess(data) {
  return {
    data,
    type: ORDERS_DISPATCH_SHIPPO.SUCCESS,
  };
}
