// @flow
import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  image: {
    height: 150,
  },
  imageLoadingStyle: {
    marginTop: 50,
    position: 'absolute',
    left: 0,
    top: 10,
    right: 0,
    bottom: 0,
  },
  title: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.xxxSmall,
    color: Colors.white,
    fontWeight: '500',
  },
  txtTotal: {
    fontFamily: Fonts.type.Asap,
    color: Colors.white,
    fontSize: Fonts.size.xSmall,
    fontWeight: '800',
  },

  titleSecCont: {
    position: 'absolute',
    bottom: 7,
    left: 5,
    right: 5,
  },
  viewSize: {
    minWidth: 25,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: 'absolute',
    right: 4,
    top: 4,
  },
  tickIcon: {
    position: 'absolute',
    right: 7,
    top: 7,
  },
});
