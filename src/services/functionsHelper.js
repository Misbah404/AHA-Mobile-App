import {isEmpty, isNil, cloneDeep, isEqual, filter, find} from 'lodash';

const _isEmpty = item => {
  return isEmpty(item);
};

const _isNil = item => {
  return isNil(item);
};

const _cloneDeep = item => {
  return cloneDeep(item);
};

const _filter = (list, condition) => {
  return filter(list, condition);
};

const _find = (list, condition) => {
  return find(list, condition);
};

export {_isEmpty, _isNil, _cloneDeep, _filter, _find};
