// @flow
import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    ...AppStyles.flexRow,
    ...AppStyles.paddingHorizontalBase,
    margin: Metrics.baseMargin,
  },
  image: {
    height: 47,
    width: 47,
    borderRadius: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  textCont: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    flex: 2,
  },
  profileName: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.small,
  },
  profileTag: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.xxSmall,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.background.purple,
    height: 32,
    width: 110,
    borderRadius: 2,
    alignSelf: 'center',
  },
  buttonSelected: {
    backgroundColor: '#0B1319',
    height: 32,
    width: 110,
    borderRadius: 2,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: Fonts.type.semiBold_italic,
    fontSize: Fonts.size.normal,
  },
});
