import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getOrderHistoryDetailRequest,
  getOrderHistoryRequest,
} from '../../actions/orderHistoryActions';
import {
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  OrderHistoryComponent,
} from '../../components';
import {strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './Styles';

function OrderHistory(props) {
  const {orderHistory, isSinglePostItem, isNavbarButtonReset} = props;
  const [isOrderHistoryVisible, setOrderHistoryVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);

  const dispatch = useDispatch();
  const onEndReachedCalledDuringMomentum = useRef(true);

  const onBackPress = props => {
    isNavbarButtonReset ? Actions.reset('dashboard') : Actions.pop();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onBackPress(props);
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    apiCall();
    mixpanel.track('Visit', {PageName: 'Order History'});
  }, []);

  function apiCall() {
    const params = `?offset=${0}&limit=${10}`;
    dispatch(
      getOrderHistoryRequest(params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsLoading(false);
          setIsNextPage(true);
        } else {
          setIsNextPage(false);
          setIsLoading(false);
        }
      }),
    );
  }

  const orderButtonPressHandler = id => {
    const details = {
      orderID: id,
    };
    Actions.orderDetail({details});
  };

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        title={strings.MY_ORDER_HISTORY}
        titleStyle={AppStyles.titleStyleForLeft}
        hasBack
        leftBtnPress={
          isNavbarButtonReset === true
            ? () => {
                {
                  isSinglePostItem && Actions.pop();
                }
                Actions.pop();
                Actions.pop();
                Actions.pop();
                Actions.pop();
              }
            : () => Actions.pop()
        }
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    );
  }, []);

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?offset=${offset}&limit=${10}`;
      dispatch(
        getOrderHistoryRequest(params, res => {
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

  const renderOrderHistory = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={orderHistory}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index}
          renderItem={({item}) => {
            return (
              <OrderHistoryComponent
                item={item}
                isOrderHistory={true}
                setOrderHistoryVisible={setOrderHistoryVisible}
                isOrderHistoryVisible={isOrderHistoryVisible}
                orderButtonPressHandler={orderButtonPressHandler}
              />
            );
          }}
          ListEmptyComponent={() =>
            !!!isLoading && (
              <NoDataFoundComponent text={'No order has been placed yet.'} />
            )
          }
          onRefresh={() => apiCall()}
          refreshing={false}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => apiCall()}
              tintColor={Colors.pullToRefreshLoader}
            />
          }
          ListFooterComponent={
            <View style={isMoreData && {marginVertical: 40}}>
              {isMoreData && <ActivityIndicator color={Colors.white} />}
            </View>
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {navBar}
      {!!isLoading ? <Loader loading={isLoading} /> : renderOrderHistory()}
    </View>
  );
}
OrderHistory.propTypes = {
  isNavbarButtonReset: PropTypes.bool,
};
OrderHistory.defaultProps = {
  isNavbarButtonReset: false,
};
const mapStateToProps = ({orderHistory}) => ({
  orderHistory: orderHistory.orderHistory,
});

export default connect(mapStateToProps, {})(OrderHistory);
