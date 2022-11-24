import { StyleSheet } from "react-native";
import { AppStyles, Colors, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 20,
    paddingBottom: 80
  },

  payment: {
    color: Colors.text.primary,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    paddingLeft: 5,
    marginTop: 15
  },

  addNewPaymentText: {
    color: Colors.text.primary,
    fontSize: 13,
    fontFamily: Fonts.type.bold
  },

  addNewPaymentView: {
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.mTop10,
    paddingHorizontal: 5
  },

  changeEmailText: {
    fontFamily: Fonts.type.bold,
    fontSize: 18,
    flex: 0.98,
    color: Colors.text.white
  },

  textInputView: {
    paddingHorizontal: 5
  },

  textInputLabel: {
    fontSize: 14,
    color: "#A2A5B8"
  },

  buttonView: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40
  },

  button: {
    color: Colors.text.white,
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 4,
    fontSize: 17,
    fontFamily: Fonts.type.bold_italic
  },
  passwordSubmitBtnTxt: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  },
  circle: {
    height: 30,
    width: 30,
    borderColor: Colors.border.primary,
    borderWidth: 1.3,
    borderRadius: 40,
    backgroundColor: Colors.appColorPurple,
    alignItems: "center",
    justifyContent: "center",
    ...AppStyles.mTop20
  },
  arrowIconStyle: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    height: 13,
    width: 13
  }
});
