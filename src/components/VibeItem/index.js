// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '..';
import {Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const VibeItem = props => {
  const {
    isSelectAble,
    imageWidth,
    imageHeight,
    isTextCenter,
    onItemPress,
    _item,
    isSelected,
  } = props;

  const {image, title} = _item || {};
  const [isLoadingImage, setIsloadingImage] = useState(() => true);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.view, {width: imageWidth}]}
      onPress={() => {
        isSelectAble && onItemPress(_item);
      }}>
      {!util.isFieldNil(image) && !util.isEmptyValue(image) && (
        <FastImage
          style={[
            styles.imageBackground,
            {height: imageHeight},
            !!isLoadingImage
              ? {borderWidth: 0.5, borderColor: Colors.text.lightGray2}
              : {},
          ]}
          source={{
            uri: image,
            priority: FastImage.priority.high,
          }}
          onLoad={() => setIsloadingImage(false)}
          resizeMode={FastImage.resizeMode.cover}>
          {!!isLoadingImage && (
            <View style={styles.imageLoadingStyle}>
              <ActivityIndicator animating size="small" color={Colors.white} />
            </View>
          )}
          {!isTextCenter ? (
            <Text style={[styles.titleText]} numberOfLines={1}>
              {title}
            </Text>
          ) : (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            colors={
              isSelected
                ? ['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)']
                : [
                    'rgba(0, 0, 0, 0.5)',
                    'rgba(0, 0, 0, 0.3)',
                    'rgba(0, 0, 0, 0.1)',
                    'rgba(0, 0, 0, 0)',
                  ]
            }
            style={[
              isSelected
                ? styles.linearGradientBottomSeleced
                : styles.linearGradientBottom,
            ]}
          />
        </FastImage>
      )}
      {isSelected && (
        <View style={styles.checkIconView}>
          <Image source={Images.checkRightIcon} resizeMode={'cover'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

VibeItem.propTypes = {
  _item: PropTypes.object.isRequired,
  imageWidth: PropTypes.string,
  imageHeight: PropTypes.number,
  isTextCenter: PropTypes.bool,
  isSelectAble: PropTypes.bool,
  onItemPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

VibeItem.defaultProps = {
  imageWidth: '33.33%',
  imageHeight: 151,
  isTextCenter: false,
  isSelectAble: true,
  isSelected: false,
  onItemPress: Function(),
};

export default VibeItem;
