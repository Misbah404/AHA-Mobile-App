import {call, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects';
import {
  GET_POSTS_LIST_AS_PER_VIBES,
  GET_SEARCH_LIST_DATA_BY_CATEGORY,
} from '../actions/ActionTypes';
import {
  getPostsListAsPerVibesSuccess,
  getSearchListDataByCategoryListSuccess,
} from '../actions/searchTabActions';
import {
  callRequest,
  GET_SEARCH_LIST_DATA_BY_CATEGORY as GET_SEARCH_LIST_DATA_BY_CATEGORY_URL,
  GET_POSTS_LIST_AS_PER_VIBES as GET_POSTS_LIST_AS_PER_VIBES_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {manipulatePostsListingData} from '../helpers/postsHelper';
import {manipulateSearchListData} from '../helpers/searchHelper';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getSearchListData(action) {
  const {params, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_SEARCH_LIST_DATA_BY_CATEGORY_URL,
      {},
      params,
      {},
      ApiSauce,
    );
    if (response.status) {
      const manipulatedData = manipulateSearchListData(response?.data);
      yield put(getSearchListDataByCategoryListSuccess(manipulatedData));
      if (responseCallback) responseCallback(manipulatedData);
    } else {
      if (responseCallback) responseCallback(response?.status);
    }
  } catch (err) {
    if (responseCallback) responseCallback(false);
    alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
  }
}

function* getPostsListAsPerVibes() {
  while (true) {
    const {params, responseCallback} = yield take(
      GET_POSTS_LIST_AS_PER_VIBES.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_POSTS_LIST_AS_PER_VIBES_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        const manipulatedData = manipulatePostsListingData(
          response?.data ?? [],
        );
        const data = {postsList: manipulatedData};
        yield put(getPostsListAsPerVibesSuccess(data));
        if (responseCallback) responseCallback(data);
      } else {
        if (responseCallback) responseCallback([]);
      }
    } catch (err) {
      if (responseCallback) responseCallback([]);
    }
  }
}

export default function* root() {
  yield takeLatest(GET_SEARCH_LIST_DATA_BY_CATEGORY.REQUEST, getSearchListData);
  yield fork(getPostsListAsPerVibes);
}
