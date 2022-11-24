import Immutable from 'seamless-immutable';
import {
  GET_NOTIFICATIONS,
  INCREASE_DECREASE_NOTIFICATION_COUNT,
  NOTIFICATIONS_COUNT,
  NOTIFICATION_COUNT_READ,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  notificationList: [],
  notificationsCount: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS.SUCCESS: {
      const stateNotification = util.cloneDeepArray(state?.notificationList);
      const actionNotification = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(stateNotification, actionNotification);
      return Immutable.merge(state, {
        notificationList: mergeArray,
      });
    }
    case NOTIFICATIONS_COUNT.SUCCESS: {
      const count = action.data?.unread_count;
      return Immutable.merge(state, {
        notificationsCount: count,
      });
    }
    case INCREASE_DECREASE_NOTIFICATION_COUNT: {
      const count = action.data;

      let stateCount = util.cloneDeep(state.notificationsCount);
      stateCount += count;

      return Immutable.merge(state, {
        notificationsCount: !util.areValuesEqual(stateCount, -1)
          ? stateCount
          : 0,
      });
    }
    case NOTIFICATION_COUNT_READ: {
      const count = action.data;
      return Immutable.merge(state, {
        notificationsCount: count,
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
