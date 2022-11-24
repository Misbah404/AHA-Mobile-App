// @flow
import { StyleSheet } from "react-native";
import { Fonts, Colors } from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    backgroundColor: Colors.navbar.background
  },
  title: {
    marginHorizontal: 16,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.medium,
    color: Colors.navbar.text,
    fontWeight: "normal"
  }
});
