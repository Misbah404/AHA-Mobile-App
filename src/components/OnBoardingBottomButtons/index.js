// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {ImageBackground} from 'react-native';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import Button from '../Button';
import styles from './styles';

const OnBoardingBottomButtons = props => {
  const {onSkipBtnPress, onNextBtnPress, nextBtnLoading, shouldDisable} = props;
  return (
    <ImageBackground
      style={[AppStyles.flexRow, styles.bottomButtonsCont]}
      source={Images.bottomGradientBg}
      resizeMode={'cover'}>
      {!_.isNil(onSkipBtnPress) && (
        <Button
          color={Colors.text.darkBlue}
          style={[AppStyles.flex, styles.skipButton]}
          textStyle={styles.bottomButtonsText}
          onPress={onSkipBtnPress}>
          {strings.SKIP}
        </Button>
      )}
      <Button
        color={Colors.text.white}
        onPress={onNextBtnPress}
        isLoading={nextBtnLoading}
        disabled={shouldDisable}
        style={[
          AppStyles.flex2,
          styles.nextButton,
          _.isNil(onSkipBtnPress) && styles.marginHorizontal60,
        ]}
        textStyle={styles.bottomButtonsText}>
        {strings.NEXT}
      </Button>
    </ImageBackground>
  );
};

OnBoardingBottomButtons.propTypes = {
  onSkipBtnPress: PropTypes.func,
  nextBtnLoading: PropTypes.bool,
  onNextBtnPress: PropTypes.func.isRequired,
  shouldDisable: PropTypes.bool,
};

OnBoardingBottomButtons.defaultProps = {
  onSkipBtnPress: undefined,
  nextBtnLoading: false,
  shouldDisable: false,
};

export default OnBoardingBottomButtons;
