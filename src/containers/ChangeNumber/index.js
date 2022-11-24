import _ from 'lodash';
import React, {useMemo, useRef, useState} from 'react';
import {Image, ImageBackground, Keyboard, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {changePhoneRequest} from '../../actions/UserActions';
import {
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  OnBoardingSubmitArrow,
  PhoneNumber,
  Text,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

export let AppStateContext = null;
function ChangeNumber() {
  const [isLoading, setIsLoading] = useState(() => false);
  const [phoneNo, setPhoneNo] = useState(() => '');
  const [phoneNoError, setPhoneNoError] = useState(() => '');
  const phoneInput = useRef(() => null);
  const dispatch = useDispatch();

  function validation() {
    let isValid = true;
    if (!phoneInput.current?.isValidNumber(phoneNo.number)) {
      setPhoneNoError(strings.INVALID_PHONE_NUMBER);
      isValid = false;
    }
    if (util.isEmptyValueWithoutTrim(phoneNo.number)) {
      setPhoneNoError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    Keyboard.dismiss();
    return isValid;
  }

  const onSubmitPress = () => {
    if (validation()) {
      setIsLoading(true);

      const payload = {
        //contact: {...phoneNo},
        contact: {
          country_code: `+${phoneInput.current.getCallingCode()}`,
          number: phoneNo.number,
        },
      };

      dispatch(
        changePhoneRequest(payload, res => {
          if (res) {
            setIsLoading(false);
            Actions.changeNumberVerification({
              userContact: {
                country_code: `+${phoneInput.current.getCallingCode()}`,
                number: phoneNo.number,
              },
              incomingOTP: res.data.otp,
            });
          } else {
            setIsLoading(false);
          }
        }),
      );
    }
  };

  const bannerImage = useMemo(
    () => (
      <>
        <Image
          source={Images.signUpBannerImage}
          style={[styles.phoneImgStyle]}
          resizeMode={'contain'}
        />
        <Text style={styles.change_Number_text}>
          {strings.CHANGE_NUMBER_TEXT}
        </Text>
      </>
    ),
    [],
  );

  const inputFormsAndTermAndCondiSection = () => {
    return (
      <View style={styles.textInputCont}>
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

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        hasBack={true}
        title={strings.ChHANGE_NUMBER}
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
        {inputFormsAndTermAndCondiSection()}
        <View style={AppStyles.mTop60}>
          <OnBoardingSubmitArrow
            isLoading={isLoading}
            onButtonPress={() => onSubmitPress()}
          />
        </View>
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}

ChangeNumber.propTypes = {};
ChangeNumber.defaultProps = {};

const mapStateToProps = ({user}) => ({});
export default connect(mapStateToProps, null)(ChangeNumber);
