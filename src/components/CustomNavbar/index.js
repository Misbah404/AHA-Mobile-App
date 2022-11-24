// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Text, ButtonView, SearchBar} from '../';
import styles from './styles';
import {Images, AppStyles, Colors, Fonts} from '../../theme';
import util from '../../util';

export default class CustomNavbar extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    title: PropTypes.string,
    leftBtnImage: PropTypes.number,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnImage: PropTypes.number,
    rightBtnPress: PropTypes.func,
    rightBtnOnLongPress: PropTypes.func,
    rightBtnText: PropTypes.string,
    rightBtnImageSecond: PropTypes.number,
    rightBtnPressSecond: PropTypes.func,
    rightBtnTextSecond: PropTypes.string,
    leftRightButtonWrapperStyleSecond: PropTypes.object,
    rightBtnStyleSecond: PropTypes.object,
    titleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    titleStyle: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    subTitle: PropTypes.string,
    shouldShowHorizontalBar: PropTypes.bool,
    leftRightButtonWrapperStyle: PropTypes.object,
    backgroundColor: PropTypes.string,
    leftBtnStyle: PropTypes.object,
    rightBtnStyle: PropTypes.object,
    rightImageStyle: PropTypes.func,
    disableRightBtnImage: PropTypes.bool,
    rightTxtBtnPress: PropTypes.func,
    rightText: PropTypes.string,
    rightTxtBtnStyle: PropTypes.func,
    disableRightTxtBtn: PropTypes.bool,
    rightCornerText: PropTypes.string,
    notificationCount: PropTypes.number,
  };

  static defaultProps = {
    title: '',
    hasBack: false,
    titleColor: '',
    leftBtnImage: undefined,
    leftBtnPress: () => Actions.pop(),
    leftBtnText: '',
    rightBtnImage: undefined,
    rightBtnPress: () => {},
    rightBtnOnLongPress: () => {},
    rightBtnText: '',
    hasBorder: false,
    style: {},
    backgroundColor: '',
    hasSearch: false,
    onSearchText: () => {},
    isSearching: false,
    subTitle: '',
    shouldShowHorizontalBar: false,
    leftRightButtonWrapperStyle: {},
    leftBtnStyle: {},
    rightBtnStyle: {},
    rightBtnImageSecond: undefined,
    rightBtnPressSecond: () => {},
    rightBtnTextSecond: '',
    leftRightButtonWrapperStyleSecond: {},
    rightBtnStyleSecond: {},
    rightImageStyle: {},
    disableRightBtnImage: false,
    rightTxtBtnPress: () => {},
    rightText: '',
    rightTxtBtnStyle: {},
    disableRightTxtBtn: false,
    rightCornerText: undefined,
    notificationCount: 0,
  };

  renderLeft(
    leftBtnImage,
    leftBtnPress,
    leftBtnText,
    hasBack,
    leftRightButtonWrapperStyle,
    leftBtnStyle,
    notificationCount,
  ) {
    if (_.isNil(leftBtnImage) && _.isEmpty(leftBtnText) && !hasBack)
      return <></>;

    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    return (
      <ButtonView
        ButtonView
        onPress={leftBtnPress}
        style={[
          leftRightButtonWrapperStyle,
          styles.btnWrapper,
          _.isEmpty(leftBtnStyle) ? styles.leftBtn : leftBtnStyle,
        ]}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image
            source={leftBtnImage}
            style={styles.btnImage}
            resizeMode={'contain'}
          />
        )}
        {renderBack && (
          <Image
            source={Images.backButton}
            style={styles.btnImage}
            resizeMode={'contain'}
          />
        )}
        {!util.areValuesEqual(notificationCount, 0) && (
          <View style={styles.notificationsCount}>
            <Text style={styles.countTxt} size={Fonts.size.xxxxSmall}>
              {notificationCount < 100 ? notificationCount : `99+`}
            </Text>
          </View>
        )}
      </ButtonView>
    );
  }

  renderRight(
    rightBtnImage,
    rightBtnPress,
    rightBtnOnLongPress,
    rightBtnText,
    leftRightButtonWrapperStyle,
    rightBtnStyle,
    rightImageStyle,
    disableRightBtnImage,
  ) {
    return (
      <ButtonView
        onPress={rightBtnPress}
        onLongPress={rightBtnOnLongPress}
        disabled={disableRightBtnImage}
        style={[
          leftRightButtonWrapperStyle,
          styles.btnWrapper,
          styles.rightBtn,
          rightBtnStyle,
        ]}>
        {!_.isEmpty(rightBtnText) && (
          <Text
            type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small">
            {rightBtnText}
          </Text>
        )}
        {!_.isUndefined(rightBtnImage) && (
          <Image
            source={rightBtnImage}
            size={styles.btnImage}
            style={rightImageStyle}
            resizeMode={'contain'}
          />
        )}
      </ButtonView>
    );
  }
  renderRightTxt(
    rightTxtBtnPress,
    rightText,
    rightTxtBtnStyle,
    disableRightTxtBtn,
  ) {
    return (
      <ButtonView
        onPress={rightTxtBtnPress}
        disabled={disableRightTxtBtn}
        style={[styles.btnWrapper, styles.rightBtn, rightTxtBtnStyle]}>
        {!_.isEmpty(rightText) && (
          <Text
            type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small">
            {rightText}
          </Text>
        )}
      </ButtonView>
    );
  }
  renderRightSecond(
    rightBtnImageSecond,
    rightBtnPressSecond,
    rightBtnTextSecond,
    leftRightButtonWrapperStyleSecond,
    rightBtnStyleSecond,
  ) {
    return (
      <ButtonView
        onPress={rightBtnPressSecond}
        style={[
          leftRightButtonWrapperStyleSecond,
          styles.btnWrapper,
          styles.rightBtn,
          rightBtnStyleSecond,
        ]}>
        {!_.isEmpty(rightBtnTextSecond) && (
          <Text
            type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small">
            {rightBtnTextSecond}
          </Text>
        )}
        {!_.isUndefined(rightBtnImageSecond) && (
          <Image
            style={rightBtnStyleSecond}
            source={rightBtnImageSecond}
            size={styles.btnImage}
            resizeMode={'contain'}
          />
        )}
      </ButtonView>
    );
  }

  renderTitle(title, titleStyle) {
    return (
      <View>
        <Text
          color={Colors.text.primary}
          numberOfLines={1}
          ellipsizeMode="tail"
          size="medium"
          style={[titleStyle]}>
          {title || ''}
        </Text>
      </View>
    );
  }

  renderSubTitle(title) {
    return (
      <Text
        color={Colors.text.secondary}
        numberOfLines={1}
        ellipsizeMode="tail"
        size="medium"
        style={styles.subTitleStyle}>
        {title || ''}
      </Text>
    );
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }

  renderHorizontalBar() {
    return <View style={styles.horizontalBar}></View>;
  }

  render() {
    const {
      hasBack,
      title,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      rightBtnImage,
      rightBtnPress,
      rightBtnText,
      titleColor,
      hasBorder,
      style,
      backgroundColor,
      hasSearch,
      onSearchText,
      isSearching,
      titleStyle,
      subTitle,
      shouldShowHorizontalBar,
      leftRightButtonWrapperStyle,
      leftBtnStyle,
      rightBtnStyle,
      rightBtnImageSecond,
      rightBtnPressSecond,
      rightBtnTextSecond,
      leftRightButtonWrapperStyleSecond,
      rightBtnStyleSecond,
      rightImageStyle,
      disableRightBtnImage,
      rightTxtBtnPress,
      rightText,
      rightTxtBtnStyle,
      disableRightTxtBtn,
      rightBtnOnLongPress,
      rightCornerText,
      notificationCount,
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          style,
          backgroundColor
            ? {backgroundColor: backgroundColor}
            : {backgroundColor: Colors.background.primary},
          hasBorder ? styles.borderBottom : {},
          hasSearch ? styles.searchHeader : {},
        ]}>
        <View style={[AppStyles.flexRow]}>
          {this.renderLeft(
            leftBtnImage,
            leftBtnPress,
            leftBtnText,
            hasBack,
            leftRightButtonWrapperStyle,
            leftBtnStyle,
            notificationCount,
          )}
          <View style={styles.titleCont}>
            {this.renderTitle(title, titleStyle)}
            {!_.isEmpty(subTitle) && this.renderSubTitle(subTitle)}
            {shouldShowHorizontalBar && this.renderHorizontalBar()}
          </View>
          {this.renderRightSecond(
            rightBtnImageSecond,
            rightBtnPressSecond,
            rightBtnTextSecond,
            leftRightButtonWrapperStyleSecond,
            rightBtnStyleSecond,
          )}
          {this.renderRight(
            rightBtnImage,
            rightBtnPress,
            rightBtnOnLongPress,
            rightBtnText,
            leftRightButtonWrapperStyle,
            rightBtnStyle,
            rightImageStyle,
            disableRightBtnImage,
          )}
          {!util.isEmptyValue(rightText) &&
            this.renderRightTxt(
              rightTxtBtnPress,
              rightText,
              rightTxtBtnStyle,
              disableRightTxtBtn,
            )}
          {!util.isFieldNil(rightCornerText) && (
            <Text
              style={{
                alignSelf: 'center',
                paddingRight: 7,
                paddingLeft: 5,
              }}>
              {util.kFormatter(Number(rightCornerText))}
            </Text>
          )}
        </View>

        {hasSearch && (
          <View style={AppStyles.centerInner}>
            {this.renderSearch(onSearchText, isSearching)}
          </View>
        )}
      </View>
    );
  }
}
