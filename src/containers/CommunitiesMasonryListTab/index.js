import MasonryList from '@react-native-seoul/masonry-list';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-fast-video';

import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getCommunitiesDataRequest} from '../../actions/communityActions';
import {
  HomeScreenHeaderComponent,
  NoDataFoundComponent,
  SpinnerLoader,
} from '../../components';
import {strings} from '../../constants';
import {Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {useRef} from 'react';

let limit = 30;
function CommunitiesMasonryListTab(props) {
  const {communitiesData} = props;
  const onEndReachedCalledDuringMomentum = useRef(true);
  const [isLoading, setIsloading] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const dispatch = useDispatch();
  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = () => {
    const params = `?offset=0&limit=${limit}`;
    setIsloading(true);
    dispatch(
      getCommunitiesDataRequest(params, res => {
        setIsloading(false);

        if (!util.isArrayEmpty(res)) {
          setIsNextPage(true);
        } else {
          setIsNextPage(false);
        }
      }),
    );
  };

  function clickOnItem(item) {
    if (util.areValuesEqual(item.type, 'drop')) {
      Actions.singlePostContainer({
        postID: item?.id,
      });
    } else {
      Actions.eventDetails({
        id: item?.id,
      });
    }
  }

  const renderItem = item => {
    const randomBool = Math.random() < 0.5;
    const imageIncludes = item?.resourceType?.includes('image');
    return (
      <TouchableOpacity
        onPress={() => clickOnItem(item)}
        key={item.id}
        style={{flex: 1}}>
        {imageIncludes ? (
          <FastImage
            source={{uri: item.thumbnail}}
            style={[
              styles.itemView,
              {
                height: randomBool ? 105 : 210,
              },
            ]}
            resizeMode="cover"
          />
        ) : (
          <Video
            style={[
              styles.itemView,
              {
                height: randomBool ? 105 : 210,
              },
            ]}
            resizeMode="cover"
            repeat={true}
            source={{uri: item?.url}}
          />
        )}

        <View
          style={{
            position: 'absolute',
            left: 5,
            top: 5,
            backgroundColor: Colors.black,
            padding: 2,
            width: 18,
            height: 18,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 9,
          }}>
          <Image
            style={{width: 10, height: 10}}
            source={
              util.areValuesEqual(item.type, 'drop')
                ? Images.fireIcon
                : Images.eventHand
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  const loadMoreData = () => {
    if (isNextPage && !isMoreData) {
      setIsMoreData(true);
      setIsNextPage(false);
      const params = `?offset=${offset}&limit=${limit}`;

      dispatch(
        getCommunitiesDataRequest(params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + limit);
            setIsMoreData(false);
            setIsloading(false);
            setIsNextPage(true);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
            setIsloading(false);
          }
        }),
      );
    }
  };

  const renderMasonry = () => {
    return (
      <MasonryList
        data={communitiesData}
        scrollToOverflowEnabled={false}
        keyExtractor={(item, i): string => i}
        showsVerticalScrollIndicator={false}
        style={{width: '100%', flexGrow: 1}}
        adjustRespectiveHeight={true}
        contentContainerStyle={styles.mansoryListContainer}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => apiCall()}
            tintColor={Colors.white}
          />
        }
        numColumns={3}
        renderItem={({item}) => renderItem(item)}
        ListEmptyComponent={
          util.isArrayEmpty(communitiesData) &&
          !isLoading && <NoDataFoundComponent text={strings.NO_DATA_FOUND} />
        }
        onEndReachedThreshold={0.001}
        onEndReached={loadMoreData}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        ListFooterComponent={
          <View style={isMoreData && {marginVertical: 40}}>
            {isMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <HomeScreenHeaderComponent
          isDiscoverTabSelected={false}
          showCartIcon={false}
          isSearchIcon={true}
        />
      </View>

      <View style={styles.mansoryListView}>
        {renderMasonry()}
        {util.isArrayEmpty(communitiesData) && isLoading && (
          <SpinnerLoader _loading={isLoading} />
        )}
      </View>
    </View>
  );
}

const mapStateToProps = ({community}) => ({
  communitiesData: community.communitiesData,
});

export default connect(mapStateToProps, null)(CommunitiesMasonryListTab);
