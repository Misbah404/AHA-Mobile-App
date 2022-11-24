// @flow
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import Text from '../Text';
import styles from './styles';

const ArtItem = props => {
  const {
    onDeletePostHandlerCallback,
    shouldCloseCurrentActiveScreenAfterDeletingItem,
    deleteDescriptionText,
    pinToCollectionId,
    multiSelectedPostIndex,
    multiSelectedItem,
    isSelected,
    isComeFromCollection,
    artItem,
    shouldShowTitleText = false,
  } = props || {};

  const [visible, setVisible] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(() => true);
  const renderSingleItem = () => {
    const {id, thumbnail, title} = artItem || {};
    const isAlreadySelected = util.some(
      multiSelectedPostIndex,
      itemSelected => itemSelected === id,
    );

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            isSelected
              ? multiSelectedItem(id)
              : Actions.singlePostContainer({
                  postID: artItem.id,
                  onDeletePostHandlerCallback,
                  shouldCloseCurrentActiveScreenAfterDeletingItem,
                  deleteDescriptionText,
                  pinToCollectionId: pinToCollectionId,
                });
          }}
          activeOpacity={0.5}
          style={{
            borderWidth: 1,
            borderColor: Colors.background.primary,
            width: '33.33%',
          }}>
          <FastImage
            style={[
              styles.image,
              isLoadingImage
                ? {borderWidth: 0.5, borderColor: Colors.text.lightGray2}
                : {},
            ]}
            onLoad={() => setIsLoadingImage(false)}
            source={{
              uri:
                !util.isFieldNil(thumbnail) && !util.isEmptyValue(thumbnail)
                  ? thumbnail
                  : 'https://ahauserposts.s3.amazonaws.com/video-files.png',
              priority: FastImage.priority.high,
            }}
            resizeMode={
              thumbnail
                ? FastImage.resizeMode.cover
                : FastImage.resizeMode.contain
            }
          />
          {!!isLoadingImage && (
            <View style={styles.imageLoadingStyle}>
              <ActivityIndicator animating size="small" color={Colors.white} />
            </View>
          )}
          {isComeFromCollection && isAlreadySelected && (
            <View style={styles.tickIcon}>
              <Image source={Images.checkRightIcon} style={styles.rightIcon} />
            </View>
          )}
          {shouldShowTitleText && (
            <View style={styles.titleSecCont}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.title}>
                {title}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <ImageView
          images={[{uri: thumbnail}]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
          doubleTapToZoomEnabled
        />
      </>
    );
  };

  return renderSingleItem();
};

ArtItem.propTypes = {
  onDeletePostHandlerCallback: PropTypes.func,
  shouldCloseCurrentActiveScreenAfterDeletingItem: PropTypes.bool,
  deleteDescriptionText: PropTypes.string,
  multiSelectedPostIndex: PropTypes.array,
  multiSelectedItem: PropTypes.func,
  isSelected: PropTypes.bool,
  shouldShowLeftBorder: PropTypes.bool,
  shouldShowRightBorder: PropTypes.bool,
  artItem: PropTypes.object.isRequired,
  shouldShowTitleText: PropTypes.bool,
};

ArtItem.defaultProps = {
  onDeletePostHandlerCallback: undefined,
  shouldCloseCurrentActiveScreenAfterDeletingItem: true,
  deleteDescriptionText: strings.ARE_YOU_SURE_TO_DELETE_THIS_POST,
  multiSelectedPostIndex: [],
  multiSelectedItem: Function,
  isSelected: false,
  shouldShowLeftBorder: true,
  shouldShowRightBorder: true,
  shouldShowTitleText: false,
};

export default ArtItem;
