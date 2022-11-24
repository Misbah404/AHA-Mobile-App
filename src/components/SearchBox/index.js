// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import styles from './styles';

const SearchBox = props => {
  const {_value, _onTextChange} = props;
  return (
    <View style={styles.textInputView}>
      <Image source={Images.searchIcon} style={styles.icon} />
      <TextInput
        style={styles.textInput}
        placeholder={strings.SEARCH}
        placeholderTextColor={Colors.text.primary}
        selectionColor={Colors.text.primary}
        value={_value}
        onChangeText={val => {
          _onTextChange(val);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          _onTextChange('');
        }}
        style={styles.crossIconCont}>
        <Image source={Images.crossIcon} style={styles.crossIcon} />
      </TouchableOpacity>
    </View>
  );
};

SearchBox.propTypes = {
  _value: PropTypes.string.isRequired,
  _onTextChange: PropTypes.func.isRequired,
};
SearchBox.defaultProps = {};

export default SearchBox;
