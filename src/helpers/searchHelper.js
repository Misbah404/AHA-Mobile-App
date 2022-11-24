import DataTypes from '../dataTypes';
import {manipulateCollectionsListData} from './collectionHelper';
import {manipulatePostsListingData} from './postsHelper';
import {manipulateVibesListData} from './vibesAndInterestsHelper';

function manipulateArtistListObject(mObj) {
  /**
   * @type {Artist}
   */
  let artist = {};
  artist.id = mObj?.id ?? -1;
  artist.profile_name = mObj?.profile_name ?? '';
  artist.profileTagId = mObj?.profile_tag_id ?? -1;
  artist.image = mObj?.image ?? '';
  artist.profileImage = mObj?.image ?? '';
  artist.is_following = mObj?.is_following ?? false;

  return artist;
}

export function manipulateSearchListData(mObj) {
  const {
    arts = [],
    artists = [],
    vibes = [],
    art_collections = [],
    total_count,
  } = mObj || {};

  let mManipulatedData = {
    arts: [],
    artists: [],
    vibes: [],
    collections: [],
    totalCount: total_count,
  };

  /**
   * arts list
   */
  mManipulatedData.arts = manipulatePostsListingData(arts);

  /**
   * artist list
   */
  let _artistsList = [];
  artists.forEach(element => {
    _artistsList.push(manipulateArtistListObject(element));
  });
  mManipulatedData.artists = _artistsList;

  /**
   * vibes list
   */
  mManipulatedData.vibes = manipulateVibesListData(vibes);

  /**
   * art collections list
   */
  mManipulatedData.collections = manipulateCollectionsListData(art_collections);

  return mManipulatedData;
}
