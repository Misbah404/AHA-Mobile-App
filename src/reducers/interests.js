// @flow
import Immutable from 'seamless-immutable';
import {
  GET_INTERESTS_LIST,
  SEARCH_INTERESTS_LIST,
  USER_SIGNOUT,
  SUBMIT_INTERESTS,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  interestsList: [],
  interestsSearchList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERESTS_LIST.SUCCESS: {
      const stateInterestList = util.cloneDeepArray(state?.interestsList);
      const actionInterestList = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(stateInterestList, actionInterestList);
      return Immutable.merge(state, {
        interestsList: mergeArray,
      });
    }
    case SEARCH_INTERESTS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        interestsSearchList: action.data,
      });
    }

    case SUBMIT_INTERESTS.SUCCESS: {
      const selectedInterestsArr = action.data.interests;
      const allInterests = util.cloneDeepArray(state.interestsList);
      allInterests.map((item, index) => {
        if (util.isArrayIncludesValue(selectedInterestsArr, item?.id ?? -1)) {
          allInterests[index]['isSelected'] = true;
        } else {
          allInterests[index]['isSelected'] = false;
        }
      });

      return Immutable.merge(state, {
        interestsList: allInterests,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
