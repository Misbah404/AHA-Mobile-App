// @flow
import Immutable from 'seamless-immutable';
import {
  AFTER_POST_DASHBOARD_UPDATE,
  CHANGE_PIN_PRIVACY,
  DASHBOARD_FEEDS,
  DELETE_COLLECTION,
  DELETE_FEED,
  EDIT_POST,
  GET_SELLABLE_ARTS_LIST,
  GET_SINGLE_POST_BY_ID,
  PIN_FEED,
  PIN_TO_COLLECTION_AFTER_DELETE_UNPIN,
  PIN_UNPIN,
  PIN_UNPIN_LIST_UPDATE,
  POST_COLLECTION_PIN_UNPIN,
  POST_ORDER,
  SET_OPENED_SINGLE_POST_ID,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import {manipulatePostListData} from '../helpers/postsHelper';
import util from '../util';

const initialState = Immutable({
  feeds: [],
  singlePostItemData: [],
  sellablePostsList: [],
  openedSinglePostIndex: -1,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case PIN_UNPIN.SUCCESS:
    case PIN_FEED.SUCCESS: {
      const {art_id: id, pin} = action.data;

      const pinFeedsCloned = util.cloneDeepArray(state.feeds);
      const index = util.getIndexOfObjFromArray_byID(pinFeedsCloned, id);
      if (index !== -1) {
        const pinCount = pinFeedsCloned[index].pinLikeCount;
        pinFeedsCloned[index] = {
          ...pinFeedsCloned[index],
          isPinned: pin,
          pinLikeCount: pin ? pinCount + 1 : pinCount - 1,
        };

        if (!pin) {
          pinFeedsCloned[index].isSelectedPrivacyOptionIsPublic = false;
        }
      }
      // for single post
      let singlePostItems = util.cloneDeepArray(state.singlePostItemData);
      const mIndex = util.getIndexOfObjFromArray_byID(singlePostItems, id);
      if (mIndex !== -1) {
        const pinCount = singlePostItems[mIndex]?.pinLikeCount ?? 0;
        // if found
        singlePostItems[mIndex]['isPinned'] = pin;
        singlePostItems[mIndex]['pinLikeCount'] = pin
          ? pinCount + 1
          : pinCount - 1;

        if (!pin) {
          singlePostItems[mIndex].isSelectedPrivacyOptionIsPublic = false;
        }
      }
      return Immutable.merge(state, {
        feeds: pinFeedsCloned,
        singlePostItemData: singlePostItems,
      });
    }
    case POST_COLLECTION_PIN_UNPIN.SUCCESS: {
      const {artist_collection_id, pin} = action.data;
      let feedsClone = util.cloneDeepArray(state.feeds);
      let singlePostItemsClone = util.cloneDeepArray(state.singlePostItemData);

      const mIndexFromFeedsArray = util.findData(feedsClone, item => {
        const {collection} = item;
        const {id: collectionID = -1} = collection || {};
        return util.areValuesEqual(collectionID, artist_collection_id);
      });
      if (mIndexFromFeedsArray != -1) {
        const _pinLikeCount =
          feedsClone[mIndexFromFeedsArray]?.collection?.pinLikeCount ?? 0;
        feedsClone[mIndexFromFeedsArray].collection.isPinned = pin;
        feedsClone[mIndexFromFeedsArray].collection.pinLikeCount = pin
          ? _pinLikeCount + 1
          : _pinLikeCount - 1;
      }

      const mIndexFromSinglePostFeed = util.findData(
        singlePostItemsClone,
        item => {
          const {collection} = item;
          const {id: collectionID = -1} = collection || {};
          return util.areValuesEqual(collectionID, artist_collection_id);
        },
      );
      if (mIndexFromSinglePostFeed != -1) {
        const _pinLikeCount =
          singlePostItemsClone[mIndexFromSinglePostFeed]?.collection
            ?.pinLikeCount ?? 0;
        singlePostItemsClone[mIndexFromSinglePostFeed].collection.isPinned =
          pin;
        singlePostItemsClone[mIndexFromSinglePostFeed].collection.pinLikeCount =
          pin ? _pinLikeCount + 1 : _pinLikeCount - 1;
      }
      return Immutable.merge(state, {
        feeds: feedsClone,
        singlePostItemData: singlePostItemsClone,
      });
    }
    case DELETE_COLLECTION.SUCCESS: {
      const mCollectionId = action.data;
      let mFeeds = util.cloneDeepArray(state.feeds);
      let mIndex = util.findData(
        mFeeds,
        item => item?.collection?.id === mCollectionId,
      );
      if (mIndex != -1) {
        mFeeds[mIndex].has_collection = false;
        delete mFeeds[mIndex]?.collection;
        return Immutable.merge(state, {
          feeds: mFeeds,
        });
      }
    }
    case DASHBOARD_FEEDS.SUCCESS: {
      const dataArr = action.data;

      const isRefreshingList = action.isRefreshingList;
      let data = !!isRefreshingList
        ? dataArr
        : util.unionById(state.feeds, dataArr);

      return Immutable.merge(state, {feeds: data});
    }

    case DELETE_FEED.SUCCESS: {
      const {id} = action.data;

      let mFeedsArr = util.cloneDeepArray(state.feeds);
      mFeedsArr = util.excludeIdFromArray(mFeedsArr, id);
      return Immutable.merge(state, {feeds: mFeedsArr});
    }

    case POST_ORDER.SUCCESS: {
      let stateFeed = util.cloneDeep(state.feeds);
      let singlePostItems = util.cloneDeepArray(state.singlePostItemData);
      let orderPostData = action.data;

      orderPostData.map(item => {
        const mIndex = util.getIndexOfObjFromArray_byID(stateFeed, item.id);
        const mIndexOfSinglePostItem = util.getIndexOfObjFromArray_byID(
          singlePostItems,
          item.id,
        );
        if (mIndex != -1) {
          stateFeed[mIndex]['size'] = item.sizes;
          stateFeed[mIndex]['max_quantity'] = item.max_quantity;
        }
        if (mIndexOfSinglePostItem !== -1) {
          singlePostItems[mIndexOfSinglePostItem]['size'] = item.sizes;
          singlePostItems[mIndexOfSinglePostItem]['max_quantity'] =
            item.max_quantity;
        }
      });

      return Immutable.merge(state, {
        feeds: stateFeed,
        singlePostItemData: singlePostItems,
      });
    }

    case AFTER_POST_DASHBOARD_UPDATE: {
      let stateFeeds = util.cloneDeepArray(state.feeds);
      const array = {
        feeds: [action.data],
      };
      const comingPost = manipulatePostListData(array);
      stateFeeds.unshift(comingPost?.[0]);
      return Immutable.merge(state, {feeds: stateFeeds});
    }

    case GET_SINGLE_POST_BY_ID.SUCCESS: {
      let singlePostItems = util.cloneDeepArray(state.singlePostItemData);
      const mSingleFeedObj = util.cloneDeep(action.data);
      const {id} = mSingleFeedObj;
      const mIndex = util.findIndexById(singlePostItems, id);

      if (mIndex != -1) {
        // if found
        singlePostItems[mIndex] = mSingleFeedObj;
      } else {
        singlePostItems.push(mSingleFeedObj);
      }

      return Immutable.merge(state, {
        singlePostItemData: singlePostItems,
      });
    }
    case CHANGE_PIN_PRIVACY.SUCCESS: {
      let stateFeed = util.cloneDeepArray(state.feeds);
      let singlePostItems = util.cloneDeepArray(state.singlePostItemData);

      let {art_id = -1, is_public} = action.data || {};

      if (art_id != -1) {
        const mIndex = util.getIndexOfObjFromArray_byID(stateFeed, art_id);
        if (mIndex != -1)
          stateFeed[mIndex]['isSelectedPrivacyOptionIsPublic'] = is_public;

        const mIndexOfSinglePostItem = util.getIndexOfObjFromArray_byID(
          singlePostItems,
          art_id,
        );
        if (mIndexOfSinglePostItem != -1) {
          singlePostItems[mIndexOfSinglePostItem][
            'isSelectedPrivacyOptionIsPublic'
          ] = is_public;
        }
      }

      return Immutable.merge(state, {
        feeds: stateFeed,
        singlePostItemData: singlePostItems,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {feeds: []});
    }

    case PIN_TO_COLLECTION_AFTER_DELETE_UNPIN: {
      const {ids} = action.data;
      const statePostPinInCollection = util.cloneDeepArray(state.feeds);
      ids.map(id => {
        const currentIndex = util.getIndexOfObjFromArray_byID(
          statePostPinInCollection,
          id,
        );
        if (currentIndex != -1) {
          statePostPinInCollection[currentIndex].isPinned = false;
          if (
            util.hasObjectWithKey(
              statePostPinInCollection[currentIndex],
              'collection',
            )
          ) {
            statePostPinInCollection[currentIndex].collection.isPinned = false;
          }
        }
      });
      return Immutable.merge(state, {
        feeds: statePostPinInCollection,
      });
    }

    case PIN_UNPIN_LIST_UPDATE: {
      const {id, isPin, data} = action;
      const statePostPinInCollection = util.cloneDeepArray(state.feeds);
      const mIndex = util.findIndexById(statePostPinInCollection, id);

      if (mIndex != -1 && !util.isUndefinedValue(id)) {
        if (
          util.hasObjectWithKey(statePostPinInCollection[mIndex], 'collection')
        ) {
          statePostPinInCollection[mIndex].collection.isPinned = isPin;
        }
      }

      return Immutable.merge(state, {
        feeds: statePostPinInCollection,
      });
    }

    case EDIT_POST.SUCCESS: {
      const {id, type} = action.data;
      let stateFeeds = util.cloneDeepArray(state.feeds);
      let singlePostItems = util.cloneDeepArray(state.singlePostItemData);
      if (type == 'drop') {
        stateFeeds = util.excludeIdFromArray(stateFeeds, id);
      } else {
        const mIndex = util.getIndexOfObjFromArray_byID(stateFeeds, id);
        if (mIndex != -1) {
          stateFeeds[mIndex] = action.data;
        }
      }
      const mIndexOfSinglePostItem = util.getIndexOfObjFromArray_byID(
        singlePostItems,
        id,
      );

      if (mIndexOfSinglePostItem != -1) {
        singlePostItems[mIndexOfSinglePostItem] = action.data;
      }
      return Immutable.merge(state, {
        feeds: stateFeeds,
        singlePostItemData: singlePostItems,
      });
    }
    case GET_SELLABLE_ARTS_LIST.SUCCESS: {
      const data = action.data;
      let sellablePostsList = util.cloneDeepArray(state.sellablePostsList);
      sellablePostsList = util.unionById(sellablePostsList, data);
      return Immutable.merge(state, {
        sellablePostsList: sellablePostsList,
      });
    }
    case SET_OPENED_SINGLE_POST_ID: {
      const index = action.data;
      return Immutable.merge(state, {
        openedSinglePostIndex: index,
      });
    }
    default:
      return state;
  }
};
