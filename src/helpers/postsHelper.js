import util from '../util';

// in this manipulator we are getting some params from API
export function manipulatePostsListingData(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtList = [];
  list.forEach((item, index) => {
    let mArtObj = {};
    mArtObj['id'] = item?.id ?? index;
    mArtObj['thumbnail'] = item?.thumbnail ?? undefined;
    mArtObj['title'] = item?.title ?? '';
    mArtObj['isMyPost'] = item?.is_my_post ?? false;
    mArtObj['type'] = item?.type ?? '';
    mArtObj['type'] = item?.type ?? '';
    mArtObj['resourceType'] = item?.resource_type ?? 'image';
    mArtObj['url'] = item?.uri ?? '';
    mArtList.push(mArtObj);
  });
  return mArtList;
}

export function manipulateSuggestedArtistListingData(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtistsList = [];
  list.forEach((item, index) => {
    let mArtistObj = {};
    mArtistObj['id'] = item?.id ?? index;
    mArtistObj['bio'] = item?.bio ?? '';
    mArtistObj['coverImage'] = item?.cover_image ?? undefined;
    mArtistObj['profileTagId'] = item?.profile_tag_id ?? '';
    mArtistObj['image'] = item?.image ?? false;
    mArtistsList.push(mArtistObj);
  });
  return mArtistsList;
}

export function manipulatePostListData(data) {
  const list = data?.feeds ?? [];
  const suggestedArtistsList = manipulateSuggestedArtistListingData(
    data?.artists ?? [],
  );

  if (util.isArrayEmpty(list)) return [];
  let mPostList = [];

  list.forEach((item, index) => {
    if (!util.isArrayEmpty(item?.resources ?? [])) {
      mPostList.push(manipulateSinglePostItem(item, index));
    }
  });

  if (!util.isArrayEmpty(suggestedArtistsList)) {
    let arrayOfArrays = util.chunk(suggestedArtistsList, 4);

    let mObj = {
      id: util.generateGuid(),
      is_suggestion: true,
      list: arrayOfArrays,
    };
    mPostList.push(mObj);
  }
  return mPostList;
}

export function manipulateSinglePostItem(item, index = 0) {
  let mPost = {};
  let mFeeds = [];
  let mFeedObj = {};
  let mArtist = {};
  let collection = {
    id: item?.collection?.id ?? 0,
    isMyCollection: item?.collection?.is_my_collection ?? false,
    isPublic: item?.collection?.isPublic ?? false,
    title: item?.collection?.title ?? '',
    isPinned: item?.collection?.is_pinned ?? false,
    isSelectedPrivacyOptionIsPublic:
      item?.collection?.is_pin_privacy_public ?? false,
    image: item?.collection?.image ?? undefined,
    artist: mArtist,
    isCollection: true,
    postId: item?.id,
    pinLikeCount: item?.collection?.pin_like_count ?? 0,
  };
  mPost['id'] = item?.id ?? index;
  mArtist['id'] = item?.artist?.id ?? index;
  mArtist['image'] = item?.artist?.image ?? undefined;
  mArtist['profileName'] = item?.artist?.profile_name ?? '';
  mArtist['profileTagId'] = item?.artist?.profile_tag_id ?? '';
  mArtist['coverImage'] = item?.artist?.cover_image ?? undefined;
  mPost['artist'] = mArtist;
  mPost['description'] = item?.description ?? undefined;
  mPost['long_description'] = item?.long_description ?? '';
  mPost['max_quantity'] = item?.max_quantity ?? '';
  mPost['price'] = item?.price ?? '';
  mPost['title'] = item?.title ?? '';
  mPost['size'] = item?.sizes ?? [];
  mPost['isMyPost'] = item?.is_my_post ?? false;
  mPost['isForSale'] = item?.sellable ?? false;
  mPost['thumbnail'] = item?.thumbnail ?? '';
  mPost['isPinned'] = item?.is_pinned ?? false;
  mPost['pinLikeCount'] = item?.pin_like_count ?? 0;
  mPost['isSelectedPrivacyOptionIsPublic'] =
    item?.is_pin_privacy_public ?? false;

  let feedsArr = item?.resources ?? [];
  feedsArr.forEach((mFeed, mFeedIndex) => {
    mFeedObj['id'] = mFeed?.id ?? mFeedIndex;
    mFeedObj['art'] = mFeed?.art ?? mFeedIndex;
    mFeedObj['thumbnail'] = mFeed?.thumbnail ?? '';
    mFeedObj['uri'] = mFeed?.uri ?? '';
    mFeeds.push(mFeed);
  });
  mPost['resource'] = mFeeds;
  if (util.hasObjectWithKey(item, 'collection')) {
    mPost['collection'] = collection;
  }
  mPost['has_collection'] = item?.has_collection ?? false;
  mPost['vibes'] = item?.vibes ?? [];
  mPost['type'] = item?.type ?? '';
  mPost['weight'] = item?.weight ?? '';
  mPost['mass_unit'] = item?.mass_unit ?? '';
  mPost['template'] = item?.template ?? {};
  mPost['shippable'] = item?.shippable ?? false;
  return mPost;
}
