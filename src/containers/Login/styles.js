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
  textInputCont: {
    marginTop: Metrics.smallMargin,
    paddingHorizontal: 20,
  },
  dontHaveAnAccountCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...AppStyles.mTop10,
    ...AppStyles.mBottom20,
  },
  dontHaveAnAccountText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.text.primary,
  },
  signUpText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.small,
    color: Colors.text.tertiary,
  },
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
    width: '98%',
    height: 48,
    marginTop: 70,
  },
  _codeTextStyle: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.small,
    height: 20,
    color: Colors.white,
    marginLeft: -10,
  },
  _flagStyle: {
    width: 40,
    marginLeft: -5,
  },
  _textInputStyle: {
    color: Colors.white,
    height: 48,
  },
  _textContainerStyle: {
    backgroundColor: Colors.transparent,
  },
  horizontalLine: {
    width: 100,
    height: 2,
    backgroundColor: Colors.border.primary,
  },
  circle: {
    height: 68,
    width: 68,
    borderColor: Colors.border.primary,
    borderWidth: 4,
    borderRadius: 40,
    backgroundColor: Colors.appColorPurple,
  },
  arrowIconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loginButtonSec: {
    marginTop: 30,
  },
  forgotPassText: {
    paddingVertical: 10,
    color: Colors.text.secondary,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
  },
  forgotPassTextCont: {
    alignSelf: 'flex-end',
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
  selectedTypeBtn: {
    width: 158,
    height: 54,
    zIndex: 999,
  },
  selectedImgType: {
    width: 158,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTxtSelected: {
    fontFamily: Fonts.type.italic,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  typeTxtUnselected: {
    fontFamily: Fonts.type.Asap,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.graybrown,
  },
  selectedTypeView: {alignItems: 'center', zIndex: 999},
  selectedTypeTxt: {marginHorizontal: 10, fontFamily: Fonts.type.Asap},
  mainViewSelectBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 304,
  },

  unSelectedBtnView: {
    width: 180,
    height: 53,
    marginRight: -32,
  },
  unSelectedBtnViewLeft: {
    width: 158,
    height: 54,
    marginLeft: -32,
  },
  unSelectedImg: {
    width: 180,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {color: Colors.text.lightGray2, fontWeight: '400'},
});
