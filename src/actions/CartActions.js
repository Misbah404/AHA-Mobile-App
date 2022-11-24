// @flow

import {
  ADD_TO_CART,
  CLEAN_CART,
  GET_ARTS_RELATED,
  MY_CART_LIST_UPDATE,
  REMOVE_CART,
} from './ActionTypes';

export function cleanMyCartList() {
  return {
    type: CLEAN_CART,
  };
}

export function addToCart(data) {
  return {
    data,
    type: ADD_TO_CART,
  };
}
export function myCartListUpdate(data) {
  return {
    data,
    type: MY_CART_LIST_UPDATE,
  };
}

export function getArtsRelatedRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_ARTS_RELATED.REQUEST,
  };
}

export function getArtsRelatedSuccess(data) {
  return {
    data,
    type: GET_ARTS_RELATED.SUCCESS,
  };
}

export function removeOneCart(data) {
  return {
    data,
    type: REMOVE_CART,
  };
}
