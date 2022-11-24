import util from '../util';

export function manipulateSimplePinDetail(data) {
  if (util.isArrayEmpty(data)) return [];
  let mPinList = [];
  data.forEach((item, index) => {
    let mPinPost = {};
    const isCollection = item?.is_collection ?? false;
    if (isCollection) {
      mPinPost['id'] = item?.id ?? index;
      mPinPost['image'] = item?.image ?? null;
      mPinPost['title'] = item?.title ?? '';
      mPinPost['createdAt'] = item?.createdAt ?? null;
      mPinPost['isMyCollection'] = item?.is_my_collection ?? false;
      mPinPost['isCollection'] = item?.is_collection ?? false;
      mPinPost['isPublic'] = item?.is_public ?? false;
      mPinPost['isPinned'] = item?.is_pinned ?? false;
      mPinPost['artist'] = item?.artist ?? {};
      mPinPost['pinLikeCount'] = item?.pin_like_count ?? 0;
      mPinList.push(mPinPost);
    } else {
      mPinPost['id'] = item?.id ?? index;
      mPinPost['thumbnail'] = item?.thumbnail ?? null;
      mPinPost['artist'] = item?.artist ?? {};
      mPinPost['artist_id'] = item?.artist_id ?? 0;
      mPinPost['createdAt'] = item?.createdAt ?? null;
      mPinPost['deletedAt'] = item?.artist_id ?? null;
      mPinPost['description'] = item?.description ?? '';
      mPinPost['max_quantity'] = item?.max_quantity ?? 0;
      mPinPost['price'] = item?.price ?? 0;
      mPinPost['sellable'] = item?.sellable ?? false;
      mPinPost['title'] = item?.title ?? 0;
      mPinPost['type'] = item?.type ?? false;
      mPinPost['updatedAt'] = item?.updatedAt ?? null;
      mPinPost['isCollection'] = item?.isCollection ?? false;
      mPinList.push(mPinPost);
    }
  });
  return mPinList;
}

export function manipulatePinToCollectionListing(data) {
  if (util.isArrayEmpty(data)) return {};
  let mPinToCollectionList = [];
  data.forEach((item, _) => {
    let mPinToCollectionPost = {};
    mPinToCollectionPost['id'] = item?.id ?? 0;
    mPinToCollectionPost['image'] = item?.image ?? null;
    mPinToCollectionPost['title'] = item?.title ?? {};
    mPinToCollectionPost['user_id'] = item?.user_id ?? 0;
    mPinToCollectionPost['isMyCollection'] = item?.is_my_collection ?? false;
    mPinToCollectionPost['isCollection'] = true;
    mPinToCollectionPost['isPublic'] = item?.is_public ?? false;
    mPinToCollectionList.push(mPinToCollectionPost);
  });
  return mPinToCollectionList;
}
