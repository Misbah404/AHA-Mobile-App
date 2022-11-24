// @flow
import {
  ADD_CREDIT_CARD,
  DELETE_CREDIT_CARD,
  GET_CREDIT_CARDS_LISTING,
  SET_DEFAULT_CARD
} from './ActionTypes';

export function addCreditCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_CREDIT_CARD.REQUEST,
  };
}

export function addCreditCardSuccess(data) {
  return {
    data,
    type: ADD_CREDIT_CARD.SUCCESS,
  };
}

export function getCreditCardsListRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_CREDIT_CARDS_LISTING.REQUEST,
  };
}

export function getCreditCardsListSuccess(data) {
  return {
    data,
    type: GET_CREDIT_CARDS_LISTING.SUCCESS,
  };
}

export function deleteCreditCardRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: DELETE_CREDIT_CARD.REQUEST,
  };
}
export function deleteCreditCardSuccess(data) {
  return {
    data,
    type: DELETE_CREDIT_CARD.SUCCESS,
  };
}

export function setDefaultCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SET_DEFAULT_CARD.REQUEST,
  };
}

export function setDefaultCardSuccess(data) {
  return {
    data,
    type: SET_DEFAULT_CARD.SUCCESS,
  };
}
