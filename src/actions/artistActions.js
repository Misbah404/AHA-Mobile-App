// @flow

import {
  FOLLOWERS_ARTIST,
  FOLLOW_UNFOLLOW_DASHBOARD_ARTIST,
  GET_ARTISTS_LIST,
  GET_USER_DETAILS_BY_ID_REQUEST,
  ORDER_HISTORY_DETAIL,
} from './ActionTypes';

export function followersArtist(artistID) {
  return {
    artistID,
    type: FOLLOWERS_ARTIST,
  };
}

export function followUnFollowDashboardArtist(dashboardArtistID) {
  return {
    dashboardArtistID,
    type: FOLLOW_UNFOLLOW_DASHBOARD_ARTIST,
  };
}

export function orderHistoryDetail(orderID) {
  return {
    orderID,
    type: ORDER_HISTORY_DETAIL,
  };
}

export function getArtistsListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_ARTISTS_LIST.REQUEST,
  };
}
export function getArtistsListSuccess(data) {
  return {
    data,
    type: GET_ARTISTS_LIST.SUCCESS,
  };
}

export function getUserDetailsByIDRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_USER_DETAILS_BY_ID_REQUEST.REQUEST,
  };
}
export function getUserDetailsByIDSuccess(data) {
  return {
    data,
    type: GET_USER_DETAILS_BY_ID_REQUEST.SUCCESS,
  };
}
