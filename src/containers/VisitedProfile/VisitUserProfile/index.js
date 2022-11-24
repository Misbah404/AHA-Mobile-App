import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import Share from 'react-native-share';

import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getCommunitiesListIAmPartOfRequest} from '../../../actions/communityActions';
import {notificationsCountRequest} from '../../../actions/NotificationsActions';
import {getOrderArtsHistoryRequest} from '../../../actions/orderHistoryActions';
import {
  pinListRequest,
  pinToCollectionListRequest,
} from '../../../actions/PinActions';
import {getLoggedInUserDetailsRequest} from '../../../actions/UserActions';
import {
  ActionBottomSheet,
  ArtItem,
  CollectionItem,
  CommunityItem,
  CustomNavbar,
  NoDataFoundComponent,
  OrderArtItem,
  ProfileAnimatedHeader,
  UserProfileComponent,
} from '../../../components';
import {
  DEEP_LINK_SCREEN_CONSTS,
  PROFILE_COMPONENT_HEIGHT,
  strings,
} from '../../../constants';
import {mixpanel} from '../../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images, Metrics} from '../../../theme';
import util from '../../../util';
import styles from './styles';
import {getUserDetailsByIDRequest} from '../../../actions/artistActions';

const tabs = {
  PIN_COLLECTION_TAB: 'pinCollectionTab',
  COMMUNITY_TAB: 'communityTab',
  ORDER_TAB: 'orderDetailsTab',
};

