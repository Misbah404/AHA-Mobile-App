import util from '../util';

export function manipulateSaleHistoryData(resultData) {
  const {data} = resultData;

  let saleHistory = {};
  saleHistory.cancelled = resultData?.cancelled ?? 0;
  saleHistory.data = util.isArrayEmpty(data) ? [] : data;
  saleHistory.completed = resultData?.completed ?? 0;
  saleHistory.dispatched = resultData?.dispatched ?? 0;
  saleHistory.inQueue = resultData?.inqueue ?? 0;
  saleHistory.processing = resultData?.processing ?? 0;
  saleHistory.returned = resultData?.returned ?? 0;
  saleHistory.total = resultData?.total ?? 0;
  return saleHistory;
}
