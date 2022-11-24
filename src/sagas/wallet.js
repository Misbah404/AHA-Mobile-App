import {call, fork, put, take} from 'redux-saga/effects';
import {
  GET_TRANSACTIONS_LIST,
  GET_URL_TO_ADD_NEW_BANK_ACCOUNT,
  GET_BANK_ACCOUNT_DETAILS,
  DELETE_BANK_ACCOUNT,
  REQUEST_WITHDRAWL,
} from '../actions/ActionTypes';
import {
  deleteBankAccountSuccess,
  getBankAccountDetailsSuccess,
  getTransactionsListSuccess,
  requestWithdrawlSuccess,
} from '../actions/walletActions';
import {
  callRequest,
  GET_BANK_ACCOUNT_DETAILS as GET_BANK_ACCOUNT_DETAILS_URL,
  GET_TRANSACTIONS_LIST as GET_TRANSACTIONS_LIST_URL,
  GET_URL_TO_ADD_NEW_BANK_ACCOUNT as GET_URL_TO_ADD_NEW_BANK_ACCOUNT_URL,
  DELETE_BANK_ACCOUNT as DELETE_BANK_ACCOUNT_URL,
  REQUEST_WITHDRAWL as REQUEST_WITHDRAWL_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {manipulateTransactionsData} from '../helpers/walletHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getTransactionsList() {
  while (true) {
    const {params, responseCallback} = yield take(
      GET_TRANSACTIONS_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_TRANSACTIONS_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status) {
        yield put(
          getTransactionsListSuccess(
            manipulateTransactionsData(response?.data),
          ),
        );
        if (responseCallback) responseCallback(response?.data?.transactions);
      } else {
        if (responseCallback) responseCallback(response?.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getUrlToAddNewBankAccount() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_URL_TO_ADD_NEW_BANK_ACCOUNT.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_URL_TO_ADD_NEW_BANK_ACCOUNT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status) {
        // yield put(getUrlToAddNewBankAccountSuccess(response?.data));
        if (responseCallback) responseCallback(response?.data);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getBankAccountDetails() {
  while (true) {
    const {responseCallback} = yield take(GET_BANK_ACCOUNT_DETAILS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_BANK_ACCOUNT_DETAILS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response?.status) {
        yield put(getBankAccountDetailsSuccess(response?.data ?? {}));
        if (responseCallback) responseCallback(response?.data ?? []);
      } else {
        yield put(getBankAccountDetailsSuccess({}));
        if (responseCallback) responseCallback(false);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* deleteBankAccount() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_BANK_ACCOUNT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_BANK_ACCOUNT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        util.topAlert(strings.BANK_ACCOUNT_DELETED_SUCCESSFULLY);
        yield put(deleteBankAccountSuccess());
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      console.log({err});
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* requestWithdrawl() {
  while (true) {
    const {payload, responseCallback} = yield take(REQUEST_WITHDRAWL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REQUEST_WITHDRAWL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        util.topAlert(
          response?.message ??
            strings.WITHDRAWL_REQUEST_HAS_BEEN_SUCCESSFULLY_MADE,
        );
        yield put(requestWithdrawlSuccess());
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      console.log({err});
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(getTransactionsList);
  yield fork(getUrlToAddNewBankAccount);
  yield fork(getBankAccountDetails);
  yield fork(deleteBankAccount);
  yield fork(requestWithdrawl);
}
