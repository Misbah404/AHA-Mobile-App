import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  notificationsCount: {
    backgroundColor: 'red',
    position: 'absolute',
    right: 5,
    top: -6,
    alignItems: 'center',
    width: 22,
    height: 15,
    borderRadius: 7.5,
    justifyContent: 'center',
  },
  countTxt: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: Fonts.size.xxxxSmall,
    fontFamily: Fonts.type.Asap,
  },
});
