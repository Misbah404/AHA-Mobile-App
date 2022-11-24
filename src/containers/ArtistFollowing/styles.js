import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  noDataFoundText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.normal,
    color: Colors.text.primary,
    alignSelf: 'center',
    ...AppStyles.mTop20,
  },
});
