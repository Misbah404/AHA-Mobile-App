import {call, fork, put, take} from 'redux-saga/effects';
import {
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENTS_LIST,
  GET_COMMENT_REPLIES,
  LIKE_UNLIKE_COMMENT,
  POST_COMMENT,
} from '../actions/ActionTypes';
import {
  getCommentsListSuccess,
  postCommentSuccess,
  likeCommentSuccess,
  deleteCommentSuccess,
  editCommentSuccess,
  getCommentRepliesSuccess,
} from '../actions/CommentActions';
import {
  callRequest,
  GET_COMMENTS_LIST as GET_COMMENTS_LIST_URL,
  POST_COMMENT as POST_COMMENT_URL,
  LIKE_UNLIKE_COMMENT as LIKE_UNLIKE_COMMENT_URL,
  DELETE_COMMENT as DELETE_COMMENT_URL,
  EDIT_COMMENT as EDIT_COMMENT_URL,
  GET_COMMENT_REPLIES as GET_COMMENT_REPLIES_URL,
} from '../config/WebService';
import {strings} from '../constants';
import {
  manipulateCommentObject,
  manipulateCommentsList,
} from '../helpers/commentsHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

function* getCommentsList() {
  while (true) {
    const {params, responseCallback} = yield take(GET_COMMENTS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_COMMENTS_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getCommentsListSuccess(
            manipulateCommentsList(response?.data?.comments ?? []),
          ),
        );
        if (responseCallback) responseCallback(response);
      } else {
        yield put(getCommentsListSuccess([]));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}
function* getCommentsListReplies() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      GET_COMMENT_REPLIES.REQUEST,
    );
    const {parentId, offset} = payload;
    try {
      const response = yield call(
        callRequest,
        GET_COMMENT_REPLIES_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true);
        yield put(
          getCommentRepliesSuccess({
            replies: manipulateCommentsList(response?.data?.comments ?? []),
            remainingComments: response?.data?.remaining_comments,
            parentId,
            offset,
          }),
        );
      } else {
        yield put(getCommentsListSuccess([]));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* postComment() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_COMMENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_COMMENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        console.log({response});
        yield put(postCommentSuccess(manipulateCommentObject(response.data)));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response.status);
        util.topAlertError(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* likeComment() {
  while (true) {
    const {payload, responseCallback} = yield take(LIKE_UNLIKE_COMMENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        LIKE_UNLIKE_COMMENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(likeCommentSuccess(payload));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response.status);
        util.topAlertError(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* deleteComment() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      DELETE_COMMENT.REQUEST,
    );

    try {
      const response = yield call(
        callRequest,
        DELETE_COMMENT_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(deleteCommentSuccess(payload));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* editComment() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      EDIT_COMMENT.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        EDIT_COMMENT_URL,
        payload,
        params,
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(editCommentSuccess(payload));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(getCommentsList);
  yield fork(postComment);
  yield fork(likeComment);
  yield fork(deleteComment);
  yield fork(editComment);
  yield fork(getCommentsListReplies);
}
