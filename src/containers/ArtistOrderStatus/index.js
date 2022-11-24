import {default as React, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {
  getOrderHistoryDetailRequest,
  ordersDispatchShippoRequest,
} from '../../actions/orderHistoryActions';
import {
  salesHistoryStatusRequest,
  salesOrderHistoryDetailsRequest,
} from '../../actions/SalesActions';
import {
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  ModalView,
  NoDataFoundComponent,
  OrderHistoryComponent,
  SpinnerLoader,
} from '../../components';
import {strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';

let limit = 15;
function ArtistOrderStatus(props) {
  const {status, title, filterBy, salesHistoryStatusData} = props;
  const [isLoading, setIsLoading] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [orderIds, setOrderIds] = useState(() => []);
  const [offset, setOffset] = useState(() => 0);
  const [isSpinner, setIsSpinner] = useState(() => false);
  const [isDispatchModal, setDispatchModal] = useState(() => false);
  const dispatch = useDispatch();

  const orderButtonPressHandler = (id, orderID, artId) => {
    const details = {
      orderID: orderID,
      artId,
      id,
    };
    Actions.orderDetail({details, isFromSales: true});
  };

  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: `${status} List`,
    });
    setIsLoading(true);
    const params = `?filter=${filterBy}&status=${status}&offset=${0}&limit=${limit}`;
    dispatch(
      salesHistoryStatusRequest(params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsNextPage(true);

          setOrderIds(util.getIdsFromArray(res));
          setIsLoading(false);
        } else {
          setIsNextPage(false);
          setIsLoading(false);
        }
      }),
    );
  }, []);
  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?filter=${filterBy}&status=${status}&offset=${offset}&limit=${limit}`;
      dispatch(
        salesHistoryStatusRequest(params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 15);
            setIsMoreData(false);
            const stateIds = util.cloneDeepArray(orderIds);
            const comingIds = util.cloneDeepArray(util.getIdsFromArray(res));
            const mergeIds = [...stateIds, ...comingIds];
            setOrderIds(mergeIds);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        title={title}
        titleStyle={AppStyles.titleStyleForLeft}
        hasBack
      />
    );
  }, []);

  function dispatchCall() {
    setIsSpinner(true);
    setDispatchModal(false);
    const afterRemoveDuplicate = util.removeDuplicatesObjectFromArray(orderIds);
    const payload = {
      order_art_ids: afterRemoveDuplicate,
    };
    dispatch(
      ordersDispatchShippoRequest(payload, res => {
        setIsSpinner(false);
      }),
    );
  }
  const renderHeader = () => {
    return (
      <View
        style={{
          width: Metrics.screenWidth,
          justifyContent: 'center',
          paddingTop: Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 55 : 40,
          paddingBottom: 10,
          paddingHorizontal: 10,
          backgroundColor: Colors.background.primary,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 7, flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => Actions.pop()}
              style={{marginLeft: 10}}>
              <Image source={Images.backButton} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 15,
                color: Colors.white,
                fontSize: Fonts.size.medium,
                fontFamily: Fonts.type.Asap,
                fontWeight: '500',
              }}>
              {title}
            </Text>
          </View>
          {util.areValuesEqual(title, 'In Queue') && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setDispatchModal(true)}
              style={{
                flex: 3,
                height: 32,
                borderWidth: 2,
                borderColor: Colors.white,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: Fonts.size.xxSmall,
                  fontFamily: Fonts.type.Asap,
                  fontWeight: '500',
                }}>
                Dispatched All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderStatusListing = useMemo(() => {
    const data = !util.isArrayEmpty(orderIds)
      ? util.filterArray(salesHistoryStatusData, item =>
          orderIds.includes(item.id),
        )
      : [];

    return (
      <FlatList
        data={data.sort(function (a, b) {
          return a.order_id - b.order_id;
        })}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 5}}
        renderItem={({item}) => {
          return (
            <OrderHistoryComponent
              item={item}
              isOrderHistory={false}
              orderButtonPressHandler={orderButtonPressHandler}
            />
          );
        }}
        ListEmptyComponent={() =>
          !isLoading && <NoDataFoundComponent text={strings.NO_ORDER_FOUND} />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={isMoreData && {marginVertical: 40}}>
            {isMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    );
  }, [salesHistoryStatusData, isMoreData, orderIds]);

  return (
    <>
      {renderHeader()}

      <View style={styles.container}>
        {!isLoading && renderStatusListing}
        {isLoading && (
          <ActivityIndicator style={AppStyles.mTop30} color={Colors.white} />
        )}
        <SpinnerLoader _loading={isSpinner} />
      </View>
      {isDispatchModal && (
        <DeleteOrRemoveModal
          heading={strings.DISPATCH_ALL_ORDERS}
          description={'Are you sure you want to dispatch all orders?'}
          positiveBtnText={strings.CONFIRM}
          negativeBtnText={strings.CANCEL}
          positiveBtnPressHandler={() => {
            dispatchCall();
          }}
          setModalVisibility={() => setDispatchModal(!isDispatchModal)}
          isModalVisible={isDispatchModal}
        />
      )}
    </>
  );
}
ArtistOrderStatus.propTypes = {};
ArtistOrderStatus.defaultProps = {};
const mapStateToProps = ({sales}) => ({
  salesHistoryStatusData: sales.salesHistoryStatusData,
});

export default connect(mapStateToProps, {})(ArtistOrderStatus);
