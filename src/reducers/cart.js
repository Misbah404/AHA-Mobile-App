import Immutable from 'seamless-immutable';
import {
  ADD_TO_CART,
  CLEAN_CART,
  GET_ARTS_RELATED,
  MY_CART_LIST_UPDATE,
  REMOVE_CART,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import {
  addToCartList,
  removeObjectFromCartList,
  updateMyCartList,
} from '../helpers/cartHelper';
import util from '../util';

const initialState = Immutable({
  clean: [],
  artsRelated: [],
  myCartList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const comingCartListObject = action.data;
      const newMyCartList = addToCartList(
        state.myCartList,
        comingCartListObject,
      );

      return Immutable.merge(state, {
        myCartList: newMyCartList,
      });
    }
    case MY_CART_LIST_UPDATE: {
      const previousMyCartList = util.cloneDeep(state.myCartList);
      const cartListObject = action.data.item || {};
      const updateQuantity = action.data.quantity || {};

      const newMyCartList = updateMyCartList(
        previousMyCartList,
        cartListObject,
        updateQuantity,
      );
      return Immutable.merge(state, {
        myCartList: newMyCartList,
      });
    }
    case REMOVE_CART: {
      const removeObject = action.data;
      const afterRemoveObject = removeObjectFromCartList(
        state.myCartList,
        removeObject,
      );
      return Immutable.merge(state, {
        myCartList: afterRemoveObject,
      });
    }
    case GET_ARTS_RELATED.SUCCESS: {
      return Immutable.merge(state, {
        artsRelated: action.data,
      });
    }

    case CLEAN_CART: {
      return Immutable.merge(state, {
        myCartList: [],
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {
        myCartList: [],
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
