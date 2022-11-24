import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    height: Metrics.feedsHeight,
    backgroundColor: Colors.background.primary,
  },
  bottomViewCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    display: 'flex',
    width: Metrics.screenWidth,
    padding: 20,
    zIndex: 1,
  },
  profileTagAndDescripText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.semiBold,
    color: Colors.text.white,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  titleText: {
    fontSize: Fonts.size.small,
    left: 2,
  },
  verticalOptionsCont: {
    position: 'absolute',
    top: 0,
    right: 30,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  singleOptionCont: {
    width: 100,
    marginRight: -20,
  },
  optionIcon: {
    alignSelf: 'center',
    width: 38,
    height: 38,
  },
  title: {
    alignSelf: 'center',
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.xSmall,
    color: Colors.text.white,
    paddingVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  profileImage: {
    alignSelf: 'center',
    ...AppStyles.mBottom10,
  },
  singleOptionTextAndImgCont: {
    paddingVertical: 5,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    height: 130,
    width: '100%',
    zIndex: 1,
  },
  linearGradientBottom: {
    position: 'absolute',
    bottom: 0,
    height: 130,
    width: '100%',
    zIndex: 1,
  },
  videoButtonView: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
  videoButton: {
    width: 70,
    height: 70,
  },
  bottomDotsCont: {
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    marginBottom: 20,
    position: 'absolute',
  },
  feedCont: {
    width: Metrics.screenWidth,
  },
  videoSectionCont: {
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
  },
  videoView: {},
  postImageStyle: {
    flex: 1,
    resizeMode: 'contain',
  },
  imageLoadingStyle: {
    position: 'absolute',
    top: 50,
    bottom: 50,
    right: 50,
    left: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCollection: {
    marginLeft: 10,
    backgroundColor: Colors.background.purple,
    borderRadius: 6,
    textAlign: 'center',
    padding: 6,
    width:100
  },
  collectionTitleText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.small,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: -2,
  },
});
