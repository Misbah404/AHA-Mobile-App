import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  TERM_AND_CONDITION,
  PRIVACY_POLICY,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  term_condition: '',
  privacy_policy: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TERM_AND_CONDITION.SUCCESS: {
      return Immutable.merge(state, {
        term_condition: action.data.terms_and_conditions,
      });
    }

    case PRIVACY_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        privacy_policy: action.data.privacy_policy,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
