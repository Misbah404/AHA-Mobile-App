import {call, fork, put, take} from 'redux-saga/effects';
import {GET_ARTS_RELATED} from '../actions/ActionTypes';
import {getArtsRelatedSuccess} from '../actions/CartActions';
import {
  callRequest,
  GET_ARTS_RELATED as GET_ARTS_RELATED_URL,
} from '../config/WebService';
import {manipulatePostsListingData} from '../helpers/postsHelper';
import ApiSauce from '../services/ApiSauce';

function* getArtsRelated() {
  while (true) {
    const {params, responseCallback} = yield take(GET_ARTS_RELATED.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ARTS_RELATED_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getArtsRelatedSuccess(manipulatePostsListingData(response.data)),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(getArtsRelatedSuccess([]));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(getArtsRelated);
}
