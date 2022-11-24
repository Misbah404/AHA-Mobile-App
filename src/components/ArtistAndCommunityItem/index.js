import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {TapGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture';
import {Image, Text} from '../';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import Button from '../Button';
import styles from './styles';

const ArtistAndCommunityItem = props => {
  const [isLoading, setLoading] = useState(false);
  const {
    _item,
    removeButtonPressHandler,
    followButtonPressHandler,
    buttonText,
    fromCommunity,
    _onItemPress,
    shouldHideButton,
    showLoaderOnButton,
    isFollow,
  } = props;

  const {image, profile_name, profileTagId, name} = _item;

  const {is_following} = _item || false;

  const rightButtonText = buttonText
    ? buttonText
    : is_following
    ? strings.FOLLOWING
    : strings.FOLLOW;

  return (
    <TouchableOpacity style={styles.container} onPress={() => _onItemPress()}>
      <Image
        source={image ? {uri: image} : Images.profileImage}
        style={styles.image}
        setLoading={setLoading}
        isLoading={isLoading}
      />
      <View style={styles.textCont}>
        {!!!util.isEmptyValue(profileTagId) && (
          <Text
            style={styles.profileName}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {profileTagId}
          </Text>
        )}
        {!!!util.isEmptyValue(name) && (
          <Text
            style={styles.profileTag}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {name}
          </Text>
        )}
      </View>

      {!fromCommunity && !shouldHideButton ? (
        <Button
          color={Colors.text.white}
          isLoading={showLoaderOnButton}
          style={[
            rightButtonText === strings.FOLLOW
              ? styles.button
              : styles.buttonSelected,
          ]}
          textStyle={styles.buttonText}
          onPress={() => {
            if (util.isFieldNil(followButtonPressHandler)) {
              removeButtonPressHandler(_item);
            } else {
              followButtonPressHandler(_item);
            }
          }}>
          {rightButtonText}
        </Button>
      ) : (
        <></>
      )}
      {fromCommunity ? (
        <Button
          color={Colors.text.white}
          style={[styles.button]}
          textStyle={styles.buttonText}
          onPress={() => {
            followButtonPressHandler(_item);
          }}>
          {is_following ? strings.FOLLOWING : strings.FOLLOW}
        </Button>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

ArtistAndCommunityItem.propTypes = {
  _onItemPress: PropTypes.func,
  onRightButtonPress: PropTypes.func.isRequired,
  rightButtonText: PropTypes.string,
  fromCommunity: PropTypes.bool,
  shouldHideButton: PropTypes.bool,
  showLoaderOnButton: PropTypes.bool,
};

ArtistAndCommunityItem.defaultProps = {
  _onItemPress: Function(),
  rightButtonText: strings.FOLLOW,
  fromCommunity: false,
  shouldHideButton: false,
  showLoaderOnButton: false,
};

export default ArtistAndCommunityItem;
