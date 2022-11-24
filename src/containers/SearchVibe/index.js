import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  RefreshControl,
  Keyboard,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getVibesListRequest,
  getVibesListSearchRequest,
} from '../../actions/Vibes';
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

const SearchVibe = props => {
  const {_selectedVibes, _allVibesList, vibesSearchList, callBack} = props;
  const [allVibesList, setAllVibesList] = useState(() => []);
  const [searchVibesList, setSearchVibesList] = useState(() => vibesSearchList);
  const [selectedItemIds, setSelectedItemIds] = useState(() => []);
  const [unCheckIdsList, setUnCheckIdsList] = useState(() => []);
  const [isFetchingData, setIsFetchingData] = useState(() => true);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [searchTxt, setSearchTxt] = useState(() => '');
  const [isSearching, setIsSearching] = useState(() => false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(() => false);

  const dispatch = useDispatch();

  useEffect(() => {
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

  useEffect(() => {
    setAllVibesList(util.unionBy(allVibesList, _allVibesList));
  }, [_allVibesList]);

  useEffect(() => {
    setSearchVibesList(vibesSearchList);
  }, [vibesSearchList]);

  useEffect(() => {
    setSelectedItemIds(util.getIdsFromArray(_selectedVibes));
  }, [_selectedVibes]);

  function apiCall() {
    setIsFetchingData(true);
    const params = `?offset=${0}&limit=${15}`;
    dispatch(
      getVibesListRequest(params, res => {
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

  function loadMoreData() {
    if (util.isEmptyValue(searchTxt)) {
      if (isNextPage) {
        setIsMoreData(true);
        const params = `?offset=${offset}&limit=${15}`;
        dispatch(
          getVibesListRequest(params, res => {
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
  }

  const onItemPress = item => {
    if (util.isArrayIncludesValue(selectedItemIds, item.id)) {
      let mUnCheckedIdsArr = util.cloneDeepArray(unCheckIdsList);
      mUnCheckedIdsArr.push(item.id);
      setUnCheckIdsList(mUnCheckedIdsArr);

      let data = util.filterArray(
        selectedItemIds,
        selectedItem => selectedItem != item.id,
      );
      setSelectedItemIds(data);
    } else {
      let data = util.cloneDeepArray(selectedItemIds);
      data.push(item.id);

      let mUnCheckedIdsArr = util.cloneDeepArray(unCheckIdsList);
      if (util.some(mUnCheckedIdsArr, item.id)) {
        mUnCheckedIdsArr = util.filterArray(
          mUnCheckedIdsArr,
          mItem => mItem != item.id,
        );
        setUnCheckIdsList(mUnCheckedIdsArr);
      }

      setSelectedItemIds(data);
    }
  };

  function onSelectedBtnPress() {
    let data = util.filterArray(allVibesList, item =>
      selectedItemIds.includes(item.id),
    );

    callBack(data);
    Actions.pop();
  }

  function onSearchText(text) {
    setSearchTxt(text);
    setIsSearching(true);
    setTimeout(function () {
      const params = `?search_text=${text}`;
      dispatch(
        getVibesListSearchRequest(params, () => {
          setIsSearching(false);
        }),
      );
    }, 100);
  }

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.SELECT_VIBE}
      titleStyle={styles.navbarText}
      hasBack
    />
  );

  const renderList = () => (
    <FlatList
      numColumns={3}
      data={util.isEmptyValue(searchTxt) ? allVibesList : searchVibesList}
      keyExtractor={(_, index) => index}
      onScrollEndDrag={() => Keyboard.dismiss()}
      onScrollBeginDrag={() => Keyboard.dismiss()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListView}
      renderItem={({item}) => (
        <VibeItem
          onItemPress={() => onItemPress(item)}
          isSelected={util.isArrayIncludesValue(selectedItemIds, item.id)}
          _item={item}
        />
      )}
      ListEmptyComponent={() =>
        !isFetchingData &&
        !isSearching && (
          <NoDataFoundComponent
            text={
              util.isEmptyValue(searchTxt)
                ? strings.NO_VIBES_FOUND
                : strings.NO_SEARCH_RESULT_FOUND
            }
          />
        )
      }
      onRefresh={() => apiCall()}
      refreshing={false}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => apiCall()}
          tintColor={Colors.pullToRefreshLoader}
        />
      }
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <View style={isMoreData && {marginVertical: 40}}>
          {isMoreData && <ActivityIndicator color={Colors.white} />}
        </View>
      }
    />
  );

  const renderLoader = () => (
    <View
      style={{position: 'absolute', top: '50%', right: 0, left: 0, bottom: 0}}>
      <Loader loading={true} />
    </View>
  );

  const renderSelectButton = () => (
    <Button
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

      <SearchComponent
        isFilterIconDisable={true}
        value={searchTxt}
        setSearchFieldText={onSearchText}
        isSearching={isSearching}
      />

      {isFetchingData && renderLoader()}
      <>
        {renderList()}
        {!isKeyboardVisible && renderSelectButton()}
      </>
      {!util.isPlatformAndroid() && <KeyboardSpacer />}
    </View>
  );
};
SearchVibe.propTypes = {
  _selectedVibes: PropTypes.array,
  callBack: PropTypes.func,
};
SearchVibe.defaultProps = {
  _selectedVibes: [],
  callBack: Function(),
};
const mapStateToProps = ({vibes}) => ({
  _allVibesList: vibes.vibesList,
  vibesSearchList: vibes.vibesSearchList,
});

export default connect(mapStateToProps, null)(SearchVibe);
