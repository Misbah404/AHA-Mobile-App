// @flow

import {GET_VIBES_LIST,SEARCH_VIBES_LIST, SUBMIT_VIBES} from './ActionTypes';

export function getVibesListRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_VIBES_LIST.REQUEST,
  };
}
export function getVibesListSuccess(data) {
  return {
    data,
    type: GET_VIBES_LIST.SUCCESS,
  };
}



export function getVibesListSearchRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: SEARCH_VIBES_LIST.REQUEST,
  };
}
export function getVibesListSearchSuccess(data) {
  return {
    data,
    type: SEARCH_VIBES_LIST.SUCCESS,
  };
}




export function submitVibesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SUBMIT_VIBES.REQUEST,
  };
}

export function submitVibesSuccess(data) {
  return {
    data,
    type: SUBMIT_VIBES.SUCCESS,
  };
}
