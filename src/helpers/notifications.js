import {NOTIFICATIONS} from '../constants';
import util from '../util';

export function manipulateNotificationList(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtList = [];
  list.forEach((item, index) => {
    let mNotificationObj = manipulateNotification(item);
    mArtList.push(mNotificationObj);
  });
  return mArtList;
}

export function manipulateNotification(payload) {
  const {notification_type, extra_data} = payload || {};
  const extraData = JSON.parse(extra_data) || {};
  let mNotObj = {};
  switch (notification_type) {
    case NOTIFICATIONS.USER_FOLLOWED_YOU: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = payload?.art ?? {};
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }
    case NOTIFICATIONS.ORDER_PLACED: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['order'] = extraData?.order ?? {};
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }
    case NOTIFICATIONS.ORDER_STATUS_CHANGED: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['order'] = extraData?.order ?? {};
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }
    case NOTIFICATIONS.COMMENT_ON_ART: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }
    case NOTIFICATIONS.LIKE_ON_COMMENT: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }
    case NOTIFICATIONS.ART_WAS_PINNED: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }
    case NOTIFICATIONS.ART_SOLDOUT: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }
    case NOTIFICATIONS.PAYMENT_EXPIRED: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['card'] = payload?.card ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }
    default: {
      break;
    }
  }
  return mNotObj;
}
