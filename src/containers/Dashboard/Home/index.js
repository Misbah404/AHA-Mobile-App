/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import {Utils} from '@react-native-firebase/app';
import _ from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Notifications} from 'react-native-notifications';
import {requestNotifications} from 'react-native-permissions';
import {connect, useDispatch} from 'react-redux';
import {
  getDashBoardFeedsRequest,
  getSellablePostsRequest,
} from '../../../actions/DashboardActions';
import {notificationCountIncDec} from '../../../actions/NotificationsActions';
import {
  pinUnpinRequest,
  postCollectionPinUnpinSuccess,
} from '../../../actions/PinActions';
import {
  ArtistSuggestions,
  BottomSheetComponent,
  BuyPostBottomSheetContent,
  FeedItem,
  HomeScreenHeaderComponent,
  NoDataFoundComponent,
  PinUnpinPostBottomSheetContent,
  SupportBottomContent,
} from '../../../components';
import {strings} from '../../../constants';
import {
  getPermissions,
  navigateOnNotificationTap,
  setChannelForAndroid,
  showLocalNotification,
  updateDeviceToken,
} from '../../../helpers/firebaseHelper.js';
import {mixpanel} from '../../../helpers/mixpanelHelper';
import {Colors, Metrics} from '../../../theme';
import util from '../../../util';
import styles from './styles';

let refScrollImageFeed = null;
export const scrollToTop = () => {
  refScrollImageFeed?.current?.scrollToOffset({animated: true, offset: 0});
};

