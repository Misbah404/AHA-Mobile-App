// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import {Text} from '../';

import {setSelectedTab} from '../../actions/GeneralActions';
import {MAIN_TABS_DATA, strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {Images} from '../../theme';
import util from '../../util';
import CartIcon from '../CartIcon';
import styles from './styles';

const HomeScreenHeaderComponent = props => {
  const {isDiscoverTabSelected, isSearchIcon, showCartIcon, myCartList, style} =
    props;
  const dispatch = useDispatch();
  const renderCartIcon = () => {
    return !!showCartIcon && !!!util.isArrayEmpty(myCartList) ? (
      <CartIcon />
    ) : (
      <></>
    );
  };
  const renderSearch = () => {
    return (
      <TouchableOpacity
        onPress={() => Actions.searchCommunity()}
        style={{position: 'absolute', right: 20}}>
        <Image style={{tintColor: 'white'}} source={Images.searchIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={[styles.headerCont, style]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              Actions.jump(MAIN_TABS_DATA.DASHBOARD_TAB.initailScreen);
              mixpanel.track('Visit', {
                PageName: 'Home',
              });
            }}>
            <Text
              style={[
                styles.discoverAndCommunityText,
                !!isDiscoverTabSelected && styles.selectedTabText,
              ]}>
              {strings.DISCOVER}
            </Text>
          </TouchableOpacity>
          <Text style={styles.verticalLine}>|</Text>
          <TouchableOpacity
            onPress={() => {
              Actions.jump(MAIN_TABS_DATA.COMMUNITY_TAB.key);
              dispatch(setSelectedTab(MAIN_TABS_DATA.COMMUNITY_TAB.id));
              mixpanel.track('Visit', {
                PageName: 'Community',
              });
            }}>
            <Text
              style={[
                styles.discoverAndCommunityText,
                !!!isDiscoverTabSelected && styles.selectedTabText,
              ]}>
              {strings.COMMUNITY}
            </Text>
          </TouchableOpacity>
        </View>
        {isSearchIcon ? renderSearch() : renderCartIcon()}
      </SafeAreaView>
    </>
  );
};

HomeScreenHeaderComponent.propTypes = {
  isDiscoverTabSelected: PropTypes.bool,
  showCartIcon: PropTypes.bool,
  style: PropTypes.object,
};
HomeScreenHeaderComponent.defaultProps = {
  isDiscoverTabSelected: true,
  showCartIcon: false,
  style: {},
};

const mapStateToProps = ({cart}) => ({
  myCartList: cart.myCartList,
});
export default connect(mapStateToProps, null)(HomeScreenHeaderComponent);
