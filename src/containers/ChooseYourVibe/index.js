import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, FlatList, ImageBackground, Keyboard, RefreshControl, View
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';
import { connect, useDispatch } from 'react-redux';
import {
  getVibesListRequest,
  getVibesListSearchRequest,
  submitVibesRequest
} from '../../actions/Vibes';
import {
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  SearchComponent,
  VibeItem
} from '../../components';
import OnBoardingBottomButtons from '../../components/OnBoardingBottomButtons';
import { strings } from '../../constants';
import { Colors, Images } from '../../theme';
import util from '../../util';
import styles from './Styles';

function ChooseYourVibe(props) {
  const {vibesListArray, vibesSearchList} = props;
  const [vibesList, setVibesList] = useState(() => []);
  const [searchVibesList, setSearchVibesList] = useState(() => vibesSearchList);
  const [selectedItemIds, setSelectedItemIds] = useState(() => []);
  const [unCheckIdsList, setUnCheckIdsList] = useState(() => []);
  const [isFetchingData, setIsFetchingData] = useState(() => true);
  const [searchTxt, setSearchTxt] = useState(() => '');
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [isSearching, setIsSearching] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(() => false);

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

  const submitVibes = () => {
    setIsSendingDataToServer(true);
    let payload = {vibes: selectedItemIds};

    dispatch(
      submitVibesRequest(payload, res => {
        if (res) Actions.chooseYourInterest();
        setIsSendingDataToServer(false);
      }),
    );
  };

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.CHOOSE_YOUR_VIBE}
      titleStyle={styles.title}
      subTitle={strings.WHAT_IS_YOUR_VIBE}
      shouldShowHorizontalBar={true}
      style={{backgroundColor: 'transparent'}}
    />
  );

  const renderLoader = () => (
    <View style={styles.loader}>
      <Loader loading={isFetchingData} />
    </View>
  );
  
  const renderList = () => (
    <FlatList
      numColumns={3}
      data={util.isEmptyValue(searchTxt) ? vibesList : searchVibesList}
      onScrollEndDrag={() => Keyboard.dismiss()}
      onScrollBeginDrag={() => Keyboard.dismiss()}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
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

  return (
    <ImageBackground source={Images.onBoardingBgImage} style={styles.container}>
      {renderCustomNavBar()}
      <SearchComponent
        isFilterIconDisable={true}
        value={searchTxt}
        setSearchFieldText={onSearchText}
        isSearching={isSearching}
      />

      {
        <>
          <View style={styles.view}>{renderList()}</View>
          {!isKeyboardVisible && (
            <OnBoardingBottomButtons
              onSkipBtnPress={() => {
                Actions.chooseYourInterest();
              }}
              onNextBtnPress={() => {
                submitVibes();
              }}
              nextBtnLoading={isSendingDataToServer}
              shouldDisable={util.isArrayEmpty(selectedItemIds)}
            />
          )}
        </>
      }
      {isFetchingData && renderLoader()}
      {!util.isPlatformAndroid() && <KeyboardSpacer />}
    </ImageBackground>
  );
}

ChooseYourVibe.propTypes = {};
ChooseYourVibe.defaultProps = {};

const mapStateToProps = ({vibes}) => ({
  vibesListArray: vibes.vibesList,
  vibesSearchList: vibes.vibesSearchList,
});

export default connect(mapStateToProps, null)(ChooseYourVibe);
