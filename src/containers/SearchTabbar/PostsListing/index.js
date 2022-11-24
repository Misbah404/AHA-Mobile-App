// @flow
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {View, ActivityIndicator, FlatList, Keyboard} from 'react-native';
import {
  ArtItem,
  CustomNavbar,
  NoDataFoundComponent,
  SpinnerLoader,
} from '../../../components';
import {AppStyles, Colors} from '../../../theme';
import {getPostsListAsPerVibesRequest} from '../../../actions/searchTabActions';
import util from '../../../util';
import {strings} from '../../../constants';
import styles from './styles';

const limit = 10;
const PostsListing = props => {
  const {vibeObj, postsList} = props || {};
  const {id, title = ''} = vibeObj || {};
  const [offset, setOffset] = useState(() => 0);
  const [postsListIDs, setPostsListIDs] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [hasMoreData, setHasMoreData] = useState(() => true);
  const [hasNextPage, setHasNextPage] = useState(() => true);

  const dispatch = useDispatch();

  useEffect(() => {
    setOffset(0);
    setIsLoading(true);

    setTimeout(() => {
      apiCall(0);
    }, 200);
  }, [vibeObj]);

  const apiCall = (mOffset = offset) => {
    const params = `${id}/arts?offset=${mOffset}&limit=${limit}`;
    dispatch(
      getPostsListAsPerVibesRequest(params, res => {
        const {postsList = []} = res || {};
        const postsIds = util.getIdsFromArray(postsList);

        if (util.isArrayEmpty(postsList)) {
          setHasNextPage(false);
          setHasMoreData(false);
        } else {
          setOffset(offset + limit);
          setHasMoreData(false);
        }

        if (mOffset === 0) {
          setPostsListIDs(postsIds);
        } else {
          let _postsListIDs = util.cloneDeepArray(postsListIDs);
          const concatenatedData = _postsListIDs.concat(postsIds);
          setPostsListIDs(concatenatedData);
        }
        setIsLoading(false);
      }),
    );
  };

  const loadMoreData = () => {
    if (hasNextPage) {
      setHasMoreData(true);
      apiCall();
    }
  };

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={title}
      titleStyle={AppStyles.titleStyleForCenter}
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      hasBack
      leftBtnPress={() => Actions.pop()}
    />
  );

  const renderNoDataFoundComp = () => (
    <NoDataFoundComponent text={strings.NO_POSTS_FOUND} />
  );

  const renderArtsList = () => (
    <FlatList
      data={util.filterArray(postsList, item => postsListIDs.includes(item.id))}
      style={AppStyles.flex}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={() => Keyboard.dismiss()}
      onScrollBeginDrag={() => Keyboard.dismiss()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        <View style={hasMoreData && {marginVertical: 20}}>
          {hasMoreData && <ActivityIndicator color={Colors.white} />}
        </View>
      }
      renderItem={renderArtItem}
      keyExtractor={(_, index) => index}
    />
  );

  const renderArtItem = ({item}) => <ArtItem artItem={item} />;

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      {isLoading ? <SpinnerLoader _loading={true} /> : renderArtsList()}
    </View>
  );
};

PostsListing.propTypes = {
  vibeObj: PropTypes.object.isRequired,
};
PostsListing.defaultProps = {};

const mapStateToProps = ({search}) => ({
  postsList: search.postsAsPerVibes,
});
export default connect(mapStateToProps, null)(PostsListing);
