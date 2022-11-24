import {
  COLLECTION_TO_PIN_UPDATE,
  CREATE_PIN_TO_COLLECTION_ADD_LIST,
  DELETE_PIN_TO_COLLECTION,
  EDIT_PIN_TO_COLLECTION,
  GET_PIN_LIST,
  GET_PIN_TO_COLLECTION_LIST,
  GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION,
  PIN_AND_COLLECTION_PRIVACY,
  PIN_TO_COLLECTION_ADD,
  PIN_TO_COLLECTION_AFTER_DELETE_UNPIN,
  PIN_TO_COLLECTION_CREATE,
  PIN_UNPIN,
  PIN_UNPIN_FEED,
  PIN_UNPIN_LIST_UPDATE,
  POST_COLLECTION_PIN_UNPIN,
} from './ActionTypes';

export function pinUnpinRequest(payload, responseCallback) {
  return {payload, responseCallback, type: PIN_UNPIN.REQUEST};
}

export function pinUnpinSuccess(data) {
  return {data, type: PIN_UNPIN.SUCCESS};
}

export function pinToCollectionCreateRequest(payload, responseCallback) {
  return {payload, responseCallback, type: PIN_TO_COLLECTION_CREATE.REQUEST};
}

export function pinToCollectionCreateSuccess(data) {
  return {data, type: PIN_TO_COLLECTION_CREATE.SUCCESS};
}

export function pinToCollectionListRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: GET_PIN_TO_COLLECTION_LIST.REQUEST,
  };
}

export function pinToCollectionListSuccess(data) {
  return {
    data,
    type: GET_PIN_TO_COLLECTION_LIST.SUCCESS,
  };
}

export function pinListRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: GET_PIN_LIST.REQUEST,
  };
}

export function pinListSuccess(data) {
  return {
    data,
    type: GET_PIN_LIST.SUCCESS,
  };
}

export function pinUnpinFeed(data) {
  return {
    data,
    type: PIN_UNPIN_FEED,
  };
}

export function getPostsAndCollectionsOfPinnedCollectionRequest(
  params,
  responseCallback,
) {
  return {
    params,
    responseCallback,
    type: GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION.REQUEST,
  };
}

export function getPostsAndCollectionsOfPinnedCollectionSuccess(data) {
  return {
    data,
    type: GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION.SUCCESS,
  };
}

export function pinUnpinListUpdate(id, isPin, data) {
  return {
    id,
    isPin,
    data,
    type: PIN_UNPIN_LIST_UPDATE,
  };
}

export function pinToCollectionListAdd(data) {
  return {
    data,
    type: PIN_TO_COLLECTION_ADD,
  };
}

export function editPinToCollectionRequest(params, payload, responseCallback) {
  return {
    params,
    payload,
    responseCallback,
    type: EDIT_PIN_TO_COLLECTION.REQUEST,
  };
}

export function editPinToCollectionSuccess(data) {
  return {
    data,
    type: EDIT_PIN_TO_COLLECTION.SUCCESS,
  };
}

export function deletePinToCollectionRequest(
  params,
  payload,
  responseCallback,
) {
  return {
    params,
    payload,
    responseCallback,
    type: DELETE_PIN_TO_COLLECTION.REQUEST,
  };
}

export function deletePinToCollectionSuccess(data) {
  return {
    data,
    type: DELETE_PIN_TO_COLLECTION.SUCCESS,
  };
}

export function postCollectionPinUnpinRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_COLLECTION_PIN_UNPIN.REQUEST,
  };
}

export function postCollectionPinUnpinSuccess(data) {
  return {
    data,
    type: POST_COLLECTION_PIN_UNPIN.SUCCESS,
  };
}

export function pinToCollectionAfterDeletePin(data) {
  return {
    data,
    type: PIN_TO_COLLECTION_AFTER_DELETE_UNPIN,
  };
}

export function pinAndCollectionPrivacy(
  collectionId,
  isSelectedPrivacyOptionIsPublic,
) {
  return {
    collectionId,
    isSelectedPrivacyOptionIsPublic,
    type: PIN_AND_COLLECTION_PRIVACY,
  };
}
export function createPinToCollectionAddToList(data) {
  return {
    data,
    type: CREATE_PIN_TO_COLLECTION_ADD_LIST,
  };
}
export function collectionToPinUpdate(data, updateData) {
  return {
    data,
    updateData,
    type: COLLECTION_TO_PIN_UPDATE,
  };
}
