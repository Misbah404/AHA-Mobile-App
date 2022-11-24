import React, {useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {socailLoginRequest, userSignupRequest} from '../../actions/UserActions';
import {
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  OnBoardingSubmitArrow,
  PhoneNumber,
  Text,
} from '../../components';
import {mixpanelKey, strings} from '../../constants';
import {FBLogin} from '../../helpers/FBLoginHelper';
import {GoogleLogin} from '../../helpers/GoogleLoginHelper';
import {twitterLogin} from '../../helpers/twitterHelper';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './Styles';
import {Mixpanel} from 'mixpanel-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {appleSignIn} from '../../helpers/AppleLoginHelper';
const mixpanel = new Mixpanel(mixpanelKey);
mixpanel.init();

export let AppStateContext = null;
function SignUp(props) {
  const {currentLocation} = props;
  const [isTermAndConditionCheck, setTermAndConditionCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(() => false);
  const dispatch = useDispatch();
  const [phoneNo, setPhoneNo] = useState(() => '');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [isSocailLoader, setIsSocailLoader] = useState(() => false);

  const phoneInput = useRef(() => null);

  function validation() {
    let isValid = true;

    if (util.isEmptyValue(phoneNo.number)) {
      setPhoneNoError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (!phoneInput.current?.isValidNumber(phoneNo.number)) {
      setPhoneNoError(strings.INVALID_PHONE_NUMBER);
      isValid = false;
    }

    if (isValid && !!!isTermAndConditionCheck) {
      util.topAlertError('Please check Terms & Conditions');
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

  const onTermsAndCondPress = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      Actions.termsAndConditions();
    }, 100);
  };

  const onSignInPress = () => {
    Actions.pop();
  };

  const onSubmitPress = () => {
    setPhoneNoError('');

    if (validation()) {
      setIsLoading(true);

      const payload = {
        // contact: {...phoneNo},
        contact: {
          country_code: `+${phoneInput.current.getCallingCode()}`,
          number: phoneNo.number,
        },
      };
      dispatch(
        userSignupRequest(payload, res => {
          setIsLoading(false);
          AppStateContext = React.createContext({
            userContact: {
              country_code: `+${phoneInput.current.getCallingCode()}`,
              number: phoneNo.number,
            },
          });
          if (res.status) {
            Actions.emailVerification({
              isSignUp: true,
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

  const bannerImage = useMemo(
    () => (
      <Image
        source={Images.signUpBannerImage}
        style={[styles.phoneImgStyle]}
        resizeMode={'contain'}
      />
    ),
    [],
  );
  const termsAndConditionSec = () => {
    return (
      <View
        style={[AppStyles.flexRow, AppStyles.mTop10, {alignItems: 'center'}]}>
        <TouchableOpacity
          style={[AppStyles.flexRow]}
          onPress={() => setTermAndConditionCheck(!isTermAndConditionCheck)}>
          <View style={styles.termsAndCondIconSec}>
            {isTermAndConditionCheck && (
              <Image
                source={Images.check}
                resizeMode={'contain'}
                style={styles.tickIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        <Text style={[styles.termsAndConditionText, styles.iAgreeText]}>
          {strings.I_ACCEPT_THE}
        </Text>
        <TouchableOpacity onPress={() => onTermsAndCondPress()}>
          <Text
            style={[
              styles.termsAndConditionText,
              styles.termsAndConditionTextUnderline,
            ]}>
            {strings.TERMS_AND_CONDITIONS}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const inputFormsAndTermAndCondiSection = () => {
    return (
      <View style={styles.textInputCont}>
        <PhoneNumber
          phoneRef={phoneInput}
          setPhoneNoError={setPhoneNoError}
          error={phoneNoError}
          onNumberChange={setPhoneNo}
          autoFocus={true}
        />
        {termsAndConditionSec()}
      </View>
    );
  };

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        hasBack={true}
        title={strings.GET_REGISTERED}
        titleStyle={styles.title}
        subTitle={strings.PLEASE_ENTER_DETAILS}
        shouldShowHorizontalBar={true}
      />
    );
  }, []);

  const alreadyHaveAnAccountSection = () => {
    return (
      <View style={styles.alreadyHaveAnAccountCont}>
        <Text style={styles.alreadyHaveAnAccountText}>
          {strings.ALREADY_HAVE_AN_ACCOUNT}
        </Text>
        <TouchableOpacity onPress={() => onSignInPress()}>
          <Text style={styles.signUpText}>{` ${strings.SIGN_IN}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const socailLoginApi = (token, token_type) => {
    const payload = {
      token: token,
      token_type: token_type,
      country: currentLocation?.country
        ? currentLocation?.country
        : 'United States',
    };

    setIsSocailLoader(true);
    dispatch(
      socailLoginRequest(payload, res => {
        if (!res?.is_new_user) {
          setIsSocailLoader(false);
          Actions.reset('dashboard');
          mixpanel.track('SignUp', {
            RegistrationMethod: token_type,
          });
        } else {
          setIsSocailLoader(false);
          Actions.reset('chooseYourVibe');
          mixpanel.track('SignUp', {
            RegistrationMethod: token_type,
          });
        }
        setTimeout(() => {
          setIsSocailLoader(false);
        }, 300);
      }),
    );
  };

  function renderSocailLogin() {
    return (
      <>
        <View style={styles.linearGarMainView}>
          <LinearGradient
            style={styles.LGstyles}
            colors={['#E9E9EC', '#fff', '#162431']}
            start={{x: 1.5, y: 0}}
            end={{x: 0, y: 0}}>
            <View style={styles.LGView} />
          </LinearGradient>
          <Text style={{marginHorizontal: 10}}>or continue with</Text>
          <LinearGradient
            style={styles.LGstyles}
            colors={['#162431', '#fff', '#E9E9EC']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}>
            <View style={styles.LGView} />
          </LinearGradient>
        </View>
        <View style={styles.socailMainView}>
          <TouchableOpacity
            onPress={() => GoogleLogin(socailLoginApi)}
            style={styles.socailBtnView}>
            <Image source={Images.gooleLoginIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => FBLogin(socailLoginApi)}
            style={styles.socailBtnView}>
            <Image source={Images.faceLoginIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => twitterLogin(socailLoginApi)}
            style={styles.socailBtnView}>
            <Image source={Images.twitterLoginIcon} />
          </TouchableOpacity>
          {!util.isPlatformAndroid() && (
            <TouchableOpacity
              onPress={() => appleSignIn(socailLoginApi)}
              style={styles.socailBtnView}>
              <Image source={Images.Apple_Icon} />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }
  return (
    <ImageBackground
      style={styles.container}
      source={Images.onBoardingBottomBgImg}>
      {navBar}

      <KeyboardAwareScrollViewComponent scrollEnabled={true}>
        {bannerImage}
        {inputFormsAndTermAndCondiSection()}
        <View style={AppStyles.mTop60}>
          <OnBoardingSubmitArrow
            isLoading={isLoading}
            onButtonPress={() => onSubmitPress()}
          />
        </View>
        {renderSocailLogin()}
        {alreadyHaveAnAccountSection()}
        <Spinner visible={isSocailLoader} />
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}
SignUp.propTypes = {};
SignUp.defaultProps = {};

const mapStateToProps = ({general}) => ({
  currentLocation: general.currentLocation,
});
export default connect(mapStateToProps, null)(SignUp);