const limit = 5;
let notificationForeground = {};
let currentArtArtirst = '';
const Home = props => {
  const {_feeds, _currentActiveActionName, _isUploadingPostInBackground} =
    props;

  const sheetRef = useRef(null);
  refScrollImageFeed = useRef(null);
  const pinUnpinPostBottomSheetRef = useRef(null);
  const supportButtonRef = useRef(null);

  const feedsArrayLength = _feeds?.length ?? 0;
  const [isRefreshing, setIsRefreshing] = useState(() => false);
  const [activeIndex, setActiveIndex] = useState(() => 0);
  const [limitReached, setLimitReached] = useState(() => false);
  const [isFullViewVisible, setIsFullViewVisible] = useState(() => false);
  const [showBuyPostBottomSheet, setShowBuyPostBottomSheet] = useState(
    () => false,
  );
  const [showPinUnpinPostBottomSheet, setShowPinUnpinPostBottomSheet] =
    useState(() => false);
  const [showSuppportBottomSheet, setShowSuppportBottomSheet] = useState(
    () => false,
  );

  const [offset, setOffset] = useState(() => 0);
  const [isGettingDataFromServer, setIsGettingDataFromServer] = useState(
    () => false,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    _fcmInit();
    getMoreFeeds();
    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
      mixpanel.track('Push Notification', {
        Permissions: status,
      });
    });
  }, []);

  useEffect(() => {
    getMoreFeedsDataFromApi();
    setShowBuyPostBottomSheet(false);
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      Notifications.events().registerNotificationReceivedForeground().remove();
      Notifications.events()
        .registerRemoteNotificationsRegistrationFailed()
        .remove();
      Notifications.events().registerNotificationOpened().remove();
      Notifications.events().registerNotificationReceivedBackground().remove();
      Notifications.events().registerRemoteNotificationsRegistered().remove();
    };
  }, [Notifications]);

  const _fcmInit = async () => {
    console.log('_fcmInit');
    // ------------- CHANNEL INIT --------------
    if (util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------
    updateDeviceToken();

    // Request permissions on iOS, refresh token on Android
    Notifications.registerRemoteNotifications();

    Notifications.getInitialNotification()
      .then(notification => {
        console.log({NOTIFICATIONs: notification});

        if (!_.isNil(notification)) {
          navigateOnNotificationTap(notification.payload);
        }
      })
      .catch(err => {
        console.error('getInitialNotifiation() failed', err);
      });

    Notifications.events().registerRemoteNotificationsRegistered(event => {});
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error({event});
      },
    );

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log({ReceivedForeground: notification});

        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          // return;
        } else {
          notificationForeground = notification?.payload;
          showLocalNotification(notification.payload);
          dispatch(notificationCountIncDec(1));
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification, action);
        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          navigateOnNotificationTap(notificationForeground);
        } else {
          navigateOnNotificationTap(notification.payload);
        }

        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);
        !util.isPlatformAndroid() && Notifications?.ios?.setBadgesCount(0);
        Notifications?.ios?.getBadgeCount(count =>
          Notifications?.ios?.setBadgeCount(count + 1),
        );
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
  };

  function getMoreFeedsDataFromApi() {
    if (feedsArrayLength === activeIndex + 1) {
      if (!!!limitReached) {
        getMoreFeeds();
      }
    }
  }

  function handleOnRefresh() {
    setIsRefreshing(true);
    getMoreFeeds(0, true);
  }

  function getMoreFeeds(mOffset = offset, shouldRefresh = false) {
    if (!shouldRefresh) setIsGettingDataFromServer(true);
    let feedId = [];
    _feeds.map(item => {
      !util.isFieldNil(item) &&
        util.hasObjectWithKey(item, 'id') &&
        util.isNumber(item.id) &&
        feedId.push(item.id);
    });

    const payload = {
      offset: mOffset,
      limit,
      isRefreshingList: shouldRefresh,
    };

    if (!util.isArrayEmpty(feedId)) {
      payload['exclude'] = feedId.toString();
    }

    dispatch(
      getDashBoardFeedsRequest(payload, res => {
        if (util.hasObjectWithKey(res, 'data')) {
          if (util.isArrayEmpty(res?.data ?? [])) {
            setOffset(mOffset + limit);
            setLimitReached(true);
          } else {
            setOffset(mOffset + limit);
          }
        }
        if (!!shouldRefresh) {
          setIsRefreshing(false);
        } else {
          setIsGettingDataFromServer(false);
        }
      }),
    );
  }

  function handleOnScroll(event) {
    const val = util.roundValue(
      event.nativeEvent.contentOffset.y / Metrics.feedsHeight,
    );
    setActiveIndex(val);
  }

  function onBuyButtonPressHandlerCallback() {
    setIsFullViewVisible(false);
    setShowBuyPostBottomSheet(true);
    sheetRef.current.snapTo(1);
  }

  const onSupportButtonPressHandlerCallback = artArtirst => {
    currentArtArtirst = artArtirst;
    setShowSuppportBottomSheet(true);
    supportButtonRef?.current?.snapTo(0);
  };
  function onPinUnpinButtonPressHandlerCallback(payload) {
    const {pin: shouldPinPost, shouldOpenBottomSheet} = payload;
    !!!shouldOpenBottomSheet && dispatch(pinUnpinRequest(payload, _ => {}));
    dispatch(postCollectionPinUnpinSuccess(payload));

    if (!!shouldPinPost && !!shouldOpenBottomSheet) {
      setShowPinUnpinPostBottomSheet(true);
      pinUnpinPostBottomSheetRef.current.snapTo(0);
    }
  }

  function onCloseBottomSheet() {
    setIsFullViewVisible(false);
    setShowBuyPostBottomSheet(false);
    sheetRef?.current?.snapTo(2);
  }

  function onBottomSheetNodeValueChange(val) {
    if (val > 0.7) setIsFullViewVisible(true);
    else setIsFullViewVisible(false);
  }

  const renderLoader = (showRefreshLoader = false) => (
    <View
      style={
        !!showRefreshLoader ? styles.refreshLoaderStyle : styles.loaderStyle
      }>
      <ActivityIndicator size="large" color={Colors.background.purple} />
    </View>
  );

  const getImagesFeed = () => (
    <>
      <FlatList
        ref={refScrollImageFeed}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={_feeds}
        snapToInterval={Metrics.feedsHeight}
        decelerationRate={'fast'}
        ListEmptyComponent={() =>
          !!isGettingDataFromServer ? (
            <></>
          ) : (
            <View style={styles.noDataFoundSec}>
              <NoDataFoundComponent text={strings.NO_POSTS_FOUND} />
            </View>
          )
        }
        pagingEnabled={true}
        scrollEventThrottle={16}
        onScroll={e => {
          handleOnScroll(e);
        }}
        keyExtractor={(_, index) => index}
        onRefresh={() => {
          if (!isRefreshing && !isGettingDataFromServer) {
            handleOnRefresh();
          }
        }}
        refreshing={isRefreshing}
        initialNumToRender={limit}
        renderItem={({item}) => {
          const isSuggestedArtistsObj = item?.is_suggestion ?? false;
          const shouldShowSuggesstionsView =
            isSuggestedArtistsObj && !util.isArrayEmpty(item?.list ?? []);
          const isActiveScreen = util.areValuesEqual(
            _currentActiveActionName,
            '_dashboard_tab',
          );
          const itemLength = util.areValuesEqual(item);
          return shouldShowSuggesstionsView ? (
            <ArtistSuggestions arrayOfArrays={item.list} />
          ) : (
            <FeedItem
              feedItem={item}
              shouldPlayVideoOnCurrentScreen={isActiveScreen}
              shouldCloseCurrentActiveScreenAfterDeletingItem={false}
              onBuyButtonPressHandler={onBuyButtonPressHandlerCallback}
              onPinUnpinButtonPressHandler={
                onPinUnpinButtonPressHandlerCallback
              }
              onSupportButtonPressHandler={onSupportButtonPressHandlerCallback}
            />
          );
        }}
      />
      {!!isGettingDataFromServer && renderLoader()}
    </>
  );

  const renderBuyPostBottomSheet = () => (
    <View
      style={styles.bottomSheetContainer}
      pointerEvents={!!showBuyPostBottomSheet ? 'auto' : 'none'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 4,
        }}
        onPress={() => {
          sheetRef.current.snapTo(2);
          setShowBuyPostBottomSheet(false);
          setIsFullViewVisible(false);
        }}></TouchableOpacity>
      <BottomSheetComponent
        refRBSheet={sheetRef}
        _snapPoints={[
          Metrics.screenHeight - (Metrics.screenHeight * 23) / 100,
          250,
          0,
        ]}
        renderView={() =>
          !!showBuyPostBottomSheet ? (
            <BuyPostBottomSheetContent
              sheetRef={sheetRef}
              isFullViewVisible={isFullViewVisible}
              setIsFullViewVisible={setIsFullViewVisible}
              setShowBottomSheet={setShowBuyPostBottomSheet}
              feedItem={_feeds[activeIndex]}
            />
          ) : (
            <></>
          )
        }
        initialSnap={2}
        setShouldShowBottomSheet={setShowBuyPostBottomSheet}
        isShowingBottomSheet={showBuyPostBottomSheet}
        onBottomSheetClose={onCloseBottomSheet}
        onBottomSheetNodeValueChange={onBottomSheetNodeValueChange}
      />
    </View>
  );

  const renderPinUnpinPostBottomSheet = () => (
    <View
      style={styles.bottomSheetContainer}
      pointerEvents={showPinUnpinPostBottomSheet ? 'auto' : 'none'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 4,
        }}
        onPress={() => {
          pinUnpinPostBottomSheetRef.current.snapTo(1);
        }}></TouchableOpacity>
      <BottomSheetComponent
        refRBSheet={pinUnpinPostBottomSheetRef}
        _snapPoints={[440, 0]}
        renderView={() => (
          <PinUnpinPostBottomSheetContent
            bottomSheetRef={pinUnpinPostBottomSheetRef}
            showPinUnpinPostBottomSheet={showPinUnpinPostBottomSheet}
            feedItem={_feeds[activeIndex]}
          />
        )}
        isShowingBottomSheet={showPinUnpinPostBottomSheet}
        onBottomSheetClose={() => setShowPinUnpinPostBottomSheet(false)}
      />
    </View>
  );

  const renderSupportBottomSheet = () => (
    <View
      style={styles.bottomSheetContainer}
      pointerEvents={showSuppportBottomSheet ? 'auto' : 'none'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 4,
        }}
        onPress={() => {
          supportButtonRef.current.snapTo(1);
        }}></TouchableOpacity>
      <BottomSheetComponent
        refRBSheet={supportButtonRef}
        _snapPoints={[230, 0]}
        renderView={() => (
          <SupportBottomContent
            artirst={currentArtArtirst}
            onBottomSheetClose={setShowSuppportBottomSheet}
          />
        )}
        isShowingBottomSheet={showSuppportBottomSheet}
        onBottomSheetClose={() => setShowSuppportBottomSheet(false)}
      />
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <HomeScreenHeaderComponent
          showCartIcon={true}
          style={_isUploadingPostInBackground ? {marginTop: 70} : {}}
        />
        {getImagesFeed()}
      </View>

      {_isUploadingPostInBackground && (
        <View style={styles.uploadingPostSec}>
          <View style={{marginHorizontal: 10}}>
            <ActivityIndicator size="small" color={Colors.white} />
          </View>
          <Text style={styles.uploadingPostText}>{strings.UPLOADING_POST}</Text>
        </View>
      )}

      {renderBuyPostBottomSheet()}
      {renderPinUnpinPostBottomSheet()}
      {renderSupportBottomSheet()}
    </>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

const mapStateToProps = ({dashboard, general, user}) => ({
  _feeds: dashboard.feeds,
  _currentActiveActionName: general.currentActiveActionName,
  _isUploadingPostInBackground: user.isUploadingPostInBackground,
});

export default connect(mapStateToProps, null)(Home);
