import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {getCommunitiesListIAmPartOfRequest} from '../../../actions/communityActions';
import {
  CommunityTabListItem,
  HomeScreenHeaderComponent,
  Loader,
  NoDataFoundComponent,
} from '../../../components';
import {strings} from '../../../constants';
import {mixpanel} from '../../../helpers/mixpanelHelper';
import {Colors, Metrics} from '../../../theme';
import util from '../../../util';
import styles from './styles';

function CommunityListingTab(props) {
  const {communitiesList} = props;
  const communityArrayLength = communitiesList?.length ?? 0;
  const [isFetchingDataFromApi, setIsFetchingDataFromApi] = useState(
    () => false,
  );
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [activeIndex, setActiveIndex] = useState(() => 0);
  const [limitReached, setLimitReached] = useState(() => false);
  const dispatch = useDispatch();
  const onEndReachedCalledDuringMomentum = useRef(true);

  useEffect(() => {
    setIsFetchingDataFromApi(true);
    apiCall();
  }, []);

  const apiCall = () => {
    mixpanel.track('Visit', {PageName: 'Community'});
    const param = `?filter_by=following&offset=${0}&limit=${4}`;
    dispatch(
      getCommunitiesListIAmPartOfRequest({}, param, res => {
        setIsFetchingDataFromApi(false);
        setOffset(offset + 4);
      }),
    );
  };

  useEffect(() => {
    getMoreFeedsDataFromApi();
  }, [activeIndex]);

  function handleOnScroll(event) {
    const val = util.roundValue(
      event.nativeEvent.contentOffset.y / Metrics.feedsHeight,
    );
    setActiveIndex(val);
  }

  function getMoreFeedsDataFromApi() {
    if (communityArrayLength === activeIndex + 1) {
      if (!!!limitReached) {
        loadMoreData();
      }
    }
  }

  // const pullToRefresing = () => {
  //   setIsFetchingDataFromApi(true);
  //   const param = '?filter_by=following';
  //   dispatch(
  //     getCommunitiesListIAmPartOfRequest(param, res => {
  //       setIsFetchingDataFromApi(false);
  //     }),
  //   );
  // };

  function loadMoreData() {
    setIsMoreData(true);
    const params = `?filter_by=following&offset=${offset}&limit=${4}`;
    dispatch(
      getCommunitiesListIAmPartOfRequest({}, params, res => {
        if (!util.isArrayEmpty(res)) {
          setOffset(offset + 4);
          setIsMoreData(false);
          setLimitReached(true);
        } else {
          setIsNextPage(false);
          setIsMoreData(false);
        }
      }),
    );
  }

  const renderCommunityListing = useMemo(
    () => (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={communitiesList}
        snapToInterval={Metrics.feedsHeight}
        decelerationRate={'fast'}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={() => (
          <View style={styles.noDataFoundSec}>
            <NoDataFoundComponent text={strings.NO_COMMUNITIES_FOUND} />
          </View>
        )}
        renderItem={({item}) => {
          return <CommunityTabListItem item={item} />;
        }}
        onScroll={e => {
          handleOnScroll(e);
        }}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={apiCall}
            tintColor={Colors.pullToRefreshLoader}
          />
        }
        ListFooterComponent={
          <View style={{marginVertical: 20}}>
            {isMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    ),
    [communitiesList, isMoreData],
  );

  const renderLoader = () => (
    <View style={styles.loaderStyle}>
      <Loader loading={isFetchingDataFromApi} />
    </View>
  );

  return (
    <View style={styles.container}>
      <HomeScreenHeaderComponent
        isDiscoverTabSelected={false}
        showCartIcon={false}
        isSearchIcon={true}
      />
      {isFetchingDataFromApi ? renderLoader() : renderCommunityListing}
    </View>
  );
}

CommunityListingTab.propTypes = {};
CommunityListingTab.defaultProps = {};

const mapStateToProps = ({community}) => ({
  communitiesList: community.communitiesListIAmPartOf,
});

export default connect(mapStateToProps, null)(CommunityListingTab);
