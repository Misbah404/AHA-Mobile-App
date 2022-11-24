// @flow

import {
  DELETE_COMMENT,
  EDIT_COMMENT,
  EMPTY_COMMENTS_LIST,
  EMPTY_REPLIES_OBJECT,
  GET_COMMENTS_LIST,
  GET_COMMENT_REPLIES,
  HIDE_SHOW_REPLIES,
  LIKE_UNLIKE_COMMENT,
  POST_COMMENT,
  REPLY_ON_COMMENT,
} from './ActionTypes';

export function getCommentsListRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_COMMENTS_LIST.REQUEST,
  };
}

export function getCommentsListSuccess(data) {
  return {
    data,
    type: GET_COMMENTS_LIST.SUCCESS,
  };
}

export function postCommentRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_COMMENT.REQUEST,
  };
}

export function postCommentSuccess(data) {
  return {
    data,
    type: POST_COMMENT.SUCCESS,
  };
}

export function editCommentRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: EDIT_COMMENT.REQUEST,
  };
}

export function editCommentSuccess(data) {
  return {
    data,
    type: EDIT_COMMENT.SUCCESS,
  };
}

export function deleteCommentRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: DELETE_COMMENT.REQUEST,
  };
}

export function deleteCommentSuccess(data) {
  return {
    data,
    type: DELETE_COMMENT.SUCCESS,
  };
}

export function likeCommentRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: LIKE_UNLIKE_COMMENT.REQUEST,
  };
}

export function likeCommentSuccess(data) {
  return {
    data,
    type: LIKE_UNLIKE_COMMENT.SUCCESS,
  };
}

export function replyOnCommentRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: REPLY_ON_COMMENT.REQUEST,
  };
}

export function replyOnCommentSuccess(data) {
  return {
    data,
    type: REPLY_ON_COMMENT.SUCCESS,
  };
}

export function emptyCommentsListReducer() {
  return {
    type: EMPTY_COMMENTS_LIST,
  };
}
export function getCommentRepliesReqiuest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: GET_COMMENT_REPLIES.REQUEST,
  };
}

export function getCommentRepliesSuccess(data) {
  return {
    data,
    type: GET_COMMENT_REPLIES.SUCCESS,
  };
}
export function hideAndShowRepliesList(data) {
  return {
    data,
    type: HIDE_SHOW_REPLIES,
  };
}
