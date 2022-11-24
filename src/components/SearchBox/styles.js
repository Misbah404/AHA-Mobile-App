// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  textInputView: {
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.text.searchBoxBg,
    paddingHorizontal: 15,
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  crossIcon: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    tintColor: Colors.grey1,
  },
  textInput: {
    paddingHorizontal: 15,
    flex: 1,
    color: Colors.text.white,
  },
  crossIconCont: {
    padding: 3,
  },
});
