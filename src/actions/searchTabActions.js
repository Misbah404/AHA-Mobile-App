// @flow

import {
  GET_POSTS_LIST_AS_PER_VIBES,
  GET_SEARCH_LIST_DATA_BY_CATEGORY,
} from './ActionTypes';

export function getSearchListDataByCategoryListRequest(
  params,
  responseCallback,
) {
  return {
    params,
    responseCallback,
    type: GET_SEARCH_LIST_DATA_BY_CATEGORY.REQUEST,
  };
}

export function getSearchListDataByCategoryListSuccess(data) {
  return {
    data,
    type: GET_SEARCH_LIST_DATA_BY_CATEGORY.SUCCESS,
  };
}

export function getPostsListAsPerVibesRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_POSTS_LIST_AS_PER_VIBES.REQUEST,
  };
}

export function getPostsListAsPerVibesSuccess(data) {
  return {
    data,
    type: GET_POSTS_LIST_AS_PER_VIBES.SUCCESS,
  };
}
