// @flow
import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  headerCont: {
    marginTop: 60,
    position: 'absolute',
    zIndex: 1,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoverAndCommunityText: {
    color: Colors.text.secondary,
    paddingHorizontal: 10,
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.medium,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  selectedTabText: {
    color: Colors.text.quaternary,
  },
  verticalLine: {
    color: Colors.text.quaternary,
    opacity: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
