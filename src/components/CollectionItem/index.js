import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '..';
import {Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const CollectionItem = props => {
  const {item, onItemPress} = props;
  const {image, title = '', id} = item || {};
  const pinToCollectionTitle = util.trim(title);
  const [isLoadingImage, setIsLoadingImage] = useState(() => true);

  const renderItem = () => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.view]}
      onPress={onItemPress}>
      {util.isValidImageUrl(image) ? (
        <>
          <FastImage
            style={[
              styles.imageBackground,
              !!isLoadingImage
                ? {borderWidth: 0.5, borderColor: Colors.text.lightGray2}
                : {},
            ]}
            source={{uri: image, priority: FastImage.priority.high}}
            onLoad={() => setIsLoadingImage(false)}
            resizeMode={FastImage.resizeMode.cover}>
            {!!isLoadingImage ? (
              <View style={styles.imageLoadingStyle}>
                <ActivityIndicator
                  animating
                  size="small"
                  color={Colors.white}
                />
              </View>
            ) : (
              <>
                <Text numberOfLines={1} style={[styles.titleText]}>
                  {title}
                </Text>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0}}
                  colors={[
                    'rgba(0, 0, 0, 0.5)',
                    'rgba(0, 0, 0, 0.3)',
                    'rgba(0, 0, 0, 0.1)',
                    'rgba(0, 0, 0, 0)',
                  ]}
                  style={styles.linearGradientBottom}
                />
              </>
            )}
          </FastImage>
        </>
      ) : (
        <View style={[styles.imageNullBackground]}>
          <View
            style={{
              flex: 0.95,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.txtChatAt}>
              {pinToCollectionTitle.charAt(0)}
            </Text>
          </View>
          <Text numberOfLines={1} style={[styles.titleText]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return <>{renderItem()}</>;
};

CollectionItem.propTypes = {
  item: PropTypes.object.isRequired,
  artistID: PropTypes.string,
  onItemPress: PropTypes.func,
};
CollectionItem.defaultProps = {
  artistID: undefined,
  onItemPress: Function(),
};
export default CollectionItem;
