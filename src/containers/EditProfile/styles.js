import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    flexGrow: 1,
  },
  mainContSec: {
    backgroundColor: Colors.background.primary,
    flex: 1,
  },
  profileImageView: {
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  profileImageCont: {
    height: 97,
    width: 97,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
  },
  profileImage: {
    height: 95,
    width: 95,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  textInputMainView: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#8F92A1',
    color: Colors.text.white,
  },
  textInputLabel: {
    color: '#A2A5B8',
  },
  socialLinkHeading: {
    color: Colors.text.white,
    fontSize: 17,
    fontFamily: Fonts.type.semiBold,
    marginTop: 30,
    marginBottom: 40,
  },
  editProfileImgBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.appColorPurple,
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  editImgIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  imageLoader: {
    alignSelf: 'center',
    position: 'absolute',
    top: 50,
    bottom: 50,
  },
  addressFormText: {
    color: Colors.white,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.bold
  },
  addressText: {
    color: Colors.text.becomeAnArtist,
    fontSize: Fonts.size.xSmall
  },
  addressTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#2d3945",
    fontSize: Fonts.size.small,
    color: Colors.text.white,
    paddingVertical: 10
  },
});
