import util from '../util';

export function manipulateTransactionsData(allTransactions) {
  if (util.isFieldNil(allTransactions) || util.isArrayEmpty(allTransactions))
    return [];

  let mTransactionObj = {
    totalWalletAmount: allTransactions?.total_amount ?? 0,
    pendingWalletAmount: allTransactions?.pending_amount ?? 0,
    availableWalletAmount: allTransactions?.available_amount ?? 0,
  };
  let transactionsList = [];
  allTransactions?.transactions?.forEach(element => {
    let transaction = {};
    if (util.hasObjectWithKey(element, 'id')) {
      transaction.id = element.id;
      transaction.title = element?.metadata?.title ?? '-';
      transaction.transactionDateTime = util.timeStampToDate(element?.created);
      transaction.hasMultipleProducts =
        element?.metadata?.product_count > 1 ? true : false;
    }
    transaction.amount = element?.amount ?? null;
    transaction.title = element?.title ?? '-';
    transaction.order_date = element?.order_date ?? '-';
    transactionsList.push(transaction);
  });

  mTransactionObj['transactionsList'] = transactionsList;
  return mTransactionObj;
}
