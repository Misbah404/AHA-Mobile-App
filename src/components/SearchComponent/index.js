// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import styles from './styles';

const SearchComponent = props => {
  const {
    value,
    setSearchFieldText,
    filterIconOnPress,
    isFilterIconDisable,
    isSearching,
    shouldDisableCrossIcon,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.searchMainView}>
        <View
          style={[styles.searchView, isFilterIconDisable && {marginRight: 0}]}>
          <Image source={Images.searchIcon} />
          <TextInput
            style={[styles.textInput]}
            placeholder={strings.SEARCH}
            placeholderTextColor={'#8F8E93'}
            selectionColor="white"
            value={value}
            onChangeText={value => {
              setSearchFieldText(value);
            }}
          />

          {isSearching ? (
            <ActivityIndicator
              size="small"
              color={Colors.background.secondary}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              disabled={shouldDisableCrossIcon}
              onPress={() => {
                setSearchFieldText('');
              }}>
              <Image source={Images.crossIcon} style={styles.crossIcon} />
            </TouchableOpacity>
          )}
        </View>

        {!isFilterIconDisable && (
          <TouchableOpacity activeOpacity={0.5} onPress={filterIconOnPress}>
            <Image source={Images.filterIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

SearchComponent.propTypes = {
  value: PropTypes.string,
  setSearchFieldText: PropTypes.func,
  filterIconOnPress: PropTypes.func,
  isFilterIconDisable: PropTypes.bool,
  isSearching: PropTypes.bool,
  shouldDisableCrossIcon: PropTypes.bool,
};

SearchComponent.defaultProps = {
  value: '',
  setSearchFieldText: () => {},
  filterIconOnPress: () => {},
  isFilterIconDisable: false,
  isSearching: false,
  shouldDisableCrossIcon: false,
};

export default SearchComponent;
