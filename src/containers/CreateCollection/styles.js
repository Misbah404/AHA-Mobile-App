import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 20,
  },
  labelStyle: {
    fontSize: 14,
    color: '#A2A5B8',
  },
  privacyMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...AppStyles.mTop20,
  },
  privacyView: {
    backgroundColor: '#2B2A2F',
    width: '47%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  privacyViewSelected: {
    backgroundColor: Colors.background.purple,
  },
  privacyText: {
    color: 'rgba(255,255,255,0.5)',
  },
  privacyTextSelected: {
    color: Colors.text.white,
  },
  buttonView: {
    marginVertical: 80,
    alignSelf: 'center',
    width: 250,
  },
  button: {
    backgroundColor: Colors.background.purple,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  buttonText: {
    color: Colors.text.white,
    fontSize: 17,
    fontFamily: Fonts.type.bold_italic,
  },
  title: {
    fontSize: Fonts.size.xSmall,
    color: Colors.text.becomeAnArtist,
  },
  searchView: {
    ...AppStyles.mTop10,
  },
  searchText: {
    fontSize: Fonts.size.normal,
    paddingHorizontal: 5,
    color: Colors.text.primary,
  },
  borderLine: {
    borderBottomColor: Colors.border.secondary,
    borderBottomWidth: 1,
    opacity: 0.8,
    ...AppStyles.pTop10,
  },
  profileImageView: {
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  profileImageCont: {
    height: 97,
    width: 97,
    borderRadius: 100,

    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  profileImage: {
    height: 95,
    width: 95,
    borderRadius: 50,
    resizeMode: 'cover',
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
    height: 77,
  },
  errorText: {
    color: Colors.red,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Asap,
    ...AppStyles.mTop5,
  },
  plusText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.xLarge,
    color: Colors.white,
    alignContent: 'center',
    flex: 1,
    top: util.isPlatformAndroid() ? -2 : -1,
  },
});
