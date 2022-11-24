import PropTypes from 'prop-types';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from '../';
import {Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const SelectedVibeAndInterestItem = props => {
  const {_item, onCrossIconPress} = props;
  const imageUri = _item?.image ?? undefined;
  const isValidImageUrl = util.isValidURL(String(imageUri));

  return (
    <View style={styles.selectedItemView}>
      <FastImage
        style={styles.imageStyle}
        source={isValidImageUrl ? {uri: imageUri} : imageUri}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.selectedItemText} numberOfLines={1}>
        {_item?.title ?? ''}
      </Text>

      <TouchableOpacity
        style={styles.crossIcon}
        onPress={() => onCrossIconPress(_item.id)}>
        <Image source={Images.crossIcon} resizeMode={'contain'} />
      </TouchableOpacity>
    </View>
  );
};

SelectedVibeAndInterestItem.propTypes = {
  _item: PropTypes.object.isRequired,
  onCrossIconPress: PropTypes.func.isRequired,
};
SelectedVibeAndInterestItem.defaultProps = {};

export default SelectedVibeAndInterestItem;
