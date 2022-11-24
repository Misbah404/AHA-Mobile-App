import util from '../util';

export function manipulateCommunitiesListData(list) {
  if (util.isArrayEmpty(list)) return [];
  let mCommunityList = [];

  list.forEach((item, index) => {
    let mCommunity = {};
    mCommunity['id'] = item?.id ?? index;
    mCommunity['artistId'] = item?.artist_id ?? index;
    mCommunity['image'] = item?.image ?? undefined;
    mCommunity['profile_name'] = item?.name ?? '';
    mCommunity['isFollowing'] = item?.is_following ?? false;
    mCommunity['artist'] = item?.artist ?? {};
    mCommunity['name'] = item?.name ?? {};
    mCommunity['instagram'] = item?.instagram ?? '';
    mCommunity['tiktok'] = item?.tiktok ?? '';
    mCommunity['dribble'] = item?.dribble ?? '';
    mCommunity['facebook'] = item?.facebook ?? '';

    mCommunityList.push(mCommunity);
  });

  return mCommunityList;
}
export function manipulateCommunitiesDataOjbect(object) {
  let mCommunity = {};
  mCommunity['id'] = object?.id ?? index;
  mCommunity['artistId'] = object?.artist_id ?? index;
  mCommunity['image'] = object?.image ?? undefined;
  mCommunity['profile_name'] = object?.name ?? '';
  mCommunity['isFollowing'] = object?.is_following ?? false;
  mCommunity['artist'] = object?.artist ?? {};
  mCommunity['name'] = object?.name ?? {};
  mCommunity['instagram'] = object?.instagram ?? '';
  mCommunity['tiktok'] = object?.tiktok ?? '';
  mCommunity['dribble'] = object?.dribble ?? '';
  mCommunity['facebook'] = object?.facebook ?? '';

  return mCommunity;
}
