// @flow
import Immutable from 'seamless-immutable';
import {
  GET_TRANSACTIONS_LIST,
  GET_BANK_ACCOUNT_DETAILS,
  USER_SIGNOUT,
  DELETE_BANK_ACCOUNT,
  REQUEST_WITHDRAWL,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  transactionsList: {},
  bankAccounts: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_LIST.SUCCESS: {
      const OldTransactions = util.cloneDeepArray(
        state?.transactionsList?.transactionsList ?? [],
      );
      const newTransactions = util.cloneDeepArray(
        action?.data?.transactionsList ?? [],
      );
      const mergeArray = util.unionById(OldTransactions, newTransactions);
      const totalWalletAmount = action?.data?.totalWalletAmount ?? 0;
      const pendingWalletAmount = action?.data?.pendingWalletAmount ?? 0;
      const availableWalletAmount = action?.data?.availableWalletAmount ?? 0;
      return Immutable.merge(state, {
        transactionsList: {
          transactionsList: mergeArray,
          totalWalletAmount: totalWalletAmount,
          pendingWalletAmount: pendingWalletAmount,
          availableWalletAmount: availableWalletAmount,
        },
      });
    }
    case GET_BANK_ACCOUNT_DETAILS.SUCCESS: {
      const mObj = action.data;
      let mData = [];
      !util.isEmptyObject(mObj) && mData.push(mObj);
      return Immutable.merge(state, {
        bankAccounts: mData,
      });
    }
    case DELETE_BANK_ACCOUNT.SUCCESS: {
      return Immutable.merge(state, {
        bankAccounts: [],
      });
    }
    case REQUEST_WITHDRAWL.SUCCESS: {
      let mTransactions = util.cloneDeepArray(state?.transactionsList ?? {});
      mTransactions.availableWalletAmount = 0;
      return Immutable.merge(state, {
        transactionsList: mTransactions,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {transactionsList: []});
    }

    default:
      return state;
  }
};
