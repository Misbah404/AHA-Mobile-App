import moment from 'moment';
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getCommunityDetailRequest,
  getCommunityDropsRequest,
} from '../../actions/communityActions';
import {deleteFeedRequest} from '../../actions/DashboardActions';
import {getEventListRequest} from '../../actions/EventActions';
import {
  ArtItem,
  CustomNavbar,
  EventItem,
  Loader,
  NoDataFoundComponent,
  SpinnerLoader,
} from '../../components';
import {eventDefaultImage, strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

function CommunityDetails(props) {
  const {
    community,
    communitiesDropsListing,
    eventsList,
    LoginUserData,
    communityDetails,
    id,
  } = props;

  const {
    profile_name: title = '',
    profileTagId: subtitle = '',
    image: uri = undefined,
    artistId,
    tiktok,
    facebook,
    dribble,
    instagram,
  } = communityDetails || {};

  const [communityDrops, setCommunityDrops] = useState(() => []);
  const [isFetchingDataFromApi, setIsFetchingDataFromApi] = useState(
    () => false,
  );
  const [isFetchingDetail, setIsFetchingDetails] = useState(() => true);
  const [isDrop, setIsDrops] = useState(() => false);
  const [isDeletingPost, setIsDeletingPost] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetchingDataFromApi(true);
    const params = `drops/${id}/?offset=${0}&limit=${9}`;
    const payload = {
      artistId: artistId,
    };
    setIsDrops(true);
    dispatch(
      getCommunityDropsRequest(payload, params, res => {
        if (!!res) {
          setCommunityDrops(res);
          setIsNextPage(true);
          setIsDrops(false);
        } else {
          setIsNextPage(false);
          setIsDrops(false);
        }
        setIsFetchingDataFromApi(false);
      }),
    );
    mixpanel.track('Visit', {
      PageName: 'Community Details',
      CommunityName: title,
    });

    const paramsEvents = `?offset=${0}&limit=${30}`;
    dispatch(getEventListRequest(paramsEvents, res => {}));

    const paramsDetail = `${id}`;
    dispatch(
      getCommunityDetailRequest(paramsDetail, res => {
        setIsFetchingDetails(false);
      }),
    );
  }, []);

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);

      const params = `drops/${id}/?offset=${offset}&limit=${9}`;
      const payload = {
        artistId: artistId,
      };
      dispatch(
        getCommunityDropsRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 9);
            setIsMoreData(false);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  function onDeletePostHandler(postID) {
    setIsDeletingPost(true);
    dispatch(
      deleteFeedRequest(postID, function (res) {
        if (!!res) {
          const mFilteredData = util.excludeIdFromArray(communityDrops, postID);
          setCommunityDrops(mFilteredData);
          Actions.pop();
        }
        setIsDeletingPost(false);
      }),
    );
  }

  const renderSpinnerLoader = useMemo(() => {
    <SpinnerLoader _loading={!!isDeletingPost} />;
  }, [isDeletingPost]);

  const renderCustomNavBar = useMemo(
    () => (
      <CustomNavbar
        titleStyle={AppStyles.titleStyleForCenter}
        backgroundColor="transparent"
        hasBack
        rightBtnPress={
          util.areValuesEqual(LoginUserData?.id, communityDetails?.artistId)
            ? () => Actions.communityEdit({communityDetails})
            : () => {}
        }
        rightBtnImage={
          util.areValuesEqual(LoginUserData?.id, communityDetails?.artistId) &&
          Images.editIcon
        }
        rightImageStyle={
          util.areValuesEqual(LoginUserData?.id, communityDetails?.artistId)
            ? {
                width: 18,
                height: 18,
                shadowColor: Colors.black,
                shadowOffset: {width: 5, height: 5},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }
            : {}
        }
      />
    ),
    [communityDetails],
  );

  const renderCommunityDetails = useMemo(
    () => (
      <View style={[styles.bottomViewCont]}>
        <Text
          style={styles.detailsText}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {title}
        </Text>
        <Text
          style={[styles.detailsText, styles.subDetailsText]}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {subtitle}
        </Text>
      </View>
    ),
    [communityDetails],
  );

  const renderArtItem = ({item}) => (
    <ArtItem artItem={item} onDeletePostHandlerCallback={onDeletePostHandler} />
  );

  const renderArtsList = () => (
    <FlatList
      data={
        util.areValuesEqualWith(title, `AHA's Community`)
          ? community[artistId]?.communitiesDropsListing.slice(0, 6)
          : community[artistId]?.communitiesDropsListing
      }
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
  const renderEventList = () => {
    return (
      <View style={[styles.dropsListCont]}>
        <FlatList
          data={eventsList.slice(0, 6)}
          contentContainerStyle={{flex: 1, marginBottom: 20}}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <NoDataFoundComponent text={strings.NO_EVENTS_FOUND} />
          )}
          renderItem={({item}) => {
            return <EventItem item={item} />;
          }}
          keyExtractor={(_, index) => index}
        />
      </View>
    );
  };

  const renderDropsListing = useMemo(
    () => (
      <SafeAreaView style={styles.dropsListCont}>
        {renderArtsList()}
      </SafeAreaView>
    ),
    [communityDrops, community, communitiesDropsListing, isMoreData],
  );

  const renderLoader = useMemo(
    () => (
      <View style={styles.loaderStyle}>
        <Loader loading={isFetchingDataFromApi} />
      </View>
    ),
    [isFetchingDataFromApi],
  );

  const seeMoreTxt = onPress => (
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={onPress}>
      <Text
        style={{
          color: Colors.white,
          fontFamily: Fonts.type.bold,
          fontSize: Fonts.size.small,
        }}>
        {strings.MORE}
      </Text>
      <FastImage
        source={Images.RightIcon}
        style={styles.moreButtonImage}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );

  const renderNewDropsText = () => (
    <View style={styles.dropsSection}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Image source={Images.fireIcon} style={styles.fireIcon} />
        <Text style={styles.newDropsText}>{strings.NEW_DROPS}</Text>
      </View>
      {util.areValuesEqualWith(title, `AHA's Community`) &&
        util.areGreaterThan(
          community[artistId]?.communitiesDropsListing?.length,
          7,
        ) &&
        seeMoreTxt(() => Actions.seeMoreDrops({communityDetails}))}
    </View>
  );

  const renderEventsText = () => (
    <View style={styles.dropsSection}>
      <View style={{flexDirection: 'row', flex: 1, marginLeft: 2}}>
        <Image source={Images.eventHand} style={styles.eventIcon} />
        <Text style={styles.newDropsText}>{strings.EVENTS}</Text>
      </View>
      {util.areGreaterThan(eventsList?.length, 7) &&
        seeMoreTxt(() => Actions.seeMoreEventDetails())}
    </View>
  );

  const renderSocailLink = useMemo(() => {
    return (
      <View style={styles.mainViewForSocailIcon}>
        {!util.isEmptyValue(tiktok) && (
          <TouchableOpacity
            onPress={() => util.openLinkInBrowser(tiktok)}
            style={styles.socailIconView}>
            <Image source={Images.tiktokIcon} />
          </TouchableOpacity>
        )}
        {!util.isEmptyValue(instagram) && (
          <TouchableOpacity
            onPress={() => util.openLinkInBrowser(instagram)}
            style={styles.socailIconView}>
            <Image source={Images.instagramIcon} />
          </TouchableOpacity>
        )}
        {!util.isEmptyValue(facebook) && (
          <TouchableOpacity
            onPress={() => util.openLinkInBrowser(facebook)}
            style={styles.socailIconView}>
            <Image source={Images.facebookIcon} />
          </TouchableOpacity>
        )}
        {!util.isEmptyValue(dribble) && (
          <TouchableOpacity
            onPress={() => util.openLinkInBrowser(dribble)}
            style={styles.socailIconView}>
            <Image source={Images.dribbleIcon} />
          </TouchableOpacity>
        )}
      </View>
    );
  }, [communityDetails]);

  const renderCoverImageAndDetailsSec = useMemo(
    () => (
      <View
        style={{
          height: Metrics.screenHeight - (Metrics.screenHeight * 70) / 100,
        }}>
        <FastImage
          imageStyle={styles.imageStyle}
          style={styles.coverImage}
          source={{
            uri: uri,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          {renderCustomNavBar}
          {renderCommunityDetails}
        </FastImage>
        {renderSocailLink}
      </View>
    ),
    [communityDetails],
  );

  function renderEvent() {
    return (
      <>
        {!isFetchingDataFromApi && renderEventsText()}
        {!!!isFetchingDataFromApi && renderEventList()}
      </>
    );
  }
  return (
    <View style={styles.container}>
      {!isFetchingDetail ? (
        <>
          {renderCoverImageAndDetailsSec}
          {util.areValuesEqualWith(title, `AHA's Community`) ? (
            <ScrollView
              style={{marginTop: 20, flex: 1}}
              showsVerticalScrollIndicator={false}>
              {!isFetchingDataFromApi && renderNewDropsText()}
              {renderLoader}
              {renderSpinnerLoader}
              {!!!isFetchingDataFromApi && renderDropsListing}
              {util.areValuesEqualWith(title, `AHA's Community`) &&
                renderEvent()}
            </ScrollView>
          ) : (
            <View style={{marginTop: 20, flex: 1}}>
              {!isFetchingDataFromApi && renderNewDropsText()}
              {renderLoader}
              {renderSpinnerLoader}
              {!!!isFetchingDataFromApi && renderDropsListing}
            </View>
          )}
        </>
      ) : (
        <SpinnerLoader _loading={isFetchingDetail} />
      )}
    </View>
  );
}

CommunityDetails.propTypes = {
  id: PropTypes.object.isRequired,
};
CommunityDetails.defaultProps = {};

const mapStateToProps = ({community, events, user}) => ({
  communitiesDropsListing: community.communitiesDropsListing,
  community: community.community,
  eventsList: events.eventsList,
  LoginUserData: user.userDetails,
  communityDetails: community.communityDetail,
});
export default connect(mapStateToProps, null)(CommunityDetails);
