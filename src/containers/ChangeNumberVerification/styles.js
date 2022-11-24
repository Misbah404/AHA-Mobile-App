import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background.primary,
    flex: 1,
  },
  bottomImgCont: {
    bottom: 0,
    position: 'absolute',
    width: Metrics.screenWidth,
  },
  bottomImg: {
    width: Metrics.screenWidth,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xxLarge,
  },
  phoneImgStyle: {
    alignSelf: 'center',
  },
  verifyEmailText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xLarge,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  pleaseEnterFourDigitCodeText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.xxSmall,
    alignSelf: 'center',
    color: Colors.text.secondary,
  },
  didntReceiveACodeText: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.xSmall,
    color: Colors.text.secondary,
    alignSelf: 'center',
  },
  resendCodeText: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.xSmall,
    color: Colors.text.tertiary,
  },
  wrongEmailText: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.xSmall,
    color: Colors.text.tertiary,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  paddingVertical30: {
    paddingVertical: 30,
  },
  square: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    color: Colors.black,
  },
  submitBtnViewcont: {
    paddingVertical: 10,
  },
  codeFieldRoot: {
    marginTop: 30,
    width: 200,
    alignSelf: 'center',
  },
  cell: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
  },
  focusCell: {},
});
