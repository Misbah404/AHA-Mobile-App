// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  view: {
    borderWidth: 1,
    borderColor: Colors.background.primary,
  },

  titleText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.small,
    color: Colors.text.primary,
    paddingHorizontal: 10,
    marginBottom: 5,
    zIndex: 2,
  },

  imageBackground: {
    justifyContent: 'flex-end',
    paddingVertical: 5,
  },

  linearGradientBottom: {
    position: 'absolute',
    bottom: -1,
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
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: Colors.text.white,
    zIndex: 2,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    top: -12,
  },
  imageLoadingStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
