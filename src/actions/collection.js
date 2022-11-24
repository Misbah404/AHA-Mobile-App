import {
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  GET_COLLECTION_LISTING,
  UPDATE_COLLECTION,
  GET_COLLECTION_DETAILS_BY_ID,
  SET_VISTING_ARTIST_COLLECTION_LISTING,
  DELETE_POSTS_COLLECTION,
  GET_COLLECTION_SEARCH_LISTING,
  GET_COLLECTION_DETAILS,
  DELETE_MULTI_COLLECTION,
} from './ActionTypes';

export function createCollectionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_COLLECTION.REQUEST,
  };
}

export function createCollectionSuccess(data) {
  return {
    data,
    type: CREATE_COLLECTION.SUCCESS,
  };
}

export function getCollectionsListRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: GET_COLLECTION_LISTING.REQUEST,
  };
}

export function getCollectionsListSuccess(data) {
  return {
    data,
    type: GET_COLLECTION_LISTING.SUCCESS,
  };
}

export function getCollectionsSearchListRequest(
  payload,
  params,
  responseCallback,
) {
  return {
    payload,
    params,
    responseCallback,
    type: GET_COLLECTION_SEARCH_LISTING.REQUEST,
  };
}

export function getCollectionsSearchListSuccess(data) {
  return {
    data,
    type: GET_COLLECTION_SEARCH_LISTING.SUCCESS,
  };
}

export function setVisitingArtistCollectionsList(data) {
  return {
    data,
    type: SET_VISTING_ARTIST_COLLECTION_LISTING,
  };
}

export function updateCollectionRequest(
  collectionId,
  payload,
  responseCallback,
) {
  return {
    collectionId,
    payload,
    responseCallback,
    type: UPDATE_COLLECTION.REQUEST,
  };
}

export function updateCollectionSuccess(data) {
  return {
    data,
    type: UPDATE_COLLECTION.SUCCESS,
  };
}

export function deleteCollectionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_COLLECTION.REQUEST,
  };
}

export function deleteCollectionSuccess(data) {
  return {
    data,
    type: DELETE_COLLECTION.SUCCESS,
  };
}

export function getCollectionDetailsByIdRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_COLLECTION_DETAILS_BY_ID.REQUEST,
  };
}

export function getCollectionDetailsByIdSuccess(data) {
  return {
    data,
    type: GET_COLLECTION_DETAILS_BY_ID.SUCCESS,
  };
}

export function deleteMultiPostFromCollectionRequest(
  payload,
  responseCallback,
) {
  return {
    payload,
    responseCallback,
    type: DELETE_POSTS_COLLECTION.REQUEST,
  };
}

export function deleteMultiPostFromCollectionSuccess(data) {
  return {
    data,
    type: DELETE_POSTS_COLLECTION.SUCCESS,
  };
}

export function getCollectionDetailsRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_COLLECTION_DETAILS.REQUEST,
  };
}

export function getCollectionDetailsSuccess(data) {
  return {
    data,
    type: GET_COLLECTION_DETAILS.SUCCESS,
  };
}
export function deleteMultiCollection(data) {
  return {
    data,
    type: DELETE_MULTI_COLLECTION,
  };
}
