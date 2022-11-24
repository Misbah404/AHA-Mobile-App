import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  profilePicView: {
    alignItems: 'center',
    marginTop: 10,
  },

  profilePic: {
    height: 97,
    width: 97,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.white,
  },

  profileName: {
    fontSize: 17,
    fontFamily: Fonts.type.bold,
    color: Colors.text.white,
    marginTop: 10,
  },

  profileDescription: {
    fontSize: 14,
    fontFamily: Fonts.type.regular,
    color: Colors.text.gray,
    marginTop: 8,
  },

  followView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 25,
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
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 4,
  },

  button: {
    color: Colors.text.white,
    fontSize: 15,
    fontFamily: Fonts.type.bold_italic,
    borderRadius: 2,
  },

  socialMediaMainView: {
    justifyContent: 'center',
    ...AppStyles.mTop15,
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

  tabbarMainView: {
    marginTop: 40,
    paddingVertical: 5,
    marginBottom: 15,
  },

  tabbarView: {
    paddingBottom: 10,
    width: 40,
    paddingHorizontal: 30,

    ...AppStyles.centerInner,
  },

  tabbarViewSelected: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: 40,
    paddingHorizontal: 30,
    paddingBottom: 15,
    ...AppStyles.centerInner,
  },

  navbarText: {
    textAlign: 'center',
    marginRight: -20,
  },

  collectionNameView: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    paddingVertical: 15,
  },

  collectionName: {
    color: Colors.text.white,
    fontSize: 17,
    fontFamily: Fonts.type.bold,
  },
});
