// @flow
import React, {useEffect, useState, useRef} from 'react';
import {Linking, AppState, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const Splash = () => {
  _checkInitialUrl = async () => {
    const url = await _getInitialUrl();

    handleOpenURL(url);
  };

  _getInitialUrl = async () => {
    const url = await Linking.getInitialURL();
    return url;
  };
  useEffect(() => {
    /// SplashScreen.hide();

    setTimeout(() => {
      Linking.addEventListener('url', handleOpenURL);

      Linking.getInitialURL()
        .then(url => handleOpenURL({url}))
        .catch(console.error);
    }, 2000);
  }, []);

  const handleOpenURL = event => {
    const {url} = event || {};

    util.deepLinkNavigation(url);
  };

  return (
    <View style={styles.imgStyle}></View>
    // <FastImage
    //   style={styles.imgStyle}
    //   source={Images.SplashBg}
    //   resizeMode={FastImage.resizeMode.stretch}
    // />
  );
};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(Splash);
