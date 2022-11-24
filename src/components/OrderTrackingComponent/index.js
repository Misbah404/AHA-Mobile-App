import {View, Text} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../theme';
import moment from 'moment';
import styles from './styles';

export default function OrderTrackingComponent(props) {
  const renderOneTrackingView = (status, date) => {
    const trackingData = moment(date).format('DD-MMM-YYYY');
    return (
      <View style={styles.viewOneTracking}>
        <View style={styles.radioViewMain}>
          {true && <View style={styles.radioBtnInner} />}
        </View>
        <View style={styles.statusMainView}>
          <Text style={styles.statusTxt}>{status}</Text>
          <Text style={styles.dateTracking}>{trackingData}</Text>
        </View>
      </View>
    );
  };
  const renderSeperatedLine = () => (
    <>
      <View style={[styles.trackingLineView, true && {}]}>
        <View
          style={[
            styles.dottedLineView,
            true && {borderStyle: 'solid'},
          ]}></View>
      </View>
    </>
  );

  const renderOrderIdView = () => (
    <View>
      <Text
        style={{
          color: Colors.white,
          fontFamily: Fonts.type.Asap,
          fontSize: Fonts.size.large,
          fontWeight: '700',
        }}>
        Order Tracking
      </Text>
      <Text
        style={{color: Colors.text.secondary, fontSize: Fonts.size.xxxSmall}}>
        0923489419748375877686
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderOrderIdView()}
      <View style={{marginTop: 30}}>
        {renderOneTrackingView('UNKNOWN', new Date())}
        {renderSeperatedLine()}
        {renderOneTrackingView('PRE_TRANSIT', new Date())}
        {renderSeperatedLine()}
        {renderOneTrackingView('TRANSIT', new Date())}
        {renderSeperatedLine()}
        {renderOneTrackingView('DELIVERED', new Date())}
      </View>
    </View>
  );
}
