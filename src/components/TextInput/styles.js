// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.text.secondary,
    ...AppStyles.mTop10
  },
  input: {
    borderColor: Colors.grey1,
    borderBottomWidth: 1,
    borderRadius: Metrics.borderRadius,
    padding: 12,

    marginTop: 3,
    fontFamily: Fonts.type.regular,
    color: Colors.text.primary,
    fontSize: Fonts.size.small
  },
  buttonOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: "center"
  },
  leftButtonOverlay: {
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 0,
    justifyContent: "center"
  },
  arrowIcon: {
    width: 13,
    height: 18,
    ...AppStyles.mRight10,
    tintColor: Colors.background.imageTintColorTwo,
    resizeMode: "contain"
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: "top"
  },
  horizontalPadding: {
    paddingHorizontal: 30
  }
});
