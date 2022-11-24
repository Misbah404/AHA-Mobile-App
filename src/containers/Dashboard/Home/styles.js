// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../../theme';
import util from '../../../util';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    flex: 1,
  },
  headerCont: {
    ...AppStyles.flexRow,
    marginTop: util.isPlatformAndroid() ? 50 : 50,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  discoverAndFollowingText: {
    color: Colors.text.secondary,
    paddingHorizontal: 10,
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.medium,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  selectedTabText: {
    color: Colors.text.quaternary,
  },
  verticalLine: {
    color: Colors.text.quaternary,
    opacity: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  loaderStyle: {
    alignSelf: 'center',
    bottom: 50,
    position: 'absolute',
  },
  refreshLoaderStyle: {
    position: 'absolute',
    zIndex: 1,
    top: 100,
    alignSelf: 'center',
  },
  cartIcon: {top: 50, position: 'absolute', right: 20},
  cartCountView: {
    backgroundColor: Colors.background.purple,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.black,
    borderWidth: 2,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    position: 'absolute',
    bottom: 0,
    left: -5,
  },
  cartCountTxt: {
    fontSize: Fonts.size.xxxxSmall,
    color: Colors.white,
  },
  noDataFoundSec: {
    marginTop: 100,
  },
  ArrowView: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  bottomSheetContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.transparent,
    zIndex: 1,
  },
  uploadingPostSec: {
    top: 32,
    position: 'absolute',
    backgroundColor: Colors.appColorPurple,
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingLeft: 5,
    alignItems: 'center',
  },
  uploadingPostText: {
    color: Colors.text.primary,
    textAlign: 'center',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.small,
  },
});
