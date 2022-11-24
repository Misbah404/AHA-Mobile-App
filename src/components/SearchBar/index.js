// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, TextInput, ActivityIndicator} from 'react-native';
import {Images, Colors, AppStyles} from '../../theme';
import styles from './styles';

export default class SearchBar extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    text: PropTypes.string,
  };

  static defaultProps = {
    placeholder: 'Search',
    onSearchText: () => {},
    text: '',
    isSearching: false,
  };

  render() {
    const {placeholder, isSearching, text, onSearchText} = this.props;
    return (
      <View style={[styles.container]}>
        <View style={styles.searchWrapper}>
          <Image source={Images.Search_icon} style={styles.icon} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.black1}
            style={styles.textInput}
            returnKeyType="search"
            value={text}
            onChangeText={text => {
              onSearchText(text);
            }}
          />
          {isSearching && (
            <ActivityIndicator
              size="small"
              color={Colors.background.primary}
              style={AppStyles.mRight10}
            />
          )}
        </View>
      </View>
    );
  }
}
