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
    fontSize: Fonts.size.small,
    color: Colors.white,
    fontWeight: '500',
  },
  titleSecCont: {
    position: 'absolute',
    bottom: 7,
    left: 10,
    right: 5,
  },
  tickIcon: {
    position: 'absolute',
    right: 7,
    top: 7,
  },
});
