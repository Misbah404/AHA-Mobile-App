import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getSearchListDataByCategoryListRequest} from '../../actions/searchTabActions';
import {FilterItem, SearchComponent, Text} from '../../components';
import {searchCategory, strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import ArtistsList from './ArtistsList';
import ArtsList from './ArtsList';
import CollectionsList from './CollectionsList';
import VibesList from './VibesList';
import styles from './Styles';
import {mixpanel} from '../../helpers/mixpanelHelper';

const limit = 6;
const SearchTabbar = props => {
  const [searchFieldText, setSearchFieldText] = useState(() => '');
  const [isLoading, setIsLoading] = useState(() => false);
  const [categorySelected, setcategorySelected] = useState(
    () => searchCategory.ALL.slug,
  );
  const [filterDataObjects, setFilterDataObjects] = useState(() => []);

  const [searchArtIds, setSearchArtIds] = useState(() => []);

  const [searchArtistsIds, setSearchArtistsIds] = useState(() => []);

  const [searchVibesIds, setSearchVibesIds] = useState(() => []);

  const [searchCollectionIds, setSearchCollectionIds] = useState(() => []);
  const [scrollEnable, setScrollEnable] = useState(() => true);

  const dispatch = useDispatch();

  useEffect(() => {
    mixpanel.track('Visit', {PageName: 'Search'});
  }, []);

  useEffect(() => {
    const isAllCategorySelected = util.areValuesEqual(
      categorySelected,
      searchCategory.ALL.slug,
    );
    if (isAllCategorySelected && shouldShowDataUnderCategory()) {
      setParamsAndCallApi();
    }
    if (util.areValuesEqual(categorySelected, 'all')) {
      setScrollEnable(true);
    } else {
      setScrollEnable(false);
    }

    if (
      util.isEmptyValue(searchFieldText) &&
      util.isArrayEmpty(filterDataObjects)
    ) {
      setSearchArtIds([]);
      setSearchArtistsIds([]);
      setSearchVibesIds([]);
      setSearchCollectionIds([]);
    }
  }, [searchFieldText, filterDataObjects, categorySelected]);

  function setParamsAndCallApi() {
    setIsLoading(true);
    let params = `?search_category=${categorySelected}&offset=${0}&limit=${limit}`;

    if (!util.isEmptyValue(searchFieldText)) {
      params += `&search_text=${searchFieldText}`;
    }

    params = getFilterDataParams(params);
    apiCall(params);
  }

  function getFilterDataParams(params) {
    if (!util.isArrayEmpty(filterDataObjects)) {
      const country = util.filterArray(
        filterDataObjects,
        item => item.type === 'country',
      );
      const city = util.filterArray(
        filterDataObjects,
        item => item.type === 'city',
      );
      const state = util.filterArray(
        filterDataObjects,
        item => item.type === 'state',
      );
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
  }

  function apiCall(params) {
    dispatch(
      getSearchListDataByCategoryListRequest(params, res => {
        const {
          arts = [],
          artists = [],
          vibes = [],
          collections = [],
        } = res || {};
        const artIds = util.getIdsFromArray(arts);
        const artistsIds = util.getIdsFromArray(artists);
        const vibesIds = util.getIdsFromArray(vibes);
        const collectionsIds = util.getIdsFromArray(collections);

        setSearchArtIds(artIds);
        setSearchArtistsIds(artistsIds);
        setSearchVibesIds(vibesIds);
        setSearchCollectionIds(collectionsIds);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        mixpanel.track('Search', {
          SearchTerm: searchFieldText,
          SearchCharacterLength: searchFieldText.length,
          NoOfResultsReturned: res?.totalCount,
        });
      }),
    );
  }

  function onResetBtnPressCallBack() {
    setFilterDataObjects([]);
  }

  function handleCategory(value) {
    setcategorySelected(value);
  }

  function setFilterDataObjectsCallBack(data) {
    setFilterDataObjects(data);
  }

  function onCrossIconPressHandlerCb(item) {
    let filteredArr = util.filterArray(
      filterDataObjects,
      mItem => !util.areValuesEqual(mItem.type, item.type),
    );
    setFilterDataObjects(filteredArr);

    if (util.isEmptyValue(searchFieldText)) {
      setSearchArtIds([]);
      setSearchArtistsIds([]);
      setSearchVibesIds([]);
      setSearchCollectionIds([]);
    }
  }

  function shouldMakeCategoryVisible(category) {
    const shouldVisible =
      util.areValuesEqual(searchCategory.ALL.slug, categorySelected) ||
      util.areValuesEqual(category, categorySelected);
    return shouldVisible;
  }

  const shouldShowDataUnderCategory = () =>
    !util.isEmptyValue(searchFieldText) ||
    !util.isArrayEmpty(filterDataObjects);

  const renderFilterItemObj = item => {
    return (
      <FilterItem
        dataObj={item}
        onCrossIconPressHandlerCb={onCrossIconPressHandlerCb}
      />
    );
  };

  const renderFilterDataFlatList = useMemo(() => {
    return (
      <FlatList
        horizontal
        data={filterDataObjects}
        style={AppStyles.mLeft10}
        keyExtractor={(_, index) => index}
        renderItem={renderFilterItemObj}
      />
    );
  }, [filterDataObjects]);

  const renderFilterSection = useMemo(() => {
    return (
      <View style={AppStyles.padding20}>
        <View style={AppStyles.flexRow}>
          <Image style={styles.filterIcon} source={Images.filterIcon} />
          <Text style={styles.filterHeadingStyle}>{strings.FILTER}</Text>
          <View style={styles.verticalLine} />
          {renderFilterDataFlatList}
        </View>
      </View>
    );
  }, [filterDataObjects]);

  const renderSearchComponent = useMemo(
    () => (
      <>
        <SearchComponent
          value={searchFieldText}
          shouldDisableCrossIcon={isLoading}
          setSearchFieldText={setSearchFieldText}
          categorySelected={categorySelected}
          setcategorySelected={setcategorySelected}
          filterIconOnPress={() =>
            Actions.filter({
              setFilterDataObjectsCallBack,
              dataArray: filterDataObjects,
              searchText: searchFieldText,
              setSearchText: setSearchFieldText,
              onResetBtnPressCallBack,
            })
          }
          isCategorySelected
        />
        {!util.isArrayEmpty(filterDataObjects) ? renderFilterSection : <></>}
      </>
    ),
    [searchFieldText, filterDataObjects, isLoading],
  );

  const renderCategoryTabs = useMemo(
    () => (
      <View style={styles.categoryView}>
        {Object.keys(searchCategory).map(function (key, _) {
          const item = searchCategory[key];
          const isSelected = util.areValuesEqual(categorySelected, item.slug);
          return (
            <TouchableOpacity
              onPress={() => handleCategory(item.slug)}
              style={
                isSelected
                  ? styles.categoryTextViewSelected
                  : styles.categoryTextView
              }
              activeOpacity={0.5}>
              <Text
                style={
                  isSelected ? styles.categoryTextSelected : styles.categoryText
                }>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ),
    [categorySelected],
  );

  const isAllCategorySelected = useMemo(
    () => util.areValuesEqual(categorySelected, searchCategory.ALL.slug),
    [categorySelected],
  );

  const renderArtsList = useMemo(() => {
    return (
      <ArtsList
        isAllCategorySelected={isAllCategorySelected}
        onMoreBtnPressHandler={() =>
          setcategorySelected(searchCategory.ART.slug)
        }
        searchText={searchFieldText}
        filterData={filterDataObjects}
        allCategorySearchArtIds={searchArtIds}
      />
    );
  }, [searchFieldText, filterDataObjects, categorySelected, searchArtIds]);

  const renderArtistsList = useMemo(() => {
    return (
      <ArtistsList
        isAllCategorySelected={isAllCategorySelected}
        onMoreBtnPressHandler={() =>
          setcategorySelected(searchCategory.ARTIST.slug)
        }
        searchText={searchFieldText}
        filterData={filterDataObjects}
        allCategorySearchArtistsIds={searchArtistsIds}
      />
    );
  }, [searchFieldText, filterDataObjects, categorySelected, searchArtistsIds]);

  const renderVibesList = useMemo(() => {
    return (
      <VibesList
        isAllCategorySelected={isAllCategorySelected}
        onMoreBtnPressHandler={() =>
          setcategorySelected(searchCategory.VIBE.slug)
        }
        searchText={searchFieldText}
        filterData={filterDataObjects}
        allCategorySearchVibesIds={searchVibesIds}
      />
    );
  }, [searchFieldText, filterDataObjects, categorySelected, searchVibesIds]);

  const renderCollectionsList = useMemo(() => {
    return (
      <CollectionsList
        isAllCategorySelected={isAllCategorySelected}
        onMoreBtnPressHandler={() =>
          setcategorySelected(searchCategory.COLLECTION.slug)
        }
        searchText={searchFieldText}
        filterData={filterDataObjects}
        allCategorySearchCollectionsIds={searchCollectionIds}
      />
    );
  }, [
    searchFieldText,
    filterDataObjects,
    categorySelected,
    searchCollectionIds,
  ]);

  const renderSearchToContinue = () => (
    <View style={styles.searchToContSec}>
      <Image
        source={Images.noDataFound}
        style={{resizeMode: 'contain', height: 200, width: 210}}
      />
    </View>
  );

  const renderNoDataFoundComp = () => (
    <View style={styles.emptyViewSec} pointerEvents={'none'}>
      <Image
        source={Images.NoDataFoundImage}
        style={{resizeMode: 'contain', height: 300, width: 310}}
      />
    </View>
  );

  const renderEmptyDataView = useMemo(() => {
    if (
      util.isEmptyValue(searchFieldText) &&
      util.isEmptyObject(filterDataObjects)
    ) {
      return renderSearchToContinue();
    }
    if (
      util.isAllArraysEmpty(
        searchArtIds,
        searchArtistsIds,
        searchVibesIds,
        searchCollectionIds,
      )
    ) {
      return renderNoDataFoundComp();
    }

    return <></>;
  }, [
    searchFieldText,
    filterDataObjects,
    searchArtIds,
    searchArtistsIds,
    searchVibesIds,
    searchCollectionIds,
  ]);

  const renderMainView = () => (
    <>
      {isLoading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <View
          style={AppStyles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={AppStyles.pBottom20}>
          {shouldMakeCategoryVisible(searchCategory.ART.slug) && renderArtsList}
          {shouldMakeCategoryVisible(searchCategory.ARTIST.slug) &&
            renderArtistsList}
          {shouldMakeCategoryVisible(searchCategory.VIBE.slug) &&
            renderVibesList}
          {shouldMakeCategoryVisible(searchCategory.COLLECTION.slug) &&
            renderCollectionsList}
        </View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.searchCompCont}>
        {renderSearchComponent}
      </SafeAreaView>
      {renderCategoryTabs}
      {scrollEnable ? (
        <ScrollView
          style={{flex: 1}}
          onScrollEndDrag={() => Keyboard.dismiss()}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          scrollEnabled={scrollEnable}>
          {util.isEmptyValue(searchFieldText) &&
          util.isEmptyObject(filterDataObjects) ? (
            <></>
          ) : (
            renderMainView()
          )}
        </ScrollView>
      ) : (
        renderMainView()
      )}
      {!isLoading && isAllCategorySelected && renderEmptyDataView}
    </View>
  );
};
SearchTabbar.propTypes = {};
SearchTabbar.defaultProps = {};

const mapStateToProps = ({search}) => ({
  artsList: search.arts,
  artistsList: search.artists,
  vibesList: search.vibes,
  collectionsList: search.collections,
});
export default connect(mapStateToProps, null)(SearchTabbar);
