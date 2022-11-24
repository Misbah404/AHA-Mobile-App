// @flow

import {
  GET_TRANSACTIONS_LIST,
  GET_URL_TO_ADD_NEW_BANK_ACCOUNT,
  GET_BANK_ACCOUNT_DETAILS,
  DELETE_BANK_ACCOUNT,
  REQUEST_WITHDRAWL,
} from './ActionTypes';

export function getTransactionsListRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_TRANSACTIONS_LIST.REQUEST,
  };
}

export function getTransactionsListSuccess(data) {
  return {
    data,
    type: GET_TRANSACTIONS_LIST.SUCCESS,
  };
}

export function getUrlToAddNewBankAccountRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_URL_TO_ADD_NEW_BANK_ACCOUNT.REQUEST,
  };
}

export function getUrlToAddNewBankAccountSuccess(data) {
  return {
    data,
    type: GET_URL_TO_ADD_NEW_BANK_ACCOUNT.SUCCESS,
  };
}

export function getBankAccountDetailsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_BANK_ACCOUNT_DETAILS.REQUEST,
  };
}

export function getBankAccountDetailsSuccess(data) {
  return {
    data,
    type: GET_BANK_ACCOUNT_DETAILS.SUCCESS,
  };
}

export function deleteBankAccountRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_BANK_ACCOUNT.REQUEST,
  };
}

export function deleteBankAccountSuccess(data) {
  return {
    data,
    type: DELETE_BANK_ACCOUNT.SUCCESS,
  };
}

export function requestWithdrawlRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REQUEST_WITHDRAWL.REQUEST,
  };
}

export function requestWithdrawlSuccess(data) {
  return {
    data,
    type: REQUEST_WITHDRAWL.SUCCESS,
  };
}
