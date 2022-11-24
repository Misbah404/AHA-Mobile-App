import React, {useMemo, useRef, useState} from 'react';
import {Image, ImageBackground, Keyboard, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {personalInfoRequest} from '../../actions/UserActions';
import {
  Calendar,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  OnBoardingSubmitArrow,
  TextInput,
} from '../../components';
import {DATE_FORMAT1, strings, mixpanelKey} from '../../constants';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './Styles';
import {Mixpanel} from 'mixpanel-react-native';
const mixpanel = new Mixpanel(mixpanelKey);
mixpanel.init();

function PersonalInfo(props) {
  const {userContact} = props;
  const [isCalendarModalVisible, setCalendarModalVisibility] = useState(
    () => false,
  );
  const usernameRef = useRef(() => null);
  const [username, setusername] = useState(() => '');
  const [isPasswordVisibile, setPassVisibilty] = useState(() => false);
  const passwordRef = useRef(() => null);
  const [isLoading, setIsLoading] = useState(() => false);
  const [password, setPassword] = useState(() => '');
  const [userNameError, setUserNameError] = useState(() => '');
  const [passwordError, setPasswordError] = useState(() => '');
  const dispatch = useDispatch();

  const validation = () => {
    let isValid = true;
    if (util.isEmptyValueWithoutTrim(username)) {
      setUserNameError(strings.REQUIRED_FIELD);
      usernameRef?.current?.focus?.();
      isValid = false;
    } else if (util.isEmptyValue(username)) {
      setUserNameError(strings.FOR_VALID_USERNAME);
      usernameRef?.current?.focus?.();
      isValid = false;
    } else if (!util.isValidUserName(username)) {
      setUserNameError(strings.FOR_VALID_USERNAME);
      usernameRef?.current?.focus?.();
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(password)) {
      setPasswordError(strings.REQUIRED_FIELD);
      passwordRef?.current?.focus?.();
      isValid = false;
    } else if (util.isEmptyValue(password)) {
      setPasswordError(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      passwordRef?.current?.focus?.();
      isValid = false;
    } else if (!util.isPasswordValid(password)) {
      setPasswordError(strings.PASSWORD_MUST);
      passwordRef?.current?.focus?.();
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  };

  const onSubmitPress = () => {
    if (validation()) {
      setIsLoading(true);
      let payload = {
        is_artist: false,
        username,
        contact: {...userContact},
        password,
      };

      if (!util.hasObjectWithKey(payload, 'is_artist')) {
        payload['is_artist'] = false;
      }

      dispatch(
        personalInfoRequest(payload, res => {
          setIsLoading(false);
          if (res) {
            mixpanel.track('SignUp', {
              name: username,
              contact: {...userContact},

              RegistrationMethod: 'Phone Number',
              Artist: 'No',
            });
            Actions.reset('chooseYourVibe');
          }
        }),
      );
    }
  };

  const inputForm = () => {
    return (
      <View style={styles.textInputCont}>
        <TextInput
          label={strings.USERNAME}
          maxLength={24}
          leftIcon={Images.userIcon}
          placeholderValue={strings.CHOOSE_YOUR_USERNAME}
          autoFocus={true}
          ref={usernameRef}
          value={username}
          onChangeText={val => {
            setUserNameError('');
            setusername(val);
          }}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          returnKeyType="next"
          error={userNameError}
        />
        <View style={AppStyles.mTop30}>
          <TextInput
            label={strings.PASSWORD}
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
            onSubmitEditing={onSubmitPress}
            returnKeyType="done"
            value={password}
            onChangeText={val => {
              setPasswordError('');
              setPassword(val);
            }}
            error={passwordError}
          />
        </View>
      </View>
    );
  };

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        hasBack={true}
        title={strings.PERSONAL_INFO}
        titleStyle={styles.title}
        subTitle={strings.PLEASE_ENTER_DETAILS}
        shouldShowHorizontalBar={true}
      />
    );
  }, []);
  const bannerImage = useMemo(() => {
    return (
      <Image
        source={Images.personalInfoBannerImage}
        style={styles.phoneImgStyle}
        resizeMode={'contain'}
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
        <View style={AppStyles.pBottom30}>{inputForm()}</View>
        <View style={AppStyles.mTop60}>
          <OnBoardingSubmitArrow
            isLoading={isLoading}
            onButtonPress={onSubmitPress}
          />
        </View>
      </KeyboardAwareScrollViewComponent>
      {isCalendarModalVisible && (
        <Calendar
          setValue={val => {
            setCalendarModalVisibility(!isCalendarModalVisible);
          }}
          setSelectedDropDownValue={dateTime => {
            setBirthdayDate(ISOToFormat(dateTime, DATE_FORMAT1));
          }}
          mode={'date'}
        />
      )}
    </ImageBackground>
  );
}
PersonalInfo.propTypes = {};
PersonalInfo.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(PersonalInfo);
