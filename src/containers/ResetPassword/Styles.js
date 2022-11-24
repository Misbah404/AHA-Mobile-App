import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background.primary,
    flex:1
  },
  textInputCont: {
    paddingHorizontal: 25,
    flexGrow: 1,
    ...AppStyles.mTop30,
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
  submitArrowCont: {
    marginTop: 70,
  },
});
