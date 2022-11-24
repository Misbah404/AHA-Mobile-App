import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

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
  termsAndCondIcon: {
    alignSelf: 'center',
    tintColor: Colors.background.imageTintColor,
    paddingHorizontal: 10,
  },

  ////////////

  textInputContainer: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
    borderWidth: 1,
    padding: 3,
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1,
    fontFamily: Fonts.type.medium,
    color: Colors.grey5,
    fontSize: Fonts.size.small,
    // marginHorizontal: 7,
    width: '98%',
    height: 48,
    marginTop: 70,
    left: 2,
  },
  _codeTextStyle: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.small,
    height: 20,
    color: Colors.white,
    left: -63,
  },
  _textInputStyle: {
    color: Colors.white,
    height: 48,
    left: -50,
  },
  _textContainerStyle: {
    backgroundColor: Colors.transparent,
  },

  //////////////
  textInputCont: {
    marginTop: Metrics.smallMargin,
    ...AppStyles.padding20,
  },
  termsAndConditionText: {
    color: Colors.text.primary,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.xxSmall,
  },
  termsAndConditionTextUnderline: {
    textDecorationLine: 'underline',
  },
  iAgreeText: {
    paddingLeft: 5,
  },
  _flagStyle: {
    width: 40,
    marginLeft: -5,
  },
  _textContainerStyle: {
    backgroundColor: Colors.transparent,
  },
  _textInputStyle: {
    color: Colors.white,
    height: 48,
  },

  _codeTextStyle: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.small,
    height: 20,
    color: Colors.white,
    marginLeft: -10,
  },
  alreadyHaveAnAccountCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    ...AppStyles.mTop20,
  },
  alreadyHaveAnAccountText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.text.primary,
  },
  signUpText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.small,
    color: Colors.text.tertiary,
  },
  tickIcon: {
    resizeMode: 'contain',
    height: 12,
    width: 12,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  termsAndCondIconSec: {
    height: 18,
    width: 19,
    borderRadius: 4,
    borderColor: Colors.white,
    borderWidth: 1,
    justifyContent: 'center',
  },
  linearGarMainView: {
    alignSelf: 'center',
    marginVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  LGstyles: {height: 2, alignItems: 'center'},
  LGView: {width: 100, height: 0.5},
  socailMainView: {flexDirection: 'row', alignSelf: 'center'},
  socailBtnView: {
    width: 60,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#37434c',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: Colors.white,
    borderWidth: 2,
    marginHorizontal: 10,
  },
});
