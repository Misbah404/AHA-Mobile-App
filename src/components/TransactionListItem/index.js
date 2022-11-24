// @flow
import PropTypes from "prop-types";
import React from "react";
import { Image, View } from "react-native";
import { Text } from "../";
import { strings } from "../../constants";
import { Images } from "../../theme";
import util from "../../util";
import styles from "./styles";

const TransactionListItem = props => {
  const { _item } = props || {};
  const {
    id,
    title,
    amount,
    hasMultipleProducts,
    order_date,
    transactionDateTime
  } = _item;
  return (
    <View style={styles.recentTransactionMainView}>
      <Image source={Images.recentTransactionIcon} resizeMode={"contain"} />

      <View style={styles.recentTransactionView}>
        <View>
          <Text style={styles.title}>
            {!!hasMultipleProducts ? strings.MULTIPLE_PRODUCT : title}
          </Text>
          <Text style={styles.date}>
            {util.getDateAndTimeText(order_date)}
          </Text>
        </View>
        <View>
          <Text style={styles.amount}>
            ${amount}
          </Text>
        </View>
      </View>
    </View>
  );
};
TransactionListItem.propTypes = {
  _item: PropTypes.object.isRequired
};
TransactionListItem.defaultProps = {};

export default TransactionListItem;
