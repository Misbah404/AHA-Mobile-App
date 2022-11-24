import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

// commit

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  artirstView: {flexDirection: 'row', marginVertical: 15},
  artirstTxt: {marginLeft: 20},
  artirstPreferenceTxt: {fontWeight: 'bold'},
});
