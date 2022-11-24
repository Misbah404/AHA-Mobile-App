// @flow

import {
  CURRENT_ACTIVE_ACTION,
  CURRENT_LOCATION_ACTION,
  SET_SELECTED_TAB,
} from './ActionTypes';

export function request() {
  return {
    type: EMPTY.REQUEST,
  };
}

export function setSelectedTab(selectedTabId) {
  return {
    selectedTabId,
    type: SET_SELECTED_TAB,
  };
}

export function setCurrenActiveActionName(data) {
  return {
    data,
    type: CURRENT_ACTIVE_ACTION,
  };
}
export function setCurrentLocation(data) {
  return {
    data,
    type: CURRENT_LOCATION_ACTION,
  };
}
