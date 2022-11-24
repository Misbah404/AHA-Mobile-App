// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  bottomButtonsCont: {
    position: 'absolute',
    bottom: 0,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:10,
    paddingTop:20,
    backgroundColor: 'transparent',
  },
  skipButton: {
    marginHorizontal: 12,
    borderRadius: 6,
  },
  nextButton: {
    backgroundColor: Colors.text.purple,
    borderRadius: 6,
    marginBottom: 10,
  },
  bottomButtonsText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.medium,
  },
  marginHorizontal60: {
    marginHorizontal: 60,
  },
});
