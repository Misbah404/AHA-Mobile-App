// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.darkBlue,
  },
  mainCont: {
    height: Metrics.screenHeight - Metrics.tabBarHeight,
    width: Metrics.screenWidth,
  },
  imageBackgroundStyle: {
    flex: 1,
    backgroundColor: Colors.background.darkBlue,
  },
  bottomViewSec: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 10,
  },
  bottomTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
  },
  navigationArrowsViewSec: {
    position: 'absolute',
    height: 50,
    width: '100%',
    top:
      Metrics.screenHeight -
      (Metrics.screenHeight * 47.6) / 100 -
      Metrics.tabBarHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  navigationArrowIconStyle: {
    width: 35,
    height: 35,
    alignSelf: 'center',
  },
  loaderStyle: {
    position: 'absolute',
    top: '50%',
    left: '48%',
  },
  leftArrowButtonStyle: {
    position: 'absolute',
    height: 50,
    width: '10%',
    left: 0,
    top:
      Metrics.screenHeight -
      (Metrics.screenHeight * 47.6) / 100 -
      Metrics.tabBarHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rightArrowButtonStyle: {
    position: 'absolute',
    height: 50,
    width: '10%',
    right: 0,
    top:
      Metrics.screenHeight -
      (Metrics.screenHeight * 47.6) / 100 -
      Metrics.tabBarHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
