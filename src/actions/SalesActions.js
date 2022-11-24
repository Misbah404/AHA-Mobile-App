// @flow

import {
  SALES_HISTORY,
  SALES_HISTORY_STATUS,
  SALES_ORDER_CHANGE,
  SALES_ORDER_HISTORY_DETAILS,
} from './ActionTypes';

export function salesHistoryRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: SALES_HISTORY.REQUEST,
  };
}

export function salesHistorySuccess(data) {
  return {
    data,
    type: SALES_HISTORY.SUCCESS,
  };
}
export function salesHistoryStatusRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: SALES_HISTORY_STATUS.REQUEST,
  };
}

export function salesHistoryStatusSuccess(data) {
  return {
    data,
    type: SALES_HISTORY_STATUS.SUCCESS,
  };
}
export function salesOrderStatusChangeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SALES_ORDER_CHANGE.REQUEST,
  };
}

export function salesOrderStatusChangeSuccess(data) {
  return {
    data,
    type: SALES_ORDER_CHANGE.SUCCESS,
  };
}
export function salesOrderHistoryDetailsRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: SALES_ORDER_HISTORY_DETAILS.REQUEST,
  };
}

export function salesOrderHistoryDetailsSuccess(data) {
  return {
    data,
    type: SALES_ORDER_HISTORY_DETAILS.SUCCESS,
  };
}
