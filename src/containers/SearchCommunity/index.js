import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {searchCommunityRequest} from '../../actions/communityActions';
import {Loader, NoDataFoundComponent, SearchComponent} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const SearchCommunity = props => {
  const {searchCommunityResult, userID} = props;
  const [searchedText, setSearchedText] = useState(() => '');
  const [isSearching, setIsSearching] = useState(() => false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isMoreDataSearch, setIsMoreDataSearch] = useState(() => false);
  const [isNextPageSearch, setIsNextPageSearch] = useState(() => false);
  const [offsetSearch, setOffsetSearch] = useState(() => 0);
  const [searchResultIds, setSearchResultIds] = useState(() => []);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    apiCall();
  }, []);

  function apiCall() {
    const params = `?filter_by=following&offset=${0}&limit=${15}`;
    dispatch(
      searchCommunityRequest({}, params, res => {
        setIsLoading(false);
        if (!util.isArrayEmpty(res)) {
          setIsNextPage(true);
        } else {
          setIsNextPage(false);
        }
      }),
    );
  }

  function onSearchText(text) {
    setSearchedText(text);
    setIsSearching(true);
    setTimeout(function () {
      const params = `?filter_by=following&search_text=${text}`;
      dispatch(
        searchCommunityRequest({}, params, res => {
          setIsSearching(false);
          if (res) {
            setSearchResultIds(util.getIdsFromArray(res));
            setIsNextPageSearch(true);
            setIsNextPage(false);
          } else {
            setIsNextPage(false);
            setIsNextPageSearch(false);
            setSearchResultIds([]);
          }
          setIsMoreData(false);
        }),
      );
    }, 100);
  }
  const renderSearchBar = () => (
    <View style={styles.searchView}>
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Image style={AppStyles.mLeft10} source={Images.backButton} />
      </TouchableOpacity>
      <View style={AppStyles.flex}>
        <SearchComponent
          isFilterIconDisable={true}
          value={searchedText}
          setSearchFieldText={onSearchText}
          isSearching={isSearching}
        />
      </View>
    </View>
  );

  const renderItem = item => {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => Actions.jump('communityDetails', {id: item?.id})}
          style={styles.itemMainView}>
          <FastImage
            style={styles.itemImage}
            source={{
              uri: item?.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 15,
                marginLeft: 5,
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemTitle}>
                {item.profile_name}
              </Text>
            </View>
          </FastImage>
        </TouchableOpacity>
      </View>
    );
  };

  function loadMoreData() {
    if (util.isEmptyValue(searchedText)) {
      if (isNextPage) {
        setIsMoreData(true);
        const params = `?offset=${offset}&limit=${15}`;
        dispatch(
          searchCommunityRequest({}, params, res => {
            if (!util.isArrayEmpty(res)) {
              setOffset(offset + 15);
              setIsMoreData(false);
            } else {
              setIsNextPage(false);
              setIsMoreData(false);
            }
            setIsMoreData(false);
          }),
        );
      }
    } else {
      if (isNextPageSearch) {
        setIsMoreData(true);
        const params = `?search_text=${searchedText}&offset=${offsetSearch}&limit=${15}`;
        dispatch(
          searchCommunityRequest({}, params, res => {
            if (!util.isArrayEmpty(res)) {
              setOffsetSearch(offsetSearch + 15);
              setIsMoreData(false);
            } else {
              setIsNextPageSearch(false);
              setIsMoreData(false);
            }
            setIsMoreData(false);
          }),
        );
      }
    }
  }

  const renderCommunityListing = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          util.isEmptyValue(searchedText)
            ? util.filterArray(
                searchCommunityResult,
                item => item.artistId != userID,
              )
            : util.filterArray(searchCommunityResult, item =>
                searchResultIds.includes(item.id),
              )
        }
        keyExtractor={(_, index) => index}
        renderItem={({item}) => {
          return renderItem(item);
        }}
        onEndReached={() => loadMoreData()}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() => (
          <View style={styles.noDataFoundSec}>
            {!isSearching && (
              <NoDataFoundComponent text={strings.NO_COMMUNITIES_FOUND} />
            )}
          </View>
        )}
        ListFooterComponent={
          <View style={isMoreData && {marginVertical: 40}}>
            {isMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    );
  };
  const loader = () => (
    <View style={AppStyles.mTop20}>
      <Loader loading={isLoading} />
    </View>
  );
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.searchCompCont}>
        {renderSearchBar()}
      </SafeAreaView>
      {util.isArrayEmpty(searchCommunityResult)
        ? loader()
        : renderCommunityListing()}
    </View>
  );
};

const mapStateToProps = ({user, community}) => ({
  searchCommunityResult: community.searchCommunity,
  userID: user.data.userId,
});

export default connect(mapStateToProps, null)(SearchCommunity);
