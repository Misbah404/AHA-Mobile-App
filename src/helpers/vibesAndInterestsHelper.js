import util from '../util';

export function manipulateVibesListData(list) {
  if (util.isFieldNil(list) || util.isArrayEmpty(list)) return [];

  let vibesList = [];
  list.forEach(element => {
    let vibe = {};
    if (util.hasObjectWithKey(element, 'id')) {
      vibe.id = element?.id ?? null;
      vibe.image = element?.image ?? null;
      vibe.isSelected = element?.is_selected ?? false;
      vibe.title = element?.title ?? '';
      vibesList.push(vibe);
    }
  });
  return vibesList;
}

export function manipulateInterestListData(list) {
  if (util.isFieldNil(list) || util.isArrayEmpty(list)) return [];

  let interestsList = [];
  list.forEach(element => {
    let interest = {};
    if (util.hasObjectWithKey(element, 'id')) {
      interest.id = element?.id ?? null;
      interest.image = element?.image ?? null;
      interest.isSelected = element?.is_selected ?? false;
      interest.title = element?.title ?? '';
      interestsList.push(interest);
    }
  });
  return interestsList;
}

export function isAnySelectedItemExist(mArr) {
  return util.some(mArr, {isSelected: true});
}
