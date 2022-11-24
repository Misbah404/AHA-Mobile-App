// @flow
import Immutable from 'seamless-immutable';
import {
  COMMUNITIES_DATA,
  DELETE_FEED,
  EDIT_POST,
  GET_ARTIST_COMMUNITIES_LIST,
  GET_COMMUNITIES_LIST_I_AM_PART_OF,
  GET_COMMUNITY_DROPS,
  SEARCH_COMMUNITY,
  USER_SIGNOUT,
  EDIT_COMMUNITY,
  COMMUNITY_DETAILS,
} from '../actions/ActionTypes';
import util from '../util';
const initialState = Immutable({
  artistCommunities: [],
  communitiesListIAmPartOf: [],
  communitiesDropsListing: [],
  community: {},
  searchCommunity: [],
  communitiesData: [],
  communityDetail: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTIST_COMMUNITIES_LIST.SUCCESS: {
      return Immutable.merge(state, {
        artistCommunities: action.data,
      });
    }
    case GET_COMMUNITIES_LIST_I_AM_PART_OF.SUCCESS: {
      const stateCommunitiesListIAmPartOf = util.cloneDeepArray(
        state?.communitiesListIAmPartOf,
      );
      const actionCommunitiesListIAmPartOf = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(
        stateCommunitiesListIAmPartOf,
        actionCommunitiesListIAmPartOf,
      );

      return Immutable.merge(state, {
        communitiesListIAmPartOf: mergeArray,
      });
    }
    case GET_COMMUNITY_DROPS.SUCCESS: {
      const {artistId: id, data} = action;
      let cloneCommunity = util.cloneDeep(state.community);
      let actionDrops = util.cloneDeep(data);
      if (util.hasObjectWithKey(cloneCommunity, id)) {
        const mStateDrops = cloneCommunity[id]?.communitiesDropsListing ?? [];
        util.extendObj(cloneCommunity[id], {
          communitiesDropsListing: util.unionById(mStateDrops, actionDrops),
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {[id]: {communitiesDropsListing: actionDrops}});
        util.mergeObj(cloneCommunity, mObj);
      }
      return Immutable.merge(state, {
        community: cloneCommunity,
      });
    }

    case EDIT_POST.SUCCESS: {
      const actionData = util.cloneDeepArray(action.data);

      const {id, artist, type} = actionData;
      const {id: artistId} = artist || {};
      let cloneCommunity = util.cloneDeep(state.community);
      if (util.hasObjectWithKey(cloneCommunity, artistId)) {
        let mStateDrops =
          cloneCommunity[artistId]?.communitiesDropsListing ?? [];

        const mIndex = util.getIndexOfObjFromArray_byID(mStateDrops, id);

        if (mIndex != -1) {
          if (type != 'drop') {
            mStateDrops = util.excludeIdFromArray(mStateDrops, id);
          }
        }
        util.extendObj(cloneCommunity[artistId], {
          communitiesDropsListing: mStateDrops,
        });
      }
      return Immutable.merge(state, {
        community: cloneCommunity,
      });
    }
    case DELETE_FEED.SUCCESS: {
      const {id, loginUserID} = action.data;
      let cloneCommunity = util.cloneDeep(state.community);
      if (util.hasObjectWithKey(cloneCommunity, loginUserID)) {
        let mStateDrops =
          cloneCommunity[loginUserID]?.communitiesDropsListing ?? [];
        const mIndex = util.getIndexOfObjFromArray_byID(mStateDrops, id);

        if (mIndex != -1) {
          mStateDrops = util.excludeIdFromArray(mStateDrops, id);
        }
        util.extendObj(cloneCommunity[loginUserID], {
          communitiesDropsListing: mStateDrops,
        });
      }
      return Immutable.merge(state, {
        community: cloneCommunity,
      });
    }
    case SEARCH_COMMUNITY.SUCCESS: {
      const stateSearchCommunity = util.cloneDeepArray(state?.searchCommunity);
      const actionCommunity = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(stateSearchCommunity, actionCommunity);
      return Immutable.merge(state, {
        searchCommunity: mergeArray,
      });
    }
    case COMMUNITIES_DATA.SUCCESS: {
      const stateCommuntiesData = util.cloneDeepArray(state?.communitiesData);
      const actionCommunitiesData = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(
        stateCommuntiesData,
        actionCommunitiesData,
      );
      return Immutable.merge(state, {
        communitiesData: mergeArray,
      });
    }

    case EDIT_COMMUNITY.SUCCESS: {
      const stateListing = util.cloneDeepArray(state.artistCommunities);
      const updatedObejct = util.cloneDeepArray(action.data);
      const {id} = updatedObejct;

      const mIndex = util.getIndexOfObjFromArray_byID(stateListing, id);
      if (mIndex != -1) {
        stateListing[mIndex] = updatedObejct;
      }
      console.log({stateListing});
      return Immutable.merge(state, {
        artistCommunities: stateListing,
        communityDetail: action.data,
      });
    }
    case COMMUNITY_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        communityDetail: action.data,
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
