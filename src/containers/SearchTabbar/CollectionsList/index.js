import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getSearchListDataByCategoryListRequest} from '../../../actions/searchTabActions';
import {CollectionItem, NoDataFoundComponent, Text} from '../../../components';
import {searchCategory, strings} from '../../../constants';
import {mixpanel} from '../../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images} from '../../../theme';
import util from '../../../util';
import styles from './Styles';

const limit = 15;
const CollectionsList = props => {
  const {
    collectionsList,
    isAllCategorySelected,
    onMoreBtnPressHandler,
    searchText,
    filterData,
    allCategorySearchCollectionsIds,
  } = props;

  const [offset, setOffset] = useState(() => 0);
  const [listDataIds, setListDataIds] = useState(() => []);
  const [searchListDataIds, setSearchListDataIds] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [hasMoreData, setHasMoreData] = useState(() => false);
  const [hasNextPage, setHasNextPage] = useState(() => true);

  const dispatch = useDispatch();

  useEffect(() => {
    setOffset(0);
    if (!isAllCategorySelected && shouldShowDataUnderCategory()) {
      setIsLoading(true);
      setListDataIds([]);
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
    let params = `?search_category=${searchCategory.COLLECTION.slug}&offset=${mOffset}&limit=${limit}`;

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

        const {collections = []} = res || {};
        const allCollectionsIds = util.getIdsFromArray(collections);
        if (util.isArrayEmpty(collections)) {
          setHasNextPage(false);
          setHasMoreData(false);
        } else {
          isFromPagination ? setOffset(offset + limit) : setOffset(0);
          setHasMoreData(false);
        }

        let _searchListDataIds = util.cloneDeepArray(searchListDataIds);

        if (offset === 0) {
          setSearchListDataIds(allCollectionsIds);
        } else {
          const data = _searchListDataIds.concat(allCollectionsIds);
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
    const filterdData = util.filterArray(collectionsList, item =>
      allCategorySearchCollectionsIds.includes(item.id),
    );
    return filterdData.slice(0, 6);
  };

  const getDataIfAllCategoryIsNotSelected = () => {
    return util.filterArray(collectionsList, item =>
      searchListDataIds.includes(item.id),
    );
  };

  const loadMoreData = () => {
    if (hasNextPage && !isAllCategorySelected) {
      setHasMoreData(true);
      setParamsAndCallApi(offset, true);
    }
  };

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

  const renderCollectionsList = () => {
    const data = isAllCategorySelected
      ? getDataIfAllCategoryIsSelected()
      : getDataIfAllCategoryIsNotSelected();
    return (
      <FlatList
        data={data}
        numColumns={3}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={hasMoreData && {marginVertical: 20}}>
            {hasMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
        ListEmptyComponent={renderNoDataFoundComp}
        renderItem={renderCollectionListItem}
        keyExtractor={(_, index) => index}
      />
    );
  };

  const renderCollectionListItem = ({item}) => {
    return (
      <CollectionItem
        item={item}
        onItemPress={() => {
          const {artist} = item;
          Actions.postsListingOfCollection({
            collectionDetails: item,
            artistID: artist?.id,
            isPin: false,
          });
        }}
      />
    );
  };

  const renderHeadingAndMoreButton = () => {
    if (util.isArrayEmpty(allCategorySearchCollectionsIds)) {
      return <></>;
    }
    return headingAndMoreButtonView();
  };
  const headingAndMoreButtonView = () => (
    <View style={styles.headingView}>
      <Text style={styles.heading}>{strings.COLLECTION}</Text>
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
            !util.isEmptyValue(searchText) && renderCollectionsList()
          )}
        </View>
        {!isLoading && !isAllCategorySelected && renderSearchToContinueView}
      </View>
    </View>
  );
};
CollectionsList.propTypes = {
  isAllCategorySelected: PropTypes.bool.isRequired,
  onMoreBtnPressHandler: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  filterData: PropTypes.array.isRequired,
  allCategorySearchCollectionsIds: PropTypes.array,
};
CollectionsList.defaultProps = {
  allCategorySearchCollectionsIds: [],
};

const mapStateToProps = ({search}) => ({
  collectionsList: search.collections,
});
export default connect(mapStateToProps, null)(CollectionsList);
