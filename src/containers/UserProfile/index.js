import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getCollectionsListRequest} from '../../actions/collection';
import {getSingleUserOrArtistPostsListRequest} from '../../actions/feedActions';
import {notificationsCountRequest} from '../../actions/NotificationsActions';
import {
  pinListRequest,
  pinToCollectionListRequest,
} from '../../actions/PinActions';
import {getLoggedInUserDetailsRequest} from '../../actions/UserActions';
import {
  ArtItem,
  CollectionItem,
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  UserProfileComponent,
} from '../../components';
import {strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const tabs = {
  ARTS_TAB: 'artsTab',
  COLLECTION_TAB: 'CollectionTab',
  PIN_COLLECTION_TAB: 'pinCollectionTab',
};

const UserProfile = props => {
  const {
    userDetails,
    currentActiveActionName,
    collectionsList,
    postsList,
    loggedInUserDetails,
    isPined,
    pinToCollectionList,
    pinPostList,
    notificationsCount,
  } = props;
  const {
    isArtist = false,
    cover_image = undefined,
    profileImage = undefined,
    userId = -1,
  } = userDetails;
  const isArtistProfile = isArtist;
  const [pinTabbarPinSelected, setPinTabbarPinSelected] = useState(() => true);
  const [pinTabbarPinCollectionSelected, setPinTabbarPinCollectionSelected] =
    useState(() => false);
  const [selectedTab, setSelectedTab] = useState(() =>
    isArtistProfile ? tabs.ARTS_TAB : tabs.PIN_COLLECTION_TAB,
  );
  const [isBackgroundImage, setIsBackgroundImage] = useState(() => true);
  const [isLoading, setLoading] = useState(() => false);

  const [
    isGettingCollectionListFromServer,
    setIsGettingCollectionListFromServer,
  ] = useState(() => false);
  const [isGettingPostsListFromServer, setIsGettingPostsListFromServer] =
    useState(() => true);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isMoreDataCollection, setIsMoreDataCollection] = useState(() => false);
  const [isNextPageCollection, setIsNextPageCollection] = useState(() => false);
  const [offsetCollection, setOffsetCollection] = useState(() => 0);
  const [isMoreDataPin, setIsMoreDataPin] = useState(() => false);
  const [isNextPagePin, setIsNextPagePin] = useState(() => false);
  const [offsetPin, setOffsetPin] = useState(() => 0);
  const [isMoreDataPinToCollection, setIsMoreDataPinToCollection] = useState(
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
    if (isPined) {
      setSelectedTab(tabs.PIN_COLLECTION_TAB);
    }
  }, [isPined]);

  useEffect(() => {
    if (
      util.areValuesEqual(selectedTab, tabs.COLLECTION_TAB) &&
      !!isArtistProfile
    ) {
      setIsGettingCollectionListFromServer(true);
      const payload = {
        isLoggedInUserOrArtist: true,
      };
      const params = `?offset=${0}&limit=${15}`;
      dispatch(
        getCollectionsListRequest(payload, params, res => {
          setIsGettingCollectionListFromServer(false);
          if (!util.isArrayEmpty(res)) {
            setIsNextPageCollection(true);
          } else {
            setIsNextPageCollection(false);
          }
        }),
      );
    }

    if (util.areValuesEqual(selectedTab, tabs.ARTS_TAB) && !!isArtistProfile) {
      const params = `?offset=${0}&limit=${15}`;
      dispatch(
        getSingleUserOrArtistPostsListRequest(params, res => {
          if (!util.isArrayEmpty(res)) {
            setIsNextPage(true);
          } else {
            setIsNextPage(false);
          }
        }),
      );
      setIsGettingPostsListFromServer(false);
    }
    if (util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB)) {
      setLoading(true);
      const params = `?offset=${0}&limit=${15}`;
      dispatch(
        pinListRequest({}, params, res => {
          if (!util.isArrayEmpty(res)) {
            setLoading(false);
            setIsNextPagePin(true);
          } else {
            setLoading(false);
            setIsNextPagePin(false);
          }
        }),
      );
    }
  }, [selectedTab]);

  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: 'Profile',
    });
    dispatch(notificationsCountRequest({}, res => {}));
  }, []);

  /* Artist Tabbar Start */
  const renderPinToCollection = useMemo(() => {
    return (
      <FlatList
        numColumns={3}
        data={pinToCollectionList}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const {id} = item || {};
          return (
            <CollectionItem
              isPin={true}
              item={item}
              isArtist={!!isArtistProfile}
              onItemPress={() => {
                Actions.jump('pinCollectionListing', {
                  collectionDetails: item,
                  isPin: true,
                  pinToCollectionId: id,
                });
              }}
            />
          );
        }}
        ListEmptyComponent={() => renderEmptyContainer(strings.NO_PIN_FOUND)}
        onEndReached={loadMoreDataPinToCollection}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={isMoreDataPinToCollection && {marginVertical: 20}}>
            {isMoreDataPinToCollection && (
              <ActivityIndicator color={Colors.white} />
            )}
          </View>
        }
      />
    );
  }, [pinToCollectionList, isMoreDataPinToCollection]);

  const artistPinAndPinToCollectionView = () => (
    <View style={{flex: 1}}>
      {isArtistProfile && (
        <>
          {pinTabbarPinCollectionSelected &&
            (!isLoading ? renderPinToCollection : renderLoader())}
          {pinTabbarPinSelected &&
            (!isLoading ? renderPinList(pinPostList) : renderLoader())}
        </>
      )}
    </View>
  );

  const artistPinAndPintoCollectionTabbar = () => (
    <View style={{}}>
      {util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) && (
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
      )}
    </View>
  );

  const renderArtistProfileTabBar = () => (
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
            util.areValuesEqual(selectedTab, tabs.ARTS_TAB) &&
              styles.tabbarViewSelected,
          ]}
          onPress={() => setSelectedTab(tabs.ARTS_TAB)}>
          <Image source={Images.artIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabbarView,
            util.areValuesEqual(selectedTab, tabs.COLLECTION_TAB) &&
              styles.tabbarViewSelected,
          ]}
          onPress={() => setSelectedTab(tabs.COLLECTION_TAB)}>
          <Image source={Images.CollectionIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabbarView,
            util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) &&
              styles.tabbarViewSelected,
          ]}
          onPress={() => setSelectedTab(tabs.PIN_COLLECTION_TAB)}>
          <Image
            style={{width: 28, height: 24}}
            source={Images.unfilledHeartIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  function handleArtistPinTabbar(pinTab) {
    if (pinTab === 'pin') {
      clickArtistOnPinTab();
    }
    if (pinTab === 'pinCollection') {
      clickArtistOnPinTOCollectionTab();
    }
  }

  const clickArtistOnPinTab = () => {
    setPinTabbarPinSelected(true);
    setPinTabbarPinCollectionSelected(false);
    setLoading(true);
    const params = `?offset=${0}&limit=${15}`;
    dispatch(
      pinListRequest({}, params, res => {
        if (!util.isArrayEmpty(res)) {
          setLoading(false);
          setIsNextPagePin(true);
        } else {
          setLoading(false);
          setIsNextPagePin(false);
        }
      }),
    );
  };

  const clickArtistOnPinTOCollectionTab = () => {
    setPinTabbarPinSelected(false);
    setPinTabbarPinCollectionSelected(true);
    setLoading(true);
    const params = `?offset=${offsetPinToCollection}&limit=${15}`;
    dispatch(
      pinToCollectionListRequest({}, params, res => {
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

  /* Artist Tabbar End */

  /* User Tabbar Start */

  const clickOnPinTabUser = () => {
    setSelectedTab(tabs.PIN_COLLECTION_TAB);
    setLoading(true);
    const params = `?offset=${0}&limit=${15}`;
    dispatch(
      pinListRequest({}, params, res => {
        if (!util.isArrayEmpty(res)) {
          setLoading(false);
          setIsNextPagePin(true);
        } else {
          setIsNextPagePin(false);
          setLoading(false);
        }
      }),
    );
  };

  // pin to collection tab bar user
  const clickOnPinTOCollectionTabUser = () => {
    setSelectedTab(tabs.COLLECTION_TAB);
    setLoading(true);
    const params = `?offset=${offsetPinToCollection}&limit=${15}`;
    dispatch(
      pinToCollectionListRequest({}, params, res => {
        if (!util.isArrayEmpty(res)) {
          setLoading(false);
          setIsNextPagePinToCollection(true);
        } else {
          setLoading(false);
          setIsNextPagePinToCollection(false);
        }
      }),
    );
  };

  const renderTabBarUser = () => (
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
          onPress={() => clickOnPinTabUser()}>
          <Image
            style={{width: 26, height: 22}}
            source={Images.unfilledHeartIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabbarView,
            util.areValuesEqual(selectedTab, tabs.COLLECTION_TAB) &&
              styles.tabbarViewSelected,
          ]}
          onPress={() => clickOnPinTOCollectionTabUser()}>
          <Image source={Images.CollectionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  /* User Tabbar End */

  const renderArtItem = ({item, _}) => <ArtItem artItem={item} />;

  const renderArtsList = mData => (
    <FlatList
      data={mData}
      style={AppStyles.flex}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() =>
        isGettingPostsListFromServer ? (
          <></>
        ) : (
          <NoDataFoundComponent text={strings.NO_POSTS_FOUND} />
        )
      }
      renderItem={renderArtItem}
      keyExtractor={(_, index) => index}
      onEndReached={loadMoreDataPost}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <View style={isMoreData && {marginVertical: 40}}>
          {isMoreData && <ActivityIndicator color={Colors.white} />}
        </View>
      }
    />
  );

  const renderPinList = mData => (
    <FlatList
      data={mData}
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
          <ArtItem artItem={item} />
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

  function loadMoreDataPost() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?offset=${offset}&limit=${15}`;
      dispatch(
        getSingleUserOrArtistPostsListRequest(params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 15);
            setIsMoreData(false);
            setIsNextPage(true);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  function loadMoreDataCollection() {
    if (isNextPageCollection) {
      setIsMoreDataCollection(true);
      const payload = {
        isLoggedInUserOrArtist: true,
      };
      const params = `?offset=${offsetCollection}&limit=${15}`;
      dispatch(
        getCollectionsListRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffsetCollection(offsetCollection + 15);
            setIsMoreDataCollection(false);
          } else {
            setIsNextPageCollection(false);
            setIsMoreDataCollection(false);
          }
        }),
      );
    }
  }

  function loadMoreDataSimplePin() {
    if (isNextPagePin) {
      setIsMoreDataPin(true);
      const params = `?offset=${offsetPin}&limit=${15}`;
      dispatch(
        pinListRequest({}, params, res => {
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

  function loadMoreDataPinToCollection() {
    if (hasNextPagePinToCollection) {
      setIsMoreDataPinToCollection(true);
      const params = `?offset=${offsetPinToCollection}&limit=${15}`;
      dispatch(
        pinToCollectionListRequest({}, params, res => {
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

  const renderCustomNavBar = useMemo(
    () => (
      <CustomNavbar
        titleStyle={AppStyles.titleStyleForCenter}
        backgroundColor="transparent"
        rightBtnImage={Images.settingIcon}
        leftBtnImage={Images.notificationIcon}
        leftRightButtonWrapperStyle={styles.iconShad}
        rightBtnPress={() => Actions.setting()}
        leftBtnPress={() => Actions.notification()}
        notificationCount={notificationsCount}
      />
    ),
    [notificationsCount],
  );

  const renderEmptyContainer = text => (
    <Text style={styles.noCollectionFoundText}>{text}</Text>
  );
  const renderProfileComponent = useMemo(
    () => (
      <UserProfileComponent
        userOrArtistProfileDetails={loggedInUserDetails}
        isArtistProfile={isArtist}
        isBackgroundImage={isBackgroundImage}
      />
    ),
    [loggedInUserDetails, isBackgroundImage],
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

  return (
    <>
      <ImageBackground
        style={[styles.coverImage]}
        onLoad={() => setIsBackgroundImage(false)}
        source={{
          uri: isArtistProfile ? cover_image : profileImage,
        }}
        imageStyle={{opacity: 0.5}}
        resizeMode={FastImage.resizeMode.cover}>
        {renderCustomNavBar}
        <View style={{marginTop: -10}}>{renderProfileComponent}</View>

        {isArtistProfile ? renderArtistProfileTabBar() : renderTabBarUser()}
      </ImageBackground>

      {isArtistProfile && artistPinAndPintoCollectionTabbar()}

      {isArtistProfile && (
        <View style={styles.container}>
          {util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) &&
            artistPinAndPinToCollectionView()}
          {util.areValuesEqual(selectedTab, tabs.COLLECTION_TAB) &&
            (isGettingCollectionListFromServer ? (
              <View style={styles.collectionLoader}>
                <Loader loading={true} />
              </View>
            ) : (
              <FlatList
                numColumns={3}
                data={collectionsList}
                style={{flex: 1}}
                keyExtractor={(_, index) => index}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  const {id} = item || {};
                  return (
                    <CollectionItem
                      item={item}
                      onItemPress={() => {
                        Actions.postsListingOfCollection({
                          collectionDetails: item,
                          isPin: false,
                          pinToCollectionId: id,
                          isComeFromCollection: true,
                          artistID: userId,
                        });
                      }}
                    />
                  );
                }}
                ListEmptyComponent={() =>
                  !isGettingCollectionListFromServer &&
                  renderEmptyContainer(
                    isArtistProfile
                      ? strings.NO_COLLECTIONS_FOUND
                      : strings.NO_PIN_FOUND,
                  )
                }
                onEndReached={loadMoreDataCollection}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                  <View style={isMoreDataCollection && {marginVertical: 40}}>
                    {isMoreDataCollection && (
                      <ActivityIndicator color={Colors.white} />
                    )}
                  </View>
                }
              />
            ))}
          {util.areValuesEqual(selectedTab, tabs.ARTS_TAB) &&
            (isGettingPostsListFromServer ? (
              <View style={styles.collectionLoader}>
                <Loader loading={true} />
              </View>
            ) : (
              renderArtsList(postsList)
            ))}
        </View>
      )}

      {!isArtistProfile && (
        <View style={styles.container}>
          {util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) &&
            (!isLoading ? renderPinList(pinPostList) : renderLoader())}
          {util.areValuesEqual(selectedTab, tabs.COLLECTION_TAB) &&
            (!isLoading ? (
              <FlatList
                numColumns={3}
                data={pinToCollectionList}
                style={{flex: 1}}
                keyExtractor={(_, index) => index}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  const {id} = item;
                  return (
                    <CollectionItem
                      item={item}
                      isPin={true}
                      isArtist={!!isArtistProfile}
                      onItemPress={() => {
                        Actions.jump('pinCollectionListing', {
                          collectionDetails: item,
                          isPin: true,
                          pinToCollectionId: id,
                        });
                      }}
                    />
                  );
                }}
                onEndReached={loadMoreDataPinToCollection}
                onEndReachedThreshold={0.1}
                ListEmptyComponent={() =>
                  renderEmptyContainer(strings.NO_PIN_FOUND)
                }
                ListFooterComponent={
                  <View
                    style={isMoreDataPinToCollection && {marginVertical: 40}}>
                    {isMoreDataPinToCollection && (
                      <ActivityIndicator color={Colors.white} />
                    )}
                  </View>
                }
              />
            ) : (
              renderLoader()
            ))}
        </View>
      )}
    </>
  );
};
UserProfile.propTypes = {};
UserProfile.defaultProps = {};

const mapStateToProps = ({
  user,
  general,
  collection,
  post,
  pin,
  notifications,
}) => ({
  userDetails: user.data,
  loggedInUserDetails: user.userDetails,
  currentActiveActionName: general.currentActiveActionName,
  collectionsList: collection.collectionsList,
  postsList: post.loggedInUserOrArtistPostsList,
  pinToCollectionList: pin.pinToCollectionList,
  pinPostList: pin.pinPostList,
  notificationsCount: notifications.notificationsCount,
});

export default connect(mapStateToProps)(UserProfile);
