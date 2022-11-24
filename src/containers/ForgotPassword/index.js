import _ from 'lodash';
import React, {useMemo, useRef, useState} from 'react';
import {Image, ImageBackground, Keyboard, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {forgotPasswordRequest} from '../../actions/UserActions';
import {
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  OnBoardingSubmitArrow,
  PhoneNumber,
  Text,
} from '../../components';
import {strings} from '../../constants';
import {Images} from '../../theme';
import util from '../../util';
import styles from './Styles';

export let AppStateContext = null;

function ForgotPassword() {
  const [phoneNo, setPhoneNo] = useState(() => '');
  const [isLoading, setIsLoading] = useState(() => false);
  const [phoneNoError, setPhoneNoError] = useState('');
  const phoneInput = useRef(() => null);

  const dispatch = useDispatch();

  const validation = () => {
    Keyboard.dismiss();
    const mNum = phoneNo?.number ?? '';

    if (util.isEmptyValue(mNum)) {
      setPhoneNoError(strings.REQUIRED_FIELD);
      return false;
    }
    if (!phoneInput.current?.isValidNumber(mNum)) {
      setPhoneNoError(strings.INVALID_PHONE_NUMBER);
      return false;
    }
    return true;
  };

  const onSubmitPress = () => {
    setPhoneNoError('');
    if (validation()) {
      const payload = {
        contact: {
          country_code: `+${phoneInput.current.getCallingCode()}`,
          number: phoneNo.number,
        },
      };
      setIsLoading(true);
      dispatch(
        forgotPasswordRequest(payload, res => {
          setIsLoading(false);
          AppStateContext = React.createContext({
            userContact: {
              country_code: `+${phoneInput.current.getCallingCode()}`,
              number: phoneNo.number,
            },
          });

          if (res.status) {
            Actions.emailVerification({
              isComingFromForgotPass: true,
              userContact: {
                country_code: `+${phoneInput.current.getCallingCode()}`,
                number: phoneNo.number,
              },
              incomingOTP: res.data.otp,
            });
          }
        }),
      );
    }
  };
  const enterYourEmailText = () => {
    return (
      <Text style={styles.enterYourEmailText}>{strings.ENTER_YOUR_EMAIL}</Text>
    );
  };

  const inputForm = () => {
    return (
      <View style={styles.textInputCont}>
        <Spinner
          visible={isLoading}
          color={'#5D3FD3'}
          size={'large'}
          overlayColor="rgba(1, 1, 1, 0.85)"
          textStyle={{color: 'white', fontWeight: '600'}}
        />
        <PhoneNumber
          setPhoneNoError={setPhoneNoError}
          phoneRef={phoneInput}
          error={phoneNoError}
          onNumberChange={setPhoneNo}
          autoFocus={true}
        />
      </View>
    );
  };
  const bannerImage = useMemo(
    () => (
      <Image
        source={Images.loginPagePhoneIcon}
        style={[styles.phoneImgStyle]}
        resizeMode={'contain'}
      />
    ),
    [],
  );

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        hasBack={true}
        title={strings.FORGOT_PASSWORD}
        titleStyle={styles.title}
        subTitle={strings.PLEASE_ENTER_DETAILS}
        shouldShowHorizontalBar={true}
      />
    );
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={Images.onBoardingBottomBgImg}>
      {navBar}
      <KeyboardAwareScrollViewComponent scrollEnabled={true}>
        <>
          {bannerImage}
          {enterYourEmailText()}
          {inputForm()}
          <View style={styles.submitArrowCont}>
            <OnBoardingSubmitArrow
              isLoading={isLoading}
              onButtonPress={() => onSubmitPress()}
            />
          </View>
        </>
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}
ForgotPassword.propTypes = {};
ForgotPassword.defaultProps = {};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ForgotPassword);
