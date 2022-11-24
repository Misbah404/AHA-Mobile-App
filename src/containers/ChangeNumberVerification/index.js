import PropTypes from 'prop-types';
import React, {useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  View,
  Text as TxtInput,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountDown from 'react-native-countdown-component';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  changePhoneOTPRequest,
  changePhoneRequest,
} from '../../actions/UserActions';
import {
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  OnBoardingSubmitArrow,
  Text,
} from '../../components';
import {RESEND_CODE_TIMER, strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

function ChangeNumberVerification(props) {
  const [verificationCode, setVerificationCode] = useState();
  const [isLoading, setLoading] = useState(false);
  const [disableResendOTP, setResendOTPLoader] = useState(true);
  const [resetCountdownId, setResetCountdownId] = useState(Math.random());
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [incomingOTPFromScreens, setIncomingOTPFromScreens] = useState(
    props.incomingOTP,
  );
  const [otpExpireTime, setOTPExpireTime] = useState(RESEND_CODE_TIMER);
  const [value, setValue] = useState('');
  const verificationValue = useRef(null);
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({value, cellCount: 4});

  const dispatch = useDispatch();

  const {userContact, incomingOTP} = props;

  const handleResetOTP = () => {
    const payload = {
      contact: {...userContact},
    };

    setLoadingOTP(true);

    dispatch(
      changePhoneRequest(payload, res => {
        if (res.status) {
          setResendOTPLoader(true);
          setResetCountdownId(Math.random());
          setLoadingOTP(false);
          setIncomingOTPFromScreens(res.data.otp);
          setVerificationCode();
        }
        verificationValue?.current?.clear?.();
        setResendOTPLoader(true);
        setLoadingOTP(false);
      }),
    );
  };

  const validation = () => {
    Keyboard.dismiss();
    if (util.isEmptyValue(value)) {
      util.topAlertError(strings.ENTER_YOUR_OTP);
      ref?.current?.focus?.();
      return false;
    }
    if (value.length < 4) {
      util.topAlertError(strings.INVALID_OTP);
      ref?.current?.focus?.();
      return false;
    }
    return true;
  };

  const onSubmitPress = () => {
    if (validation()) {
      const payload = {
        otp: value,
        contact: {...userContact},
      };
      setLoading(true);

      dispatch(
        changePhoneOTPRequest(payload, status => {
          setLoading(false);

          if (status) {
            setTimeout(() => {
              Actions.popTo('security');
            }, 100);
          }
        }),
      );
    }
  };

  const imageBottomSection = () => {
    return (
      <>
        <Text style={styles.verifyEmailText}>{strings.VERIFY_NUMBER}</Text>
        <Text style={styles.pleaseEnterFourDigitCodeText}>
          {strings.PLEASE_ENTER_FOUR_DIGIT_CODE}
        </Text>
      </>
    );
  };

  const codeInputView = () => {
    return (
      <CodeField
        ref={ref}
        {...prop}
        cellCount={4}
        value={value}
        onChangeText={val => {
          setValue(val);
        }}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.white,
              width: 40,
              height: 40,
            }}>
            <TxtInput
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </TxtInput>
          </View>
        )}
      />
    );
  };

  const didntReceiveACodeSection = () => {
    return (
      <View style={[AppStyles.flexRow, AppStyles.centerInner]}>
        <Text style={styles.didntReceiveACodeText}>
          {strings.DIDNT_RECEIVE_A_CODE}
        </Text>
        <TouchableOpacity
          disabled={disableResendOTP}
          onPress={() => {
            handleResetOTP();
          }}>
          <Text
            style={[
              styles.resendCodeText,
              disableResendOTP && {opacity: 0.3},
            ]}>{` ${strings.RESEND_CODE}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const wrongEmailText = () => {
    return (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Text style={styles.wrongEmailText}>{strings.WRONG_PHONE}</Text>
      </TouchableOpacity>
    );
  };
  const bannerImage = useMemo(() => {
    return (
      <Image
        source={Images.emailVerificationImageBanner}
        style={[styles.phoneImgStyle]}
        resizeMode={'contain'}
      />
    );
  }, []);

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        hasBack={true}
        title={strings.EMAIL_VERIFICATION}
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
        {bannerImage}
        {imageBottomSection()}
        {codeInputView()}
        <View style={styles.paddingVertical30}>
          {didntReceiveACodeSection()}
          {wrongEmailText()}
          <Text style={{alignSelf: 'center'}} size={13}>
            You can resend code in
          </Text>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              top: 6,
              borderRadius: 100,
            }}>
            <CountDown
              id={resetCountdownId}
              until={otpExpireTime}
              timeToShow={['H', 'M', 'S']}
              onFinish={() => setResendOTPLoader(false)}
              digitStyle={{width: 30}}
              digitTxtStyle={{color: Colors.text.primary}}
              timeLabels={{m: null, s: null}}
              separatorStyle={{color: Colors.text.primary, marginTop: -2}}
              showSeparator
              size={20}
            />
          </View>
        </View>
        <OnBoardingSubmitArrow
          isLoading={isLoading}
          onButtonPress={() => onSubmitPress()}
        />
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}

ChangeNumberVerification.propTypes = {
  isComingFromForgotPass: PropTypes.bool,
  incomingOTP: PropTypes.number,
};
ChangeNumberVerification.defaultProps = {
  isComingFromForgotPass: false,
};

const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ChangeNumberVerification);
