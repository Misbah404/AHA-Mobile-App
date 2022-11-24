// @flow
import Immutable from 'seamless-immutable';
import {
  ADD_CREDIT_CARD,
  DELETE_CREDIT_CARD,
  GET_CREDIT_CARDS_LISTING,
  SET_DEFAULT_CARD,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  creditCardsList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CREDIT_CARD.SUCCESS: {
      const {creditCardsList} = state;
      // if empty make first added item default i.e. creditCardsList
      const shouldMakeThisCardDefault = util.isArrayEmpty(creditCardsList);

      const listClone = util.cloneDeepArray(creditCardsList);
      let data = action.data;
      data['isSelected'] = shouldMakeThisCardDefault;
      listClone.unshift(data);

      return Immutable.merge(state, {creditCardsList: listClone});
    }
    case GET_CREDIT_CARDS_LISTING.SUCCESS: {
      return Immutable.merge(state, {creditCardsList: action.data});
    }
    case DELETE_CREDIT_CARD.SUCCESS: {
      const {creditCardsList} = state;
      const listClone = util.cloneDeepArray(creditCardsList);
      const arrayAfterDelete = util.excludeIdFromArray(listClone, action.data);
      return Immutable.merge(state, {creditCardsList: arrayAfterDelete});
    }
    case SET_DEFAULT_CARD.SUCCESS: {
      const {creditCardsList} = state;
      let mCardList = util.cloneDeepArray(creditCardsList);
      mCardList.map((item, index) => {
        if (item.id === action.data.id) {
          mCardList[index]['isSelected'] = true;
        } else {
          mCardList[index]['isSelected'] = false;
        }
      });
      return Immutable.merge(state, {creditCardsList: mCardList});
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {creditCardsList: []});
    }

    default:
      return state;
  }
};
