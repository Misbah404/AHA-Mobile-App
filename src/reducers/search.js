// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {
  FOLLOW_UNFOLLOW_ARTIST,
  GET_POSTS_LIST_AS_PER_VIBES,
  GET_SEARCH_LIST_DATA_BY_CATEGORY,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  arts: [],
  artists: [],
  vibes: [],
  collections: [],
  postsAsPerVibes: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_LIST_DATA_BY_CATEGORY.SUCCESS: {
      const {
        arts: mArts,
        artists: mArtists,
        vibes: mVibes,
        collections: mCollections,
      } = action.data;
      const {arts, artists, vibes, collections} = state || [];
      return Immutable.merge(state, {
        arts: util.unionById(arts, mArts),
        artists: util.unionById(artists, mArtists),
        vibes: util.unionById(vibes, mVibes),
        collections: util.unionById(collections, mCollections),
      });
    }
    case FOLLOW_UNFOLLOW_ARTIST.SUCCESS: {
      const {item: artistObj, follow} = action.data;
      const {id} = artistObj;
      const stateArtistsClone = util.cloneDeepArray(state.artists);

      const mIndex = util.findIndexById(stateArtistsClone, id);

      if (mIndex != -1) {
        stateArtistsClone[mIndex].is_following = follow;
      }
      return Immutable.merge(state, {
        artists: stateArtistsClone,
      });
    }
    case GET_POSTS_LIST_AS_PER_VIBES.SUCCESS: {
      const {postsList} = action.data;
      const statePostsAsPerVibesClone = util.cloneDeepArray(
        state.postsAsPerVibes,
      );
      return Immutable.merge(state, {
        postsAsPerVibes: util.unionById(statePostsAsPerVibesClone, postsList),
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {
        arts: [],
        artists: [],
        vibe: [],
        collections: [],
      });
    }
    default:
      return state;
  }
};
