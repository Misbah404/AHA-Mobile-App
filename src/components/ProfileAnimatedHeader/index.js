import {
  View,
  Text,
  Animated,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';
import {Actions} from 'react-native-router-flux';
import {Images, Fonts, Colors} from '../../theme';
import FastImage from 'react-native-fast-image';
import {useSafeArea} from 'react-native-safe-area-context';
import {PROFILE_COMPONENT_HEIGHT} from '../../constants';
import util from '../../util';
import styles from './styles';
export default function ProfileAnimatedHeader(props) {
  const {
    scrollAnimated,
    user,
    leftImageOnPress,
    rightImageOnPress,
    rightImage,
    leftImage,
    notificationCount,
  } = props;

  const {profileImage, profileTagId} = user || {};
  const isFloating = !!scrollAnimated;
  const [isTransparent, setTransparent] = useState(isFloating);

  useEffect(() => {
    if (!scrollAnimated) {
      return;
    }
    const listenerId = scrollAnimated.addListener(a => {
      isTransparent !== a.value < 250 && setTransparent(!isTransparent);
    });
    return () => scrollAnimated.removeListener(listenerId);
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        /// shadowOpacity: isTransparent ? 0 : 0.5,
        // elevation: isTransparent ? 0.01 : 5,
        zIndex: 100,
        paddingTop: Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 55 : 35,
        paddingBottom: 10,
        backgroundColor: Colors.transparent,
      }}>
      <TouchableOpacity
        onPress={leftImageOnPress}
        style={{flex: 0.15, alignItems: 'center'}}>
        <Image source={leftImage} />

        {!util.areValuesEqual(notificationCount, 0) && (
          <View style={styles.notificationsCount}>
            <Text style={styles.countTxt}>
              {notificationCount < 100 ? notificationCount : `99+`}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={{flex: 0.9, height: 40}}>
        {!isTransparent && (
          <Animated.View
            style={{
              height: 30,
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FastImage
              style={{width: 37, height: 37, borderRadius: 18.5}}
              source={{uri: profileImage}}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 17,
                fontFamily: Fonts.type.Asap,
                color: Colors.white,
              }}>
              {profileTagId}
            </Text>
          </Animated.View>
        )}
      </View>
      <TouchableOpacity onPress={rightImageOnPress} style={{flex: 0.1}}>
        <Image source={rightImage} />
      </TouchableOpacity>
    </View>
  );
}
