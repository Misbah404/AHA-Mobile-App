// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  profilePicView: {
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 30,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.white,
  },

  profileName: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.bold,
    color: Colors.text.white,
    marginTop: 5,
    marginHorizontal: 10,
    textAlign: 'center',
    opacity: 1,
  },

  profileDescription: {
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.regular,
    color: Colors.text.white,
    marginTop: 5,
    marginHorizontal: 10,
    textAlign: 'center',
  },

  followView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },

  followingView: {
    alignItems: 'center',
  },

  followerView: {
    alignItems: 'center',
  },

  followText: {
    fontSize: 17,
    color: Colors.text.white,
    fontFamily: Fonts.type.bold,
  },

  follow: {
    fontSize: 17,
    color: Colors.text.white,
    fontFamily: Fonts.type.bold,
  },
  buttonView: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderColor: Colors.white,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 4,
    width: 150,
  },
  followBtnStyle: {
    backgroundColor: Colors.background.purple,
    borderColor: Colors.white,
    paddingVertical: 12,
    borderRadius: 2,
    width: 150,
  },
  button: {
    color: Colors.text.white,
    fontSize: 15,
    fontFamily: Fonts.type.bold_italic,
    borderRadius: 2,
    textAlign: 'center',
  },

  editButtonView: {
    alignItems: 'center',
    marginTop: 10,
  },

  buttonArtistView: {
    color: Colors.text.white,
    fontSize: 15,
    fontFamily: Fonts.type.bold_italic,
    borderRadius: 2,
    paddingHorizontal: 30,
    textAlign: 'center',
  },

  socialMediaMainView: {
    justifyContent: 'center',
    ...AppStyles.mTop10,
    ...AppStyles.flexRow,
    ...AppStyles.alignItemsCenter,
  },

  socialMediaView: {
    width: 44,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 3,
    ...AppStyles.centerInner,
  },
  imageLoadingStyle: {
    position: 'absolute',
    top: 40,
    bottom: 0,
  },
});
