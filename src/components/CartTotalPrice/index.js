// @flow
import _ from 'lodash';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes, {number} from 'prop-types';
import {Text} from '..';
import {Fonts, Colors} from '../../theme';
import styles from './styles';
import {strings} from '../../constants';
import util from '../../util';

const CartTotalPrice = props => {
  const {buttonText, totalPrice, subTotalPrice, ButtonPress, shipment} = props;

  return (
    <View style={styles.container}>
      {subTotalPrice && (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.subTotalText}>{strings.SUB_TOTAL} :</Text>
          <Text style={styles.subTotalValue}>{`$${subTotalPrice}`}</Text>
        </View>
      )}
      {totalPrice && (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subTotalText}>{strings.SHIPMENT} :</Text>
            <Text style={styles.subTotalValue}>{`$${
              !util.areValuesEqual(shipment, 0)
                ? Number(shipment)?.toFixed(2)
                : 0
            }`}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subTotalText}>{strings.TOTAL} :</Text>
            <Text style={styles.subTotalValue}>{`$${totalPrice}`}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.buttonView} onPress={ButtonPress}>
        <Text style={{fontSize: 17, fontFamily: Fonts.type.bold}}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

CartTotalPrice.propTypes = {
  buttonText: PropTypes.string.isRequired,
  ButtonPress: PropTypes.func.isRequired,
};

CartTotalPrice.defaultProps = {};

export default CartTotalPrice;
