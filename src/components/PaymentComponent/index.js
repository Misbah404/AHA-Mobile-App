// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '..';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const PaymentComponent = props => {
  const {
    item,
    selectedPaymentId,
    setSelectedPaymentId,
    isSecurityScreen,
    onDeleteIconPress,
    isCartConfimationScreen,
    isDefault,
  } = props;
  const {
    id,
    brand,
    complete,
    country,
    expiryMonth,
    expiryYear,
    last4,
    postalCode,
    cvc,
    isSelected,
  } = item;

  const isCardExpir = util.checkCardExpired(expiryMonth, expiryYear);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        isCardExpir
          ? {
              backgroundColor: Colors.background.red,
            }
          : {},
      ]}
      onPress={() => {
        !isCardExpir
          ? isDefault
            ? !!!isSelected && setSelectedPaymentId(id)
            : setSelectedPaymentId(id)
          : {};
      }}>
      {!isCardExpir && (
        <View style={styles.radioBoxMainView}>
          <View style={styles.radioBoxView}>
            {isDefault
              ? !!isSelected && <View style={styles.radioBox} />
              : selectedPaymentId === id && <View style={styles.radioBox} />}
          </View>
        </View>
      )}
      <View style={[AppStyles.mBottom10, AppStyles.mBottom0]}>
        <Image
          source={util.getCreditCardImage(brand)}
          style={styles.cardIcon}
        />
      </View>
      <View style={[styles.view]}>
        <View style={[AppStyles.mLeft5]}>
          <Text style={styles.cardNumber}>{`**** **** **** ${last4}`}</Text>
        </View>
      </View>

      {!!isSecurityScreen && (
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onDeleteIconPress(id)}>
            <Image source={Images.deleteIcon} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

PaymentComponent.propTypes = {
  isSecurityScreen: PropTypes.bool,
  onDeleteIconPress: PropTypes.func,
  setSelectedPaymentId: PropTypes.func,
};

PaymentComponent.defaultProps = {
  isSecurityScreen: false,
  onDeleteIconPress: Function(),
  setSelectedPaymentId: Function(),
};

export default PaymentComponent;
