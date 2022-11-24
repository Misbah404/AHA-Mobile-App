// @flow
import _ from 'lodash';
import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {QuantityInput, Text} from '..';
import {Fonts, Colors, Images} from '../../theme';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {updateQuantityByIdAfterAddToCart} from '../../actions/DashboardActions'
import {appDefaultData} from '../../constants';
import util from '../../util';


const CartItem = props => {
  const {item,isOrderHistory,updateQuantity, isConfirmationScreen} = props;
  const {quantity,id, price, size, description, maxQuantity,thumbnail, title} = item || {};
  function updateQuantityFunction(quantity) {
    updateQuantity(item,quantity)
   
  }
 
  return (
    <View
      style={[
        styles.container,
        !isOrderHistory && !isConfirmationScreen && styles.containerQuantity,
      ]}>
      <View style={[styles.CartView]}>
        <Image
          source={util.isValidURL(thumbnail) ?{uri:thumbnail} :{}}
          style={{height: 69, width: 69, borderRadius: 17}}
        />

        <View style={styles.CartViewTextView}>
          <Text style={styles.CartViewHeading}>
            {appDefaultData.currency.symbol}
            {price}
          </Text>
          <Text numberOfLines={2} ellipsizeMode='tail' style={styles.CartViewText}>{title}</Text>
        </View>
      </View>

      <View
        style={[
          styles.sizeAndQuantityView,
          isOrderHistory && styles.sizeAndQuantityViewOrderHistory,
        ]}>
       { !util.isEmptyValue(size) && <View style={styles.sizeView}>
          <Text style={styles.size}>{size}</Text>
        </View>}
        {!isOrderHistory && !isConfirmationScreen && (
          <View style={styles.quantityContainer}>
            <QuantityInput 
             maxQuantity={maxQuantity}
             incomingQuantity={quantity} 
             handleChangeQuantity={updateQuantityFunction} 
              />
          </View>
        )}
        {isOrderHistory && <Text style={styles.status}>{status}</Text>}
        {isConfirmationScreen && (
          <View style={styles.confirmationScreenQuantityView}>
            <Text style={styles.confirmationScreenQuantityNum}>{quantity}</Text>
            <Text style={styles.confirmationScreenQuantity}>Quantity</Text>
          </View>
        )}
      </View>
    </View>
  );
};

CartItem.propTypes = {
  isOrderHistory: PropTypes.bool,
  isConfirmationScreen: PropTypes.bool,
};

CartItem.defaultProps = {
  isOrderHistory: false,
  isConfirmationScreen: false,
};

export default CartItem;
