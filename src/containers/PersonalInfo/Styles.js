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
  mainCont: {},
  phoneImgStyle: {
    alignSelf: 'center',
  },
  submitArrowCont: {
    // marginVertical: 100
    marginTop: 100,
  },
  enterYourEmailText: {
    alignSelf: 'center',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.large,
    paddingVertical: 30,
  },
});
