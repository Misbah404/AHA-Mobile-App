import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getSearchListDataByCategoryListRequest} from '../../../actions/searchTabActions';
import {followUnFollowArtistRequest} from '../../../actions/UserActions';
import {ArtistAndCommunityItem, Text} from '../../../components';
import {searchCategory, strings} from '../../../constants';
import {mixpanel} from '../../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images} from '../../../theme';
import util from '../../../util';
import styles from './Styles';

const limit = 10;
const ArtistsList = props => {
  const {
    artistsList,
    isAllCategorySelected,
    onMoreBtnPressHandler,
    searchText,
    filterData,
    allCategorySearchArtistsIds,
    _userDetails,
  } = props;

  const [offset, setOffset] = useState(() => 0);
  const [searchListDataIds, setSearchListDataIds] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [hasMoreData, setHasMoreData] = useState(() => false);
  const [hasNextPage, setHasNextPage] = useState(() => true);

  const dispatch = useDispatch();
  const {userId} = _userDetails;

  useEffect(() => {
    setOffset(0);
    if (!isAllCategorySelected && shouldShowDataUnderCategory()) {
      setIsLoading(true);
      setSearchListDataIds([]);

      setTimeout(() => {
        setParamsAndCallApi(0);
      }, 200);
    }

    if (util.isEmptyValue(searchText) && util.isArrayEmpty(filterData)) {
      setSearchListDataIds([]);
    }
  }, [searchText, filterData, isAllCategorySelected]);

  const shouldShowDataUnderCategory = () =>
    !util.isEmptyValue(searchText) || !util.isArrayEmpty(filterData);

  const getFilterDataParams = params => {
    if (!util.isArrayEmpty(filterData)) {
      const country = util.filterArray(
        filterData,
        item => item.type === 'country',
      );
      const city = util.filterArray(filterData, item => item.type === 'city');
      const state = util.filterArray(filterData, item => item.type === 'state');
      if (!util.isArrayEmpty(country)) {
        params += `&country=${country[0].title}`;
      }
      if (!util.isArrayEmpty(city)) {
        params += `&city=${city[0].title}`;
      }
      if (!util.isArrayEmpty(state)) {
        params += `&state=${state[0].title}`;
      }
    }
    return params;
  };

  const setParamsAndCallApi = (mOffset = offset, isFromPagination = false) => {
    let params = `?search_category=${searchCategory.ARTIST.slug}&offset=${mOffset}&limit=${limit}`;

    if (!util.isEmptyValue(searchText)) {
      params += `&search_text=${searchText}`;
    }

    params = getFilterDataParams(params);
    apiCall(params, isFromPagination);
  };

  const apiCall = (params, isFromPagination) => {
    dispatch(
      getSearchListDataByCategoryListRequest(params, res => {
        setIsLoading(false);

        const {artists = []} = res || {};
        const allArtistsIds = util.getIdsFromArray(artists);

        if (util.isArrayEmpty(artists)) {
          setHasNextPage(false);
          setHasMoreData(false);
        } else {
          isFromPagination ? setOffset(offset + limit) : setOffset(0);
          setHasMoreData(false);
        }

        let _searchListDataIds = util.cloneDeepArray(searchListDataIds);

        if (offset === 0) {
          setSearchListDataIds(allArtistsIds);
        } else {
          const data = _searchListDataIds.concat(allArtistsIds);
          setSearchListDataIds(data);
        }
        mixpanel.track('Search', {
          SearchTerm: searchText,
          SearchCharacterLength: searchText.length,
          NoOfResultsReturned: res?.totalCount,
        });
      }),
    );
  };

  const getDataIfAllCategoryIsSelected = () => {
    const filterdData = util.filterArray(artistsList, item =>
      allCategorySearchArtistsIds.includes(item.id),
    );
    return filterdData.slice(0, 6);
  };

  const getDataIfAllCategoryIsNotSelected = () => {
    return util.filterArray(artistsList, item =>
      searchListDataIds.includes(item.id),
    );
  };

  const loadMoreData = () => {
    if (hasNextPage && !isAllCategorySelected) {
      setHasMoreData(true);
      setParamsAndCallApi(offset, true);
    }
  };

  function followButtonPressHandler(_item) {
    const payload = {item: _item, follow: true};
    dispatch(followUnFollowArtistRequest(payload));
  }

  function followingButtonPressHandler(_item) {
    const payload = {item: _item, follow: false};
    dispatch(followUnFollowArtistRequest(payload));
  }

  const renderNoDataFoundComp = () => {
    if (
      isAllCategorySelected ||
      (util.isEmptyValue(searchText) && util.isArrayEmpty(filterData))
    ) {
      return <></>;
    }
    return (
      <View style={styles.emptyViewSec} pointerEvents={'none'}>
        <Image
          source={Images.NoDataFoundImage}
          style={{resizeMode: 'contain', height: 300, width: 310}}
        />
      </View>
    );
  };

  const renderArtistsList = () => {
    const data = isAllCategorySelected
      ? getDataIfAllCategoryIsSelected()
      : getDataIfAllCategoryIsNotSelected();
    return (
      <FlatList
        data={data}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <View style={hasMoreData && {marginVertical: 20}}>
            {hasMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
        ListEmptyComponent={renderNoDataFoundComp}
        renderItem={renderArtistListItem}
      />
    );
  };

  const renderArtistListItem = useCallback(({item}) => {
    const {id, is_following} = item || {};
    return (
      <ArtistAndCommunityItem
        _item={item}
        followButtonPressHandler={item => {
          !!is_following
            ? followingButtonPressHandler(item)
            : followButtonPressHandler(item);
        }}
        buttonText={!!is_following ? strings.FOLLOWING : strings.FOLLOW}
        _onItemPress={() =>
          !util.areValuesEqual(userId, id)
            ? Actions.jump('visitedProfile', {
                feedItem: {artist: item},
                isArtirst: true,
              })
            : Function()
        }
      />
    );
  }, []);

  const headingAndMoreButtonView = () => (
    <View style={styles.headingView}>
      <Text style={styles.heading}>{strings.ARTIST}</Text>
      <TouchableOpacity
        style={styles.moreButtonView}
        onPress={onMoreBtnPressHandler}>
        <Text style={styles.heading}>{strings.MORE}</Text>
        <Image
          source={Images.RightIcon}
          style={styles.moreButtonImage}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );

  const renderSearchToContinue = () => (
    <View style={styles.searchToContSec}>
      <Image
        source={Images.noDataFound}
        style={{resizeMode: 'contain', height: 200, width: 210}}
      />
    </View>
  );

  const renderSearchToContinueView = useMemo(() => {
    if (util.isEmptyValue(searchText) && util.isArrayEmpty(filterData)) {
      return renderSearchToContinue();
    }
    return <></>;
  }, [isAllCategorySelected, searchText, filterData]);

  const renderHeadingAndMoreButton = () => {
    if (util.isArrayEmpty(allCategorySearchArtistsIds)) {
      return <></>;
    }
    return headingAndMoreButtonView();
  };

  return (
    <View style={{flex: 1}}>
      <View style={[AppStyles.paddingHorizontalBase, AppStyles.flex]}>
        {isAllCategorySelected && renderHeadingAndMoreButton()}
        <View
          style={[
            isAllCategorySelected ? styles.radiusView : styles.radiusView2,
          ]}>
          {isLoading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            !util.isEmptyValue(searchText) && renderArtistsList()
          )}
        </View>
        {!isLoading && !isAllCategorySelected && renderSearchToContinueView}
      </View>
    </View>
  );
};

ArtistsList.propTypes = {
  isAllCategorySelected: PropTypes.bool.isRequired,
  onMoreBtnPressHandler: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  filterData: PropTypes.array.isRequired,
  allCategorySearchArtistsIds: PropTypes.array,
};
ArtistsList.defaultProps = {
  allCategorySearchArtistsIds: [],
};

const mapStateToProps = ({user, search}) => ({
  _userDetails: user.data,
  artistsList: search.artists,
});
export default connect(mapStateToProps, null)(ArtistsList);
