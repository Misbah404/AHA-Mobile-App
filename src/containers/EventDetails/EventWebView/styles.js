// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  childCont: {
    paddingHorizontal: 20,
    flex: 1,
  },
  loaderViewSec: {
    top: '40%',
  },
  unableToGetUrlText: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Asap,
    color: Colors.text.primary,
    justifyContent: 'center',
    marginTop: 20,
  },
  verificationInProgressCont: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  verifyingBankAccountText: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Asap,
    color: Colors.text.primary,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.white,
    height: '100%',
    width: '100%',
  },
});
