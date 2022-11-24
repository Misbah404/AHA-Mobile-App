// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {
  FOLLOW_UNFOLLOW_DASHBOARD_ARTIST,
  GET_ARTISTS_LIST,
  FOLLOW_UNFOLLOW_ARTIST_FROM_FOLLOWING_LIST,
  REMOVE_FOLLOWER,
  FOLLOW_UNFOLLOW_ARTIST_FROM_FOLLOWER_LIST,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  artistsList: [],
  artistFollowers: [],
  artistFollowing: [],
  followTabArtistsList: [
    {
      id: 0,
      headingName: 'Bushwick',
      image: 'https://ahauserposts.s3.amazonaws.com/Bushwick+Art+Show.png',
      profileName: 'Art Show',
      profileTagId: '@karennne',
      isFollowing: false,
      time: '06:00 pm - 07:00 pm',
      eventPlace: 'Melbourne Auditorium',
      isLastItem: false,
      isArtist: true,
    },
    {
      id: 1,
      headingName: 'Art',

      image: 'https://ahauserposts.s3.amazonaws.com/Art+Party.png',
      profileName: 'Party',
      profileTagId: '@jan',
      isFollowing: true,
      time: '04:00 pm - 05:00 pm',
      eventPlace: 'Redding Civic',
      isLastItem: false,
    },
    {
      id: 2,
      headingName: 'Crypto',

      image: 'https://ahauserposts.s3.amazonaws.com/crypto+hangout+.jpeg',
      profileName: 'Hangout',
      profileTagId: '@jan',
      isFollowing: false,
      time: '09:00 pm - 10:00 pm',
      eventPlace: 'Glendale Civic',
      isLastItem: false,
    },
    {
      id: 3,
      headingName: 'NFT',

      image: 'https://ahauserposts.s3.amazonaws.com/NFT+workshop.png',
      profileName: 'WorkShop',
      profileTagId: '@jan',
      time: '02:00 pm  - 3:00 pm',
      isFollowing: false,
      eventPlace: 'Belo Mansion',
      isLastItem: true,
    },
  ],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTISTS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        artistsList: action.data,
      });
    }
    case FOLLOW_UNFOLLOW_ARTIST_FROM_FOLLOWER_LIST.SUCCESS: {
      const {artist_id, follow: shouldFollow = true} = action.data;
      let cloned = util.cloneDeep(state.artistFollowers);
      const mIndex = util.getIndexOfObjFromArray_byID(cloned, artist_id);
      cloned[mIndex].is_following = !cloned[mIndex].is_following;
      return Immutable.merge(state, {
        artistFollowers: cloned,
      });
    }
    case FOLLOW_UNFOLLOW_ARTIST_FROM_FOLLOWING_LIST.SUCCESS: {
      const {
        artist_id,
        follow: shouldFollow = true,
        shouldRemoveFromList = true,
      } = action.data;
      let cloned = util.cloneDeep(state.artistFollowing);
      if (!!shouldFollow || !!!shouldRemoveFromList) {
        const mIndex = util.getIndexOfObjFromArray_byID(cloned, artist_id);
        cloned[mIndex].is_following = !cloned[mIndex].is_following;
        return Immutable.merge(state, {
          artistFollowing: cloned,
        });
      } else {
        cloned = util.excludeIdFromArray(cloned, artist_id);
        return Immutable.merge(state, {
          artistFollowing: cloned,
        });
      }
    }
    case REMOVE_FOLLOWER.SUCCESS: {
      const {artistFollowers} = state;
      const arrayAfterDelete = util.excludeIdFromArray(
        artistFollowers,
        action.data,
      );
      return Immutable.merge(state, {
        artistFollowers: arrayAfterDelete,
      });
    }

    case FOLLOW_UNFOLLOW_DASHBOARD_ARTIST: {
      const {dashboardArtistID} = action;

      let cloneList = _.cloneDeep(state.followTabArtistsList);

      const cloneListIndex = _.findIndex(cloneList, {id: dashboardArtistID});

      cloneList[cloneListIndex] = {
        ...cloneList[cloneListIndex],
        isFollowing: !cloneList[cloneListIndex].isFollowing,
      };
      return Immutable.merge(state, {
        followTabArtistsList: cloneList,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
