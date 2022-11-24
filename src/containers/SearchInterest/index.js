import React, {useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {CustomNavbar} from '../../components';
import {strings} from '../../constants';
import styles from './styles';

const SearchInterest = () => {
  const [searchedText, setSearchedText] = useState(() => '');
  const [isSearching, setIsSearching] = useState(() => false);

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.SELECT_INTEREST}
      titleStyle={styles.navbarText}
      hasBack
    />
  );

  const renderSearchBar = () => (
    <SearchComponent
      isFilterIconDisable={true}
      value={searchedText}
      setSearchFieldText={setSearchedText}
      isSearching={isSearching}
    />
  );

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      <View style={styles.viewCont}>{renderSearchBar()}</View>
    </View>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, null)(SearchInterest);
