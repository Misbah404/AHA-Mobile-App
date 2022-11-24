// @flow
import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    height: Metrics.tabBarHeight,
    backgroundColor: Colors.bottomTabs.backgroundColor,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },

  buttonWrapper: {},
  tabText: {
    fontSize: Fonts.size.normal,
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabWrapCenter: {
    marginTop: -20,
  },

  horizontalLine: {
    height: 3,
    width: 32,
    backgroundColor: Colors.white,
    alignSelf: 'center',
  },
  icon: {
    ...AppStyles.mBottom10,
    tintColor: Colors.bottomTabs.selectedIconColor,
    resizeMode: 'contain',
  },
  tintColor: {
    tintColor: Colors.bottomTabs.selectedIconColor,
  },
});
