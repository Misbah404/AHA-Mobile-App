import {call, fork, put, take} from 'redux-saga/effects';
import {
  CHANGE_PIN_PRIVACY,
  DASHBOARD_FEEDS,
  DELETE_FEED,
  GET_SELLABLE_ARTS_LIST,
} from '../actions/ActionTypes';
import {
  getDashBoardFeedsSuccess,
  deleteFeedSuccess,
  changePinPrivacySuccess,
  getSellablePostsSuccess,
} from '../actions/DashboardActions';
import {
  callRequest,
  DASHBOARD_FEEDS as DASHBOARD_FEEDS_URL,
  DELETE_FEED as DELETE_FEED_URL,
  CHANGE_PIN_PRIVACY as CHANGE_PIN_PRIVACY_URL,
  GET_SELLABLE_ARTS_LIST as GET_SELLABLE_ARTS_LIST_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  manipulatePostListData,
  manipulatePostsListingData,
} from '../helpers/postsHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* dashboardPosts() {
  while (true) {
    const {payload, responseCallback} = yield take(DASHBOARD_FEEDS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DASHBOARD_FEEDS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(
          getDashBoardFeedsSuccess(
            manipulatePostListData(response?.data ?? []),
            payload?.isRefreshingList ?? false,
          ),
        );
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      alert(strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* deletePost() {
  while (true) {
    const {params, responseCallback} = yield take(DELETE_FEED.REQUEST);
    const loginUserID = util.getLoginUserId();
    try {
      const response = yield call(
        callRequest,
        DELETE_FEED_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (!!response?.status ?? false) {
        yield put(deleteFeedSuccess({id: params, loginUserID}));
        if (responseCallback) responseCallback(true, null);
        Util.topAlert(response.message);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* changePinPrivacy() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PIN_PRIVACY.REQUEST);
    let payloadClone = util.cloneDeep(payload);
    const {art_id, artist_collection_id} = payloadClone;
    if (art_id == -1) delete payloadClone.art_id;
    if (artist_collection_id == -1) delete payloadClone.artist_collection_id;

    try {
      const response = yield call(
        callRequest,
        CHANGE_PIN_PRIVACY_URL,
        payloadClone,
        '',
        {},
        ApiSauce,
      );
      if (!!response?.status ?? false) {
        yield put(changePinPrivacySuccess(payload));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getSellablePostsList() {
  while (true) {
    const {params, responseCallback} = yield take(
      GET_SELLABLE_ARTS_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_SELLABLE_ARTS_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(
          getSellablePostsSuccess(manipulatePostsListingData(response.data)),
        );
        if (responseCallback)
          responseCallback(util.getIdsFromArray(response.data));
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      alert(strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(dashboardPosts);
  yield fork(deletePost);
  yield fork(changePinPrivacy);
  yield fork(getSellablePostsList);
}
