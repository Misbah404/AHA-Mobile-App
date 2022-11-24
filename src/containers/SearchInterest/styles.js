import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  viewCont: {
    paddingHorizontal: 20,
  },
  navbarText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.type.bold,
  },
  textInputView: {
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#2B2A2F',
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
    tintColor: '#8F8E93',
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
