// @flow
import {StyleSheet} from 'react-native';
import {Fonts, Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  containerMian: {
    height: 220,
    borderTopRightRadius: 87,
    borderTopLeftRadius: 0,
    overflow: 'hidden',
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(11, 19, 25, 0.68)',
  },
  heading: {
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.normal,
  },
  suggestionText: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    color: Colors.text.white,
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.small,
  },

  relatedPostView: {
    borderWidth: 0.5,
    borderColor: Colors.black,
  },
  relatedImgViewFirstItem: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  seeMoreMainView: {
    width: 120,
    height: 151,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreInner: {
    width: 120,
    height: 151,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderView: {
    position: 'absolute',
    top: '40%',
    left: '50%',
  },
});
