import util from '../util';
export function manipulateOrderHistoryList(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtList = [];
  list.forEach((item, index) => {
    let mArtObj = {};
    mArtObj['id'] = item.id ?? 0;
    mArtObj['title'] = item.title ?? '';
    mArtObj['thumbnail'] = util.isValidURL(item?.thumbnail)
      ? item?.thumbnail
      : 'https://source.unsplash.com/1024x768/?girl';
    mArtObj['description'] = item?.description ?? '';
    mArtObj['total'] = item?.total ?? 0;
    mArtObj['shipment_charges'] = item?.shipment_charges ?? 0;
    mArtObj['status'] = item.status ?? 'uncompleted';
    mArtObj['product_count'] = item?.product_count ?? 1;
    mArtObj['hasMultipleProducts'] = item?.product_count > 1 ? true : false;
    mArtList.push(mArtObj);
  });

  return mArtList;
}

export function manipulateOrderHistoryDetail(item) {
  if (util.isArrayEmpty(item)) return {};

  let mArtObj = {};
  mArtObj['id'] = item?.id ?? 0;
  mArtObj['arts'] = item?.arts ?? [];
  mArtObj['thumbnail'] = util.isValidURL(item?.thumbnail)
    ? item?.thumbnail
    : 'https://source.unsplash.com/1024x768/?girl';
  mArtObj['total'] = item?.total ?? 0;
  mArtObj['subtotal'] = item?.subtotal ?? 0;
  mArtObj['shipment_charges'] = item?.shipment_charges ?? 0;
  mArtObj['status'] = item?.status ?? 'uncompleted';
  mArtObj['card'] = item?.card ?? 'N/A';
  mArtObj['isSelectedPrivacyOptionIsPublic'] = item?.is_public ?? false;

  return mArtObj;
}

export function manipulateOrderArtsHistoryList(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtList = [];
  list.forEach((item, index) => {
    let mArtObj = {};
    mArtObj['id'] = item.id ?? 0;
    mArtObj['art_id'] = item.art_id ?? 0;
    mArtObj['title'] = item.title ?? '';
    mArtObj['thumbnail'] = util.isValidURL(item?.thumbnail)
      ? item?.thumbnail
      : 'https://source.unsplash.com/1024x768/?girl';
    mArtObj['description'] = item?.description ?? '';
    mArtObj['total'] = item?.total
      ? item?.total
      : item?.price
      ? item?.price
      : 0;
    mArtObj['shipment_charges'] = item?.shipment_charges ?? 0;
    mArtObj['status'] = item.status ?? 'uncompleted';
    mArtObj['product_count'] = item?.product_count ?? 1;
    mArtObj['size'] = item?.size ?? '';
    mArtList.push(mArtObj);
  });

  return mArtList;
}
export function manipulateOrderHistoryArtAfterpurchase(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtList = [];
  list.forEach((item, index) => {
    let mArtObj = {};
    mArtObj['id'] = item.art_id ?? 0;
    mArtObj['art_id'] = item.art_id ?? 0;
    mArtObj['title'] = item.title ?? '';
    mArtObj['thumbnail'] = util.isValidURL(item?.thumbnail)
      ? item?.thumbnail
      : 'https://source.unsplash.com/1024x768/?girl';
    mArtObj['description'] = item?.description ?? '';
    mArtObj['total'] = item?.total
      ? item?.total
      : item?.price
      ? Number(item?.price)
      : 0;
    mArtObj['shipment_charges'] = item?.shipment_charges ?? 0;
    mArtObj['status'] = item.status ?? 'uncompleted';
    mArtObj['product_count'] = item?.product_count ?? 1;
    mArtObj['size'] = item?.size ?? '';
    mArtList.push(mArtObj);
  });

  return mArtList;
}
