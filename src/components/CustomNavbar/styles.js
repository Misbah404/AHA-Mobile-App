// @flow
import {Platform, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 55 : 35,
    paddingBottom: 10,
  },

  titleCont: {
    paddingHorizontal: Metrics.singleBaseMargin,
    flex: 1,
    alignSelf: 'center',
  },

  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey3,
  },

  btnImage: {
    width: 18,
    height: 18,
    tintColor: Colors.background.imageTintColor,
    marginTop: 5,
  },

  leftBtn: {
    paddingLeft: 15,
  },

  btnWrapper: {
    paddingLeft: Metrics.smallMargin,
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingTop: 6,
    zIndex: 1,
  },

  rightBtn: {
    paddingRight: 15,
  },

  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },

  subTitleStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.normal,
    paddingVertical: 5,
  },

  horizontalBar: {
    width: 40,
    height: 6,
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    marginTop: 5,
  },
  notificationsCount: {
    backgroundColor: 'red',
    position: 'absolute',
    right: -5,
    top: 3.5,
    alignItems: 'center',
    width: 22,
    height: 15,
    borderRadius: 7.5,
    justifyContent: 'center',
  },
  countTxt: {
    alignSelf: 'center',
  },
});
