import PropTypes from 'prop-types';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import util from '../../util';
import styles from './styles';

const CommunityTabListItem = props => {
  const {item} = props;
  const {
    id,
    profile_name: title,
    profileTagId: subtitle,
    image: uri,
  } = item || {};

  const renderCommunityDetails = () => (
    <View style={[styles.bottomViewCont]}>
      <Text
        style={styles.profileTagText}
        numberOfLines={1}
        ellipsizeMode="tail">
        {title}
      </Text>
      <Text
        style={styles.profileTagSubText}
        numberOfLines={1}
        ellipsizeMode="tail">
        {subtitle}
      </Text>
    </View>
  );

  const upperLinearGradient = () => (
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
  );

  const bottomLinearGradient = () => (
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
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Actions.jump('communityDetails', {id: item?.id})}>
        {!util.isFieldNil(uri) && (
          <FastImage
            source={{
              uri: uri,
              priority: FastImage.priority.high,
            }}
            style={styles.coverImage}
            resizeMode={FastImage.resizeMode.cover}>
            {renderCommunityDetails()}
          </FastImage>
        )}
      </TouchableOpacity>
      {upperLinearGradient}
      {/* bottom view which contains details of art i.e. profile tag id & art description tagline*/}
      {bottomLinearGradient}
    </View>
  );
};

CommunityTabListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
CommunityTabListItem.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(CommunityTabListItem);
