import DataTypes from '../dataTypes';
import util from '../util';

export function manipulateSignInAndPersonsalInfoData(data) {
  let user = {};
  const {
    id,
    access_token,
    device_token,
    refresh_token,
    name,
    email,
    dob,
    country_code,
    contact,
    //
    username,
    bio,
    profile_image,
    is_artist,
    tiktok,
    instagram,
    facebook,
    dribble,
    followers,
    following,
    cover_image,
    login_type,
    login_attempts,
    status,
    address,
  } = data || null;

  user['status'] = status;
  user['userId'] = util.isFieldNil(id) ? -1 : id;
  user['access_token'] = util.isFieldNil(access_token) ? '' : access_token;
  user['deviceToken'] = util.isFieldNil(device_token) ? '' : device_token;
  user['refresh_token'] = util.isFieldNil(refresh_token) ? '' : refresh_token;
  user['email'] = util.isFieldNil(email) ? '' : email;
  user['countryCode'] = util.isFieldNil(country_code) ? '' : country_code;
  user['contactNo'] = util.isFieldNil(contact) ? '' : contact;
  user['name'] = util.isFieldNil(name) ? '' : name;
  user['dateOfBirth'] = util.isFieldNil(dob) ? '' : dob;
  user['loginType'] = util.isFieldNil(login_type) ? 'simple' : login_type;
  //
  user['userName'] = util.isFieldNil(username) ? '' : username;
  user['bio'] = util.isFieldNil(bio) ? '' : bio;
  user['profileImage'] = util.isFieldNil(profile_image) ? '' : profile_image;
  user['cover_image'] = util.isFieldNil(cover_image) ? '' : cover_image;
  user['isArtist'] = util.isFieldNil(is_artist) ? false : is_artist;
  user['tiktokLink'] = util.isFieldNil(tiktok) ? '' : tiktok;
  user['instagramLink'] = util.isFieldNil(instagram) ? '' : instagram;
  user['facebookLink'] = util.isFieldNil(facebook) ? '' : facebook;
  user['dribbleLink'] = util.isFieldNil(dribble) ? '' : dribble;
  user['noOfFollowers'] = util.isFieldNil(followers) ? '' : followers;
  user['noOfFollowing'] = util.isFieldNil(following) ? '' : following;
  user['loginBubbleUserFirstTime'] = util.areValuesEqual(login_attempts, 1)
    ? true
    : false;
  user['address'] = util.isEmptyObject(address) ? {} : address;
  return user;
}

export function manipulateLoggedInUserObject(mObj) {
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
  artist.wallet = mObj?.wallet ?? 0;
  artist.address = mObj?.address ?? {};

  return artist;
}

export function manipulateFollowingAndFollowersListObject(mObj) {
  /**
   * @type {Artist}
   */
  const artist = {};
  artist.id = mObj?.id ?? -1;
  artist.image = mObj?.image ?? '';
  artist.profile_name = mObj?.profile_name ?? '';
  artist.profileTagId = mObj?.profile_tag_id ?? -1;
  artist.is_following = mObj?.is_following ?? false;
  artist.isArtist = mObj?.is_artist ?? false;
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

export function manipulateFollowingAndFollowersList(mList) {
  let _list = [];
  mList.forEach(element => {
    _list.push(manipulateFollowingAndFollowersListObject(element));
  });
  return _list;
}
