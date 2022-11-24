// @flow

import {
  GET_INTERESTS_LIST,
  SEARCH_INTERESTS_LIST,
  SUBMIT_INTERESTS,
} from './ActionTypes';

export function getInterestsListRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_INTERESTS_LIST.REQUEST,
  };
}
export function getInterestsListSuccess(data) {
  return {
    data,
    type: GET_INTERESTS_LIST.SUCCESS,
  };
}

export function getInterestsListSearchRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: SEARCH_INTERESTS_LIST.REQUEST,
  };
}
export function getInterestsListSearchSuccess(data) {
  return {
    data,
    type: SEARCH_INTERESTS_LIST.SUCCESS,
  };
}

export function submitInterestsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SUBMIT_INTERESTS.REQUEST,
  };
}

export function submitInterestsSuccess(data) {
  return {
    data,
    type: SUBMIT_INTERESTS.SUCCESS,
  };
}
