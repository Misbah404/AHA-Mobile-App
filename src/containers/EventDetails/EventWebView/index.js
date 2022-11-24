import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import {CustomNavbar} from '../../../components';
import {strings} from '../../../constants';
import {AppStyles, Colors} from '../../../theme';
import util from '../../../util';
import styles from './styles';

function EventsWebView(props) {
  const {url} = props;
  const [isLoading, setIsLoading] = useState(() => false);
  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="small" color={Colors.black} />
    </View>
  );
  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.EVENTS}
      titleStyle={AppStyles.titleStyleForCenter}
      hasBack
    />
  );
  function renderWebView() {
    return (
      <>
        <WebView
          bounces={false}
          startInLoadingState={true}
          renderLoading={Spinner}
          style={styles.container}
          source={{
            uri: url,
          }}
          showsHorizontalScrollIndicator={false}
          scalesPageToFit
        />
      </>
    );
  }

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      {renderWebView()}
    </View>
  );
}

EventsWebView.propTypes = {};
EventsWebView.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(EventsWebView);
