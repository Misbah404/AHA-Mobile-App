import { StyleSheet } from "react-native";
import { AppStyles, Colors, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    height: 75,
    width: "95%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    borderStyle: "dashed",
    alignSelf: "center",
    ...AppStyles.paddingHorizontalBase,
    ...AppStyles.flexRow
  },
  imageStyleCont: {
    height: 52,
    width: 52,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: Colors.white,
    alignSelf: "center"
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
    alignSelf: "center",
    top: 0.3
  },
  uploadTextStyle: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.normal,
    lineHeight: 18.34,
    color: Colors.text.primary,
    alignSelf: "center",
    ...AppStyles.mLeft15
  },
  plusIconContStyle: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  plusIconStyle: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  imageLoader: {
    alignSelf: "center",
    position: "absolute",
    height: 50
  }
});
