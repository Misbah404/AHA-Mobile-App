// @flow
import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Text} from '../';
import {AppStyles, Images, Metrics, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const ArtistSuggestions = props => {
  const {arrayOfArrays} = props;
  const flatListRef = useRef(() => null);
  const [activeIndex, setActiveIndex] = useState(() => 0);
  const [allArtistIds, setAllArtistIds] = useState(() => []);

  const renderLoader = () => (
    <ActivityIndicator style={styles.loaderStyle} color={Colors.white} />
  );

  const renderItem = item => {
    const {id, profileTagId, bio, image} = item;
    const artistObj = {
      artist: {
        id: id,
      },
    };
    return (
      <TouchableOpacity
        style={AppStyles.flex}
        onPress={() =>
          // Actions.jump('artistProfile', {feedItem: artistObj})
          Actions.jump('visitedProfile', {feedItem: artistObj, isArtirst: true})
        }>
        <ImageBackground
          source={{uri: image}}
          resizeMode={'cover'}
          onLoadStart={() => {
            let cloneDeepArtistIds = util.cloneDeepArray(allArtistIds);
            cloneDeepArtistIds.push(id);
            setAllArtistIds(cloneDeepArtistIds);
          }}
          onLoadEnd={() => {
            let cloneDeepArtistIds = util.cloneDeepArray(allArtistIds);
            const mIndex = util.findIndexByString(cloneDeepArtistIds, id);
            if (mIndex != -1) {
              cloneDeepArtistIds.splice(mIndex, 1);
              setAllArtistIds(cloneDeepArtistIds);
            }
          }}
          style={styles.imageBackgroundStyle}>
          <>
            <View style={styles.bottomViewSec}>
              <Text
                style={styles.bottomTextStyle}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                @{profileTagId}
              </Text>
              {!util.isEmptyValue(bio) && (
                <Text
                  style={[styles.bottomTextStyle]}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {bio}
                </Text>
              )}
            </View>
            {util.isArrayIncludesValue(allArtistIds, id) && renderLoader()}
          </>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderSingleItem = item => {
    return <View style={styles.mainCont}>{renderItem(item[0])}</View>;
  };

  const renderTwoItems = item => {
    return (
      <View style={styles.mainCont}>
        <View style={AppStyles.flex}>{renderItem(item[0])}</View>
        <View style={AppStyles.flex}>{renderItem(item[1])}</View>
      </View>
    );
  };

  const renderThreeItems = item => {
    return (
      <View style={styles.mainCont}>
        <View style={[AppStyles.flex, AppStyles.flexRow]}>
          <View style={AppStyles.flex}>{renderItem(item[0])}</View>
          <View style={AppStyles.flex}>{renderItem(item[1])}</View>
        </View>
        <View style={AppStyles.flex}>{renderItem(item[2])}</View>
      </View>
    );
  };

  const renderFourItems = item => {
    return (
      <View style={styles.mainCont}>
        <View style={[AppStyles.flex, AppStyles.flexRow]}>
          <View style={AppStyles.flex}>{renderItem(item[0])}</View>
          <View style={AppStyles.flex}>{renderItem(item[1])}</View>
        </View>
        <View style={[AppStyles.flex, AppStyles.flexRow]}>
          <View style={AppStyles.flex}>{renderItem(item[2])}</View>
          <View style={AppStyles.flex}>{renderItem(item[3])}</View>
        </View>
      </View>
    );
  };

  const renderNavigationIconsView = flatListRef => (
    <>
      {activeIndex != 0 && (
        <TouchableOpacity
          onPress={() => {
            flatListRef.current.scrollToIndex({index: activeIndex - 1});
          }}
          style={styles.leftArrowButtonStyle}>
          <Image
            style={styles.navigationArrowIconStyle}
            source={Images.moveToLeftIcon}
          />
        </TouchableOpacity>
      )}
      {arrayOfArrays.length - 1 !== activeIndex && (
        <TouchableOpacity
          onPress={() => {
            flatListRef.current.scrollToIndex({index: activeIndex + 1});
          }}
          style={styles.rightArrowButtonStyle}>
          <Image
            style={[styles.navigationArrowIconStyle]}
            source={Images.moveToRightIcon}
          />
        </TouchableOpacity>
      )}
    </>
  );

  function handleOnScroll(event) {
    const val = util.roundValue(
      event.nativeEvent.contentOffset.x / Metrics.screenWidth,
    );
    if (val !== activeIndex) setActiveIndex(val);
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        snapToInterval={Metrics.screenWidth}
        pagingEnabled
        snapToAlignment={'center'}
        disableIntervalMomentum={true}
        keyExtractor={(_, index) => index}
        showsHorizontalScrollIndicator={true}
        data={arrayOfArrays}
        onScroll={handleOnScroll}
        renderItem={mItem => {
          const {item} = mItem || {};
          const length = item.length;
          switch (length) {
            case 1: {
              return renderSingleItem(item);
            }
            case 2: {
              return renderTwoItems(item);
            }
            case 3: {
              return renderThreeItems(item);
            }
            case 4: {
              return renderFourItems(item);
            }
          }
        }}
      />
      {renderNavigationIconsView(flatListRef)}
    </View>
  );
};

ArtistSuggestions.propTypes = {
  arrayOfArrays: PropTypes.array.isRequired,
};
ArtistSuggestions.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(ArtistSuggestions);
