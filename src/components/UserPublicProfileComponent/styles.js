// @flow
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
    fontSize: 22,
    fontFamily: Fonts.type.bold,
    color: Colors.text.white,
    marginTop: 10,
  },

  profileDescription: {
    fontSize: 14,
    fontFamily: Fonts.type.regular,
    color: Colors.text.white,
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderColor: Colors.white,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  followingButtonView: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderColor: Colors.white,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
    marginRight: 10,
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 3,
    ...AppStyles.centerInner,
  },

  selectedItemView: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 7,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  selectedItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: Colors.white,
  },
});
