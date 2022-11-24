// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {
  GET_ORDER_ARTS_HISTORY,
  GET_ORDER_HISTORY,
  GET_ORDER_HISTORY_DETAIL,
  ORDER_HISTORY_DETAIL,
  SAVE_ORDER_ARTS_HISTORY_IN_LIST,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';
const initialState = Immutable({
  orders: [
    {
      id: 1,
      orderImage: 'https://source.unsplash.com/1024x768/?girl',
      orderPrice: 50,
      isMultipleProduct: true,
      numberOfProduct: 10,
      status: 'Completed',
    },
    {
      id: 2,
      orderImage: 'https://source.unsplash.com/1024x768/?girl',
      orderPrice: 50,
      isMultipleProduct: false,
      numberOfProduct: 1,
      status: 'Completed',
    },
    {
      id: 3,
      orderImage: 'https://source.unsplash.com/1024x768/?girl',
      orderPrice: 50,
      isMultipleProduct: false,
      numberOfProduct: 1,
      status: 'Cancel',
    },
  ],
  orderHistory: [],
  orderArtsHistory: [],
  orderHistoryDetail: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_HISTORY_DETAIL: {
      const {orderID} = action;

      let mList = _.cloneDeep(state.orders);

      const index = _.findIndex(mList, {id: orderID});
      const {isExpand} = mList[index];

      mList[index] = {...mList[index], isExpand: !isExpand};
      return Immutable.merge(state, {orders: mList});
    }
    case GET_ORDER_HISTORY.SUCCESS: {
      const stateOrderHistory = util.cloneDeepArray(state?.orderHistory);
      const actionOrderHistory = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(stateOrderHistory, actionOrderHistory);
      return Immutable.merge(state, {
        orderHistory: mergeArray,
      });
    }
    case GET_ORDER_ARTS_HISTORY.SUCCESS: {
      const stateOrderArtsHistory = util.cloneDeepArray(
        state?.orderArtsHistory,
      );
      const actionOrderArtsHistory = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(
        stateOrderArtsHistory,
        actionOrderArtsHistory,
      );
      return Immutable.merge(state, {
        orderArtsHistory: mergeArray,
      });
    }
    case SAVE_ORDER_ARTS_HISTORY_IN_LIST: {
      const stateOrderArtsHistory = util.cloneDeepArray(
        state?.orderArtsHistory,
      );

      const actionOrderArtsHistory = util.cloneDeepArray(action?.data);
      const mergeArray = _.unionBy(
        actionOrderArtsHistory,
        stateOrderArtsHistory,
        'art_id',
      );
      return Immutable.merge(state, {
        orderArtsHistory: mergeArray,
      });
    }

    case GET_ORDER_HISTORY_DETAIL.SUCCESS: {
      return Immutable.merge(state, {
        orderHistoryDetail: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {
        orders: [],
        orderHistory: [],
        orderHistoryDetail: [],
        orderArtsHistory: [],
      });
    }

    default:
      return state;
  }
};
