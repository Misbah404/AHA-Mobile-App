import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background.primary,
    flex: 1,
  },

  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xxLarge,
  },
  phoneImgStyle: {
    alignSelf: 'center',
  },
  becomeArtistTxt: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.normal,

    paddingVertical: 10,
  },
  becomeArtistDescriptionTxt: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.xxSmall,

    color: Colors.text.white,
  },
  skipTxt: {
    color: Colors.white,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.Asap,
    fontWeight: '600',
  },
  becomeArtirtView: {
    width: 300,
    height: 130,
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 50,
    backgroundColor: Colors.background.imageBackgroundBecomeArtistOnboarding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  becomeArtirtInnerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  becomeArtistInnerImageView: {flex: 0.4, alignItems: 'center'},
  becomeArtistInnerImage: {height: 85, width: 85},
  becomeArtistInnerTxtView: {flex: 0.6, alignItems: 'flex-start'},
  becomeArtistClickView: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: -20,
    backgroundColor: Colors.background.imageBackgroundBecomeArtistOnboarding,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  becomeArtistInnerClickImage: {height: 12, width: 18},
  skipTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});
