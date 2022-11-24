import {call, fork, put, take} from 'redux-saga/effects';
import {
  ADD_CREDIT_CARD,
  DELETE_CREDIT_CARD,
  GET_CREDIT_CARDS_LISTING,
  SET_DEFAULT_CARD,
} from '../actions/ActionTypes';
import {
  addCreditCardSuccess,
  deleteCreditCardSuccess,
  getCreditCardsListSuccess,
  setDefaultCardSuccess,
} from '../actions/CreditCardActions';
import {
  ADD_CREDIT_CARD as ADD_CREDIT_CARD_URL,
  callRequest,
  DELETE_CREDIT_CARD as DELETE_CREDIT_CARD_URL,
  GET_CREDIT_CARD_LISTING as GET_CREDIT_CARD_LISTING_URL,
  SET_DEFAULT_CARD as SET_DEFAULT_CARD_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  manipulateCreditCardListData,
  manipulateCreditCardObject,
} from '../helpers/creditCardHelper';
import ApiSauce from '../services/ApiSauce';
import {default as util, default as Util} from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addCreditCard() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_CREDIT_CARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_CREDIT_CARD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          addCreditCardSuccess(manipulateCreditCardObject(response?.data)),
        );
        if (responseCallback) responseCallback(response.status);
        util.topAlert(response?.message ?? strings.YOUR_CARD_HAS_BEEN_ADDED);
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

function* getCreditCardsList() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_CREDIT_CARDS_LISTING.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_CREDIT_CARD_LISTING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getCreditCardsListSuccess(
            manipulateCreditCardListData(response?.data ?? []),
          ),
        );
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

function* deleteCreditCard() {
  while (true) {
    const {params, responseCallback} = yield take(DELETE_CREDIT_CARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_CREDIT_CARD_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (!!response?.status ?? false) {
        yield put(deleteCreditCardSuccess(params));
        if (responseCallback) responseCallback(true, null);
        util.topAlert(response?.message);
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

function* setDefaultCreditCard() {
  while (true) {
    const {payload, responseCallback} = yield take(SET_DEFAULT_CARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SET_DEFAULT_CARD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (!!response.status) {
        yield put(setDefaultCardSuccess(payload));
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

export default function* root() {
  yield fork(addCreditCard);
  yield fork(getCreditCardsList);
  yield fork(deleteCreditCard);
  yield fork(setDefaultCreditCard);
}
