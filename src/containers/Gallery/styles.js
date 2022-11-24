import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  button: {
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 4,
  },

  buttonView: {
    alignItems: 'center',
  },

  cameraIconView: {
    width: '33.33%',
    backgroundColor: '#D8D8DD',
    ...AppStyles.centerInner,
  },

  navbarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: util.isPlatformAndroid() ? 35 : 0,
    paddingBottom: 15,
    backgroundColor: Colors.background.primary,
  },

  cancelButton: {
    color: Colors.text.white,
    fontSize: 16,
    fontFamily: Fonts.type.regular,
  },

  recentButton: {
    color: Colors.text.white,
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    marginRight: 13,
  },

  nextButton: {
    color: Colors.text.white,
    fontSize: 16,
    fontFamily: Fonts.type.bold,
  },

  rightIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  countView: {
    backgroundColor: Colors.blue,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    top: 4,
    right: 4,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  countTxt: {color: 'white', fontSize: 12, fontWeight: 'bold'},
  videoPlayIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 50,
    bottom: 50,
    right: 50,
    left: 50,
    zIndex: 1,
  },
  pleaseAllowPermissionText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.medium,
    color: Colors.grey2,
    textAlign: 'center',
    ...AppStyles.marginHorizontalBase,
    ...AppStyles.marginVerticalBase,
  },
  permissionTextCont: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  appInfoText: {
    textDecorationLine: 'underline',
    ...AppStyles.mLeft10,
  },
  listContainerStyle: {
    ...AppStyles.pBottom100,
  },
  footLoaderView: {alignItems: 'center', height: 30, marginTop: 20},
  bottomSheetContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  downArrowImg: {
    height: 15,
    width: 11,
    resizeMode: 'contain',
    marginLeft: -5,
  },
  viewManage: {
    height: 50,
    backgroundColor: '#253340',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtmanageHeader: {
    marginLeft: 10,
    color: Colors.white,
    fontFamily: Fonts.type.regular,
    paddingRight: 20,
  },
  txtManage: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  grandIssueTxtManage: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
  },
});
