// @flow
import Immutable from 'seamless-immutable';
import {
  COLLECTION_TO_PIN_UPDATE,
  CREATE_PIN_TO_COLLECTION_ADD_LIST,
  DELETE_PIN_TO_COLLECTION,
  EDIT_PIN_TO_COLLECTION,
  GET_PIN_LIST,
  GET_PIN_TO_COLLECTION_LIST,
  GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION,
  PIN_TO_COLLECTION_ADD,
  PIN_UNPIN,
  PIN_UNPIN_FEED,
  PIN_UNPIN_LIST_UPDATE,
  POST_COLLECTION_PIN_UNPIN,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import {manipulatePinToCollectionListing} from '../helpers/pinHelper';
import util from '../util';
const initialState = Immutable({
  pinToCollectionList: [],
  pinPostList: [],
  feedPinData: {},
  postsOfPinnedCollection: [],
  pinnedPostsAndCollectionListing: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PIN_TO_COLLECTION_LIST.SUCCESS: {
      const statePinToCollectionList = util.cloneDeepArray(
        state?.pinToCollectionList ?? [],
      );
      const actionPinToCollectionList = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(
        statePinToCollectionList,
        actionPinToCollectionList,
      );
      return Immutable.merge(state, {pinToCollectionList: mergeArray});
    }
    case GET_PIN_LIST.SUCCESS: {
      const statePinPostList = util.cloneDeepArray(state?.pinPostList);
      const actionPinPostList = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(statePinPostList, actionPinPostList);
      return Immutable.merge(state, {pinPostList: mergeArray});
    }
    case PIN_UNPIN_LIST_UPDATE: {
      const {isPin, data} = action;
      const {id} = data;
      let statePinPostList = util.cloneDeep(state?.pinPostList ?? []);
      const mIndex = util.findIndexById(statePinPostList, id);
      if (mIndex != -1) {
        statePinPostList = util.excludeIdFromArray(statePinPostList, id);
      } else {
        if (isPin) {
          const dataUpdate = util.cloneDeepArray(data);
          statePinPostList.unshift(dataUpdate);
        }
      }

      return Immutable.merge(state, {
        pinPostList: statePinPostList,
      });
    }
    case PIN_TO_COLLECTION_ADD: {
      const actionData = manipulatePinToCollectionListing([action.data]);
      let statePinToCollectionList = util.cloneDeep(
        state?.pinToCollectionList ?? [],
      );

      statePinToCollectionList.unshift(actionData[0]);

      return Immutable.merge(state, {
        pinToCollectionList: statePinToCollectionList,
      });
    }
    case POST_COLLECTION_PIN_UNPIN.SUCCESS: {
      const {artist_collection_id, pin} = action.data;

      let postsAndCollectionsOfPinnedCollectionClone = util.cloneDeepArray(
        state?.pinnedPostsAndCollectionListing ?? [],
      );
      let mIndex = util.findIndexById(
        postsAndCollectionsOfPinnedCollectionClone,
        artist_collection_id,
      );
      if (mIndex != -1) {
        const _pinLikeCount =
          postsAndCollectionsOfPinnedCollectionClone[mIndex]?.pinLikeCount ?? 0;
        postsAndCollectionsOfPinnedCollectionClone[mIndex].isPinned = pin;
        postsAndCollectionsOfPinnedCollectionClone[mIndex].pinLikeCount = pin
          ? _pinLikeCount + 1
          : _pinLikeCount - 1;
      }

      return Immutable.merge(state, {
        pinnedPostsAndCollectionListing:
          postsAndCollectionsOfPinnedCollectionClone,
      });
    }
    case GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION.SUCCESS: {
      const postsAndCollectionsOfPinnedCollectionClone = util.cloneDeepArray(
        state?.pinnedPostsAndCollectionListing ?? [],
      );
      const newPostsAndCollectionsList = util.cloneDeepArray(
        action?.data ?? [],
      );

      const data = util.unionById(
        postsAndCollectionsOfPinnedCollectionClone,
        newPostsAndCollectionsList,
      );

      return Immutable.merge(state, {
        pinnedPostsAndCollectionListing: data,
      });
    }
    case PIN_UNPIN_FEED: {
      return Immutable.merge(state, {feedPinData: action.data});
    }
    case PIN_UNPIN.SUCCESS: {
      const {art_id: id, pinTocollectionToUpdate} = action.data;

      let pinnedPosts = util.cloneDeepArray(
        state.pinnedPostsAndCollectionListing,
      );
      const index = util.getIndexOfObjFromArray_byID(pinnedPosts, id);
      if (index !== -1) {
        pinnedPosts = util.excludeIdFromArray(pinnedPosts, id);
      }

      let pinToCollectionListClone = util.cloneDeepArray(
        state.pinToCollectionList,
      );
      if (util.hasObjectWithKey(action.data, 'collection_id')) {
        if (
          util.doesArrayContainsParticularId(
            pinToCollectionListClone,
            action?.data?.collection_id ?? -1,
          )
        ) {
          let mIndex = util.findIndexById(
            pinToCollectionListClone,
            action.data.collection_id,
          );
          pinToCollectionListClone[mIndex]['image'] = null;
        }
      }
      if (!util.isFieldNil(pinTocollectionToUpdate[0])) {
        const {id} = pinTocollectionToUpdate[0];
        if (util.doesArrayContainsParticularId(pinToCollectionListClone, id)) {
          let mIndex = util.findIndexById(pinToCollectionListClone, id);
          pinToCollectionListClone[mIndex] = pinTocollectionToUpdate[0];
        }
      }

      return Immutable.merge(state, {
        postsOfPinnedCollection: pinnedPosts,
        pinnedPostsAndCollectionListing: pinnedPosts,
        pinToCollectionList: pinToCollectionListClone,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case EDIT_PIN_TO_COLLECTION.SUCCESS: {
      const statePinCollectionListing = util.cloneDeepArray(
        state.pinToCollectionList,
      );
      const actionData = util.cloneDeepArray(action.data);
      const {id} = actionData[0];
      const mIndex = util.getIndexOfObjFromArray_byID(
        statePinCollectionListing,
        id,
      );
      statePinCollectionListing[mIndex] = actionData[0];
      return Immutable.merge(state, {
        pinToCollectionList: statePinCollectionListing,
      });
    }
    case DELETE_PIN_TO_COLLECTION.SUCCESS: {
      const statePinCollectionListing = util.cloneDeepArray(
        state.pinToCollectionList,
      );
      const id = action.data;

      const afterRemoveItem = util.excludeIdFromArray(
        statePinCollectionListing,
        id,
      );
      return Immutable.merge(state, {
        pinToCollectionList: afterRemoveItem,
      });
    }
    case CREATE_PIN_TO_COLLECTION_ADD_LIST: {
      const actionData = action.data;
      let statePinToCollectionList = util.cloneDeepArray(
        state.pinToCollectionList,
      );
      statePinToCollectionList.unshift(actionData[0]);

      return Immutable.merge(state, {
        pinToCollectionList: statePinToCollectionList,
      });
    }
    case COLLECTION_TO_PIN_UPDATE: {
      const updatedData = util.cloneDeepArray(action.updateData);
      let pinToCollectionListClone = util.cloneDeepArray(
        state.pinToCollectionList,
      );
      if (util.hasObjectWithKey(action.data, 'collection_id')) {
        if (
          util.doesArrayContainsParticularId(
            pinToCollectionListClone,
            action?.data?.collection_id ?? -1,
          )
        ) {
          let mIndex = util.findIndexById(
            pinToCollectionListClone,
            action.data.collection_id,
          );
          pinToCollectionListClone[mIndex]['image'] = updatedData[0]?.image;
        }
      } else {
        if (
          util.doesArrayContainsParticularId(
            pinToCollectionListClone,
            updatedData[0]?.id ?? -1,
          )
        ) {
          let mIndex = util.findIndexById(
            pinToCollectionListClone,
            updatedData[0]?.id,
          );
          pinToCollectionListClone[mIndex]['image'] = updatedData[0]?.image;
        }
      }
      return Immutable.merge(state, {
        pinToCollectionList: pinToCollectionListClone,
      });
    }
    default:
      return state;
  }
};
