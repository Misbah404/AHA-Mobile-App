import PropTypes from 'prop-types';
import React, {useMemo, useRef, useState} from 'react';
import {Image, ImageBackground, Keyboard, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {updatePasswordRequest} from '../../actions/UserActions';
import {
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  OnBoardingSubmitArrow,
  TextInput,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './Styles';

function ResetPassword(props) {
  const {userContact} = props;
  const [isNewPassVisible, setNewPassVisibilty] = useState(() => false);
  const [isConfirmPassVisible, setConfirmPassVisibilty] = useState(() => false);
  const passwordRef = useRef(() => null);
  const confirmPasswordRef = useRef(() => null);
  const [password, setPassword] = useState(() => '');
  const [confirmPassword, setConfirmPassword] = useState(() => '');
  const [isLoading, setLoading] = useState(() => false);
  const [newPassError, setNewPassError] = useState(() => '');
  const [confirmPassError, setConfirmPassError] = useState(() => '');
  const dispatch = useDispatch();

  const validation = () => {
    let isValid = true;

    if (util.isEmptyValueWithoutTrim(password)) {
      setNewPassError(strings.REQUIRED_FIELD);
      passwordRef?.current?.focus?.();
      isValid = false;
    } else if (util.isEmptyValue(password)) {
      setNewPassError(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      passwordRef?.current?.focus?.();
      isValid = false;
    } else if (!util.isPasswordValid(password)) {
      setNewPassError(strings.PASSWORD_MUST);
      passwordRef?.current?.focus?.();
      isValid = false;
    } else if (!util.areValuesEqual(password, confirmPassword)) {
      setConfirmPassError(strings.PASSWORD_AND_CONFIRM_PASS_SHOULD_BE_SAME);
      confirmPasswordRef?.current?.focus?.();
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(confirmPassword)) {
      setConfirmPassError(strings.REQUIRED_FIELD);
      confirmPasswordRef?.current?.focus?.();
      return false;
    }

    Keyboard.dismiss();
    return isValid;
  };

  const onSubmitPress = () => {
    if (validation()) {
      setLoading(true);
      const payload = {
        contact: {...userContact},
        password: password,
        token: props.forgotToken,
      };
      dispatch(
        updatePasswordRequest(payload, res => {
          setLoading(false);

          if (res) {
            Actions.reset('login');
          }
        }),
      );
    }
  };

  const inputForm = () => {
    return (
      <View style={styles.textInputCont}>
        <TextInput
          label={strings.NEW_PASSWORD}
          rightIcon={
            isNewPassVisible
              ? Images.passwordVisibilityIcon
              : Images.hidePasswordIcon
          }
          leftIcon={Images.lockIcon}
          onPress={() => setNewPassVisibilty(!isNewPassVisible)}
          secureTextEntry={isNewPassVisible ? false : true}
          autoFocus={true}
          placeholder={strings.NEW_PASSWORD}
          ref={passwordRef}
          onSubmitEditing={() => confirmPasswordRef?.current?.focus?.()}
          returnKeyType="next"
          value={password}
          blurOnSubmit={false}
          onChangeText={val => {
            setNewPassError('');
            setConfirmPassError('');
            setPassword(val);
          }}
          error={newPassError}
        />
        <View style={AppStyles.mTop20}>
          <TextInput
            label={strings.CONFIRM_PASSWORD}
            rightIcon={
              isConfirmPassVisible
                ? Images.passwordVisibilityIcon
                : Images.hidePasswordIcon
            }
            leftIcon={Images.lockIcon}
            blurOnSubmit={false}
            onPress={() => setConfirmPassVisibilty(!isConfirmPassVisible)}
            secureTextEntry={isConfirmPassVisible ? false : true}
            placeholder={strings.CONFIRM_PASSWORD}
            ref={confirmPasswordRef}
            onSubmitEditing={onSubmitPress}
            returnKeyType="done"
            value={confirmPassword}
            onChangeText={val => {
              setConfirmPassError('');
              setConfirmPassword(val);
            }}
            error={confirmPassError}
          />
        </View>
      </View>
    );
  };

  const bannerImage = useMemo(() => {
    return (
      <Image
        source={Images.resetPassBannerImage}
        style={styles.phoneImgStyle}
        resizeMode={'contain'}
      />
    );
  }, []);

  const nav = useMemo(() => {
    return (
      <CustomNavbar
        hasBack={true}
        title={strings.RESET_PASSWORD}
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
      {nav}
      <KeyboardAwareScrollViewComponent scrollEnabled={true}>
        <>
          {bannerImage}
          <View style={AppStyles.pBottom30}>{inputForm()}</View>
          <View style={AppStyles.mTop60}>
            <OnBoardingSubmitArrow
              isLoading={isLoading}
              onButtonPress={onSubmitPress}
            />
          </View>
        </>
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}

ResetPassword.propTypes = {
  forgotToken: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};
ResetPassword.defaultProps = {};

const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ResetPassword);
