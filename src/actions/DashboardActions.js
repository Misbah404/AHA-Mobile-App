// @flow

import {
  AUTOPLAY_VIDEO_FEED,
  DASHBOARD_FEEDS,
  DELETE_FEED,
  PIN_FEED,
  UPDATE_QUANTITY_FEED_BY_ID,
  AFTER_POST_DASHBOARD_UPDATE,
  SINGLE_POST_ITEM_DATA,
  CHANGE_PIN_PRIVACY,
  GET_SELLABLE_ARTS_LIST,
  SET_OPENED_SINGLE_POST_ID,
} from './ActionTypes';

export function setVideoAutoplay(data) {
  return {
    data,
    type: AUTOPLAY_VIDEO_FEED.SUCCESS,
  };
}
export function pinUnpinFeed(data) {
  return {
    data,
    type: PIN_FEED.SUCCESS,
  };
}

export function getDashBoardFeedsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DASHBOARD_FEEDS.REQUEST,
  };
}

export function getDashBoardFeedsSuccess(data, isRefreshingList) {
  return {
    data,
    isRefreshingList,
    type: DASHBOARD_FEEDS.SUCCESS,
  };
}

export function deleteFeedRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: DELETE_FEED.REQUEST,
  };
}
export function deleteFeedSuccess(data) {
  return {
    data,
    type: DELETE_FEED.SUCCESS,
  };
}

export function updateQuantityByIdAfterAddToCart(data) {
  return {
    data,
    type: UPDATE_QUANTITY_FEED_BY_ID,
  };
}

export function afterPostAddPostInDashboardFeed(data) {
  return {data, type: AFTER_POST_DASHBOARD_UPDATE};
}

export function singlePostItemData(data) {
  return {data, type: SINGLE_POST_ITEM_DATA};
}

export function changePinPrivacyRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PIN_PRIVACY.REQUEST,
  };
}

export function changePinPrivacySuccess(data) {
  return {
    data,
    type: CHANGE_PIN_PRIVACY.SUCCESS,
  };
}

export function getSellablePostsRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_SELLABLE_ARTS_LIST.REQUEST,
  };
}

export function getSellablePostsSuccess(data) {
  return {
    data,
    type: GET_SELLABLE_ARTS_LIST.SUCCESS,
  };
}

export function setSinglePostItemId(data) {
  return {
    data,
    type: SET_OPENED_SINGLE_POST_ID,
  };
}
