// @flow
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Text} from '../';
import {strings} from '../../constants';
import {Images} from '../../theme';
import styles from './styles';

const AddNewBank = () => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Actions.addBank()}>
      <Image source={Images.bankAccount} style={styles.bankAccountIcon} />
      <Text style={styles.addNewBankText}>{strings.ADD_NEW_BANK}</Text>
      <Image source={Images.rightArrowIcon} style={styles.rightIcon} />
    </TouchableOpacity>
  );
};

AddNewBank.propTypes = {};
AddNewBank.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(AddNewBank);
