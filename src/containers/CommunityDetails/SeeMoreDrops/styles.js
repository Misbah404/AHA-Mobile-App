// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../../theme';
import util from '../../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  coverImage: {
    backgroundColor: Colors.background.primary,
    height: Metrics.screenHeight - (Metrics.screenHeight * 70) / 100,
  },
  imageStyle: {
    borderRadius: 30,
  },
  bottomViewCont: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  detailsText: {
    fontSize: Fonts.size.xLarge,
    fontFamily: Fonts.type.bold,
    color: Colors.text.white,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    alignSelf: 'center',
    width: Metrics.screenWidth - (Metrics.screenWidth * 30) / 100,
  },
  subDetailsText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.small,
    marginTop: 3,
    fontStyle: 'italic',
  },
  dropsSection: {
    ...AppStyles.mTop20,
    ...AppStyles.mBottom20,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  fireIcon: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
  },
  newDropsText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.small,
    color: Colors.text.quaternary,
    ...AppStyles.mLeft5,
    bottom: util.isPlatformAndroid() ? 2 : 1,
  },
  dropsListCont: {
    flex: 1,
    marginHorizontal: 15,
    ...AppStyles.mBottom10,
  },
  noCollectionFoundText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.normal,
    color: Colors.text.primary,
    alignSelf: 'center',
    ...AppStyles.mTop20,
  },
});
