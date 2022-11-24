// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  verticalOptionsCont: {
    position: 'absolute',
    top: Metrics.screenHeight - (Metrics.screenHeight * 70) / 100,
    right: 30,
    bottom: 0,
  },
  singleOptionCont: {
    width: 100,
    marginRight: -20,
  },
  profileImage: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    ...AppStyles.mBottom10,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  singleOptionTextAndImgCont: {
    paddingVertical: 5,
  },
  optionIcon: {
    alignSelf: 'center',
    width: 27,
    height: 35,
    resizeMode: 'contain',
  },
  title: {
    alignSelf: 'center',
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.xSmall,
    color: Colors.text.white,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  deleteAndBuyIcon: {
    alignSelf: 'center',
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  soldOutIcon: {
    alignSelf: 'center',
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  buyIcon: {
    alignSelf: 'center',
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  supportArtistIcon: {
    alignSelf: 'center',
    width: 40,
    height: 50,
    resizeMode: 'cover',
  },
});
