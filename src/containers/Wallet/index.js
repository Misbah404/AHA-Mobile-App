import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getBankAccountDetailsRequest,
  getTransactionsListRequest,
  requestWithdrawlRequest,
} from '../../actions/walletActions';
import {
  Button,
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  TransactionListItem,
} from '../../components';
import AddNewBank from '../../components/AddNewBank';
import {DATE_FORMAT2, strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const Wallet = props => {
  const {_transactions, _bankAccounts} = props;
  const {
    totalWalletAmount,
    pendingWalletAmount,
    availableWalletAmount = 0,
    transactionsList,
  } = _transactions || {};

  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isRequestingWithdrawl, setIsRequestingWithdrawl] = useState(
    () => false,
  );
  const [isFetchingDataFromServer, setIsFetchingDataFromServer] = useState(
    () => true,
  );
  const [
    isGettingBankAccountDetailsFromServer,
    setIsGettingBankAccountDetailsFromServer,
  ] = useState(() => false);

  const dispatch = useDispatch();
  const onEndReachedCalledDuringMomentum = useRef(true);

  useEffect(() => {
    setIsFetchingDataFromServer(true);
    getBankAccountsFromApi();
    apiCall();
    mixpanel.track('Visit', {PageName: 'Wallet'});
  }, []);

  const getBankAccountsFromApi = () => {
    setIsGettingBankAccountDetailsFromServer(true);
    dispatch(getBankAccountDetailsRequest(_ => {}));
    setIsGettingBankAccountDetailsFromServer(false);
  };

  function apiCall() {
    const params = `?offset=${0}&limit=${10}`;
    dispatch(
      getTransactionsListRequest(params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsNextPage(true);
          setIsFetchingDataFromServer(false);
        } else {
          setIsFetchingDataFromServer(false);
          setIsNextPage(false);
        }
      }),
    );
  }

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?offset=${offset}&limit=${10}`;
      dispatch(
        getTransactionsListRequest(params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 10);
            setIsMoreData(false);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  function onRequestWithdrawlBtnPress() {
    setIsRequestingWithdrawl(true);
    dispatch(
      requestWithdrawlRequest({}, () => {
        setIsRequestingWithdrawl(false);
      }),
    );
  }

  const renderAddNewBankComp = useMemo(
    () => (util.isArrayEmpty(_bankAccounts) ? <AddNewBank /> : <></>),
    [_bankAccounts],
  );

  const renderCustomNavBar = useMemo(
    () => (
      <CustomNavbar
        title={strings.WALLET}
        titleStyle={AppStyles.titleStyleForLeft}
        hasBack
        rightBtnImage={
          !isGettingBankAccountDetailsFromServer &&
          !util.isArrayEmpty(_bankAccounts)
            ? Images.bankAccount
            : undefined
        }
        rightImageStyle={styles.bankAccountIcon}
        rightBtnPress={() =>
          !isGettingBankAccountDetailsFromServer &&
          !util.isArrayEmpty(_bankAccounts) &&
          Actions.myBank()
        }
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    ),
    [_bankAccounts],
  );

  const renderRequestWithdrawlButton = useMemo(
    () => (
      <Button
        color={Colors.text.white}
        disabled={
          availableWalletAmount === 0 ||
          isRequestingWithdrawl ||
          util.isArrayEmpty(_bankAccounts)
        }
        isLoading={isRequestingWithdrawl}
        style={styles.requestWithdrawlButton}
        textStyle={styles.requestWithdrawlButtonText}
        onPress={onRequestWithdrawlBtnPress}>
        {strings.REQUSET_WITHDRAWL}
      </Button>
    ),
    [isRequestingWithdrawl, availableWalletAmount, _bankAccounts],
  );

  const renderYourBalanceSingleListItem = (heading, amount = 0) => (
    <>
      <Text style={styles.currentDate}>{heading}</Text>

      <View style={styles.balanceView}>
        <Text style={styles.balance}>${amount}</Text>
        <Text style={styles.currency}>USD</Text>
      </View>
    </>
  );

  const renderAvailableBalanceAmountSec = useMemo(
    () =>
      renderYourBalanceSingleListItem(strings.AVAILABLE, availableWalletAmount),
    [availableWalletAmount],
  );

  return (
    <>
      {renderCustomNavBar}
      <View style={styles.container} showsVerticalScrollIndicator={false}>
        {!!isFetchingDataFromServer ? (
          <View style={styles.loaderViewSec}>
            <Loader loading={true} />
          </View>
        ) : (
          <>
            <Text style={styles.heading}>{strings.YOUR_BALANCE}</Text>
            <View style={styles.balanceMainView}>
              {renderYourBalanceSingleListItem(
                // util.getFormattedDateTime(new Date(), DATE_FORMAT2),
                strings.TOTAL,
                totalWalletAmount,
              )}
              <View style={styles.horizontalSeperator}></View>
              {renderYourBalanceSingleListItem(
                strings.PENDING,
                pendingWalletAmount,
              )}
              <View style={styles.horizontalSeperator}></View>
              {renderAvailableBalanceAmountSec}
            </View>

            {!isGettingBankAccountDetailsFromServer && renderAddNewBankComp}

            <Text style={styles.recentTransactionHeading}>
              Recent transactions
            </Text>

            <FlatList
              data={transactionsList}
              ListEmptyComponent={() => (
                <NoDataFoundComponent text={strings.NO_TRANSACTIONS_FOUND} />
              )}
              showsVerticalScrollIndicator={false}
              style={{flex: 1, marginTop: 10}}
              onRefresh={() => apiCall()}
              keyExtractor={(_, index) => index}
              refreshing={false}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => apiCall()}
                  tintColor={Colors.pullToRefreshLoader}
                />
              }
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                <View style={isMoreData && {marginVertical: 40}}>
                  {isMoreData && <ActivityIndicator color={Colors.white} />}
                </View>
              }
              renderItem={({item}) => <TransactionListItem _item={item} />}
            />

            {renderRequestWithdrawlButton}
          </>
        )}
      </View>
    </>
  );
};

Wallet.propTypes = {};
Wallet.defaultProps = {};

const mapStateToProps = ({wallet, user}) => ({
  _transactions: wallet.transactionsList,
  _bankAccounts: wallet.bankAccounts,
  loggedInUserDetails: user.userDetails,
});
export default connect(mapStateToProps, null)(Wallet);
