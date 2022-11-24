import PropTypes from 'prop-types';
import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {strings} from '../../constants';
import {Colors, Metrics} from '../../theme';
import util from '../../util';
import ArtOptions from '../ArtOptions';
import VideoPlayer from '../VideoPlayer';
import styles from './styles';
function FeedItem(props) {
  const {
    feedItem,
    shouldPlayVideoOnCurrentScreen,
    onDeletePostHandlerCallback,
    shouldCloseCurrentActiveScreenAfterDeletingItem,
    deleteDescriptionText,
    isSinglePostItem,
    onBuyButtonPressHandler,
    onPinUnpinButtonPressHandler,
    pinToCollectionId,
    onSupportButtonPressHandler,
  } = props;
  const {resource, isMyPost, collection, has_collection, isPinned} = feedItem;

  const [isLoadingImage, setIsLoadingImage] = useState(() => true);
  const scrollX = new Animated.Value(0);

  const renderBottomDots = () => (
    <View style={styles.bottomDotsCont}>
      <RNAnimatedScrollIndicators
        numberOfCards={resource.length}
        scrollWidth={Metrics.screenWidth}
        activeColor={'#8C8A8F'}
        inActiveColor={Colors.white}
        scrollAnimatedValue={scrollX}
      />
    </View>
  );

  const renderLinearGradients = useMemo(
    () => (
      <>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            'rgba(0,0,0,0.5)',
            'rgba(0,0,0,0.3)',
            'rgba(0,0,0,0.1)',
            'rgba(0,0,0,0)',
          ]}
          style={styles.linearGradient}
        />
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={[
            'rgba(0,0,0,0.5)',
            'rgba(0,0,0,0.3)',
            'rgba(0,0,0,0.1)',
            'rgba(0,0,0,0)',
          ]}
          style={styles.linearGradientBottom}
        />
      </>
    ),
    [],
  );

  const renderFeedItemImage = _item => (
    <>
      {!!isLoadingImage && (
        <View style={styles.imageLoadingStyle}>
          <ActivityIndicator animating size="small" color={Colors.white} />
        </View>
      )}

      <FastImage
        style={styles.postImageStyle}
        onLoad={() => setIsLoadingImage(false)}
        source={{
          uri: _item?.uri,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </>
  );

  const renderButton = useMemo(() => {
    return (
      <TouchableOpacity
        style={styles.btnCollection}
        onPress={() =>
          Actions.postsListingOfCollection({
            collectionDetails: collection,
            artistID: true ? artist?.id : undefined,
            isPin: false,
          })
        }>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.profileTagAndDescripText, styles.collectionTitleText]}>
          {collection?.title}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  const getArtDetails = () => {
    const {title, artist} = feedItem || {};
    const {profileTagId} = artist || {};

    return (
      <View style={styles.bottomViewCont}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              if (!!isMyPost) Actions.jump('_profile_tab');
              else
                Actions.jump('visitedProfile', {
                  feedItem,
                  isArtirst: true,
                });
            }}>
            <Text
              style={[styles.profileTagAndDescripText, {maxWidth: 200}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              @{profileTagId}
            </Text>
          </TouchableOpacity>
          {has_collection && (
            <TouchableOpacity
              style={styles.btnCollection}
              onPress={() =>
                Actions.postsListingOfCollection({
                  collectionDetails: collection,
                  artistID: true ? artist?.id : undefined,
                  isPin: false,
                })
              }>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.profileTagAndDescripText,
                  styles.collectionTitleText,
                ]}>
                {collection?.title}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Text
          style={[styles.profileTagAndDescripText, styles.titleText]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {title}
        </Text>
      </View>
    );
  };

  const renderArtOptions = () => (
    <ArtOptions
      feedItem={feedItem}
      isSinglePostItem={isSinglePostItem}
      onDeletePostHandlerCallback={onDeletePostHandlerCallback}
      shouldCloseCurrentActiveScreenAfterDeletingItem={
        shouldCloseCurrentActiveScreenAfterDeletingItem
      }
      deleteDescriptionText={deleteDescriptionText}
      onBuyButtonPressHandler={onBuyButtonPressHandler}
      onPinUnpinButtonPressHandler={onPinUnpinButtonPressHandler}
      pinToCollectionId={pinToCollectionId}
      onSupportButtonPressHandler={onSupportButtonPressHandler}
    />
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        snapToInterval={Metrics.screenWidth}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        disableIntervalMomentum={true}
        decelerationRate={util.isPlatformAndroid() ? 0.6 : 0.3}>
        <FlatList
          data={resource}
          horizontal
          keyExtractor={(_, index) => index}
          initialNumToRender={1}
          renderItem={({item}) => {
            const mediaTypeIsEqualsToImage = util.isStringsIncludesValue(
              item?.type,
              'image',
            );

            return (
              <View style={styles.feedCont}>
                <View style={styles.videoSectionCont}>
                  {!!mediaTypeIsEqualsToImage ? (
                    renderFeedItemImage(item)
                  ) : (
                    <VideoPlayer
                      _item={item}
                      shouldPlayVideo={shouldPlayVideoOnCurrentScreen}
                    />
                  )}
                </View>
              </View>
            );
          }}
        />
      </Animated.ScrollView>
      {resource?.length > 1 && renderBottomDots()}
      {/* bottom view which contains details of art i.e. profile tag id & art description tagline*/}
      {getArtDetails()}
      {renderArtOptions()}

      {/* {renderLinearGradients} */}
    </View>
  );
}

FeedItem.propTypes = {
  feedItem: PropTypes.object.isRequired,
  onBuyButtonPressHandler: PropTypes.func,
  onPinUnpinButtonPressHandler: PropTypes.func,
  onDeletePostHandlerCallback: PropTypes.func,
  shouldCloseCurrentActiveScreenAfterDeletingItem: PropTypes.bool,
  deleteDescriptionText: PropTypes.string,
  onSupportButtonPressHandler: PropTypes.func,
};
FeedItem.defaultProps = {
  onBuyButtonPressHandler: Function(),
  onPinUnpinButtonPressHandler: Function(),
  onDeletePostHandlerCallback: undefined,
  shouldCloseCurrentActiveScreenAfterDeletingItem: true,
  deleteDescriptionText: strings.ARE_YOU_SURE_TO_DELETE_THIS_POST,
  onSupportButtonPressHandler: Function(),
};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(FeedItem);
