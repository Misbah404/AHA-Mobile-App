// @flow
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {WebView} from 'react-native-webview';
import {connect, useDispatch} from 'react-redux';
import {
  getBankAccountDetailsRequest,
  getUrlToAddNewBankAccountRequest,
} from '../../actions/walletActions';
import {CustomNavbar, Loader, Text} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const AddBank = props => {
  const {} = props;

  const [webViewUrl, setWebViewUrl] = useState(() => undefined);
  const [showWebViewLoader, setShowWebViewLoader] = useState(() => true);
  const [isGettingUrlFromServer, setIsGettingUrlFromServer] = useState(
    () => false,
  );
  const [isVerifyingBankAccount, setIsVerifyingBankAccount] = useState(
    () => false,
  );

  const webViewRef = useRef(() => null);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsGettingUrlFromServer(true);
    dispatch(
      getUrlToAddNewBankAccountRequest({}, response => {
        const {url = undefined} = response || {};
        if (!util.isFieldNil(url)) {
          setWebViewUrl(url);
        }
        setIsGettingUrlFromServer(false);
      }),
    );
  }, []);

  const verifyIsAccountAddedSuccessfully = () => {
    setIsVerifyingBankAccount(true);

    dispatch(
      getBankAccountDetailsRequest(res => {
        setIsVerifyingBankAccount(false);

        const {details_submitted = false} = res || {};
        if (details_submitted) {
          util.topAlert(strings.BANK_ACCOUNT_HAS_BEEN_SUCCESSFULLY_ADDED);
        } else {
          util.topAlertError(strings.UNABLE_TO_PROCESS_REQUEST);
        }
        Actions.pop();
      }),
    );
  };

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.ADD_BANK}
      titleStyle={AppStyles.titleStyleForLeft}
      hasBack
    />
  );

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="small" color={Colors.black} />
    </View>
  );

  const renderWebView = useMemo(() => {
    if (util.isFieldNil(webViewUrl)) {
      return (
        <Text style={styles.unableToGetUrlText}>
          {strings.SORRY_UNABLE_TO_GET_URL}
        </Text>
      );
    }
    return (
      <>
        <WebView
          bounces={false}
          startInLoadingState={true}
          renderLoading={Spinner}
          style={styles.container}
          source={{uri: webViewUrl}}
          showsHorizontalScrollIndicator={false}
          scalesPageToFit
          onMessage={verifyIsAccountAddedSuccessfully}
        />
      </>
    );
  }, [webViewUrl]);

  const renderWebViewAsPerMultipleCases = () => {
    if (isVerifyingBankAccount) {
      return (
        <View style={styles.verificationInProgressCont}>
          <View style={{height: 50}}>
            <Loader loading={true} />
          </View>
          <Text style={styles.verifyingBankAccountText}>
            {strings.BANK_ACCOUNT_VERIFICATION_IN_PROGRESS}
          </Text>
        </View>
      );
    }

    if (isGettingUrlFromServer) {
      return (
        <View style={styles.loaderViewSec}>
          <Loader loading={isGettingUrlFromServer} />
        </View>
      );
    }
    return <View style={styles.childCont}>{renderWebView}</View>;
  };

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      {renderWebViewAsPerMultipleCases()}
    </View>
  );
};

AddBank.propTypes = {};
AddBank.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(AddBank);
