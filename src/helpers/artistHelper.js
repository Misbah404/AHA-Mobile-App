import util from '../util';
import DataTypes from '../dataTypes';

export function manipulateArtistsListData(list) {
  let artistList = [];
  list.forEach((element, index) => {
    let artist = {};
    artist.id = element?.id ?? index;
    artist.profileName = util.isFieldNil(element.profileName)
      ? ''
      : element.profileName;
    artist.profileTagId = util.isFieldNil(element.profileTagId)
      ? ''
      : element.profileTagId;

    artist.email = util.isFieldNil(element.email) ? '' : element.email;
    artist.username = util.isFieldNil(element.username) ? '' : element.username;
    artist.bio = util.isFieldNil(element.bio) ? '' : element.bio;
    artist.profileImage =
      util.isFieldNil(element.profileImage) ||
      util.isEmptyValue(element.profileImage)
        ? Images.profileImage
        : element.profileImage;

    artist.image =
      util.isFieldNil(element.image) || isEmptyValue(element.image)
        ? Images.profileImage
        : element.image;

    artist.following = util.isFieldNil(element.following)
      ? 0
      : element.following;

    artist.isArtist = util.isFieldNil(element.isArtist)
      ? false
      : element.isArtist;
    artist.tiktokLink = util.isFieldNil(element.tiktokLink)
      ? ''
      : element.tiktokLink;
    artist.instagramLink = util.isFieldNil(element.instagramLink)
      ? ''
      : element.instagramLink;
    artist.facebookLink = util.isFieldNil(element.facebookLink)
      ? ''
      : element.facebookLink;
    artist.dribbleLink = util.isFieldNil(element.dribbleLink)
      ? ''
      : element.dribbleLink;
    artist.isFollowing = util.isFieldNil(element.isFollowing)
      ? false
      : element.isFollowing;

    artist.followers = util.isFieldNil(element.followers)
      ? 0
      : element.followers;
    artist.following = util.isFieldNil(element.following)
      ? 0
      : element.following;
    artistList.push(artist);
  });

  return artistList;
}

export function manipulateArtistObject(mObj) {
  /**
   * @type {Artist}
   */
  const artist = {};
  artist.id = mObj?.id ?? -1;
  artist.image = mObj?.image ?? '';
  artist.profile_name = mObj?.profile_name ?? '';
  artist.profileTagId = mObj?.profile_tag_id ?? -1;
  artist.is_following = mObj?.is_following ?? false;
  artist.isArtist = mObj?.is_artist ?? true;
  artist.facebook = mObj?.facebook ?? '';
  artist.instagram = mObj?.instagram ?? '';
  artist.tiktok = mObj?.tiktok ?? '';
  artist.dribble = mObj?.dribble ?? '';
  artist.noOfFollowing = mObj?.number_of_following ?? '';
  artist.noOfFollowers = mObj?.number_of_followers ?? '';
  artist.bio = mObj?.bio ?? '';
  artist.cover_image = mObj?.cover_image ?? '';
  artist.profileImage = mObj?.image ?? '';
  return artist;
}

export function manipulateFollowingAndFollowersArtistList(mList) {
  let _list = [];
  mList.forEach(element => {
    _list.push(manipulateArtistObject(element));
  });
  return _list;
}
