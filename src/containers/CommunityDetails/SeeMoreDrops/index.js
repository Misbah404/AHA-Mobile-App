import moment from 'moment';
import React, {useState, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getCommunityDropsRequest} from '../../../actions/communityActions';
import {deleteFeedRequest} from '../../../actions/DashboardActions';
import {
  ArtItem,
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  SpinnerLoader,
} from '../../../components';
import {strings} from '../../../constants';
import {AppStyles, Colors} from '../../../theme';
import util from '../../../util';
import styles from './styles';

function seeMoreDrops(props) {
  const {communityDetails, community} = props;
  const {id, artistId} = communityDetails || {};
  let limit = 15;
  const [isFetchingDataFromApi, setIsFetchingDataFromApi] = useState(
    () => false,
  );
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetchingDataFromApi(true);
    const params = `drops/${id}/?offset=${0}&limit=${limit}`;
    const payload = {
      artistId: artistId,
    };
    dispatch(
      getCommunityDropsRequest(payload, params, res => {
        if (!!res) {
          setIsNextPage(true);
        } else {
          setIsNextPage(false);
        }
        setIsFetchingDataFromApi(false);
      }),
    );
  }, []);

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);

      const params = `drops/${id}/?offset=${offset}&limit=${limit}`;
      const payload = {
        artistId: artistId,
      };
      dispatch(
        getCommunityDropsRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + limit);
            setIsMoreData(false);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  const renderArtItem = ({item}) => (
    <ArtItem artItem={item} onDeletePostHandlerCallback={() => {}} />
  );

  const renderArtsList = () => (
    <FlatList
      data={community[artistId]?.communitiesDropsListing}
      style={AppStyles.flex}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <NoDataFoundComponent text={strings.NO_DROPS_FOUND} />
      )}
      renderItem={renderArtItem}
      keyExtractor={(_, index) => index}
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
    <View style={styles.container}>
      <CustomNavbar
        title={strings.DROPS}
        hasBack
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
      {!isFetchingDataFromApi && renderArtsList()}
      {isFetchingDataFromApi && <Loader loading={isFetchingDataFromApi} />}
    </View>
  );
}

seeMoreDrops.propTypes = {};
seeMoreDrops.defaultProps = {};

const mapStateToProps = ({community}) => ({
  communitiesDropsListing: community.communitiesDropsListing,
  community: community.community,
});
export default connect(mapStateToProps, null)(seeMoreDrops);
