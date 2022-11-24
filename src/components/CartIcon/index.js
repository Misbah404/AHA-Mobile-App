// @flow
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Text} from '../';
import {Images} from '../../theme';
import styles from './styles';

const CartIcon = props => {
  const {myCartList} = props;
  const [sumOfQuantity, setSumOfQuantity] = useState(() => 0);

  useEffect(() => {
    let quantity = 0;
    myCartList.forEach(element => {
      quantity += element.quantity;
    });
    setSumOfQuantity(quantity);
  }, [myCartList]);

  return (
    <TouchableOpacity
      onPress={() => Actions.jump('cart')}
      style={styles.cartIcon}>
      <Image source={Images.cartIcon} resizeMode={'contain'} />
      <View style={styles.cartCountView}>
        <Text style={styles.cartCountTxt}>{sumOfQuantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

CartIcon.propTypes = {};
CartIcon.defaultProps = {};

const mapStateToProps = ({cart}) => ({
  myCartList: cart.myCartList,
});
export default connect(mapStateToProps, null)(CartIcon);
