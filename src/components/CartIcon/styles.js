// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  cartIcon: {
    position: 'absolute',
    right: 10,
    bottom: -5,
    width: 30,
    height: 30,
  },
  cartCountView: {
    backgroundColor: Colors.background.purple,
    borderRadius: 10,
    borderColor: Colors.black,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: -8,
    borderWidth: 1.6,
  },
  cartCountTxt: {
    fontSize: Fonts.size.xxxxSmall,
    color: Colors.white,
  },
});
