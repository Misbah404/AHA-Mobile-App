// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Image,
  TextInput as RNTextInput,
  View,
  ViewPropTypes,
} from 'react-native';
import {ButtonView, Text} from '../';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

export default class TextInput extends React.PureComponent {
  static propTypes = {
    label: ViewPropTypes.style,
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    rightIcon: PropTypes.number,
    leftIcon: PropTypes.number,
    placeholderValue: PropTypes.string,
    makePointerEventsToNone: PropTypes.bool,
    textInputValue: PropTypes.string,
    labelStyle: PropTypes.object,
    placeholderColor: PropTypes.string,
    inputBorderColor: PropTypes.string,
    styleInput: PropTypes.style,
    cursorColor: PropTypes.string,
  };

  static defaultProps = {
    error: '',
    label: '',
    placeholderValue: '',
    containerStyle: {},
    onPress: null,
    multiline: false,
    rightIcon: undefined,
    leftIcon: undefined,
    textInputValue: '',
    labelStyle: {},
    placeholderColor: '',
    inputBorderColor: '',
    styleInput: {},
    cursorColor: Colors.text.primary,
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }

  render() {
    const {
      label,
      error,
      containerStyle,
      onPress,
      multiline,
      rightIcon,
      leftIcon,
      placeholderValue,
      textInputValue,
      labelStyle,
      placeholderColor,
      inputBorderColor,
      styleInput,
      cursorColor,
      ...rest
    } = this.props;

    return (
      <View style={containerStyle}>
        <Text style={[labelStyle || styles.label]}>{label}</Text>

        <View>
          <RNTextInput
            value={!_.isEmpty(textInputValue) && textInputValue}
            ref={ref => {
              this.myRef = ref;
            }}
            style={[
              styles.input,
              multiline ? styles.multilineInput : {},
              leftIcon && styles.horizontalPadding,
              inputBorderColor && {borderBottomColor: inputBorderColor},
              styleInput,
            ]}
            blurOnSubmit={true}
            multiline={multiline}
            placeholder={placeholderValue}
            placeholderTextColor={placeholderColor || Colors.text.secondary}
            cursorColor={cursorColor}
            selectionColor={
              util.isPlatformAndroid() ? 'transparent' : Colors.text.primary
            }
            {...rest}
          />
          {!_.isNull(leftIcon) && (
            <ButtonView onPress={() => {}} style={[styles.leftButtonOverlay]}>
              <Image
                source={leftIcon}
                style={styles.arrowIcon}
                resizeMode={'contain'}
              />
            </ButtonView>
          )}
          {!_.isNull(rightIcon) && (
            <ButtonView onPress={onPress} style={styles.buttonOverlay}>
              <Image
                source={rightIcon}
                style={styles.arrowIcon}
                resizeMode={'contain'}
              />
            </ButtonView>
          )}
        </View>

        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            type="medium"
            size="small"
            color={Colors.red}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
