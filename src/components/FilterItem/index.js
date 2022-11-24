// @flow
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text} from '../';
import {Images} from '../../theme';
import styles from './styles';

const FilterItem = props => {
  const {dataObj, onCrossIconPressHandlerCb} = props;
  const {item} = dataObj;
  const {title} = item;

  return (
    <View style={styles.container}>
      <Text
        style={styles.filterTextStyle}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        {title}
      </Text>
      <TouchableOpacity
        style={styles.crossIconCont}
        onPress={() => onCrossIconPressHandlerCb(item)}>
        <Image style={styles.crossIcon} source={Images.crossIconLight} />
      </TouchableOpacity>
    </View>
  );
};

FilterItem.propTypes = {
  onCrossIconPressHandlerCb: PropTypes.func.isRequired,
  dataObj: PropTypes.object.isRequired,
};
FilterItem.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(FilterItem);
