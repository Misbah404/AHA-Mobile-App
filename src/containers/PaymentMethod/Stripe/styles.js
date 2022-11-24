// @flow
import { StyleSheet } from "react-native";
import { Fonts, AppStyles, Colors } from "../../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    flex: 1,
    paddingTop: 50
  },
  addCardBtn: {
    backgroundColor: "rgba(114,52,249,1)",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 150,
    height: 50
  },
  disabledViewStyle: {
    backgroundColor: "rgba(114,52,249,0.7)"
  },
  buttonView: {
    backgroundColor: Colors.background.purple,
    width: "40%",
    paddingVertical: 10,
    borderRadius: 10,
    ...AppStyles.centerInner
  },
  addCardText: {
    color: Colors.text.primary,
    fontFamily: Fonts.type.Asap,

    fontSize: Fonts.size.medium,
    alignSelf: "center"
  },
  loaderSec: {
    flex: 1,
    alignSelf: "center",
    marginTop: 5
  },
  cardForm: {
    height: 200,
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: Colors.white
  },
  addCardText: {
    fontSize: 17,
    fontFamily: Fonts.type.bold
  },
  addToCardButton: {
    backgroundColor: Colors.text.purple,
    borderRadius: 4,
    marginTop: 20,
    width: "40%",
    alignSelf: "center"
  },
  stripeInputCont: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 15
  }
});
