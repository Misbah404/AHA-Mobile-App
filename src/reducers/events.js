// @flow
import Immutable from 'seamless-immutable';
import {
  USER_SIGNOUT,
  GET_EVENTS,
  UPDATE_EVENTS,
  EVENT_DETAILS,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  eventsList: [],
  eventsDetail: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS.SUCCESS: {
      const stateEvents = util.cloneDeepArray(state?.eventsList);
      const actionEvents = util.cloneDeepArray(action?.data);
      const mergeArray = util.unionById(stateEvents, actionEvents);
      return Immutable.merge(state, {
        eventsList: mergeArray,
      });
    }

    case EVENT_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        eventsDetail: action.data,
      });
    }
    case UPDATE_EVENTS: {
      return Immutable.merge(state, {
        eventsList: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
