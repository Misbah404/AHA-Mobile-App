import { StyleSheet } from "react-native";
import { AppStyles, Colors, Fonts } from "../../theme";

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
    flexDirection: "row",
    justifyContent: "space-between",
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
  userProfileImg: {
    height: 31,
    width: 31,
    borderRadius: 50,
    borderColor: Colors.white,
    borderWidth: 1
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
    fontSize: Fonts.size.xSmall,
    color: Colors.text.becomeAnArtist
  },
  searchView: {
    ...AppStyles.mTop15
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
  termsAndConditionText: {
    color: Colors.text.primary,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.xxSmall,
  },
  termsAndCondIconSec: {
    height: 18,
    width: 19,
    borderRadius: 4,
    borderColor: Colors.white,
    borderWidth: 1,
    justifyContent: 'center',
    top: -1,
  },
  tickIcon: {
    resizeMode: 'contain',
    height: 12,
    width: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    top: -1,
  },
  iAgreeText: {
    paddingLeft: 5,
  },
  termsAndConditionTextUnderline: {
    textDecorationLine: 'underline',
  },
});
