// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    height: Metrics.feedsHeight,
    width: Metrics.screenWidth,
  },
  loaderSec: {
    position: 'absolute',
    top: (Metrics.screenHeight - Metrics.tabBarHeight) / 2,
    alignSelf: 'center',
  },
  coverImage: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    resizeMode: 'contain',
  },
  bottomViewCont: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: Metrics.screenHeight - (Metrics.screenHeight * 85) / 100,
    marginHorizontal: 5,
  },
  profileTagText: {
    fontSize: Fonts.size.xLarge,
    fontFamily: Fonts.type.bold,
    color: Colors.text.white,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  profileTagSubText: {
    marginTop: 3,
    fontSize: 15,
    fontStyle: 'italic',
    fontFamily: Fonts.type.semiBold,
    color: Colors.text.white,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
