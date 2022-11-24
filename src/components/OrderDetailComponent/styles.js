// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#0B1319',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 4,
  },

  textView: {
    flex: 1,
    marginLeft: 15,
  },

  description: {
    fontSize: 13,
  },

  amount: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    marginTop: 5,
  },

  sizeAndQuantity: {
    fontSize: 13,
    marginTop: 4,
  },
});
