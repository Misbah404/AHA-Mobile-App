import Immutable from 'seamless-immutable';
import {
  USER_SIGNOUT,
  SALES_HISTORY,
  SALES_HISTORY_STATUS,
  SALES_ORDER_CHANGE,
  ORDERS_DISPATCH_SHIPPO,
} from '../actions/ActionTypes';

import util from '../util';

const initialState = Immutable({
  salesHistoryData: [],
  salesHistoryStatusData: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SALES_HISTORY.SUCCESS: {
      const data = action.data;
      return Immutable.merge(state, {
        salesHistoryData: data,
      });
    }
    case SALES_HISTORY_STATUS.SUCCESS: {
      const data = action.data;
      const stateSalesHistoryStatusData = util.cloneDeepArray(
        state?.salesHistoryStatusData,
      );
      const actionSalesHistoryStatusData = util.cloneDeepArray(data);
      const mergeArray = util.unionById(
        stateSalesHistoryStatusData,
        actionSalesHistoryStatusData,
      );
      return Immutable.merge(state, {
        salesHistoryStatusData: mergeArray,
      });
    }
    case SALES_ORDER_CHANGE.SUCCESS: {
      const stateSalesHistoryData = util.cloneDeepArray(state.salesHistoryData);
      const {id, status, statusChange} = action.data;

      if (util.areValuesEqual(status, 'Dispatched')) {
        if (util.areValuesEqual(statusChange, 'completed')) {
          stateSalesHistoryData.completed = stateSalesHistoryData.completed + 1;
        } else {
          stateSalesHistoryData.cancelled = stateSalesHistoryData.cancelled + 1;
        }
        stateSalesHistoryData.dispatched = stateSalesHistoryData.dispatched - 1;
      } else if (util.areValuesEqual(status, 'In Queue')) {
        if (util.areValuesEqual(statusChange, 'processing')) {
          stateSalesHistoryData.processing =
            stateSalesHistoryData.processing + 1;
        } else {
          stateSalesHistoryData.cancelled = stateSalesHistoryData.cancelled + 1;
        }
        stateSalesHistoryData.inQueue = stateSalesHistoryData.inQueue - 1;
      } else if (util.areValuesEqual(status, 'Processing')) {
        if (util.areValuesEqual(statusChange, 'dispatched')) {
          stateSalesHistoryData.dispatched =
            stateSalesHistoryData.dispatched + 1;
        } else {
          stateSalesHistoryData.cancelled = stateSalesHistoryData.cancelled + 1;
        }
        stateSalesHistoryData.processing = stateSalesHistoryData.processing - 1;
      }

      let stateSalesHistoryStatusData = util.cloneDeepArray(
        state.salesHistoryStatusData,
      );
      const mIndex = util.getIndexOfObjFromArray_byID_forOrder(
        stateSalesHistoryStatusData,
        id,
      );

      if (mIndex != -1) {
        stateSalesHistoryStatusData = util.excludeIdFromArray_forOrder(
          stateSalesHistoryStatusData,
          id,
        );
      }
      return Immutable.merge(state, {
        salesHistoryStatusData: stateSalesHistoryStatusData,
        salesHistoryData: stateSalesHistoryData,
      });
    }

    case ORDERS_DISPATCH_SHIPPO.SUCCESS: {
      const inQueueItemList = action.data;
      const stateSalesHistoryData = util.cloneDeepArray(state.salesHistoryData);
      stateSalesHistoryData.inQueue = 0;
      stateSalesHistoryData.processing =
        stateSalesHistoryData.processing + inQueueItemList.length;
      return Immutable.merge(state, {
        salesHistoryStatusData: [],
        salesHistoryData: stateSalesHistoryData,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
