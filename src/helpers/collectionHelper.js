import util from '../util';
import {manipulateSinglePostItem} from './postsHelper';

export function manipulateCollectionsListData(list) {
  if (util.isArrayEmpty(list)) return [];
  let mCollectionList = [];

  list.forEach((item, index) => {
    let mCollection = manipulateCollectionObject(item, index);
    mCollectionList.push(mCollection);
  });

  return mCollectionList;
}

export function manipulateSingleCollectionDetailsData(mObj) {
  let data = manipulateCollectionObject(mObj);
  let artsArray = [];
  mObj.arts.forEach(item => {
    artsArray.push(manipulateSinglePostItem(item));
  });
  data['arts'] = artsArray;
  return data;
}

export function manipulateCollectionObject(item, index = -1) {
  let mCollection = {};
  mCollection['id'] = item?.id ?? index;
  mCollection['title'] = item?.title ?? '';
  mCollection['image'] = item?.image ?? undefined;
  mCollection['isPublic'] = item?.is_public ?? false;
  mCollection['isMyCollection'] = item?.is_my_collection ?? false;
  mCollection['isPinned'] = item?.is_pinned ?? false;
  mCollection['isSelectedPrivacyOptionIsPublic'] =
    item?.is_pin_privacy_public ?? false;
  mCollection['pinLikeCount'] = item?.pin_like_count ?? 0;
  mCollection['isCollection'] = true;
  mCollection['artist'] = item.artist ?? {};
  return mCollection;
}
