import {call, fork, take, takeLatest, put} from 'redux-saga/effects';
import {
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  GET_COLLECTION_DETAILS_BY_ID,
  GET_COLLECTION_LISTING,
  UPDATE_COLLECTION,
  DELETE_POSTS_COLLECTION,
  GET_COLLECTION_SEARCH_LISTING,
  GET_COLLECTION_DETAILS,
} from '../actions/ActionTypes';
import {
  createCollectionSuccess,
  deleteCollectionSuccess,
  getCollectionsListSuccess,
  setVisitingArtistCollectionsList,
  updateCollectionSuccess,
  deleteMultiPostFromCollectionSuccess,
  getCollectionsSearchListSuccess,
  getCollectionDetailsSuccess,
} from '../actions/collection';
import {
  callRequest,
  CREATE_COLLECTION as CREATE_COLLECTION_URL,
  GET_COLLECTION_LISTING as GET_COLLECTION_LISTING_URL,
  UPDATE_COLLECTION as UPDATE_COLLECTION_URL,
  DELETE_COLLECTION as DELETE_COLLECTION_URL,
  DELETE_POSTS_COLLECTION as DELETE_POSTS_COLLECTION_URL,
  GET_COLLECTION_DETAILS_BY_ID as GET_COLLECTION_DETAILS_BY_ID_URL,
  GET_COLLECTION_DETAILS as GET_COLLECTION_DETAILS_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  manipulateCollectionObject,
  manipulateCollectionsListData,
  manipulateSingleCollectionDetailsData,
} from '../helpers/collectionHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* createCollection() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_COLLECTION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_COLLECTION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(
          createCollectionSuccess(manipulateCollectionObject(response.data)),
        );
        if (responseCallback) responseCallback(true);
        util.topAlert(
          response?.message ?? strings.YOUR_COLLECTION_CREATED_SUCCESSFULLY,
        );
      } else {
        if (responseCallback) responseCallback(false);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getCollectionList() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      GET_COLLECTION_LISTING.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_COLLECTION_LISTING_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        const mData = manipulateCollectionsListData(response?.data ?? []);
        const {isLoggedInUserOrArtist} = payload;
        if (isLoggedInUserOrArtist ?? false) {
          yield put(getCollectionsListSuccess(mData));
        } else {
          let data = {
            id: payload.id,
            list: mData,
          };
          yield put(setVisitingArtistCollectionsList(data));
        }
        if (responseCallback) responseCallback(mData);
      } else {
        if (responseCallback) responseCallback([]);
      }
    } catch (err) {
      if (responseCallback) responseCallback([]);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* updateCollection() {
  while (true) {
    const {collectionId, payload, responseCallback} = yield take(
      UPDATE_COLLECTION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        UPDATE_COLLECTION_URL,
        payload,
        collectionId,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          updateCollectionSuccess(manipulateCollectionObject(response.data)),
        );
        if (responseCallback) responseCallback(true);
        util.topAlert(
          response?.message ?? strings.YOUR_RESPONSE_ADDED_SUCCESSFULLY,
        );
      } else {
        if (responseCallback) responseCallback(false);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* deleteCollection() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_COLLECTION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_COLLECTION_URL,
        {},
        payload,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true);
        yield put(deleteCollectionSuccess(payload));
      } else {
        if (responseCallback) responseCallback(false);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getCollectionDetailsById() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_COLLECTION_DETAILS_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_COLLECTION_DETAILS_BY_ID_URL,
        {},
        payload,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true, response?.data ?? []);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* deletePostsCollection() {
  while (true) {
    const {payload, responseCallback} = yield take(
      DELETE_POSTS_COLLECTION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_POSTS_COLLECTION_URL,
        {},
        payload,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true);
        yield put(deleteMultiPostFromCollectionSuccess(payload));
      } else {
        if (responseCallback) responseCallback(false);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* searchCollection(action) {
  const {payload, params, responseCallback} = action;

  try {
    const response = yield call(
      callRequest,
      GET_COLLECTION_LISTING_URL,
      payload,
      params,
      {},
      ApiSauce,
    );
    if (response.status) {
      const mData = manipulateCollectionsListData(response?.data ?? []);
      yield put(getCollectionsSearchListSuccess(mData));
      if (responseCallback) responseCallback(true, null);
    } else {
      yield put(getCollectionsSearchListSuccess([]));
      if (responseCallback) responseCallback(null, null);
    }
  } catch (err) {
    if (responseCallback) responseCallback(null, err);
  }
}

function* getCollectionDetailsList() {
  while (true) {
    const {params, responseCallback} = yield take(
      GET_COLLECTION_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_COLLECTION_DETAILS_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        const mData = manipulateSingleCollectionDetailsData(
          response?.data ?? [],
        );
        yield put(getCollectionDetailsSuccess(mData));
        if (responseCallback)
          responseCallback(util.getIdsFromArray(response?.data?.arts ?? []));
      } else {
        if (responseCallback) responseCallback([]);
      }
    } catch (err) {
      if (responseCallback) responseCallback([]);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(createCollection);
  yield fork(getCollectionList);
  yield fork(updateCollection);
  yield fork(deleteCollection);
  yield fork(getCollectionDetailsById);
  yield fork(deletePostsCollection);
  yield fork(getCollectionDetailsList);
  yield takeLatest(GET_COLLECTION_SEARCH_LISTING.REQUEST, searchCollection);
}
