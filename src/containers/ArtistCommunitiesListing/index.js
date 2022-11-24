// @flow
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
  ArtistAndCommunityItem,
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles} from '../../theme';
import {useEffect} from 'react';
import {getArtistCommunitiesListRequest} from '../../actions/communityActions';
import styles from './styles';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {useMemo} from 'react';

const ArtistCommunitiesListing = props => {
  const {artistCommunities} = props;
  const [isFetchingDataFromApi, setIsFetchingDataFromApi] = useState(
    () => false,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: 'My Communities',
    });
    setIsFetchingDataFromApi(true);
    const param = '?filter_by=my_communities';
    dispatch(
      getArtistCommunitiesListRequest(param, res => {
        setIsFetchingDataFromApi(false);
      }),
    );
  }, []);

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.MY_COMMUNITIES}
      hasBack
      titleStyle={AppStyles.titleStyleForLeft}
      leftRightButtonWrapperStyle={AppStyles.centerInner}
    />
  );

  const renderListItems = useMemo(
    () => (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={artistCommunities}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={() => (
          <NoDataFoundComponent text={strings.NO_COMMUNITIES_FOUND} />
        )}
        contentContainerStyle={styles.flatListContStyle}
        renderItem={({item}) => {
          return (
            <ArtistAndCommunityItem
              _item={item}
              shouldHideButton={true}
              _onItemPress={() =>
                Actions.jump('communityDetails', {id: item?.id})
              }
            />
          );
        }}
      />
    ),
    [artistCommunities],
  );

  const renderLoader = () => (
    <View style={styles.loaderStyle}>
      <Loader loading={isFetchingDataFromApi} />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      {renderLoader()}

      {!!isFetchingDataFromApi ? <></> : renderListItems}
    </View>
  );
};

ArtistCommunitiesListing.propTypes = {};
ArtistCommunitiesListing.defaultProps = {};

const mapStateToProps = ({community}) => ({
  artistCommunities: community.artistCommunities,
});
export default connect(mapStateToProps, null)(ArtistCommunitiesListing);
