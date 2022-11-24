// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  view: {
    width: '33.33%',
    borderWidth: 1,
    borderColor: Colors.background.primary,
  },

  titleText: {
    fontSize: 13,
    color: Colors.text.white,
    zIndex: 2,
    paddingHorizontal: 10,
  },

  imageBackground: {
    height: 151,
    justifyContent: 'flex-end',
    paddingVertical: 5,
  },

  linearGradientBottom: {
    position: 'absolute',
    bottom: -1,
    // height: 100,
    top: 60,
    width: '100%',
    zIndex: 1,
  },

  linearGradientBottomSeleced: {
    position: 'absolute',
    bottom: -1,
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  checkIconView: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 2,
  },
});
