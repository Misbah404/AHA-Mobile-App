// @flow
import Immutable from 'seamless-immutable';
import {
  DELETE_FEED,
  DELETE_POST_FROM_COLLECTION,
  EDIT_POST,
  EMPTY_CREATE_POST_DATA_TEMP,
  GET_SINGLE_USER_OR_ARTIST_POST_LIST,
  POST_AN_ART,
  STORE_CREATE_POST_DATA_TEMP,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import {manipulatePostsListingData} from '../helpers/postsHelper';
import util from '../util';

const initialState = Immutable({
  temperoryDataOfCreatePost: {},
  loggedInUserOrArtistPostsList: [],
  visitingUserOrArtistPostsList: [],
  loggedInArtistCollectionPostsList: [],
  visitingArtistCollectionPostsList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_USER_OR_ARTIST_POST_LIST.SUCCESS: {
      const {isMyPost = false} = action.data[0] || {};
      if (!!isMyPost) {
        const stateLoggedInUserOrArtistPostsList = util.cloneDeepArray(
          state?.loggedInUserOrArtistPostsList,
        );
        const actionLoggedInUserOrArtistPostsList = util.cloneDeepArray(
          action?.data,
        );
        const mergeArray = util.unionById(
          stateLoggedInUserOrArtistPostsList,
          actionLoggedInUserOrArtistPostsList,
        );
        return Immutable.merge(state, {
          loggedInUserOrArtistPostsList: mergeArray,
          loggedInArtistCollectionPostsList: action.data,
        });
      } else
        return Immutable.merge(state, {
          visitingUserOrArtistPostsList: action.data,
          visitingArtistCollectionPostsList: action.data,
        });
    }
    case EDIT_POST.SUCCESS: {
      const actionData = util.cloneDeepArray(action.data);
      const {id, type} = actionData;
      let statePost = util.cloneDeepArray(state.loggedInUserOrArtistPostsList);
      const mIndex = util.getIndexOfObjFromArray_byID(statePost, id);
      if (mIndex != -1) {
        if (type == 'drop') {
          statePost = util.excludeIdFromArray(statePost, id);
        } else {
          statePost[mIndex] = actionData;
        }
      } else {
        statePost.unshift(actionData);
      }

      return Immutable.merge(state, {
        loggedInUserOrArtistPostsList: statePost,
      });
    }

    case DELETE_POST_FROM_COLLECTION.SUCCESS: {
      const loggedInArtistCollectionPostsListState = util.cloneDeepArray(
        state.loggedInArtistCollectionPostsList,
      );
      const loggedInArtistCollectionPostsListDeleted = util.cloneDeepArray(
        action.data,
      );
      const filteredArray = loggedInArtistCollectionPostsListState.filter(
        function (element_state) {
          return (
            loggedInArtistCollectionPostsListDeleted.filter(function (
              element_action,
            ) {
              return element_action?.id == element_state?.id;
            }).length == 0
          );
        },
      );
      return Immutable.merge(state, {
        loggedInArtistCollectionPostsList: filteredArray,
      });
    }

    case DELETE_FEED.SUCCESS: {
      const {id} = action.data;

      let mPostsArr = util.cloneDeepArray(state.loggedInUserOrArtistPostsList);
      mPostsArr = util.excludeIdFromArray(mPostsArr, id);
      return Immutable.merge(state, {
        loggedInUserOrArtistPostsList: mPostsArr,
      });
    }
    case POST_AN_ART.SUCCESS: {
      const actionData = util.cloneDeepArray(
        manipulatePostsListingData([action.data]),
      );
      const {type} = actionData[0];
      const stateData = util.cloneDeepArray(
        state.loggedInUserOrArtistPostsList,
      );
      if (type != 'drop') {
        stateData.unshift(actionData[0]);
      }

      return Immutable.merge(state, {
        loggedInUserOrArtistPostsList: stateData,
      });
    }
    case STORE_CREATE_POST_DATA_TEMP: {
      return Immutable.merge(state, {
        temperoryDataOfCreatePost: action.data,
      });
    }
    case EMPTY_CREATE_POST_DATA_TEMP: {
      return Immutable.merge(state, {
        temperoryDataOfCreatePost: {},
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
