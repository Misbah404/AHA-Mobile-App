import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
  Keyboard,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getVibesListRequest,
  getVibesListSearchRequest,
  submitVibesRequest,
} from '../../actions/Vibes';
import {
  Button,
  CustomNavbar,
  Loader,
  VibeItem,
  SearchComponent,
  NoDataFoundComponent,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './Styles';

const YourVibe = props => {
  const {vibesListArray, vibesSearchList} = props;
  const [vibesList, setVibesList] = useState(() => vibesListArray);
  const [searchVibesList, setSearchVibesList] = useState(() => vibesSearchList);
  const [selectedItemIds, setSelectedItemIds] = useState(() => []);
  const [unCheckIdsList, setUnCheckIdsList] = useState(() => []);
  const [isFetchingData, setIsFetchingData] = useState(() => true);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isSearching, setIsSearching] = useState(() => false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(() => false);

  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const [searchTxt, setSearchTxt] = useState(() => '');
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetchingData(true);
    apiCall();
  }, []);

  useEffect(() => {
    setVibesList(util.unionBy(vibesList, vibesListArray));

    const filteredArr = util.filterArray(
      vibesListArray,
      item => item.isSelected === true,
    );

    const mIds = util.getIdsFromArray(filteredArr);
    const filteredIds = util.filterArray(
      mIds,
      item => !unCheckIdsList.includes(item),
    );

    let arr = [...selectedItemIds, ...filteredIds];
    // removing duplicate
    let uniqueArr = [...new Set(arr)];

    setSelectedItemIds(uniqueArr);
  }, [vibesListArray]);

  useEffect(() => {
    setSearchVibesList(vibesSearchList);
  }, [vibesSearchList]);

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
    const params = `?offset=${0}&limit=${15}`;
    dispatch(
      getVibesListRequest(params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsFetchingData(false);
          setIsNextPage(true);
        } else {
          setIsNextPage(false);
          setIsFetchingData(false);
        }
      }),
    );
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

  function onUpdateBtnPress() {
    setIsSendingDataToServer(true);
    let payload = {vibes: selectedItemIds};

    dispatch(
      submitVibesRequest(payload, res => {
        if (res) {
          util.topAlert(strings.YOUR_VIBE_HAS_BEEN_UPDATED);
          Actions.pop();
        }
        setIsSendingDataToServer(false);
      }),
    );
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

  function loadMoreData() {
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

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.YOUR_VIBE}
      hasBack
      titleStyle={AppStyles.titleStyleForLeft}
      leftRightButtonWrapperStyle={AppStyles.centerInner}
    />
  );

  const renderHeadings = () => (
    <View style={styles.headingView}>
      <Text style={styles.heading}>{strings.CHOOSE_YOUR_VIBE}</Text>
      <Text style={styles.description}>{strings.WHAT_IS_YOUR_VIBE}?</Text>
    </View>
  );

  const renderList = useMemo(
    () => (
      <FlatList
        numColumns={3}
        data={util.isEmptyValue(searchTxt) ? vibesList : searchVibesList}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        contentContainerStyle={styles.flatListView}
        renderItem={({item}) => (
          <VibeItem
            onItemPress={onItemPress}
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
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => apiCall()}
            tintColor={Colors.pullToRefreshLoader}
          />
        }
        onRefresh={() => apiCall()}
        refreshing={false}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={isMoreData && {marginVertical: 40}}>
            {isMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    ),
    [vibesList, isNextPage, isMoreData, searchVibesList, selectedItemIds],
  );

  const renderUpdateButton = () => (
    <Button
      color={Colors.text.white}
      onPress={onUpdateBtnPress}
      style={[styles.updateButton]}
      textStyle={styles.bottomButtonsText}
      disabled={false}
      isLoading={isSendingDataToServer}>
      {strings.UPDATE}
    </Button>
  );

  const renderLoader = () => (
    <View style={styles.loaderView}>
      <Loader loading={isFetchingData} />
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: Colors.background.primary,
        flex: 1,
      }}>
      {renderCustomNavBar()}

      <SearchComponent
        isFilterIconDisable={true}
        value={searchTxt}
        setSearchFieldText={onSearchText}
        isSearching={isSearching}
      />

      <View style={styles.container}>
        {renderHeadings()}
        {isFetchingData && renderLoader()}
        <>
          {renderList}
          {!isKeyboardVisible && renderUpdateButton()}
        </>
      </View>
      {!util.isPlatformAndroid() && <KeyboardSpacer />}
    </View>
  );
};

YourVibe.propTypes = {};
YourVibe.defaultProps = {};

const mapStateToProps = ({vibes}) => ({
  vibesListArray: vibes.vibesList,
  vibesSearchList: vibes.vibesSearchList,
});

export default connect(mapStateToProps, null)(YourVibe);
