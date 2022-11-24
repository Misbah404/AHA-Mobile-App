import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import {CustomNavbar, OrderTrackingComponent} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

export default function OrderTracking(props) {
  const {url} = props;

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="small" color={Colors.black} />
    </View>
  );

  const navBar = () => (
    <CustomNavbar
      title={strings.ORDER_TRACKING}
      titleStyle={AppStyles.titleStyleForLeft}
      hasBack
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
    />
  );

  const renderTrackingView = () => <OrderTrackingComponent />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background.primary,
      }}>
      {navBar()}
      <WebView
        bounces={false}
        showsVerticalScrollIndicator={false}
        startInLoadingState={true}
        renderLoading={Spinner}
        style={{flex: 1, backgroundColor: Colors.background.primary}}
        source={{
          uri: url,
        }}
        showsHorizontalScrollIndicator={false}
        scalesPageToFit
      />
    </View>
  );
}
