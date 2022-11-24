import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getInterestsListRequest,
  getInterestsListSearchRequest,
  submitInterestsRequest,
} from '../../actions/Interests';
import {
  Button,
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  SearchComponent,
  VibeItem,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './Styles';

function YourInterest(props) {
  const {interestsListArray, interestsSearchList} = props;
  const [interestsList, setInterestsList] = useState(() => interestsListArray);

  const [searchInterestsList, setSearchInterestsList] = useState(
    () => interestsSearchList,
  );
  const [selectedItemIds, setSelectedItemIds] = useState(() => []);
  const [unCheckIdsList, setUnCheckIdsList] = useState(() => []);

  const [isFetchingData, setIsFetchingData] = useState(() => true);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const [offset, setOffset] = useState(() => 0);
  const [isSearching, setIsSearching] = useState(() => false);
  const [searchTxt, setSearchTxt] = useState(() => '');
  const [isKeyboardVisible, setKeyboardVisible] = useState(() => false);

  const dispatch = useDispatch();

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    setInterestsList(util.unionBy(interestsList, interestsListArray));

    const filteredArr = util.filterArray(
      interestsListArray,
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
  }, [interestsListArray]);

  useEffect(() => {
    setSearchInterestsList(interestsSearchList);
  }, [interestsSearchList]);

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
      getInterestsListRequest(params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsFetchingData(false);
          setIsNextPage(true);
        } else {
          setIsNextPage(false);
        }
      }),
    );
  }

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?offset=${offset}&limit=${15}`;
      dispatch(
        getInterestsListRequest(params, res => {
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

  function onUpdateBtnPress() {
    setIsSendingDataToServer(true);
    let payload = {interests: selectedItemIds};

    dispatch(
      submitInterestsRequest(payload, res => {
        if (res) {
          util.topAlert(strings.YOUR_INTEREST_HAS_BEEN_UPDATED);
          Actions.pop();
        }
        setIsSendingDataToServer(false);
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

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.YOUR_INTEREST}
      hasBack
      titleStyle={AppStyles.titleStyleForLeft}
      leftRightButtonWrapperStyle={AppStyles.centerInner}
    />
  );

  const renderHeadings = () => (
    <View style={styles.headingView}>
      <Text style={styles.heading}>{strings.CHOOSE_YOU_INTEREST}</Text>
      <Text style={styles.description}>What do you want to see?</Text>
    </View>
  );

  function onSearchText(text) {
    setSearchTxt(text);
    setIsSearching(true);

    setTimeout(function () {
      const params = `?search_text=${text}`;
      dispatch(
        getInterestsListSearchRequest(params, () => {
          setIsSearching(false);
        }),
      );
    }, 100);
  }

  const renderList = useMemo(
    () => (
      <FlatList
        numColumns={3}
        data={
          util.isEmptyValue(searchTxt) ? interestsList : searchInterestsList
        }
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
                  ? strings.NO_INTERESTS_FOUND
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
    ),
    [
      interestsList,
      isNextPage,
      isMoreData,
      searchInterestsList,
      selectedItemIds,
    ],
  );

  const renderUpdateButton = () => (
    <Button
      color={Colors.text.white}
      onPress={() => onUpdateBtnPress()}
      style={[styles.updateButton]}
      textStyle={styles.bottomButtonsText}
      disabled={false}
      isLoading={isSendingDataToServer}>
      {strings.UPDATE}
    </Button>
  );

  const renderLoader = () => (
    <View
      style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0}}>
      <Loader loading={isFetchingData} />
    </View>
  );

  return (
    <View style={{backgroundColor: Colors.background.primary, flex: 1}}>
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
        {!util.isPlatformAndroid() && <KeyboardSpacer />}
      </View>
    </View>
  );
}
YourInterest.propTypes = {};
YourInterest.defaultProps = {};

const mapStateToProps = ({interests}) => ({
  interestsListArray: interests.interestsList,
  interestsSearchList: interests.interestsSearchList,
});

export default connect(mapStateToProps, null)(YourInterest);
