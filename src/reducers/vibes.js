// @flow
import Immutable from 'seamless-immutable';
import {
  GET_VIBES_LIST,
  SEARCH_VIBES_LIST,
  SUBMIT_VIBES,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  vibesList: [],
  vibesSearchList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VIBES_LIST.SUCCESS: {
      const stateVibeList = util.cloneDeepArray(state?.vibesList);
      const actionVibeList = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(stateVibeList, actionVibeList);

      return Immutable.merge(state, {
        vibesList: mergeArray,
      });
    }
    case SEARCH_VIBES_LIST.SUCCESS: {
      return Immutable.merge(state, {
        vibesSearchList: action?.data,
      });
    }
    case SUBMIT_VIBES.SUCCESS: {
      const selectedVibesArr = action.data.vibes;
      const allVibes = util.cloneDeepArray(state.vibesList);
      allVibes.map((item, index) => {
        if (util.isArrayIncludesValue(selectedVibesArr, item?.id ?? -1)) {
          allVibes[index]['isSelected'] = true;
        } else {
          allVibes[index]['isSelected'] = false;
        }
      });

      return Immutable.merge(state, {
        vibesList: allVibes,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
