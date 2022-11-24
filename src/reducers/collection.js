import Immutable from 'seamless-immutable';
import {
  GET_COLLECTION_LISTING,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
  USER_SIGNOUT,
  GET_COLLECTION_SEARCH_LISTING,
  GET_COLLECTION_DETAILS,
  POST_COLLECTION_PIN_UNPIN,
  CHANGE_PIN_PRIVACY,
  DELETE_POST_FROM_COLLECTION,
  DELETE_MULTI_COLLECTION,
  EDIT_POST,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  collectionsList: [],
  collectionsSearchList: [],
  collectionDetails: {},
  collectionArtsListing: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTION_LISTING.SUCCESS: {
      const stateCollectionsList = util.cloneDeepArray(state?.collectionsList);
      const actionCollectionsList = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(
        stateCollectionsList,
        actionCollectionsList,
      );
      return Immutable.merge(state, {
        collectionsList: mergeArray,
      });
    }
    case POST_COLLECTION_PIN_UNPIN.SUCCESS: {
      const {artist_collection_id, pin} = action.data;

      let collectionDetailsClone = util.cloneDeepArray(
        state?.collectionDetails,
      );

      if (util.hasObjectWithKey(collectionDetailsClone, artist_collection_id)) {
        let mCollectionDetailObj = collectionDetailsClone[artist_collection_id];
        const _pinLikeCount = mCollectionDetailObj?.pinLikeCount ?? 0;
        mCollectionDetailObj.isPinned = pin;
        mCollectionDetailObj.pinLikeCount = pin
          ? _pinLikeCount + 1
          : _pinLikeCount - 1;

        if (!!pin) {
          mCollectionDetailObj.isSelectedPrivacyOptionIsPublic = false;
        }

        util.extendObj(
          collectionDetailsClone[artist_collection_id],
          mCollectionDetailObj,
        );
      }
      return Immutable.merge(state, {
        collectionDetails: collectionDetailsClone,
      });
    }
    case DELETE_MULTI_COLLECTION: {
      let {collection_id: collectionId, art_id: idsToRemove} = action.data;
      let collectionDetailsClone = util.cloneDeepArray(
        state?.collectionDetails ?? [],
      );

      if (util.hasObjectWithKey(collectionDetailsClone, collectionId)) {
        const mSingleCollectionItemObj = util.cloneDeep(
          collectionDetailsClone[collectionId],
        );
        let mArtsListIds = mSingleCollectionItemObj.arts;
        mArtsListIds = util.filterArray(
          mArtsListIds,
          item => !idsToRemove.includes(item),
        );

        const data = {
          ...mSingleCollectionItemObj,
          arts: mArtsListIds,
        };
        collectionDetailsClone[collectionId] = data;
      }
      return Immutable.merge(state, {
        collectionDetails: collectionDetailsClone,
      });
    }
    case GET_COLLECTION_DETAILS.SUCCESS: {
      const singleCollectionItem = action.data;
      let {id, arts} = singleCollectionItem;
      const collectionDetailsClone = util.cloneDeepArray(
        state?.collectionDetails,
      );
      const collectionsArtList = util.cloneDeepArray(
        state?.collectionArtsListing,
      );

      const mSingleCollectionItemObj = {
        ...singleCollectionItem,
        arts: util.getIdsFromArray(arts),
      };

      let mObj = {};
      Object.assign(mObj, {[id]: mSingleCollectionItemObj});
      util.mergeObj(collectionDetailsClone, mObj);

      const mArtsList = util.unionById(collectionsArtList, arts);

      return Immutable.merge(state, {
        collectionDetails: collectionDetailsClone,
        collectionArtsListing: mArtsList,
      });
    }

    case CHANGE_PIN_PRIVACY.SUCCESS: {
      let {is_public, artist_collection_id} = action.data;
      const collectionDetailsClone = util.cloneDeepArray(
        state?.collectionDetails,
      );

      if (artist_collection_id != -1) {
        let mSingleCollectionItemObj = util.cloneDeep(
          collectionDetailsClone[artist_collection_id],
        );
        mSingleCollectionItemObj['isSelectedPrivacyOptionIsPublic'] = is_public;

        let mObj = {};
        Object.assign(mObj, {[artist_collection_id]: mSingleCollectionItemObj});
        util.mergeObj(collectionDetailsClone, mObj);
      }
      return Immutable.merge(state, {
        collectionDetails: collectionDetailsClone,
      });
    }
    case GET_COLLECTION_SEARCH_LISTING.SUCCESS: {
      return Immutable.merge(state, {
        collectionsSearchList: action.data,
      });
    }
    case CREATE_COLLECTION.SUCCESS: {
      let mCollectionObj = action.data;
      let mDataArr = util.cloneDeepArray(state.collectionsList);
      mDataArr.unshift(mCollectionObj);
      return Immutable.merge(state, {
        collectionsList: mDataArr,
      });
    }
    case DELETE_COLLECTION.SUCCESS: {
      const mCollectionId = action.data;
      let mDataArr = util.cloneDeepArray(state.collectionsList);
      mDataArr = util.filterArray(mDataArr, item => item.id !== mCollectionId);

      return Immutable.merge(state, {
        collectionsList: mDataArr,
      });
    }
    case UPDATE_COLLECTION.SUCCESS: {
      const _item = action.data;
      const {id: collectionID} = _item;
      let mDataArr = util.cloneDeepArray(state.collectionsList);
      const mIndex = util.getIndexOfObjFromArray_byID(mDataArr, collectionID);
      if (mIndex != -1) mDataArr[mIndex] = _item;
      return Immutable.merge(state, {
        collectionsList: mDataArr,
      });
    }
    case EDIT_POST.SUCCESS: {
      const actionData = util.cloneDeepArray(action.data);
      const {id} = actionData;
      let cloneCollectionArts = util.cloneDeep(state.collectionArtsListing);
      const mIndex = util.getIndexOfObjFromArray_byID(cloneCollectionArts, id);
      if (mIndex != -1) {
        if (!util.hasObjectWithKey(actionData, 'collection')) {
          cloneCollectionArts = util.excludeIdFromArray(
            cloneCollectionArts,
            id,
          );
        } else {
          if (
            actionData.collection.title !==
            cloneCollectionArts[mIndex].collection.title
          ) {
            cloneCollectionArts = util.excludeIdFromArray(
              cloneCollectionArts,
              id,
            );
          }
        }
      }
      return Immutable.merge(state, {
        collectionArtsListing: cloneCollectionArts,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
