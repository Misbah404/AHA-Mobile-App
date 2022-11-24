// @flow
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text } from "../";
import { strings } from "../../constants";
import { Images, Colors, AppStyles } from "../../theme";
import styles from "./styles";

const AddNewPaymentComponent = props => {
  const { setIsNewPayment, isFromCart } = props;
  return (
    <View style={styles.addNewPaymentView}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => Actions.jump("stripe", { setIsNewPayment, isFromCart })}>
        <Text style={styles.addNewPaymentText}>
          {strings.ADD_NEW_PAYMENT}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => Actions.jump("stripe", { setIsNewPayment, isFromCart })}>
        <Image source={Images.addIcon} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

AddNewPaymentComponent.propTypes = {};
AddNewPaymentComponent.defaultProps = {};

export default AddNewPaymentComponent;
