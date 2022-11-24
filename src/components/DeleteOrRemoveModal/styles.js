// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    borderColor: '#AFA3A3',
    borderRadius: 27,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 300,
    height: 215,
  },
  headingTextStyle: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.large,
    color: Colors.text.primary,
    fontWeight: 'bold',
    paddingTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  descTextStyle: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.small,
    color: Colors.text.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: Colors.white,
  },
  positiveNegativeBtnText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.normal,
    color: Colors.text.primary,
    alignSelf: 'center',
    textAlign: 'center',
  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
