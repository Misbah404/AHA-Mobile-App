import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import DataTypes from '../../dataTypes';
import {removeFollowerRequest} from '../../actions/UserActions';
import {
  ArtistAndCommunityItem,
  SearchComponent,
  CustomNavbar,
  Loader,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import {
  followUnFollowArtistRequest,
  getFollowersListRequest,
  getFollowerListSearchRequest,
} from '../../actions/UserActions';
import {findLastKey} from 'lodash';
import {mixpanel} from '../../helpers/mixpanelHelper';

const ArtistFollowers = props => {
  /**
   * @type {Artist}
   */
  const {
    activeUserOrArtistObj,
    _userDetails,
    _profileDetails,
    _followerSearchList,
  } = props;
  const {id = -1} = activeUserOrArtistObj || {};
  const {userId} = _userDetails;
  const isVisitingUserOrArtist = !util.areValuesEqual(
    activeUserOrArtistObj,
    {},
  );
  const [isLoading, setIsLoading] = useState(() => false);
  const [artistID, setArtistID] = useState(() => id);
  const [modalVisible, setModalVisible] = useState(() => false);
  const [selectedUserOrArtistObj, setSelectedUserOrArtistObj] = useState(
    () => {},
  );
  const [searchTxt, setSearchTxt] = useState(() => '');
  const [hasMoreData, setHasMoreData] = useState(() => false);
  const [hasNextPage, setHasNextPage] = useState(() => true);
  const [offset, setOffset] = useState(() => 0);
  const [searchListData, setSearchListData] = useState(() => []);
  const [followersSearchListIds, setFollowersSearchListIds] = useState(
    () => [],
  );
  const [isFollow, setIsFollow] = useState(() => findLastKey);
  const [hasMoreDataInSearchList, setHasMoreDataInSearchList] = useState(
    () => false,
  );
  const [hasHasNextPageInSearchList, setHasNextPageInSearchList] = useState(
    () => true,
  );
  const [searchListOffset, setSearchListOffset] = useState(() => 0);
  const [isSearching, setIsSearching] = useState(() => false);
  const [tappedBtnIdToShowLoader, setTappedBtnIdToShowLoader] = useState(
    () => undefined,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setArtistID(id);
  }, [id]);

  useEffect(() => {
    const data = util.filterArray(_followerSearchList, item => {
      return util.isArrayIncludesValue(followersSearchListIds, item.id);
    });
    setSearchListData(data);
  }, [followersSearchListIds, _followerSearchList]);

  useEffect(() => {
    setIsLoading(true);
    apiCall();
    if (!util.isEmptyObject(activeUserOrArtistObj)) {
      mixpanel.track('Visit', {
        PageName: 'Followers',
        ArtistName: activeUserOrArtistObj?.profileTagId,
      });
    } else {
      mixpanel.track('Visit', {
        PageName: 'Followers',
      });
    }
  }, []);

  const apiCall = () => {
    let params = `?offset=${0}&limit=${10}`;
    if (!!isVisitingUserOrArtist) {
      params += `&artist_id=${id}`;
    }
    const payload = {id: isVisitingUserOrArtist ? artistID : userId};
    dispatch(
      getFollowersListRequest(params, payload, _ => {
        setIsLoading(false);
      }),
    );
  };

  useEffect(() => {
    if (!!!util.isFieldNil(selectedUserOrArtistObj)) unFollowArtist();
  }, [selectedUserOrArtistObj]);

  function followButtonPressHandler(_item) {
    const {id} = _item;
    const payload = {item: _item, follow: true};
    setTappedBtnIdToShowLoader(id);
    setIsFollow(true);
    dispatch(
      followUnFollowArtistRequest(payload, res => {
        setTappedBtnIdToShowLoader(undefined);
        setIsFollow(false);
      }),
    );
  }

  function followingButtonPressHandler(_item) {
    setSelectedUserOrArtistObj(_item);
  }

  function removeFollower() {
    setModalVisible(false);
    const {id} = selectedUserOrArtistObj;
    const params = `${id}`;
    dispatch(removeFollowerRequest(params, res => {}));
  }

  function unFollowArtist() {
    setModalVisible(false);
    setTappedBtnIdToShowLoader(selectedUserOrArtistObj.id);

    const payload = {item: selectedUserOrArtistObj, follow: false};
    dispatch(
      followUnFollowArtistRequest(payload, res =>
        setTappedBtnIdToShowLoader(undefined),
      ),
    );
  }

  function onSearchText(text) {
    setSearchTxt(text);
    setIsSearching(true);
    setTimeout(function () {
      let params;
      if (!!isVisitingUserOrArtist) {
        params = `?artist_id=${id}&search_text=${text}`;
      } else {
        params = `?search_text=${text}`;
      }
      const payload = {id: isVisitingUserOrArtist ? artistID : userId};
      dispatch(
        getFollowerListSearchRequest(
          params,
          payload,
          followerUserOrArtistIds => {
            setFollowersSearchListIds(followerUserOrArtistIds);
            setIsLoading(false);
            setIsSearching(false);
          },
        ),
      );
    }, 100);
  }

  function loadMoreData() {
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
          getFollowerListSearchRequest(params, payload, followingArtistIds => {
            setFollowersSearchListIds(
              followersSearchListIds,
              ...followingArtistIds,
            );
            if (!util.isArrayEmpty(followingArtistIds)) {
              setSearchListOffset(searchListOffset + 10);
            } else {
              setHasNextPageInSearchList(false);
            }
            setHasMoreDataInSearchList(false);
          }),
        );
      }
    } else {
      if (hasNextPage) {
        setHasMoreData(true);
        let params = `?offset=${offset}&limit=${10}`;
        if (!!isVisitingUserOrArtist) {
          params += `&artist_id=${id}`;
        }
        const payload = {id: isVisitingUserOrArtist ? artistID : userId};

        dispatch(
          getFollowersListRequest(params, payload, res => {
            if (!util.isArrayEmpty(res)) {
              setOffset(offset + 10);
            } else {
              setHasNextPage(false);
            }
            setHasMoreData(false);
          }),
        );
      }
    }
  }

  const renderCustomNavBar = useMemo(() => (
    <CustomNavbar
      title={strings.FOLLOWER}
      hasBack
      titleStyle={AppStyles.titleStyleForLeft}
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      leftBtnPress={() => Actions.pop()}
    />
  ));

  const renderLoader = () => (
    <View style={styles.loader}>
      <Loader loading={isLoading} />
    </View>
  );

  const renderConfirmationModal = useMemo(
    () => (
      <DeleteOrRemoveModal
        heading={
          !!isVisitingUserOrArtist
            ? strings.UNFOLLOW_ARTIST
            : strings.REMOVE_FOLLOWER
        }
        description={
          !!isVisitingUserOrArtist
            ? strings.ARE_YOU_SURE_TO_UNFOLLOW_ARTIST
            : strings.ARE_YOU_SURE_TO_REMOVE_FOLLOWER
        }
        positiveBtnText={strings.YES_I_AM_SURE}
        negativeBtnText={strings.CANCEL}
        positiveBtnPressHandler={() =>
          !!isVisitingUserOrArtist ? unFollowArtist() : removeFollower()
        }
        setModalVisibility={() => setModalVisible(!modalVisible)}
        isModalVisible={modalVisible}
      />
    ),
    [modalVisible],
  );

  const renderEmptyContainer = text => (
    <Text style={styles.noFollowersFoundText}>{text}</Text>
  );

  const _renderItem = useCallback(
    ({item}) => {
      const {is_following, isArtist = false} = item || {};
      const hideButton = util.areValuesEqual(userId, item.id);
      return (
        <ArtistAndCommunityItem
          showLoaderOnButton={
            isVisitingUserOrArtist ? tappedBtnIdToShowLoader === item.id : false
          }
          _item={item}
          followButtonPressHandler={
            isVisitingUserOrArtist
              ? item => {
                  !!is_following
                    ? followingButtonPressHandler(item)
                    : followButtonPressHandler(item);
                }
              : undefined
          }
          removeButtonPressHandler={item => {
            setSelectedUserOrArtistObj(item);
            setTimeout(() => {
              setModalVisible(true);
            }, 100);
          }}
          buttonText={
            !!isVisitingUserOrArtist
              ? !!is_following
                ? strings.FOLLOWING
                : strings.FOLLOW
              : strings.REMOVE
          }
          shouldHideButton={!!hideButton}
          _onItemPress={() =>
            !util.areValuesEqual(userId, item.id)
              ? Actions.artistProfileWithoutTabs({
                  feedItem: {artist: item},
                  isArtirst: item?.isArtist,
                })
              : Function()
          }
          isFollow={isFollow}
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
      return strings.NO_FOLLOWERS_FOUND;
    }
    return strings.YOU_WILL_SEE;
  };

  const renderFollowersList = useMemo(() => {
    const mId = isVisitingUserOrArtist ? artistID : userId;
    const mFollowersList = _profileDetails[mId]?.followersList ?? [];
    const emptyComponentText = getEmptyFunctionText();
    const shouldSearchDataFromServer = !util.isEmptyValue(searchTxt);

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={shouldSearchDataFromServer ? searchListData : mFollowersList}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={() => renderEmptyContainer(emptyComponentText)}
        renderItem={_renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => apiCall()}
            tintColor={Colors.pullToRefreshLoader}
          />
        }
        ListFooterComponent={
          <View
            style={
              (hasMoreData || hasMoreDataInSearchList) && {marginVertical: 20}
            }>
            {(hasMoreData || hasMoreDataInSearchList) && (
              <ActivityIndicator color={Colors.white} />
            )}
          </View>
        }
      />
    );
  }, [
    _profileDetails,
    searchListData,
    hasMoreDataInSearchList,
    hasMoreData,
    tappedBtnIdToShowLoader,
  ]);

  return (
    <>
      {renderCustomNavBar}
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
            {renderFollowersList}
          </View>
        )}
        {renderConfirmationModal}
      </View>
    </>
  );
};

ArtistFollowers.propTypes = {
  activeUserOrArtistObj: PropTypes.object,
};
ArtistFollowers.defaultProps = {
  activeUserOrArtistObj: {},
};

const mapStateToProps = ({user}) => ({
  _userDetails: user.data,
  _followerSearchList: user.followerSearchList,
  _profileDetails: user.profileDetails,
});

export default connect(mapStateToProps, null)(ArtistFollowers);