const limit = 15;
const VisitUserProfile = props => {
  const {
    userDetails,
    currentActiveActionName,
    loggedInUserDetails,
    isPined,
    pinToCollectionList,
    pinPostList,

    communityListing,
    orderArtsHistory,
    feedItem,
    profileDetails,
  } = props;
  const {
    isArtist = false,
    cover_image = undefined,
    profileImage = undefined,
    userId = -1,
  } = userDetails;
  const {artist} = feedItem;
  const {id: artistID} = artist;
  const isArtistProfile = isArtist;
  const [pinTabbarPinSelected, setPinTabbarPinSelected] = useState(() => true);
  const [pinTabbarPinCollectionSelected, setPinTabbarPinCollectionSelected] =
    useState(() => false);
  const [artistProfileDetails, setArtistProfileDetails] = useState(
    () => profileDetails?.[artistID]?.details ?? null,
  );
  const [selectedTab, setSelectedTab] = useState(() => tabs.PIN_COLLECTION_TAB);
  const [isBackgroundImage, setIsBackgroundImage] = useState(() => true);
  const [isLoading, setLoading] = useState(() => false);

  const [
    isGettingCollectionListFromServer,
    setIsGettingCollectionListFromServer,
  ] = useState(() => false);
  const [isGettingPostsListFromServer, setIsGettingPostsListFromServer] =
    useState(() => true);
  const [isMoreDataCommunity, setIsMoreDataCommunity] = useState(() => false);
  const [isNextPageCommunity, setIsNextPageCommunity] = useState(() => false);
  const [offsetCommunity, setOffsetCommunity] = useState(() => 0);
  const [isMoreDataOrder, setIsMoreDataOrder] = useState(() => false);
  const [isNextPageOrder, setIsNextPageOrder] = useState(() => false);
  const [offsetOrder, setOffsetOrder] = useState(() => 0);
  const [isMoreDataPin, setIsMoreDataPin] = useState(() => false);
  const [isNextPagePin, setIsNextPagePin] = useState(() => false);
  const [offsetPin, setOffsetPin] = useState(() => 0);
  const [isMoreDataPinToCollection, setIsMoreDataPinToCollection] = useState(
    () => false,
  );
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  const [
    isGettingArtistDetailsFromServer,
    setIsGettingArtistDetailsFromServer,
  ] = useState(() => true);
  const [isMenuActionSheetVisible, setIsMenuActionSheetVisible] = useState(
    () => false,
  );
  const [hasNextPagePinToCollection, setIsNextPagePinToCollection] = useState(
    () => true,
  );
  const [offsetPinToCollection, setOffsetPinToCollection] = useState(() => 0);
  const dispatch = useDispatch();

  useEffect(() => {
    // hit api whenever user enters user profile screen. it will only call if logged in user is artist
    const isActiveScreen =
      currentActiveActionName === 'profile_tab' ||
      currentActiveActionName === 'userProfile';
    if (!!isActiveScreen) {
      const params = `${userId}`;
      dispatch(getLoggedInUserDetailsRequest(params));
    }
  }, [currentActiveActionName]);

  useEffect(() => {
    if (util.areValuesEqual(selectedTab, tabs.ORDER_TAB)) {
      setLoading(true);
      const params = `?offset=${0}&limit=${limit}&user_id=${artistID}`;
      const payload = {
        artistID: artistID,
        saveDataAgainstVisitingUserKey: true,
      };

      dispatch(
        getOrderArtsHistoryRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setIsNextPageOrder(true);
            setLoading(false);
          } else {
            setIsNextPageOrder(false);
            setLoading(false);
          }
        }),
      );
    }

    if (util.areValuesEqual(selectedTab, tabs.COMMUNITY_TAB)) {
      setLoading(true);
      const params = `?filter_by=following&offset=${0}&limit=${limit}&user_id=${artistID}`;
      const payload = {
        artistID: artistID,
        saveDataAgainstVisitingUserKey: true,
      };
      dispatch(
        getCommunitiesListIAmPartOfRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setLoading(false);
            setIsNextPageCommunity(true);
          } else {
            setLoading(false);
            setIsNextPageCommunity(false);
          }
        }),
      );
    }
    if (util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB)) {
      setLoading(true);
      const payload = {
        artistID: artistID,
        saveDataAgainstVisitingArtistKey: true,
      };
      const params = `?offset=${0}&limit=${15}&artist_id=${artistID}`;
      dispatch(
        pinListRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setLoading(false);
            setIsNextPagePin(true);
            setIsMoreDataPin(false);
          } else {
            setLoading(false);
            setIsNextPagePin(false);
            setIsMoreDataPin(false);
          }
        }),
      );
    }
  }, [selectedTab]);

  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: 'User Visiting Profile',
      UserName: artist?.profileTagId,
    });
  }, []);

  useEffect(() => {
    setArtistProfileDetails(profileDetails?.[artistID]?.details ?? {});
  }, [profileDetails]);
  useEffect(() => {
    setIsGettingArtistDetailsFromServer(true);
    const params = `${artistID}`;
    dispatch(
      getUserDetailsByIDRequest(params, _ => {
        setIsGettingArtistDetailsFromServer(false);
      }),
    );
  }, [artistID]);

  const renderProfileTabBar = () => (
    <View
      style={[
        {
          paddingVertical: 10,
          backgroundColor: Colors.background.primary,
          height: 40,
        },
        util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB)
          ? {
              marginBottom: 30,
            }
          : {marginBottom: 0},
      ]}>
      <View style={styles.tabbarMainView}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={[
              styles.tabbarView,
              util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) &&
                styles.tabbarViewSelected,
            ]}
            onPress={() => setSelectedTab(tabs.PIN_COLLECTION_TAB)}>
            <Image
              source={
                util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB)
                  ? Images.pinIconLight
                  : Images.PinToCollectioUnselected
              }
              style={[
                {
                  width: 12,
                  height: 16,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabbarView,
              util.areValuesEqual(selectedTab, tabs.COMMUNITY_TAB) &&
                styles.tabbarViewSelected,
            ]}
            onPress={() => setSelectedTab(tabs.COMMUNITY_TAB)}>
            <Image
              style={{width: 22, height: 16.6}}
              source={
                util.areValuesEqual(selectedTab, tabs.COMMUNITY_TAB)
                  ? Images.communityTabSelected
                  : Images.communityTabIcon
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabbarView,
              util.areValuesEqual(selectedTab, tabs.ORDER_TAB) &&
                styles.tabbarViewSelected,
            ]}
            onPress={() => setSelectedTab(tabs.ORDER_TAB)}>
            <Image
              style={[{width: 22, height: 22}]}
              source={
                !util.areValuesEqual(selectedTab, tabs.ORDER_TAB)
                  ? Images.saleTabIcon
                  : Images.orderHistorySelected
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      {util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) &&
        artistPinAndPintoCollectionTabbar()}
    </View>
  );

  const renderEmptyContainer = text => (
    <Text style={styles.noCollectionFoundText}>{text}</Text>
  );
  const renderProfileComponent = useMemo(
    () => (
      <UserProfileComponent
        userOrArtistProfileDetails={artistProfileDetails}
        isArtistProfile={false}
        isVisitingOnArtistProfile={true}
        isBackgroundImage={isBackgroundImage}
      />
    ),
    [artistProfileDetails, isBackgroundImage],
  );
  const renderLoader = () => {
    return (
      <ActivityIndicator
        style={{marginTop: 50}}
        size="small"
        color={Colors.white}
      />
    );
  };

  /*  Pin And Pin To Collection Start */

  const renderPinAndPinTOCollection = () => {
    return (
      <View style={{flex: 1}}>
        {pinTabbarPinSelected
          ? renderPinList(pinPostList)
          : renderPinToCollection}
      </View>
    );
  };

  const artistPinAndPintoCollectionTabbar = () => (
    <View style={{height: 40, marginTop: 0}}>
      <View style={styles.picTabbarMainView}>
        <TouchableOpacity
          style={
            pinTabbarPinSelected
              ? styles.picTabbarSelected
              : styles.picTabbarView
          }
          activeOpacity={0.5}
          onPress={() => handleArtistPinTabbar('pin')}>
          <Text
            style={
              pinTabbarPinSelected
                ? styles.picTabbarTextSelected
                : styles.picTabbarText
            }>
            Pin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            pinTabbarPinCollectionSelected
              ? styles.picTabbarSelected
              : styles.picTabbarView
          }
          activeOpacity={0.5}
          onPress={() => handleArtistPinTabbar('pinCollection')}>
          <Text
            style={
              pinTabbarPinCollectionSelected
                ? styles.picTabbarTextSelected
                : styles.picTabbarText
            }>
            Pin Collection
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  function handleArtistPinTabbar(pinTab) {
    if (pinTab === 'pin') {
      clickOnPinTab();
    }
    if (pinTab === 'pinCollection') {
      clickOnPinTOCollectionTab();
    }
  }

  const clickOnPinTab = () => {
    setPinTabbarPinSelected(true);
    setPinTabbarPinCollectionSelected(false);
    setLoading(true);
    const payload = {
      artistID: artistID,
      saveDataAgainstVisitingArtistKey: true,
    };
    const params = `?offset=${0}&limit=${15}&artist_id=${artistID}`;
    dispatch(
      pinListRequest(payload, params, res => {
        if (!util.isArrayEmpty(res)) {
          setLoading(false);
          setIsMoreDataPin(false);
          setIsNextPagePin(true);
        } else {
          setLoading(false);
          setIsNextPagePin(false);
          setIsMoreDataPin(false);
        }
      }),
    );
  };

  const clickOnPinTOCollectionTab = () => {
    setPinTabbarPinSelected(false);
    setPinTabbarPinCollectionSelected(true);
    setLoading(true);
    const payload = {
      artistID: artistID,
      saveDataAgainstVisitingArtistKey: true,
    };
    const params = `?offset=${offsetPinToCollection}&limit=${15}&artist_id=${artistID}`;
    dispatch(
      pinToCollectionListRequest(payload, params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsNextPagePinToCollection(true);
          setLoading(false);
        } else {
          setLoading(false);
          setIsNextPagePinToCollection(false);
        }
      }),
    );
  };

  const renderPinToCollection = useMemo(() => {
    return (
      <FlatList
        numColumns={3}
        data={profileDetails[artistID]?.pinToCollectionList ?? []}
        style={{flex: 1}}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CollectionItem
            isPin={true}
            item={item}
            isArtist={true}
            onItemPress={() => {
              const {id} = item;
              Actions.jump('pinCollectionListingwithoutTabs', {
                collectionDetails: item,
                isPin: true,
                pinToCollectionId: id,
                artistID: artistID,
              });

              mixpanel.track('Visit', {
                PageName: 'Visit User Pin To Collection',
                PinToCollectionName: item?.title,
              });
            }}
          />
        )}
        onEndReached={loadMoreDataPinToCollection}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() =>
          isLoading
            ? renderLoader()
            : util.isArrayEmpty(
                profileDetails[artistID]?.pinToCollectionList,
              ) && renderEmptyContainer(strings.NO_PIN_FOUND)
        }
        ListFooterComponent={
          <View style={isMoreDataPinToCollection && {marginVertical: 40}}>
            {isMoreDataPinToCollection && (
              <ActivityIndicator color={Colors.white} />
            )}
          </View>
        }
      />
    );
  }, [
    profileDetails[artistID]?.pinToCollectionList,
    isMoreDataPinToCollection,
    isLoading,
  ]);

  function loadMoreDataPinToCollection() {
    if (hasNextPagePinToCollection) {
      setIsMoreDataPinToCollection(true);
      const params = `?offset=${offsetPinToCollection}&limit=${15}&artist_id=${artistID}`;
      const payload = {
        artistID: artistID,
        saveDataAgainstVisitingArtistKey: true,
      };
      dispatch(
        pinToCollectionListRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffsetPinToCollection(offsetPinToCollection + 15);
            setIsMoreDataPinToCollection(false);
          } else {
            setIsNextPagePinToCollection(false);
            setIsMoreDataPinToCollection(false);
          }
        }),
      );
    }
  }

  const renderPinList = mData => (
    <FlatList
      data={profileDetails[artistID]?.pinnedPostsAndCollectionsList}
      style={AppStyles.flex}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        const isCollection = item?.isCollection ?? false;
        const {id, artist} = item || {};
        return isCollection ? (
          <CollectionItem
            item={item}
            isArtist={!!isArtistProfile}
            onItemPress={() => {
              Actions.postsListingOfCollection({
                collectionDetails: item,
                isPin: false,
                pinToCollectionId: id,
                artistID: artist?.id,
              });
            }}
          />
        ) : (
          <ArtItem artItem={item} isPin={true} />
        );
      }}
      keyExtractor={(_, index) => index}
      onEndReached={loadMoreDataSimplePin}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => (
        <NoDataFoundComponent text={strings.NO_PIN_FOUND} />
      )}
      ListFooterComponent={
        <View style={isMoreDataPin && {marginVertical: 40}}>
          {isMoreDataPin && <ActivityIndicator color={Colors.white} />}
        </View>
      }
    />
  );

  function loadMoreDataSimplePin() {
    if (isNextPagePin) {
      setIsMoreDataPin(true);
      const payload = {
        artistID: artistID,
        saveDataAgainstVisitingArtistKey: true,
      };
      const params = `?offset=${offsetPin}&limit=${15}&artist_id=${artistID}`;
      dispatch(
        pinListRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffsetPin(offsetPin + 15);
            setIsMoreDataPin(false);
          } else {
            setIsNextPagePin(false);
            setIsMoreDataPin(false);
          }
        }),
      );
    }
  }

  /*  Pin And Pin To Collection End */

  /** Community Tab Start */
  const renderCommunityTab = () => {
    return (
      <View style={{flex: 1}}>
        {isLoading ? renderLoader() : renderCommunityListing()}
      </View>
    );
  };

  function moreDataCommunityListing() {
    if (isNextPageCommunity) {
      setIsMoreDataCommunity(true);
      setLoading(true);
      const params = `?filter_by=following&offset=${offsetCommunity}&limit=${15}&user_id=${artistID}`;
      const payload = {
        artistID: artistID,
        saveDataAgainstVisitingUserKey: true,
      };
      dispatch(
        getCommunitiesListIAmPartOfRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffsetCommunity(offsetCommunity + 15);
            setIsMoreDataCommunity(false);
            setLoading(false);
          } else {
            setIsNextPageCommunity(false);
            setIsMoreDataCommunity(false);
            setLoading(false);
          }
        }),
      );
    }
  }

  function renderCommunityListing() {
    return (
      <FlatList
        data={profileDetails[artistID]?.userCommunitiesList}
        style={AppStyles.flex}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <CommunityItem
              item={item}
              onPress={() =>
                Actions.jump('communityDetailsWithoutTabbar', {
                  communityDetails: item,
                })
              }
            />
          );
        }}
        keyExtractor={(_, index) => index}
        onEndReached={moreDataCommunityListing}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() =>
          isLoading
            ? renderLoader()
            : util.isArrayEmpty(
                profileDetails[artistID]?.userCommunitiesList,
              ) && <NoDataFoundComponent text={strings.NO_COMMUNITIES_FOUND} />
        }
        ListFooterComponent={
          <View style={isMoreDataCommunity && {marginVertical: 40}}>
            {isMoreDataCommunity && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    );
  }
  /** Community Tab End */

  /** Order Tab Start */
  const renderOrderTab = () => {
    return (
      <View style={{flex: 1}}>
        {isLoading ? renderLoader() : renderOrderListing()}
      </View>
    );
  };

  function moreDataOrderListing() {
    if (isNextPageOrder) {
      setIsMoreDataOrder(true);
      const params = `?offset=${offsetOrder}&limit=${15}&user_id=${artistID}`;
      const payload = {
        artistID: artistID,
        saveDataAgainstVisitingUserKey: true,
      };
      dispatch(
        getOrderArtsHistoryRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffsetOrder(offsetOrder + 15);
            setIsMoreDataOrder(false);
          } else {
            setIsNextPageOrder(false);
            setIsMoreDataOrder(false);
          }
        }),
      );
    }
  }

  function renderOrderListing() {
    return (
      <FlatList
        data={profileDetails[artistID]?.orderArtsHistoryList}
        style={AppStyles.flex}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <OrderArtItem item={item} />;
        }}
        keyExtractor={(_, index) => index}
        onEndReached={moreDataOrderListing}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() =>
          isLoading
            ? renderLoader()
            : util.isArrayEmpty(
                profileDetails[artistID]?.orderArtsHistoryList,
              ) && <NoDataFoundComponent text={strings.NO_PURCHASE_FOUND} />
        }
        ListFooterComponent={
          <View style={isMoreDataOrder && {marginVertical: 40}}>
            {isMoreDataOrder && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    );
  }
  /** Order Tab End */

  const actionSheet = () => {
    const firstBtnAction = async () => {
      setIsMenuActionSheetVisible(false);
      const data = {
        id: artistID,
      };
      const shareOptions = {
        // message: '',
        url: util.getDeepLinkUrl(DEEP_LINK_SCREEN_CONSTS.PROFILE, data, 'user'),
      };
      try {
        const ShareResponse = await Share.open(shareOptions);
      } catch (error) {}
    };

    const cancelBtnAction = () => {
      setIsMenuActionSheetVisible(false);
    };

    const valuesCallback = value => {
      if (value === 0) {
        firstBtnAction();
      }
      if (value === 1) {
        cancelBtnAction();
      }
    };

    const textOptions = ['Share', 'Cancel'];

    return (
      <ActionBottomSheet
        valuesCallback={valuesCallback}
        textOptions={textOptions}
        cancelBtnAction={() => {
          setIsMenuActionSheetVisible(false);
        }}
      />
    );
  };
  return !!isGettingArtistDetailsFromServer ? (
    <View style={styles.loadingDataSec}>{renderLoader()}</View>
  ) : (
    <View style={AppStyles.flex}>
      <ProfileAnimatedHeader
        scrollAnimated={scrollAnimated}
        user={artistProfileDetails}
        leftImageOnPress={() => Actions.pop()}
        rightImageOnPress={() => setIsMenuActionSheetVisible(true)}
        rightImage={Images.threeHorizontalDots}
        leftImage={Images.backButton}
        notificationCount={0}
      />
      <View style={AppStyles.flex}>
        <Animated.ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={{flex: 1}}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
            {
              useNativeDriver: true,
            },
          )}
          onEndReached={() => {
            if (util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB)) {
              pinTabbarPinSelected
                ? loadMoreDataSimplePin()
                : loadMoreDataPinToCollection();
            } else if (util.areValuesEqual(selectedTab, tabs.COMMUNITY_TAB)) {
              moreDataCommunityListing();
            } else if (util.areValuesEqual(selectedTab, tabs.ORDER_TAB)) {
              moreDataOrderListing();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            if (util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB)) {
              pinTabbarPinSelected ? (
                <View style={isMoreDataPin && {marginVertical: 40}}>
                  {isMoreDataPin && <ActivityIndicator color={Colors.white} />}
                </View>
              ) : (
                <View style={isMoreDataPinToCollection && {marginVertical: 40}}>
                  {isMoreDataPinToCollection && (
                    <ActivityIndicator color={Colors.white} />
                  )}
                </View>
              );
            } else if (util.areValuesEqual(selectedTab, tabs.COMMUNITY_TAB)) {
              <View style={isMoreDataCommunity && {marginVertical: 40}}>
                {isMoreDataCommunity && (
                  <ActivityIndicator color={Colors.white} />
                )}
              </View>;
            } else if (util.areValuesEqual(selectedTab, tabs.ORDER_TAB)) {
              <View style={isMoreDataOrder && {marginVertical: 40}}>
                {isMoreDataOrder && <ActivityIndicator color={Colors.white} />}
              </View>;
            }
          }}>
          <View style={[styles.coverImage]}>{renderProfileComponent}</View>
          {renderProfileTabBar()}
          <View style={styles.container}>
            {util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) &&
              renderPinAndPinTOCollection()}
            {util.areValuesEqual(selectedTab, tabs.COMMUNITY_TAB) &&
              renderCommunityTab()}
            {util.areValuesEqual(selectedTab, tabs.ORDER_TAB) &&
              renderOrderTab()}
            {isMenuActionSheetVisible && actionSheet()}
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};
VisitUserProfile.propTypes = {};
VisitUserProfile.defaultProps = {};

const mapStateToProps = ({
  user,
  general,
  post,
  pin,
  notifications,
  community,
  orderHistory,
}) => ({
  userDetails: user.data,
  loggedInUserDetails: user.userDetails,
  currentActiveActionName: general.currentActiveActionName,
  postsList: post.loggedInUserOrArtistPostsList,
  pinToCollectionList: pin.pinToCollectionList,
  pinPostList: pin.pinPostList,
  communityListing: community.communitiesListIAmPartOf,
  orderArtsHistory: orderHistory.orderArtsHistory,
  profileDetails: user.profileDetails,
});

export default connect(mapStateToProps)(VisitUserProfile);
