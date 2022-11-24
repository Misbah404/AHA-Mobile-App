import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Colors} from '../../theme';
import LoginUserProfile from './LoginUserProfile/index';
import LoginArtirstProfile from './LoginArtirstProfile/index';
function ProfileTab(props) {
  const {loggedInUserDetails} = props;
  const {isArtist} = loggedInUserDetails || {};
  return (
    <View style={{flex: 1, backgroundColor: Colors.background.primary}}>
      {isArtist ? <LoginArtirstProfile /> : <LoginUserProfile />}
    </View>
  );
}

const mapStateToProps = ({user}) => ({
  loggedInUserDetails: user.data,
});

export default connect(mapStateToProps)(ProfileTab);
