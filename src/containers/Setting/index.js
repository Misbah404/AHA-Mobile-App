import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {userSignOutRequest} from '../../actions/UserActions';
import {BecomeAnArtistButton, CustomNavbar} from '../../components';
import {artistSettingsList, strings, userSettingsList} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const Settings = props => {
  const {userDetails} = props;
  const {isArtist} = userDetails || false;
  const [isLogout, setIslogout] = useState(() => false);
  const dispatch = useDispatch();
  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: 'Settings',
    });
  }, []);

  const renderCustomNavBar = () => (
    <CustomNavbar
      hasBack
      titleStyle={AppStyles.titleStyleForLeft}
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      title={strings.SETTINGS}
    />
  );

  const renderBecomeAnArtistSection = () => (
    <BecomeAnArtistButton onPress={() => Actions.becomeAnArtistForm()} />
  );

  const onPressLogut = () => {
    const token = util.getCurrentUserRefreshToken();
    setIslogout(true);
    dispatch(
      userSignOutRequest({token}, res => {
        if (res) {
          setIslogout(false);
          Actions.reset('login');
        }
      }),
    );
  };

  const renderListItems = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index}
      data={!!isArtist ? artistSettingsList : userSettingsList}
      renderItem={({item}) => (
        <TouchableOpacity
          disabled={!!!item?.isClickable}
          style={styles.view}
          activeOpacity={0.6}
          onPress={
            util.areValuesEqual(item.title, 'Log out')
              ? onPressLogut
              : item.action
          }>
          <View style={styles.imageView}>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text style={styles.text}>{item.title}</Text>
          {util.areValuesEqual(item.title, 'Log out') && isLogout && (
            <ActivityIndicator
              style={{marginLeft: 20}}
              size={'small'}
              color={Colors.white}
            />
          )}
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={AppStyles.flex}>
      {renderCustomNavBar()}
      <View style={styles.container}>
        {!!!isArtist && renderBecomeAnArtistSection()}
        <View style={[styles.listView, !!isArtist && AppStyles.mTop0]}>
          {renderListItems()}
        </View>
      </View>
    </View>
  );
};

Settings.propTypes = {};
Settings.defaultProps = {};

const mapStateToProps = ({user}) => ({
  userDetails: user.data,
});

export default connect(mapStateToProps, null)(Settings);
