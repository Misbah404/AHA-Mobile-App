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
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.small,
    color: Colors.text.primary,
    paddingHorizontal: 10,
    marginBottom: 5,
    zIndex: 1,
  },
  imageBackground: {
    justifyContent: 'flex-end',
    height: 151,
    paddingVertical: 5,
    resizeMode: 'cover',
  },
  txtChatAt: {
    fontFamily: Fonts.type.bold,
    fontSize: 60,
    color: Colors.white,
    paddingHorizontal: 10,
    marginBottom: 5,
    zIndex: 1,
    alignSelf: 'center',
  },

  imageNullBackground: {
    height: 151,

    resizeMode: 'cover',

    backgroundColor: Colors.black,
  },
  linearGradientBottom: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    width: '100%',
  },
  imageLoadingStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
