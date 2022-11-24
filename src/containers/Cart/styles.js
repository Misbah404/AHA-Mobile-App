import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../theme";

// commit

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },

  cartItemListView: {
    flex: 1.5,
    marginTop: 0,
    paddingTop: 0
  },

  amountView: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 20
  },

  clearCartTextView: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  clearCartText: {
    padding: 5,
    color: Colors.text.primary,
    fontSize: 15,
    fontWeight: "700",
    flexDirection: "row"
  },

  underline: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },

  totalAmountView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15
  },

  product: {
    color: Colors.text.primary,
    fontWeight: "700",
    fontSize: 18
  },

  shipment: {
    color: Colors.text.primary,
    fontWeight: "700",
    fontSize: 18
  },

  total: {
    color: Colors.text.primary,
    fontWeight: "700",
    fontSize: 18
  },

  amount: {
    color: Colors.text.primary,
    fontWeight: "700",
    fontSize: 18
  },

  buttonView: {
    alignItems: "center",
    marginTop: 20
  },

  button: {
    backgroundColor: "#7234F9",
    width: "45%",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 4,
    marginBottom: 20
  },

  buttonText: {
    color: Colors.text.primary,
    fontSize: 17,
    fontFamily: Fonts.type.bold
  },

  hiddenItemMainView: {
    flexDirection: "row",
    height: 100,
    width: 120,
    right: 0
  },

  hiddenItemView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C00000",
    width: "100%"
  },

  hiddenItem: {
    color: Colors.text.primary,
    fontWeight: "700",
    fontSize: 16
  },
  cartListEmptyTxt: { color: Colors.white, marginTop: 20 },
  cartListEmptyView: { justifyContent: "center", alignItems: "center" }
});
