import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background.primary,
    flex: 1,
  },
  textInputCont: {
    paddingTop: 10,
    paddingHorizontal: 25,
    flexGrow: 1,
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
  mainCont: {},
  phoneImgStyle: {
    alignSelf: 'center',
  },
  submitArrowCont: {
    marginTop: 50,
    paddingVertical: 30,
  },
  enterYourEmailText: {
    alignSelf: 'center',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.large,
    paddingVertical: 30,
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
});
