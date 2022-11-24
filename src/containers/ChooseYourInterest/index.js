import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Keyboard,
  RefreshControl,
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
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  SearchComponent,
  VibeItem,
} from '../../components';
import OnBoardingBottomButtons from '../../components/OnBoardingBottomButtons';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import styles from './Styles';
function ChooseYourInterest(props) {
  const {interestsListArray, interestsSearchList, userData} = props;
  const {loginBubbleUserFirstTime, isArtist} = userData;
  const [interestsList, setInterestsList] = useState(() => []);
  const [searchInterestsList, setSearchInterestsList] = useState(
    () => interestsSearchList,
  );
  const [selectedItemIds, setSelectedItemIds] = useState(() => []);
  const [unCheckIdsList, setUnCheckIdsList] = useState(() => []);

  const [isFetchingData, setIsFetchingData] = useState(() => true);
  const [searchTxt, setSearchTxt] = useState(() => '');
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const [isSearching, setIsSearching] = useState(() => false);
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

  const submitInterests = () => {
    setIsSendingDataToServer(true);
    let payload = {interests: selectedItemIds};

    dispatch(
      submitInterestsRequest(payload, res => {
        if (res) {
          if (loginBubbleUserFirstTime && isArtist) {
            Actions.jump('editProfileLogin', {isModalVisible: true});
          } else {
            Actions.reset('dashboard');
          }
        }
        setIsSendingDataToServer(false);
      }),
    );
  };

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

  const renderCustomNavBar = () => (
    <CustomNavbar
      hasBack={true}
      title={strings.CHOOSE_YOU_INTEREST}
      titleStyle={styles.title}
      subTitle={strings.WHAT_DO_YOU_WANT_TO_SEE}
      shouldShowHorizontalBar={true}
      style={{backgroundColor: 'transparent'}}
    />
  );

  const renderLoader = () => <Loader loading={isFetchingData} />;

  const renderList = () => (
    <FlatList
      numColumns={3}
      data={util.isEmptyValue(searchTxt) ? interestsList : searchInterestsList}
      keyExtractor={item => item.id}
      onScrollEndDrag={() => Keyboard.dismiss()}
      onScrollBeginDrag={() => Keyboard.dismiss()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListView}
      renderItem={({item}) => (
        <VibeItem
          onItemPress={onItemPress}
          isSelected={util.isArrayIncludesValue(selectedItemIds, item.id)}
          _item={item}
        />
      )}
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
      {isFetchingData && renderLoader()}
      {
        <>
          <View style={styles.view}>{renderList()}</View>
          {!isKeyboardVisible && (
            <OnBoardingBottomButtons
              onSkipBtnPress={() => {
                if (loginBubbleUserFirstTime && isArtist) {
                  Actions.jump('editProfileLogin', {isModalVisible: true});
                } else {
                  Actions.reset('dashboard');
                }
              }}
              onNextBtnPress={() => {
                submitInterests();
              }}
              nextBtnLoading={isSendingDataToServer}
              shouldDisable={util.isArrayEmpty(selectedItemIds)}
            />
          )}
        </>
      }
      {!util.isPlatformAndroid() && <KeyboardSpacer />}
    </ImageBackground>
  );
}
const mapStateToProps = ({interests, user}) => ({
  interestsListArray: interests.interestsList,
  interestsSearchList: interests.interestsSearchList,
  userData: user.data,
});

ChooseYourInterest.propTypes = {};
ChooseYourInterest.defaultProps = {};

export default connect(mapStateToProps, null)(ChooseYourInterest);
