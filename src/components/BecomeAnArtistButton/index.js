// @flow
import _ from 'lodash';
import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '..';
import {Fonts, Colors, AppStyles, Images} from '../../theme';
import styles from './styles';
import {Actions} from 'react-native-router-flux';

const BecomeAnArtistButton = props => {
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.becomeAnArtistMainView}
      activeOpacity={0.6}>
      <View style={styles.becomeAnArtistView}>
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <Text style={styles.becomeAnArtist}>Become an Artist</Text>
          <Image source={Images.nextIcon} style={[AppStyles.mLeft10]} />
        </View>
        <Text style={styles.becomeAnArtistDescription}>
          You Can Post & Sell Your Arts. get you art best value from best buyer
        </Text>
      </View>

      <View>
        <Image source={Images.settingImage} />
      </View>
    </TouchableOpacity>
  );
};

BecomeAnArtistButton.propTypes = {
  onPress: PropTypes.func,
};

BecomeAnArtistButton.defaultProps = {
  onPress: () => {},
};

export default BecomeAnArtistButton;
