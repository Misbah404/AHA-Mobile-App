import {PRIVACY_POLICY, TERM_AND_CONDITION} from './ActionTypes';

export function privacyPolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: PRIVACY_POLICY.REQUEST,
  };
}
export function privacyPolicySuccess(data) {
  return {
    data,

    type: PRIVACY_POLICY.SUCCESS,
  };
}

export function termConditionRequest(responseCallback) {
  return {
    responseCallback,
    type: TERM_AND_CONDITION.REQUEST,
  };
}
export function termConditionSuccess(data) {
  return {
    data,

    type: TERM_AND_CONDITION.SUCCESS,
  };
}
