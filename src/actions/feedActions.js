// @flow

import {
  POST_AN_ART,
  APP_SETTTINGS,
  STORE_CREATE_POST_DATA_TEMP,
  EMPTY_CREATE_POST_DATA_TEMP,
  GET_SINGLE_POST_BY_ID,
  GET_SINGLE_USER_OR_ARTIST_POST_LIST,
  DELETE_POST_FROM_COLLECTION,
  EDIT_POST,
} from './ActionTypes';

export function postAnArtRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_AN_ART.REQUEST,
  };
}

export function postAnArtSuccess(data) {
  return {
    data,
    type: POST_AN_ART.SUCCESS,
  };
}

export function editPostAnArtRequest(params, payload, responseCallback) {
  return {
    params,
    payload,
    responseCallback,
    type: EDIT_POST.REQUEST,
  };
}

export function editPostAnArtSuccess(data) {
  return {
    data,
    type: EDIT_POST.SUCCESS,
  };
}

export function appSettingsRequest(responseCallback) {
  return {
    responseCallback,
    type: APP_SETTTINGS.REQUEST,
  };
}

export function appSettingsSuccess(data) {
  return {
    data,
    type: APP_SETTTINGS.SUCCESS,
  };
}

export function storeCreatePostData(data) {
  return {
    data,
    type: STORE_CREATE_POST_DATA_TEMP,
  };
}

export function emptyCreatePostData(data) {
  return {
    data,
    type: EMPTY_CREATE_POST_DATA_TEMP,
  };
}

export function getSinglePostByIDRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SINGLE_POST_BY_ID.REQUEST,
  };
}
export function getSinglePostByIDSuccess(data) {
  return {
    data,
    type: GET_SINGLE_POST_BY_ID.SUCCESS,
  };
}

export function getSingleUserOrArtistPostsListRequest(
  payload,
  responseCallback,
) {
  return {
    payload,
    responseCallback,
    type: GET_SINGLE_USER_OR_ARTIST_POST_LIST.REQUEST,
  };
}
export function getSingleUserOrArtistPostsListSuccess(data) {
  return {
    data,
    type: GET_SINGLE_USER_OR_ARTIST_POST_LIST.SUCCESS,
  };
}

export function deletePostFromCollectionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_POST_FROM_COLLECTION.REQUEST,
  };
}
export function deletePostFromCollectionSuccess(data) {
  return {
    data,
    type: DELETE_POST_FROM_COLLECTION.SUCCESS,
  };
}
