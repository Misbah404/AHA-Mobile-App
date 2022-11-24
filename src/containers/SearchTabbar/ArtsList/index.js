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
import {connect, useDispatch} from 'react-redux';
import {getSearchListDataByCategoryListRequest} from '../../../actions/searchTabActions';
import {ArtItem, Text} from '../../../components';
import {searchCategory, strings} from '../../../constants';
import {mixpanel} from '../../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images} from '../../../theme';
import util from '../../../util';
import styles from './Styles';

const limit = 15;
const ArtsList = props => {
  const {
    artsList,
    isAllCategorySelected,
    onMoreBtnPressHandler,
    searchText,
    filterData,
    allCategorySearchArtIds,
  } = props;

  const [offset, setOffset] = useState(0);
  const [searchListDataIds, setSearchListDataIds] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [hasMoreData, setHasMoreData] = useState(() => false);
  const [hasNextPage, setHasNextPage] = useState(() => true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAllCategorySelected && shouldShowDataUnderCategory()) {
      setOffset(0);
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
    let params = `?search_category=${searchCategory.ART.slug}&offset=${mOffset}&limit=${limit}`;

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

        const {arts = []} = res || {};
        const allArtIds = util.getIdsFromArray(arts);
        if (util.isArrayEmpty(arts)) {
          setHasNextPage(false);
          setHasMoreData(false);
        } else {
          isFromPagination ? setOffset(offset + limit) : setOffset(0);
          setHasMoreData(false);
        }

        let _searchListDataIds = util.cloneDeepArray(searchListDataIds);

        if (offset === 0) {
          setSearchListDataIds(allArtIds);
        } else {
          const data = _searchListDataIds.concat(allArtIds);
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

  const loadMoreData = () => {
    if (hasNextPage && !isAllCategorySelected) {
      setHasMoreData(true);
      setParamsAndCallApi(offset, true);
    }
  };

  const getDataIfAllCategoryIsSelected = () => {
    const filterdData = util.filterArray(artsList, item =>
      allCategorySearchArtIds.includes(item.id),
    );
    return filterdData.slice(0, 6);
  };

  const getDataIfAllCategoryIsNotSelected = () => {
    const data = util.filterArray(artsList, item =>
      searchListDataIds.includes(item.id),
    );
    return data;
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

  const renderArtsList = () => {
    const data = isAllCategorySelected
      ? getDataIfAllCategoryIsSelected()
      : getDataIfAllCategoryIsNotSelected();
    return (
      <FlatList
        data={data}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={hasMoreData && {marginVertical: 20}}>
            {hasMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
        ListEmptyComponent={renderNoDataFoundComp}
        renderItem={renderArtItem}
        keyExtractor={(_, index) => index}
      />
    );
  };

  const renderArtItem = ({item}) => {
    return <ArtItem artItem={item} />;
  };

  const headingAndMoreButtonView = () => (
    <View style={styles.headingView}>
      <Text style={styles.heading}>{strings.ART}</Text>
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
    if (util.isArrayEmpty(allCategorySearchArtIds)) {
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
            !util.isEmptyValue(searchText) && renderArtsList()
          )}
        </View>
      </View>
      {!isLoading && !isAllCategorySelected && renderSearchToContinueView}
    </View>
  );
};

ArtsList.propTypes = {
  isAllCategorySelected: PropTypes.bool.isRequired,
  onMoreBtnPressHandler: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  filterData: PropTypes.array.isRequired,
  allCategorySearchArtIds: PropTypes.array,
};
ArtsList.defaultProps = {
  allCategorySearchArtIds: [],
};

const mapStateToProps = ({search}) => ({
  artsList: search.arts,
});
export default connect(mapStateToProps, null)(ArtsList);
