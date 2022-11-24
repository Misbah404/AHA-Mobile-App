// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '..';
import {appDefaultData, strings} from '../../constants';
import util from '../../util';
import styles from './styles';

const OrderHistoryComponent = props => {
  const {
    item,
    isOrderHistory,
    isConfirmationScreen,
    setOrderHistoryVisible,
    isOrderHistoryVisible,
    orderButtonPressHandler,
  } = props;
  const {
    description,
    price,
    thumbnail,
    id,
    art_id,
    product_count,
    shipment_charges,
    total,
    title,
    status,
    hasMultipleProducts,
    order_id,
  } = item || {};

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          !isOrderHistory && orderButtonPressHandler(id, order_id, art_id);
          isOrderHistory && orderButtonPressHandler(id);
        }}
        style={[
          styles.container,
          !isOrderHistory && !isConfirmationScreen && styles.containerQuantity,
        ]}>
        <View style={[styles.CartView]}>
          <View>
            <Image
              source={{uri: thumbnail}}
              style={{height: 69, width: 69, borderRadius: 17}}
            />

            {!!hasMultipleProducts && (
              <View style={styles.numberOfProductView}>
                <View style={styles.numberOfProduct}>
                  <Text style={styles.numberOfProductText}>
                    {util.numberCount(product_count)}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.CartViewTextView}>
            <Text style={styles.CartViewHeading}>
              {appDefaultData.currency.symbol}
              {total}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.CartViewText}>
              {!!hasMultipleProducts ? strings.MULTIPLE_PRODUCT : title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

OrderHistoryComponent.propTypes = {
  isOrderHistory: PropTypes.bool,
  isConfirmationScreen: PropTypes.bool,
  isOrderHistoryVisible: PropTypes.bool,
  setOrderHistoryVisible: PropTypes.func,
};

OrderHistoryComponent.defaultProps = {
  isOrderHistory: false,
  isConfirmationScreen: false,
  isOrderHistoryVisible: false,
  setOrderHistoryVisible: () => {},
};

export default OrderHistoryComponent;
