// @flow
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useState} from 'react';
import {View, ActivityIndicator, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getSellablePostsRequest} from '../../actions/DashboardActions';
import {
  ArtItem,
  CustomNavbar,
  NoDataFoundComponent,
  SpinnerLoader,
} from '../../components';
import {strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const limit = 15;
const SellableArtsListing = props => {
  const {artistID, sellableArtsList, ArtistName} = props;

  const [artIDs, setArtIDs] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [isRefreshing, setIsRefreshing] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    apiCall();
  }, [artistID]);

  function apiCall() {
    const params = `?artist_id=${artistID}&offset=${0}&limit=${limit}&sellable=true`;
    dispatch(
      getSellablePostsRequest(params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsNextPage(true);
          setIsLoading(false);
          setArtIDs(res);
          setIsRefreshing(false);
        } else {
          setIsNextPage(false);
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }),
      mixpanel.track('Visit', {
        PageName: 'Support Artist',
        ArtistName: ArtistName,
      }),
    );
  }

  function loadMore() {
    if (isNextPage) {
      const params = `?artist_id=${artistID}&offset=${offset}&limit=${limit}&sellable=true`;
      setIsMoreData(true);
      dispatch(
        getSellablePostsRequest(params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 15);
            setIsMoreData(false);
            const stateIds = util.cloneDeep(artIDs);
            const actionIds = util.cloneDeep(res);
            const mergeArray = [...stateIds, ...actionIds];
            setArtIDs(mergeArray);
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
      title={`${ArtistName}'s Store`}
      hasBack
      titleStyle={AppStyles.titleStyleForLeft}
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      leftBtnPress={() => Actions.pop()}
    />
  );

  const renderArtItem = ({item, _}) => <ArtItem artItem={item} />;

  const renderArtsList = () => (
    <FlatList
      data={util.filterArray(sellableArtsList, item =>
        artIDs.includes(item.id),
      )}
      style={[AppStyles.flex, AppStyles.paddingHorizontalBase]}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <NoDataFoundComponent text={strings.NO_POSTS_FOUND} />
      )}
      renderItem={renderArtItem}
      keyExtractor={(_, index) => index}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <View style={isMoreData && {marginVertical: 40}}>
          {isMoreData && <ActivityIndicator color={Colors.white} />}
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            apiCall();
          }}
          tintColor="#FFFFFF"
        />
      }
    />
  );

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      {isLoading ? (
        <View style={styles.loaderView}>
          <SpinnerLoader _loading={true} />
        </View>
      ) : (
        renderArtsList()
      )}
    </View>
  );
};

SellableArtsListing.propTypes = {
  artistID: PropTypes.string.isRequired,
};
SellableArtsListing.defaultProps = {};

const mapStateToProps = ({dashboard}) => ({
  sellableArtsList: dashboard.sellablePostsList,
});
export default connect(mapStateToProps, null)(SellableArtsListing);
