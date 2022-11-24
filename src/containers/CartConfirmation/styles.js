import { StyleSheet } from "react-native";
import { Colors, AppStyles, Fonts } from "../../theme";

// commit

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  containerAddress: {
    backgroundColor: Colors.background.darkBlue,
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 10
  },

  addressView: {
    paddingHorizontal: 20,
    marginTop: 25
  },

  view: {
    flex: 2
  },

  radioBoxMainView: {
    flexDirection: "row",

    justifyContent: "flex-start",
    alignItems: "center"
  },
  radioBox: {
    height: 13,
    width: 13,
    backgroundColor: "white",
    borderRadius: 50
  },
  heading: {
    fontWeight: "500",
    fontSize: Fonts.size.normal,
    color: Colors.white
  },
  description: {
    fontWeight: "400",
    fontSize: Fonts.size.xxSmall,
    lineHeight: 18,
    color: Colors.white
  },

  radioBoxView: {
    borderColor: Colors.white,
    borderRadius: 50,
    borderWidth: 1,
    height: 20,
    width: 20,
    marginRight: 10,
    ...AppStyles.centerInner
  },
  address: {
    color: Colors.text.primary,
    fontSize: Fonts.size.medium,
    fontWeight: "700",
    paddingLeft: 5
  },

  paymentView: {
    paddingHorizontal: 20,
    marginTop: 30
  },

  payment: {
    color: Colors.text.primary,
    fontSize: Fonts.size.medium,
    fontWeight: "700",
    paddingLeft: 5
  },

  totalPriceView: {
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    marginBottom: 20
  }
});
