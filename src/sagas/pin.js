import {call, fork, put, take} from 'redux-saga/effects';
import {
  GET_PIN_LIST,
  GET_PIN_TO_COLLECTION_LIST,
  GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION,
  PIN_TO_COLLECTION_CREATE,
  PIN_UNPIN,
  EDIT_PIN_TO_COLLECTION,
  DELETE_PIN_TO_COLLECTION,
  POST_COLLECTION_PIN_UNPIN,
} from '../actions/ActionTypes';
import {
  collectionToPinUpdate,
  createPinToCollectionAddToList,
  editPinToCollectionSuccess,
  getPostsAndCollectionsOfPinnedCollectionSuccess,
  pinListSuccess,
  pinToCollectionListSuccess,
  pinUnpinSuccess,
  postCollectionPinUnpinSuccess,
} from '../actions/PinActions';
import {
  savePinnedPostsAndCollectionAgainstArtistKey,
  savePinToCollectionsListAgainstArtistKey,
} from '../actions/UserActions';
import {
  callRequest,
  GET_PIN_LIST as GET_PIN_LIST_URL,
  GET_PIN_TO_COLLECTION_LIST as GET_PIN_TO_COLLECTION_LIST_URL,
  PIN_TO_COLLECTION_CREATE as PIN_TO_COLLECTION_CREATE_URL,
  GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION as GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION_URL,
  PIN_UNPIN as PIN_UNPIN_URL,
  EDIT_PIN_TO_COLLECTION as EDIT_PIN_TO_COLLECTION_URL,
  DELETE_PIN_TO_COLLECTION as DELETE_PIN_TO_COLLECTION_URL,
  POST_COLLECTION_PIN_UNPIN as POST_COLLECTION_PIN_UNPIN_URl,
} from '../config/WebService';
import {
  manipulatePinToCollectionListing,
  manipulateSimplePinDetail,
} from '../helpers/pinHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

function* PinUnpin() {
  while (true) {
    const {payload, responseCallback} = yield take(PIN_UNPIN.REQUEST);

    try {
      const response = yield call(
        callRequest,
        PIN_UNPIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        let pinTocollectionToUpdate = manipulatePinToCollectionListing([
          response.data,
        ]);
        let data = {pinTocollectionToUpdate, ...payload};
        yield put(pinUnpinSuccess(data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        util.topAlertError(response?.message);
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(false);
    }
  }
}

function* pinToCollectionList() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      GET_PIN_TO_COLLECTION_LIST.REQUEST,
    );
    const {
      saveDataAgainstVisitingArtistKey = false,
      artistID,
      offset,
    } = payload || {};
    try {
      const response = yield call(
        callRequest,
        GET_PIN_TO_COLLECTION_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (!!saveDataAgainstVisitingArtistKey) {
          let data = {
            id: artistID,
            pinToCollectionList: manipulatePinToCollectionListing(
              response.data,
            ),
            offset,
          };
          yield put(savePinToCollectionsListAgainstArtistKey(data));
        } else {
          yield put(
            pinToCollectionListSuccess(
              manipulatePinToCollectionListing(response.data),
            ),
          );
        }
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* pinList() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      GET_PIN_LIST.REQUEST,
    );
    const {saveDataAgainstVisitingArtistKey = false, artistID} = payload || {};
    try {
      const response = yield call(
        callRequest,
        GET_PIN_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (!!saveDataAgainstVisitingArtistKey) {
          let data = {
            id: artistID,
            pinnedPostsAndCollectionsList: manipulateSimplePinDetail(
              response.data,
            ),
          };
          yield put(savePinnedPostsAndCollectionAgainstArtistKey(data));
        } else {
          yield put(pinListSuccess(manipulateSimplePinDetail(response.data)));
        }
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* pinToCollectionCreate() {
  while (true) {
    const {payload, responseCallback} = yield take(
      PIN_TO_COLLECTION_CREATE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        PIN_TO_COLLECTION_CREATE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          createPinToCollectionAddToList(
            manipulatePinToCollectionListing([response.data]),
          ),
        );
        if (responseCallback)
          responseCallback(manipulatePinToCollectionListing([response.data]));
      } else {
        if (responseCallback) responseCallback(response.status);
        util.topAlertError(response?.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getPostsOfPinnedCollection() {
  while (true) {
    const {params, responseCallback} = yield take(
      GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        const data = manipulateSimplePinDetail(response?.data ?? []);
        yield put(getPostsAndCollectionsOfPinnedCollectionSuccess(data));
        if (responseCallback) responseCallback(util.getIdsFromArray(data));
      } else {
        if (responseCallback) responseCallback([]);
      }
    } catch (err) {
      if (responseCallback) responseCallback([]);
    }
  }
}

function* editPinToCollection() {
  while (true) {
    const {params, payload, responseCallback} = yield take(
      EDIT_PIN_TO_COLLECTION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        EDIT_PIN_TO_COLLECTION_URL,
        payload,
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          editPinToCollectionSuccess(
            manipulatePinToCollectionListing([response.data]),
          ),
        );
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* deletePinToCollection() {
  while (true) {
    const {params, payload, responseCallback} = yield take(
      DELETE_PIN_TO_COLLECTION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_PIN_TO_COLLECTION_URL,
        payload,
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* postCollectionPinUnpin() {
  while (true) {
    const {payload, responseCallback} = yield take(
      POST_COLLECTION_PIN_UNPIN.REQUEST,
    );
    const {art_id, pin, shouldOpenBottomSheet} = payload;
    let data = {
      art_id: art_id,
      pin: !pin,
      shouldOpenBottomSheet: shouldOpenBottomSheet,
    };
    try {
      const response = yield call(
        callRequest,
        POST_COLLECTION_PIN_UNPIN_URl,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          collectionToPinUpdate(
            payload,
            manipulatePinToCollectionListing([response?.data]),
          ),
        );

        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(postCollectionPinUnpinSuccess(data));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      yield put(postCollectionPinUnpinSuccess(data));
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(PinUnpin);
  yield fork(pinToCollectionList);
  yield fork(pinToCollectionCreate);
  yield fork(pinList);
  yield fork(editPinToCollection);
  yield fork(getPostsOfPinnedCollection);
  yield fork(deletePinToCollection);
  yield fork(postCollectionPinUnpin);
}
