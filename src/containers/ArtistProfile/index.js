import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import Share from 'react-native-share';
import {connect, useDispatch} from 'react-redux';
import {getUserDetailsByIDRequest} from '../../actions/artistActions';
import {getCollectionsListRequest} from '../../actions/collection';
import {
  pinListRequest,
  pinToCollectionListRequest,
} from '../../actions/PinActions';
import {getPostsListByUserIDRequest} from '../../actions/UserActions';
import {
  ActionBottomSheet,
  ArtItem,
  CollectionItem,
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  UserProfileComponent,
} from '../../components';
import {DEEP_LINK_SCREEN_CONSTS, strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const tabs = {
  ARTS_TAB: 'artsTab',
  COLLECTION_TAB: 'CollectionTab',
  PIN_COLLECTION_TAB: 'pinCollectionTab',
};

const ArtistProfile = props => {
  const {
    feedItem,
    profileDetails,
    isComingFromDeepLinkUrl,
    onBackPressHandler,
  } = props;
  const {artist} = feedItem;
  const {id: artistID} = artist;

  const [pinTabbarPinSelected, setPinTabbarPinSelected] = useState(() => true);
  const [pinTabbarPinCollectionSelected, setPinTabbarPinCollectionSelected] =
    useState(() => false);
  const [selectedTab, setSelectedTab] = useState(() => tabs.ARTS_TAB);
  const [
    isGettingCollectionListFromServer,
    setIsGettingCollectionListFromServer,
  ] = useState(() => false);
  const [artistProfileDetails, setArtistProfileDetails] = useState(
    () => profileDetails?.[artistID]?.details ?? null,
  );
  const [isGettingPostsListFromServer, setIsGettingPostsListFromServer] =
    useState(() => false);
  const [
    isGettingArtistDetailsFromServer,
    setIsGettingArtistDetailsFromServer,
  ] = useState(() => true);
  const [isBackgroundImage, setIsBackgroundImage] = useState(() => true);
  const [isMenuActionSheetVisible, setIsMenuActionSheetVisible] = useState(
    () => false,
  );
  const [isLoading, setLoading] = useState(() => false);
  const [isMoreDataPinToCollection, setIsMoreDataPinToCollection] = useState(
    () => false,
  );
  const [hasNextPagePinToCollection, setIsNextPagePinToCollection] = useState(
    () => false,
  );
  const [offsetPinToCollection, setOffsetPinToCollection] = useState(() => 0);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isMoreDataCollection, setIsMoreDataCollection] = useState(() => false);
  const [isNextPageCollection, setIsNextPageCollection] = useState(() => false);
  const [offsetCollection, setOffsetCollection] = useState(() => 0);
  const [isMoreDataPin, setIsMoreDataPin] = useState(() => false);
  const [isNextPagePin, setIsNextPagePin] = useState(() => false);
  const [offsetPin, setOffsetPin] = useState(() => 0);
  const dispatch = useDispatch();

  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: 'Artist Profile',
      ArtistName: artist?.profileTagId,
    });
  }, []);

  useEffect(() => {
    setIsGettingArtistDetailsFromServer(true);
    const params = `${artistID}`;
    dispatch(
      getUserDetailsByIDRequest(params, _ => {
        setIsGettingArtistDetailsFromServer(false);
      }),
    );
  }, [artistID]);

  useEffect(() => {
    setArtistProfileDetails(profileDetails?.[artistID]?.details ?? {});
  }, [profileDetails]);

  useEffect(() => {
    switch (selectedTab) {
      case tabs.COLLECTION_TAB: {
        const params = `?offset=${0}&limit=${15}&artist_id=${artistID}`;
        const payload = {
          id: artistID,
        };
        setIsGettingCollectionListFromServer(true);
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
        break;
      }
      case tabs.ARTS_TAB: {
        const params = `?offset=${0}&limit=${15}&artist_id=${artistID}`;
        const payload = {
          id: artistID,
        };
        setIsGettingPostsListFromServer(true);
        dispatch(
          getPostsListByUserIDRequest(payload, params, res => {
            setIsGettingPostsListFromServer(false);
            if (!util.isArrayEmpty(res)) {
              setIsNextPage(true);
            } else {
              setIsNextPage(false);
            }
          }),
        );
        break;
      }
      case tabs.PIN_COLLECTION_TAB: {
        pinTabbarPressHandler(pinTabbarPinSelected);
        break;
      }
    }
  }, [selectedTab]);

  function pinTabbarPressHandler(isPinTab) {
    // if is pin tab then pinTabOnPressHandler else call pinToCollectionTabPressHandler
    isPinTab
      ? pinnedPostsAndCollectionsTabOnPressHandler()
      : pinToCollectionTabPressHandler();
  }

  // artist tab pin
  function pinnedPostsAndCollectionsTabOnPressHandler() {
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
          setIsNextPagePin(true);
        } else {
          setLoading(false);
          setIsNextPagePin(false);
        }
      }),
    );
  }

  // artist tab pin to collection tab
  function pinToCollectionTabPressHandler() {
    setPinTabbarPinSelected(false);
    setPinTabbarPinCollectionSelected(true);
    setLoading(true);
    const params = `?offset=${0}&limit=${15}&artist_id=${artistID}`;
    const payload = {
      artistID: artistID,
      saveDataAgainstVisitingArtistKey: true,
      offset: 0,
    };
    dispatch(
      pinToCollectionListRequest(payload, params, res => {
        util.isArrayEmpty(res)
          ? setIsNextPagePinToCollection(false)
          : setIsNextPagePinToCollection(true);

        setLoading(false);
      }),
    );
  }

  function loadMoreDataPinToCollection() {
    if (hasNextPagePinToCollection) {
      setIsMoreDataPinToCollection(true);
      const params = `?offset=${offsetPinToCollection}&limit=${15}&artist_id=${artistID}`;
      const payload = {
        artistID: artistID,
        saveDataAgainstVisitingArtistKey: true,
        offset: offsetPinToCollection,
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

  const renderTabBar = () => (
    <View style={styles.tabbarMainView}>
      {/* please Dont remove inline style */}
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
            style={{width: 26, height: 22}}
            source={Images.unfilledHeartIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPinAndPinToCollectionTabs = () => (
    <View>
      {util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) && (
        <View style={styles.picTabbarMainView}>
          <TouchableOpacity
            style={
              pinTabbarPinSelected
                ? styles.picTabbarSelected
                : styles.picTabbarView
            }
            activeOpacity={0.5}
            onPress={() => pinTabbarPressHandler(true)}>
            <Text
              style={
                pinTabbarPinSelected
                  ? styles.picTabbarTextSelected
                  : styles.picTabbarText
              }>
              {strings.PIN}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              pinTabbarPinCollectionSelected
                ? styles.picTabbarSelected
                : styles.picTabbarView
            }
            activeOpacity={0.5}
            onPress={() => pinTabbarPressHandler(false)}>
            <Text
              style={
                pinTabbarPinCollectionSelected
                  ? styles.picTabbarTextSelected
                  : styles.picTabbarText
              }>
              {strings.PIN_COLLECTION}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderLoader = () => {
    return <ActivityIndicator animating size="small" color={Colors.white} />;
  };

  const renderPinnedPostsAndCollectionsList = useMemo(() => {
    return (
      <FlatList
        data={profileDetails[artistID]?.pinnedPostsAndCollectionsList}
        style={AppStyles.flex}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isCollection = item?.isCollection ?? false;
          const {id, artist} = item || {};
          return isCollection ? (
            <CollectionItem
              isPin={true}
              item={item}
              onItemPress={() => {
                Actions.postsListingOfCollection({
                  collectionDetails: item,
                  isPin: true,
                  pinToCollectionId: id,
                  artistID: artist?.id,
                });
              }}
            />
          ) : (
            <ArtItem
              artItem={item}
              shouldShowLeftBorder={index === 0}
              shouldShowRightBorder={index === 2}
            />
          );
        }}
        keyExtractor={(_, index) => index}
        onEndReached={loadMoreDataSimplePin}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() => renderEmptyContainer(strings.NO_PIN_FOUND)}
        ListFooterComponent={
          <View style={isMoreDataPin && {marginVertical: 40}}>
            {isMoreDataPin && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    );
  }, [profileDetails[artistID]?.pinnedPostsAndCollectionsList]);

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

  const renderPinToCollectionList = useMemo(() => {
    return (
      <FlatList
        numColumns={3}
        data={profileDetails[artistID]?.pinToCollectionList ?? []}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CollectionItem
            isPin={true}
            item={item}
            isArtist={true}
            onItemPress={() => {
              const {id} = item;
              Actions.jump('pinCollectionListing', {
                collectionDetails: item,
                isPin: true,
                pinToCollectionId: id,
                artistID: artistID,
              });
            }}
          />
        )}
        ListEmptyComponent={() => renderEmptyContainer(strings.NO_PIN_FOUND)}
        onEndReached={loadMoreDataPinToCollection}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={isMoreDataPinToCollection && {marginVertical: 20}}>
            {isMoreDataPinToCollection && renderLoader()}
          </View>
        }
      />
    );
  }, [profileDetails[artistID]?.pinToCollectionList]);

  const renderPinAndPinToCollectionTabsListData = () => (
    <View style={AppStyles.flex}>
      <>
        {isLoading ? (
          <View style={{marginTop: 50}}>{renderLoader()}</View>
        ) : pinTabbarPinSelected ? (
          renderPinnedPostsAndCollectionsList
        ) : (
          renderPinToCollectionList
        )}
      </>
    </View>
  );

  const actionSheet = () => {
    const firstBtnAction = async () => {
      setIsMenuActionSheetVisible(false);
      const data = {
        id: artistID,
      };
      const shareOptions = {
        // message: '',
        url: util.getDeepLinkUrl(
          DEEP_LINK_SCREEN_CONSTS.PROFILE,
          data,
          'artist',
        ),
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

  const renderCustomNavBar = useMemo(
    () => (
      <CustomNavbar
        titleStyle={AppStyles.titleStyleForCenter}
        backgroundColor="transparent"
        rightBtnImage={Images.threeHorizontalDots}
        rightBtnStyle={{alignSelf: 'center', top: 5}}
        rightBtnPress={() => setIsMenuActionSheetVisible(true)}
        hasBack
        leftBtnPress={
          isComingFromDeepLinkUrl ? onBackPressHandler() : () => Actions.pop()
        }
      />
    ),
    [],
  );

  const renderEmptyContainer = text => (
    <Text style={styles.noDataFoundText}>{text}</Text>
  );

  const renderArtItem = ({item, index}) => (
    <ArtItem
      artItem={item}
      shouldShowLeftBorder={index === 0}
      shouldShowRightBorder={index === 2}
    />
  );

  const renderArtsList = () => (
    <FlatList
      data={profileDetails[artistID]?.postsList}
      style={AppStyles.flex}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <NoDataFoundComponent text={strings.NO_POSTS_FOUND} />
      )}
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

  function loadMoreDataPost() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?offset=${offset}&limit=${15}&artist_id=${artistID}`;
      const payload = {
        id: artistID,
      };
      dispatch(
        getPostsListByUserIDRequest(payload, params, res => {
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

  const renderCollectionsList = useMemo(() => {
    return (
      <FlatList
        numColumns={3}
        data={profileDetails[artistID]?.collectionsList ?? []}
        keyExtractor={(_, index) => index}
        style={AppStyles.flex}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <CollectionItem
              item={item}
              onItemPress={() => {
                const {id} = item;
                Actions.postsListingOfCollection({
                  collectionDetails: item,
                  isPin: false,
                  pinToCollectionId: id,
                  artistID: artistID,
                });
              }}
            />
          );
        }}
        ListEmptyComponent={() =>
          renderEmptyContainer(strings.NO_COLLECTIONS_FOUND)
        }
        onEndReached={loadMoreDataCollection}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={isMoreDataCollection && {marginVertical: 40}}>
            {isMoreDataCollection && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    );
  }, [profileDetails]);

  function loadMoreDataCollection() {
    if (isNextPageCollection) {
      setIsMoreDataCollection(true);
      const payload = {
        id: artistID,
      };
      const params = `?offset=${offsetCollection}&limit=${15}&artist_id=${artistID}`;
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
  const renderCollectionLoader = () => (
    <View style={styles.collectionLoader}>
      <Loader loading={true} />
    </View>
  );

  return !!isGettingArtistDetailsFromServer ? (
    <View style={styles.loadingDataSec}>{renderLoader()}</View>
  ) : (
    <>
      <FastImage
        style={{backgroundColor: Colors.background.primary}}
        onLoad={() => setIsBackgroundImage(false)}
        source={{
          uri: profileDetails[artistID]?.details?.cover_image ?? undefined,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        {renderCustomNavBar}
        <View style={{marginTop: -10}}>
          <UserProfileComponent
            userOrArtistProfileDetails={artistProfileDetails}
            isVisitingOnArtistProfile={true}
            isArtistProfile={true}
            isBackgroundImage={isBackgroundImage}
          />
        </View>
        {renderTabBar()}
      </FastImage>
      {renderPinAndPinToCollectionTabs()}

      <View style={styles.container}>
        <View style={styles.container}>
          {/* tabbar */}
          {util.areValuesEqual(selectedTab, tabs.ARTS_TAB) &&
            (isGettingPostsListFromServer
              ? renderCollectionLoader()
              : renderArtsList())}

          {util.areValuesEqual(selectedTab, tabs.COLLECTION_TAB) &&
            (isGettingCollectionListFromServer
              ? renderCollectionLoader()
              : renderCollectionsList)}

          {util.areValuesEqual(selectedTab, tabs.PIN_COLLECTION_TAB) &&
            renderPinAndPinToCollectionTabsListData()}

          {isMenuActionSheetVisible && actionSheet()}
        </View>
      </View>
    </>
  );
};
ArtistProfile.propTypes = {
  isComingFromDeepLinkUrl: PropTypes.bool,
  onBackPressHandler: PropTypes.func,
};
ArtistProfile.defaultProps = {
  isComingFromDeepLinkUrl: false,
  onBackPressHandler: () => Actions.pop(),
};

const mapStateToProps = ({user}) => ({
  profileDetails: user.profileDetails,
});

export default connect(mapStateToProps)(ArtistProfile);
