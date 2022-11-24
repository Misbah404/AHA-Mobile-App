// @flow
import Immutable from 'seamless-immutable';
import {
  CURRENT_ACTIVE_ACTION,
  CURRENT_LOCATION_ACTION,
  SET_SELECTED_TAB,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  selectedTabId: 1,
  currentActiveActionName: '',
  currentLocation: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TAB: {
      return Immutable.merge(state, {
        selectedTabId: action.selectedTabId,
      });
    }
    case CURRENT_ACTIVE_ACTION: {
      return Immutable.merge(state, {
        currentActiveActionName: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case CURRENT_LOCATION_ACTION: {
      return Immutable.merge(state, {
        currentLocation: action.data,
      });
    }
    default:
      return state;
  }
};
