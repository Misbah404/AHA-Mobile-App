import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  followUnFollowArtistRequest,
  getFollowingListRequest,
  getFollowingListSearchRequest,
} from '../../actions/UserActions';
import {
  ArtistAndCommunityItem,
  CustomNavbar,
  Loader,
  SearchComponent,
} from '../../components';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';
import {strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const ArtistFollowing = props => {
  /**
   * @type {Artist}
   */
  const {
    activeUserOrArtistObj,
    _userDetails,
    _profileDetails,
    _followingSearchList,
  } = props;

  const {id} = activeUserOrArtistObj;
  const [artistID, setArtistID] = useState(() => id);

  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => true);
  const [offset, setOffset] = useState(() => 0);

  const [searchListData, setSearchListData] = useState(() => []);
  const [followingSearchListIds, setFollowingSearchListIds] = useState(
    () => [],
  );
  const [hasMoreDataInSearchList, setHasMoreDataInSearchList] = useState(
    () => false,
  );
  const [hasHasNextPageInSearchList, setHasNextPageInSearchList] = useState(
    () => true,
  );
  const [searchListOffset, setSearchListOffset] = useState(() => 0);
  const [isSearching, setIsSearching] = useState(() => false);

  const {userId} = _userDetails;
  const isVisitingUserOrArtist = !util.areValuesEqual(
    activeUserOrArtistObj,
    {},
  );
  const [isLoading, setIsLoading] = useState(() => false);
  const [modalVisible, setModalVisible] = useState(() => false);
  const [artistObjectToUnFollow, setArtistObjectToUnFollow] = useState(
    () => {},
  );
  const [searchTxt, setSearchTxt] = useState(() => '');
  const [tappedBtnIdToShowLoader, setTappedBtnIdToShowLoader] = useState(
    () => undefined,
  );
  const dispatch = useDispatch();
  const onEndReachedCalledDuringMomentum = useRef(true);

  useEffect(() => {
    setArtistID(id);
  }, [id]);

  useEffect(() => {
    const data = util.filterArray(_followingSearchList, item => {
      return util.isArrayIncludesValue(followingSearchListIds, item.id);
    });
    setSearchListData(data);
  }, [followingSearchListIds, _followingSearchList]);

  useEffect(() => {
    setIsLoading(true);
    apiCall();

    if (!util.isEmptyObject(activeUserOrArtistObj)) {
      mixpanel.track('Visit', {
        PageName: 'Followings',
        ArtistName: activeUserOrArtistObj?.profileTagId,
      });
    } else {
      mixpanel.track('Visit', {
        PageName: 'Followers',
      });
    }
  }, []);
  const apiCall = () => {
    let params;
    if (!!isVisitingUserOrArtist) {
      params = `?artist_id=${id}`;
    }
    const payload = {id: isVisitingUserOrArtist ? artistID : userId};
    dispatch(
      getFollowingListRequest(params, payload, _ => {
        setIsLoading(false);
      }),
    );
  };

  useEffect(() => {
    if (!util.isFieldNil(artistObjectToUnFollow)) unFollowArtist();
  }, [artistObjectToUnFollow]);

  function followingButtonPressHandler(_item) {
    setArtistObjectToUnFollow(_item);
  }

  function followButtonPressHandler(_item) {
    const {id} = _item;
    setTappedBtnIdToShowLoader(id);
    const payload = {item: _item, follow: true};
    dispatch(
      followUnFollowArtistRequest(payload, res => {
        setTappedBtnIdToShowLoader(undefined);
      }),
    );
  }

  function unFollowArtist() {
    setModalVisible(false);
    setTappedBtnIdToShowLoader(artistObjectToUnFollow.id);
    const payload = {item: artistObjectToUnFollow, follow: false};
    dispatch(
      followUnFollowArtistRequest(payload, res => {
        setTappedBtnIdToShowLoader(undefined);
      }),
    );
  }

  function onSearchText(text) {
    setSearchTxt(text);
    setIsSearching(true);
    setSearchListOffset(0);
    setTimeout(function () {
      let params;
      if (!!isVisitingUserOrArtist) {
        params = `?artist_id=${id}&search_text=${text}`;
      } else {
        params = `?search_text=${text}`;
      }
      const payload = {id: isVisitingUserOrArtist ? artistID : userId};
      dispatch(
        getFollowingListSearchRequest(params, payload, followingArtistIds => {
          setFollowingSearchListIds(followingArtistIds);
          setIsLoading(false);
          setIsSearching(false);
        }),
      );
    }, 100);
  }

  function loadMoreData() {
    if (!onEndReachedCalledDuringMomentum.current) {
      const shouldLoadDataOfSearchList = !util.isEmptyValue(searchTxt);
      if (shouldLoadDataOfSearchList) {
        if (hasHasNextPageInSearchList) {
          setHasMoreDataInSearchList(true);
          let params = `?offset=${searchListOffset}&limit=${10}`;
          if (!!isVisitingUserOrArtist) {
            params += `&artist_id=${id}`;
          }
          const payload = {id: isVisitingUserOrArtist ? artistID : userId};

          dispatch(
            getFollowingListSearchRequest(
              params,
              payload,
              followingArtistIds => {
                setFollowingSearchListIds(
                  followingSearchListIds,
                  ...followingArtistIds,
                );
                if (!util.isArrayEmpty(followingArtistIds)) {
                  setSearchListOffset(searchListOffset + 10);
                } else {
                  setHasNextPageInSearchList(false);
                }
                setHasMoreDataInSearchList(false);
              },
            ),
          );
        }
      } else {
        if (isNextPage) {
          setIsMoreData(true);
          let params = `?offset=${offset}&limit=${10}`;
          if (!!isVisitingUserOrArtist) {
            params += `&artist_id=${id}`;
          }
          const payload = {id: isVisitingUserOrArtist ? artistID : userId};

          dispatch(
            getFollowingListRequest(params, payload, res => {
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
      onEndReachedCalledDuringMomentum.current = true;
    }
  }

  const renderLoader = () => (
    <View style={styles.loader}>
      <Loader loading={isLoading} />
    </View>
  );

  const renderConfirmationModal = useMemo(
    () => (
      <DeleteOrRemoveModal
        heading={strings.UNFOLLOW_ARTIST}
        description={strings.ARE_YOU_SURE_TO_UNFOLLOW_ARTIST}
        positiveBtnText={strings.YES_I_AM_SURE}
        negativeBtnText={strings.CANCEL}
        positiveBtnPressHandler={() => unFollowArtist()}
        setModalVisibility={() => setModalVisible(!modalVisible)}
        isModalVisible={modalVisible}
      />
    ),
    [modalVisible],
  );

  const renderEmptyContainer = text => (
    <Text style={styles.noDataFoundText}>{text}</Text>
  );

  const _renderItem = useCallback(
    ({item}) => {
      const {is_following, isArtist = false} = item || {};

      const hideButton = util.areValuesEqual(userId, item.id);
      return (
        <ArtistAndCommunityItem
          showLoaderOnButton={tappedBtnIdToShowLoader === item.id}
          _item={item}
          followButtonPressHandler={item => {
            !!is_following
              ? followingButtonPressHandler(item)
              : followButtonPressHandler(item);
          }}
          buttonText={!!is_following ? strings.FOLLOWING : strings.FOLLOW}
          shouldHideButton={!!hideButton}
          _onItemPress={() =>
            !util.areValuesEqual(userId, item.id)
              ? Actions.artistProfileWithoutTabs({
                  feedItem: {artist: item},
                  isArtirst: item?.isArtist,
                })
              : Function()
          }
        />
      );
    },
    [tappedBtnIdToShowLoader],
  );

  const getEmptyFunctionText = () => {
    const shouldSearchDataFromServer = !util.isEmptyValue(searchTxt);
    if (shouldSearchDataFromServer) {
      return strings.NO_SEARCH_RESULT_FOUND;
    }
    if (isVisitingUserOrArtist) {
      return strings.NO_FOLLOWINGS_FOUND;
    }
    return strings.WHEN_YOU_FOLLOW_PEOPLE;
  };

  const renderFollowingList = useMemo(() => {
    const mId = isVisitingUserOrArtist ? artistID : userId;
    const mFollowingList = _profileDetails[mId]?.followingList ?? [];
    const shouldSearchDataFromServer = !util.isEmptyValue(searchTxt);
    const emptyComponentText = getEmptyFunctionText();

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={shouldSearchDataFromServer ? searchListData : mFollowingList}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={() => renderEmptyContainer(emptyComponentText)}
        renderItem={_renderItem}
        onEndReached={loadMoreData}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => apiCall()}
            tintColor={Colors.pullToRefreshLoader}
          />
        }
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        ListFooterComponent={
          <View
            style={
              (isMoreData || hasMoreDataInSearchList) && {marginVertical: 20}
            }>
            {(isMoreData || hasMoreDataInSearchList) && (
              <ActivityIndicator color={Colors.white} />
            )}
          </View>
        }
      />
    );
  }, [
    _profileDetails,
    searchListData,
    isMoreData,
    hasMoreDataInSearchList,
    tappedBtnIdToShowLoader,
  ]);

  return (
    <>
      <CustomNavbar
        title={strings.FOLLOWING}
        hasBack
        titleStyle={AppStyles.titleStyleForLeft}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />

      <View style={styles.container}>
        <SearchComponent
          isFilterIconDisable={true}
          value={searchTxt}
          setSearchFieldText={onSearchText}
          isSearching={isSearching}
        />

        {isLoading ? (
          renderLoader()
        ) : (
          <View style={[AppStyles.mTop10, AppStyles.mBottom45]}>
            {renderFollowingList}
          </View>
        )}
        {renderConfirmationModal}
      </View>
    </>
  );
};

ArtistFollowing.propTypes = {
  activeUserOrArtistObj: PropTypes.object,
};
ArtistFollowing.defaultProps = {
  activeUserOrArtistObj: {},
};

const mapStateToProps = ({user}) => ({
  _userDetails: user.data,
  _followingSearchList: user.followingSearchList,
  _profileDetails: user.profileDetails,
});

export default connect(mapStateToProps, null)(ArtistFollowing);
