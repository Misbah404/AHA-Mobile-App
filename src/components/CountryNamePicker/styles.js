// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  _textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#2d3945',
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.text.white,
  },
  countryPickerCont: {
    position: 'absolute',
    height: 70,
    width: '100%',
    zIndex: 1,
  },
  countryBtnPickerStyle: {
    backgroundColor: 'transparent',
    height: '100%',
  },
  textInputLabel: {
    color: Colors.text.becomeAnArtist,
    fontSize: 14,
  },
});
