import {call, fork, put, take} from 'redux-saga/effects';
import {
  APP_SETTTINGS,
  DELETE_POST_FROM_COLLECTION,
  GET_SINGLE_POST_BY_ID,
  GET_SINGLE_USER_OR_ARTIST_POST_LIST,
  POST_AN_ART,
  EDIT_POST,
} from '../actions/ActionTypes';
import {
  appSettingsSuccess,
  getSinglePostByIDSuccess,
  getSingleUserOrArtistPostsListSuccess,
  postAnArtSuccess,
  deletePostFromCollectionSuccess,
  editPostAnArtSuccess,
} from '../actions/feedActions';
import {
  APP_SETTTINGS as APP_SETTTINGS_URL,
  callRequest,
  GET_POSTS_LISTING as GET_POSTS_LISTING_URL,
  GET_SINGLE_POST_BY_ID as GET_SINGLE_POST_BY_ID_URL,
  POST_AN_ART as POST_AN_ART_URL,
  DELETE_POST_FROM_COLLECTION as DELETE_POST_FROM_COLLECTION_URL,
  EDIT_POST as EDIT_POST_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  manipulatePostListData,
  manipulatePostsListingData,
  manipulateSinglePostItem,
} from '../helpers/postsHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* postAnArt() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_AN_ART.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_AN_ART_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(postAnArtSuccess(response.data));
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

function* appSettings() {
  while (true) {
    const {responseCallback} = yield take(APP_SETTTINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        APP_SETTTINGS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(appSettingsSuccess(response.data));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getPostByID() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_SINGLE_POST_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_SINGLE_POST_BY_ID_URL,
        {},
        payload,
        {},
        ApiSauce,
      );
      if (response.status) {
        const data = manipulateSinglePostItem(response.data);
        yield put(getSinglePostByIDSuccess(data));
        if (responseCallback) responseCallback(data);
      } else {
        if (responseCallback) responseCallback(response.status);
        // alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getSingleUserOrArtistPostsList() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_SINGLE_USER_OR_ARTIST_POST_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_POSTS_LISTING_URL,
        {},
        payload,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback)
          responseCallback(manipulatePostsListingData(response?.data ?? []));
        yield put(
          getSingleUserOrArtistPostsListSuccess(
            manipulatePostsListingData(response?.data ?? []),
          ),
        );
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* deletePostFromCollection() {
  while (true) {
    const {payload, responseCallback} = yield take(
      DELETE_POST_FROM_COLLECTION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_POST_FROM_COLLECTION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);

        yield put(
          deletePostFromCollectionSuccess(
            manipulatePostsListingData(response?.data ?? []),
          ),
        );
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      console.log({err});
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* editPostAnArt() {
  while (true) {
    const {params, payload, responseCallback} = yield take(EDIT_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_POST_URL,
        payload,
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          editPostAnArtSuccess(manipulateSinglePostItem(response.data)),
        );
        if (responseCallback) responseCallback(response.data);
      } else {
        alert(response?.message ?? strings.UNABLE_TO_PROCESS_REQUEST);
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      console.log({err});
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(postAnArt);
  yield fork(appSettings);
  yield fork(getPostByID);
  yield fork(getSingleUserOrArtistPostsList);
  yield fork(deletePostFromCollection);
  yield fork(editPostAnArt);
}
