import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  RefreshControl,
  View,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getCollectionsListRequest,
  getCollectionsSearchListRequest,
} from '../../actions/collection';
import {
  Button,
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  SearchComponent,
  VibeItem,
} from '../../components';
import {strings} from '../../constants';
import {Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const SearchCollection = props => {
  const {_selectedVibes, collectionsList, callBack, collectionsSearchList} =
    props;
  const [isFetchingData, setIsFetchingData] = useState(() => true);
  const [allCollectionList, setAllCollectionList] = useState(() => []);
  const [selectedCollectionList, setSelectedCollectionList] = useState(
    () => _selectedVibes,
  );
  const [searchTxt, setSearchTxt] = useState(() => '');
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isSearching, setIsSearching] = useState(() => false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(() => false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetchingData(true);
    apiCall();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function apiCall() {
    const payload = {
      isLoggedInUserOrArtist: true,
    };
    const params = `?offset=${0}&limit=${15}`;
    dispatch(
      getCollectionsListRequest(payload, params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsNextPage(true);
          setIsFetchingData(false);
        } else {
          setIsFetchingData(false);
          setIsNextPage(false);
        }
      }),
    );
  }

  useEffect(() => {
    setAllCollectionList(
      util.isArrayEmpty(searchTxt) ? collectionsList : collectionsSearchList,
    );
  }, [collectionsList, collectionsSearchList]);

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);
      const payload = {
        isLoggedInUserOrArtist: true,
      };
      const params = `?offset=${offset}&limit=${15}`;
      dispatch(
        getCollectionsListRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 15);
            setIsMoreData(false);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  function onSearchText(text) {
    setSearchTxt(text);
    setIsSearching(true);
    setTimeout(function () {
      const params = `?search_text=${text}`;
      const payload = {
        isLoggedInUserOrArtist: true,
      };
      dispatch(
        getCollectionsSearchListRequest(payload, params, () => {
          setIsFetchingData(false);
          setIsSearching(false);
        }),
      );
    }, 100);
  }

  function onItemPress(_item) {
    const {id} = _item;
    let mArray = util.cloneDeepArray(selectedCollectionList);
    if (util.some(mArray, {id})) {
      mArray = util.filterArray(mArray, item => item?.id !== id);
    } else {
      mArray[0] = _item;
    }
    setSelectedCollectionList(mArray);
  }

  function onSelectedBtnPress() {
    callBack(selectedCollectionList);
    Actions.pop();
  }

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.SELECT_COLLECTION}
      titleStyle={styles.navbarText}
      hasBack
    />
  );

  const renderList = () => (
    <FlatList
      numColumns={3}
      data={
        util.isEmptyValue(searchTxt) ? collectionsList : collectionsSearchList
      }
      style={{marginTop: 10}}
      keyExtractor={(_, index) => index}
      onScrollEndDrag={() => Keyboard.dismiss()}
      onScrollBeginDrag={() => Keyboard.dismiss()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListView}
      renderItem={({item}) => (
        <VibeItem
          onItemPress={() => onItemPress(item)}
          isSelected={util.some(selectedCollectionList, {id: item.id})}
          _item={item}
        />
      )}
      ListEmptyComponent={() =>
        !isFetchingData &&
        !isSearching && (
          <NoDataFoundComponent
            text={
              util.isEmptyValue(searchTxt)
                ? strings.NO_COLLECTIONS_FOUND
                : strings.NO_SEARCH_RESULT_FOUND
            }
          />
        )
      }
      onRefresh={() => apiCall()}
      refreshing={false}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => apiCall()}
          tintColor={Colors.pullToRefreshLoader}
        />
      }
      ListFooterComponent={
        <View style={isMoreData && {marginVertical: 40}}>
          {isMoreData && <ActivityIndicator color={Colors.white} />}
        </View>
      }
    />
  );

  const renderLoader = () => (
    <View style={styles.loaderView}>
      <Loader loading={isFetchingData} />
    </View>
  );

  const renderSelectButton = () => (
    <Button
      disabled={util.isArrayEmpty(selectedCollectionList)}
      color={Colors.text.white}
      onPress={() => onSelectedBtnPress()}
      style={[styles.selectButton]}
      textStyle={styles.bottomButtonsText}>
      {strings.SELECT}
    </Button>
  );

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      {/* <View style={styles.viewCont}>{renderSearchBar()}</View> */}
      <SearchComponent
        isFilterIconDisable={true}
        value={searchTxt}
        setSearchFieldText={onSearchText}
        isSearching={isSearching}
      />
      {isFetchingData && renderLoader()}
      {
        <>
          {renderList()}
          {!isKeyboardVisible && renderSelectButton()}
        </>
      }
      {!util.isPlatformAndroid() && <KeyboardSpacer />}
    </View>
  );
};
SearchCollection.propTypes = {
  _selectedVibes: PropTypes.array,
  callBack: PropTypes.func,
};
SearchCollection.defaultProps = {
  _selectedVibes: [],
  callBack: Function(),
};
const mapStateToProps = ({collection}) => ({
  collectionsList: collection.collectionsList,
  collectionsSearchList: collection.collectionsSearchList,
});

export default connect(mapStateToProps, null)(SearchCollection);
