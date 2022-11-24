import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getEventListRequest,
  updateEventsData,
} from '../../../actions/EventActions';
import {
  CustomNavbar,
  EventItem,
  Loader,
  NoDataFoundComponent,
} from '../../../components';
import {eventDefaultImage, strings} from '../../../constants';
import {AppStyles, Colors} from '../../../theme';
import util from '../../../util';
import styles from './styles';

function EventDetails(props) {
  const {eventsList} = props;
  let limit = 15;
  const [isLoading, setIsloading] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isLoadingImage, setIsLoadingImage] = useState(() => false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsloading(true);
    const paramsEvents = `?offset=${0}&limit=${limit}`;
    dispatch(
      getEventListRequest(paramsEvents, res => {
        if (!!res) {
          setIsNextPage(true);
        } else {
          setIsNextPage(false);
        }
        setIsloading(false);
      }),
    );
  }, []);
  const pullToRefreshCall = () => {
    const paramsEvents = `?offset=${0}&limit=${limit}`;
    dispatch(
      getEventListRequest(paramsEvents, res => {
        if (!!res) {
          setIsNextPage(true);
          dispatch(updateEventsData(res));
        }
        setIsloading(false);
      }),
    );
  };

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);

      const params = `?offset=${offset}&limit=${limit}`;

      dispatch(
        getEventListRequest(params, res => {
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

  const renderEventList = () => (
    <View style={{flex: 1, marginHorizontal: 15, ...AppStyles.mBottom10}}>
      <FlatList
        data={eventsList}
        style={{flex: 1}}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => pullToRefreshCall()}
            tintColor={Colors.pullToRefreshLoader}
          />
        }
        refreshing={false}
        renderItem={({item}) => {
          return <EventItem item={item} />;
        }}
        ListEmptyComponent={() => (
          <NoDataFoundComponent text={strings.NO_EVENTS_FOUND} />
        )}
        keyExtractor={(_, index) => index}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={isMoreData && {marginVertical: 40}}>
            {isMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.EVENTS}
        hasBack
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
      {!isLoading && renderEventList()}
      {isLoading && <Loader loading={isLoading} />}
    </View>
  );
}

EventDetails.propTypes = {};
EventDetails.defaultProps = {};

const mapStateToProps = ({events}) => ({
  eventsList: events.eventsList,
});
export default connect(mapStateToProps, null)(EventDetails);
