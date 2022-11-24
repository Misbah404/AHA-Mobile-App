// @flow
import _ from 'lodash';
import React from 'react';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {Images, Colors} from '../../theme';
import styles from './styles';

const renderView = mProps => {
  const {onButtonPress, isLoading, _style} = mProps;
  return (
    <View style={[styles.container, _style]}>
      <View style={styles.horizontalLine}></View>
      <TouchableOpacity style={styles.circle} onPress={onButtonPress}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Image
            source={Images.submitArrowIcon}
            style={styles.arrowIconStyle}
            resizeMode={'contain'}
          />
        )}
      </TouchableOpacity>
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

const OnBoardingSubmitArrow = props => {
  return renderView(props);
};

OnBoardingSubmitArrow.propTypes = {
  _style: PropTypes.object,
};

OnBoardingSubmitArrow.defaultProps = {
  _style: {},
};

export default OnBoardingSubmitArrow;
