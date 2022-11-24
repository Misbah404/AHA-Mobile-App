import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../theme';
import styles from './UserProfileNavbarStyles';

export default function UserProfileNavbarView(props) {
  const {} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={Images.notificationIcon}
          style={{width: 18, height: 18}}
        />
      </TouchableOpacity>

      <Text style={styles.text}>UserProfileNavbar</Text>

      <TouchableOpacity>
        <Image source={Images.settingIcon} style={{width: 18, height: 18}} />
      </TouchableOpacity>
    </View>
  );
}
