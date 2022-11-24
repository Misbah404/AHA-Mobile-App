import { StyleSheet } from "react-native";
import { AppStyles, Colors, Fonts } from "../../theme";
import util from "../../util";
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    flexGrow: 1,
    flex: 1
  },
  navbarText: {
    textAlign: "center"
  },
  userProfileView: {
    alignItems: "center",
    ...AppStyles.paddingHorizontalBase,
    ...AppStyles.pBottom10,
    ...AppStyles.mTop10
  },
  userNameText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xxLarge,
    color: Colors.text.white,
    flex: 1,
    marginRight: 10
  },
  plusIcon: {
    position: "absolute",
    width: 18,
    height: 18,
    bottom: 1,
    right: 22
  },

  userProfileImg: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: Colors.white,
    borderWidth: 1
  },
  editImgIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  plusText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.xLarge,
    color: Colors.white,
    alignContent: "center",
    flex: 1,
    top: util.isPlatformAndroid() ? -2 : -1
  },
  editProfileImgBtn: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: Colors.appColorPurple,
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
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
  termAndConditionView: {
    flexDirection: "row",
    width: 20
  },
  termAndCondition: {
    fontSize: 11,
    color: Colors.text.white
  },
  buttonView: {
    ...AppStyles.mTop60,
    ...AppStyles.mBottom40,
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  button: {
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 50,
    paddingVertical: 10,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.bold_italic,
    color: Colors.text.white,
    borderRadius: 4
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xxLarge
  },
  searchView: {
    ...AppStyles.mTop15
  },
  textInputCont: {
    paddingTop: 10,
    marginTop: 20,
    paddingHorizontal: 5,
    flexGrow: 1,
    flex: 1
  },
  searchText: {
    fontSize: Fonts.size.normal,
    paddingHorizontal: 5,
    color: Colors.text.primary
  },
  borderLine: {
    borderBottomColor: Colors.border.secondary,
    borderBottomWidth: 1,
    opacity: 0.2,
    ...AppStyles.pTop10,
    ...AppStyles.mRight10
  },
  profileDashedView: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    alignSelf: "center"
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  profileTxtView: { marginTop: 20, alignItems: "center" },
  uploadImageTxt: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.normal,
    color: Colors.white,
    fontWeight: "500"
  },
  profileTxtMin: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.small,
    color: Colors.text.lineText,
    marginTop: 5,
    fontWeight: "300"
  },
  imageLoader: {
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50,
    top: 50
  }
});
