import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  View,
  Linking,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {userSigninRequest} from '../../actions/UserActions';
import {
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  OnBoardingSubmitArrow,
  PhoneNumber,
  Text,
  TextInput,
} from '../../components';

import {mixpanelKey, strings} from '../../constants';
import {GoogleLogin} from '../../helpers/GoogleLoginHelper';
import {FBLogin} from '../../helpers/FBLoginHelper';
import {twitterLogin} from '../../helpers/twitterHelper';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {socailLoginRequest} from '../../actions/UserActions';
import {Mixpanel} from 'mixpanel-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {appleSignIn} from '../../helpers/AppleLoginHelper';
import FastImage from 'react-native-fast-image';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {setCurrentLocation} from '../../actions/GeneralActions';
const mixpanel = new Mixpanel(mixpanelKey);
mixpanel.init();
function Login(props) {
  const {currentLocation} = props;
  const [isPasswordVisibile, setPassVisibilty] = useState(false);
  const passwordRef = useRef(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNo, setPhoneNo] = useState(() => '');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [email, setEmail] = useState(() => '');
  const [emailError, setEmailError] = useState(() => '');
  const [isLoading, setIsLoading] = useState(() => false);
  const [isSocailLoader, setIsSocailLoader] = useState(() => false);
  const [isCurrentLocationLoader, setCurrentLocationLoader] = useState(
    () => false,
  );
  const [selectLoginType, setSelectedLoginType] = useState(() => 'Phone');
  const phoneInput = useRef(() => null);

  const dispatch = useDispatch();
  useEffect(() => {
    _getUserLocation();
  }, []);

  const _getUserLocation = async () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(async data => {
          setCurrentLocationLoader(true);
          const location = await util.getCoordinates();
          dispatch(setCurrentLocation(location));
          setCurrentLocationLoader(false);
          if (location.PERMISSION_DENIED == 1) {
            util.topAlertError(location.message);
          } else if (location.code === 1) {
          }
        })
        .catch(err => {
          util.topAlertError('Permission Denied');
        });
    } else {
      setCurrentLocationLoader(true);
      const location = await util.getCoordinates();
      dispatch(setCurrentLocation(location));
      setCurrentLocationLoader(false);
      if (location.PERMISSION_DENIED == 1) {
        util.topAlertError(location.message);
      } else if (location.code === 1) {
      }
    }
  };

  const onSignUpPress = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      Actions.signUp();
    }, 100);
  };

  const validation = () => {
    let validate = true;
    if (_.isEmpty(password)) {
      setPasswordError(strings.REQUIRED_FIELD);
      passwordRef?.current?.focus?.();
      validate = false;
    }

    if (util.areValuesEqual(selectLoginType, 'Phone')) {
      if (util.isEmptyValue(phoneNo.number)) {
        setPhoneNoError(strings.REQUIRED_FIELD);
        validate = false;
      } else if (!phoneInput.current?.isValidNumber(phoneNo.number)) {
        setPhoneNoError(strings.INVALID_PHONE_NUMBER);
        validate = false;
      }
    }
    if (util.areValuesEqual(selectLoginType, 'Email')) {
      if (util.isEmptyValueWithoutTrim(email)) {
        setEmailError(strings.REQUIRED_FIELD);
        validate = false;
      } else if (!util.isEmailValid(email)) {
        setEmailError(strings.INVALID_EMAIL);
        validate = false;
      }
    }

    Keyboard.dismiss();
    return validate;
  };

  const onSubmitPress = () => {
    setPasswordError('');
    setPhoneNoError('');
    if (validation()) {
      setIsLoading(true);
      let payload = {};

      if (util.areValuesEqual(selectLoginType, strings.EMAIL)) {
        payload = {
          email: email,
          password,
          country: currentLocation?.country
            ? currentLocation?.country
            : 'United States',
        };
      } else {
        payload = {
          contact: {
            country_code: `+${phoneInput.current.getCallingCode()}`,
            number: phoneNo.number,
          },
          password,
        };
      }
      dispatch(
        userSigninRequest(payload, res => {
          setIsLoading(false);
          if (res.status) {
            if (util.areValuesEqual(selectLoginType, strings.EMAIL)) {
              mixpanel.track('Login', {
                Email: email,
                LoginMethod: 'Bubble Io',
              });
            } else {
              mixpanel.track('Login', {
                PhoneNumber: {
                  country_code: `+${phoneInput.current.getCallingCode()}`,
                  number: phoneNo.number,
                },
              });
            }
            const {url = undefined} = props || {};
            const {login_attempts, login_type} = res?.data;

            if (util.isFieldNil(url)) {
              if (
                util.areValuesEqual(login_attempts, 1) &&
                util.areValuesEqual(login_type, 'bubble')
              ) {
                Actions.reset('chooseYourVibe');
              } else {
                Actions.reset('dashboard');
              }
            } else {
              handleOpenURL({url});
            }
          }
        }),
      );
    }
  };

  const handleOpenURL = event => {
    const {url} = event || {};
    util.deepLinkNavigation(url);
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

  const dontHaveAnAccountSection = () => {
    return (
      <View style={styles.dontHaveAnAccountCont}>
        <Text style={styles.dontHaveAnAccountText}>
          {strings.DONT_HAVE_AN_ACCOUNT}
        </Text>
        <TouchableOpacity onPress={() => onSignUpPress()}>
          <Text style={styles.signUpText}>{` ${strings.SIGN_UP}`}</Text>
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
          mixpanel.track('Login', {
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

  function renderSelectLoginType() {
    return (
      <View style={styles.selectedTypeView}>
        <View style={styles.linearGarMainView}>
          <LinearGradient
            style={styles.LGstyles}
            colors={['#E9E9EC', '#fff', '#162431']}
            start={{x: 1.5, y: 0}}
            end={{x: 0, y: 0}}>
            <View style={styles.LGView} />
          </LinearGradient>
          <Text style={styles.selectedTypeTxt}>
            {strings.SELECT_LOGIN_TYPE}
          </Text>
          <LinearGradient
            style={styles.LGstyles}
            colors={['#162431', '#fff', '#E9E9EC']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}>
            <View style={styles.LGView} />
          </LinearGradient>
        </View>
        <View style={styles.mainViewSelectBtn}>
          <TouchableOpacity
            activeOpacity={1}
            style={
              util.areValuesEqual(selectLoginType, strings.PHONE)
                ? styles.selectedTypeBtn
                : styles.unSelectedBtnView
            }
            onPress={() => setSelectedLoginType(strings.PHONE)}>
            <FastImage
              source={
                util.areValuesEqual(selectLoginType, strings.PHONE)
                  ? Images.SelectedBtnLoginTypeLeft
                  : Images.unSelectedLoginType
              }
              style={
                util.areValuesEqual(selectLoginType, strings.PHONE)
                  ? styles.selectedImgType
                  : styles.unSelectedImg
              }
              resizeMode={FastImage.resizeMode.contain}>
              <Text
                style={
                  util.areValuesEqual(selectLoginType, strings.PHONE)
                    ? styles.typeTxtSelected
                    : styles.typeTxtUnselected
                }>
                {strings.PHONE}
              </Text>
            </FastImage>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={
              util.areValuesEqual(selectLoginType, strings.EMAIL)
                ? styles.selectedTypeBtn
                : styles.unSelectedBtnViewLeft
            }
            onPress={() => setSelectedLoginType(strings.EMAIL)}>
            <FastImage
              source={
                util.areValuesEqual(selectLoginType, strings.EMAIL)
                  ? Images.SelectedBtnLoginTypeRight
                  : Images.unSelectedLoginType
              }
              style={
                util.areValuesEqual(selectLoginType, strings.EMAIL)
                  ? styles.selectedImgType
                  : styles.unSelectedImg
              }
              resizeMode={FastImage.resizeMode.contain}>
              <Text
                style={
                  util.areValuesEqual(selectLoginType, strings.EMAIL)
                    ? styles.typeTxtSelected
                    : styles.typeTxtUnselected
                }>
                {strings.EMAIL}
              </Text>
            </FastImage>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const inputFormsAndForgotPassSection = () => {
    return (
      <View style={styles.textInputCont}>
        {util.areValuesEqual(selectLoginType, strings.PHONE) && (
          <View style={{marginTop: -40}}>
            {!isCurrentLocationLoader && (
              <PhoneNumber
                setPhoneNoError={setPhoneNoError}
                phoneRef={phoneInput}
                error={phoneNoError}
                onNumberChange={setPhoneNo}
                autoFocus={false}
              />
            )}
            {isCurrentLocationLoader && (
              <PhoneNumber
                setPhoneNoError={setPhoneNoError}
                phoneRef={phoneInput}
                error={phoneNoError}
                onNumberChange={setPhoneNo}
                autoFocus={false}
              />
            )}
          </View>
        )}
        {util.areValuesEqual(selectLoginType, strings.EMAIL) && (
          <View style={AppStyles.mTop30}>
            <TextInput
              label={strings.EMAIL}
              labelStyle={styles.labelStyle}
              leftIcon={Images.userIcon}
              placeholderValue={strings.EMAIL}
              ref={passwordRef}
              autoCapitalize="none"
              returnKeyType="next"
              value={email}
              onChangeText={val => {
                setEmail(val);
                setEmailError('');
              }}
              error={emailError}
            />
          </View>
        )}
        <View style={AppStyles.mTop30}>
          <TextInput
            label={strings.PASSWORD}
            labelStyle={styles.labelStyle}
            rightIcon={
              isPasswordVisibile
                ? Images.passwordVisibilityIcon
                : Images.hidePasswordIcon
            }
            leftIcon={Images.lockIcon}
            onPress={() => setPassVisibilty(!isPasswordVisibile)}
            secureTextEntry={isPasswordVisibile ? false : true}
            placeholderValue={strings.PASSWORD}
            ref={passwordRef}
            onSubmitEditing={() => {
              onSubmitPress();
            }}
            returnKeyType="done"
            value={password}
            onChangeText={val => {
              setPassword(val);
              setPasswordError('');
            }}
            error={passwordError}
          />
        </View>
        <TouchableOpacity
          style={styles.forgotPassTextCont}
          onPress={() => {
            Keyboard.dismiss();
            setTimeout(() => {
              Actions.forgotPassword();
            }, 100);
          }}>
          <Text
            style={styles.forgotPassText}>{`${strings.FORGOT_PASSWORD}?`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        title={strings.LOGIN}
        titleStyle={styles.title}
        subTitle={strings.PLEASE_ENTER_DETAILS}
        shouldShowHorizontalBar={true}
      />
    );
  }, []);

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
        <>
          {bannerImage}
          {renderSelectLoginType()}
          {inputFormsAndForgotPassSection()}
          <View style={[AppStyles.mTop20]}>
            <OnBoardingSubmitArrow
              isLoading={isLoading}
              onButtonPress={() => onSubmitPress()}
              _style={styles.loginButtonSec}
            />
          </View>
          {renderSocailLogin()}
          {dontHaveAnAccountSection()}
          <Spinner visible={isSocailLoader} />
          <Spinner visible={isCurrentLocationLoader} />
        </>
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}
const mapStateToProps = ({general}) => ({
  currentLocation: general.currentLocation,
});
export default connect(mapStateToProps, null)(Login);
