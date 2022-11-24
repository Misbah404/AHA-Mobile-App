import util from '../util';
import DataTypes from '../dataTypes';

export function manipulateCreditCardListData(list) {
  if (util.isArrayEmpty(list)) return [];
  let mCreditCardList = [];

  list.forEach((item, index) => {
    let mCreditCard = manipulateCreditCardObject(item, index);
    mCreditCardList.push(mCreditCard);
  });

  return mCreditCardList;
}

export function manipulateCreditCardObject(item, index = -1) {
  /**
   * @type {CreditCard}
  */
 
  let mCreditCard = {};
  mCreditCard.id = item?.id ?? index;
  mCreditCard.brand = item?.brand ?? '';
  mCreditCard.complete = item?.complete ?? false;
  mCreditCard.country = item?.country ?? '';
  mCreditCard.expiryMonth = item?.exp_month ?? 0;
  mCreditCard.expiryYear = item?.exp_year ?? 0;
  mCreditCard.last4 = item?.last4 ?? '';
  mCreditCard.postalCode = item?.postalCode ?? '';
  mCreditCard.number = item?.number ?? '';
  mCreditCard.cvc = item?.cvc ?? '123';
  mCreditCard.isSelected = item?.is_selected ?? false;
  return mCreditCard;
}
