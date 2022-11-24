import React, {useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {personalInfoRequest} from '../../actions/UserActions';
import {
  CountryNamePicker,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  ModalView,
  OnBoardingSubmitArrow,
  SpinnerLoader,
  TextInput,
} from '../../components';
import FastImage from 'react-native-fast-image';
import {uploadImageToServer} from '../../helpers/ImageUploadHelper';
import UploadCoverPhoto from '../../components/UploadCoverPhoto';
import {MAIN_TABS_DATA, mixpanelKey, strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {Mixpanel} from 'mixpanel-react-native';
const mixpanel = new Mixpanel(mixpanelKey);
mixpanel.init();

function PersonalInfoArtist(props) {
  const {userContact, currentLocation} = props;
  const [isModalVisible, showModalVisibility] = useState(() => false);
  const stateRef = useRef(() => null);
  const cityRef = useRef(() => null);
  const usernameRef = useRef(() => null);
  const [username, setusername] = useState(() => '');
  const [isPasswordVisibile, setPassVisibilty] = useState(() => false);
  const passwordRef = useRef(() => null);
  const [password, setPassword] = useState(() => '');
  const [userNameError, setUserNameError] = useState(() => '');
  const [passwordError, setPasswordError] = useState(() => '');
  const [country, setCountry] = useState(() =>
    currentLocation?.country ? currentLocation?.country : '',
  );
  const [state, setState] = useState(() => '');
  const [city, setCity] = useState(() => '');
  const [countryError, setCountryError] = useState(() => '');
  const [stateError, setStateError] = useState(() => '');
  const [cityError, setCityError] = useState(() => '');
  const [coverPhoto, setCoverPhoto] = useState(() => undefined);
  const [userProfileImage, setUserProfileImage] = useState(() => undefined);
  const [isSendingImageToS3, setIsSendingImageToS3] = useState(() => false);
  const [isSendingImageToS3Profile, setIsSendingImageToS3Profile] = useState(
    () => false,
  );
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const [isLoading, setIsLoading] = useState(() => false);
  const dispatch = useDispatch();

  const uploadImageToS3AndUpdateImageView = _image => {
    setIsSendingImageToS3Profile(true);

    uploadImageToServer(
      _image.uri,
      setUserProfileImage,
      setIsSendingImageToS3Profile,
    );
  };
  function handleButtonOfModal() {
    showModalVisibility(false);
    setTimeout(() => {
      Actions.reset(MAIN_TABS_DATA.PROFILE_TAB.initailScreen);
    }, 100);
  }

  const isValidData = () => {
    setCityError('');
    setStateError('');
    setCountryError('');
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

    if (util.isEmptyValue(city)) {
      setCityError(strings.REQUIRED_FIELD);
      cityRef?.current?.focus?.();
      isValid = false;
    } else if (!util.isValidName(city)) {
      setCityError(strings.INVALID_CITY);
      cityRef?.current?.focus?.();
      isValid = false;
    }

    if (util.isEmptyValue(state)) {
      setStateError(strings.REQUIRED_FIELD);
      stateRef?.current?.focus?.();
      isValid = false;
    } else if (!util.isValidName(state)) {
      setStateError(strings.INVALID_STATE);
      stateRef?.current?.focus?.();
      isValid = false;
    }
    if (util.isEmptyValue(country)) {
      setCountryError(strings.REQUIRED_FIELD);
      isValid = false;
    }

    if (util.isEmptyValue(userProfileImage)) {
      util.topAlertError(strings.PLEASE_UPLOAD_PROFILE_PHOTO);
      Keyboard.dismiss();
      return false;
    }
    if (util.isEmptyValue(coverPhoto)) {
      util.topAlertError(strings.PLEASE_UPLOAD_COVER_PHOTO);
      Keyboard.dismiss();
      return false;
    }
    if (isSendingImageToS3Profile) {
      util.topAlertError(strings.PLEASE_WAIT_UPLOADING_PHOTO);
      Keyboard.dismiss();
      return false;
    }
    if (isSendingImageToS3) {
      util.topAlertError(strings.PLEASE_WAIT_UPLOADING_PHOTO);
      Keyboard.dismiss();
      return false;
    }

    return isValid;
  };

  function onSubmit() {
    if (isValidData()) {
      Keyboard.dismiss();
      setIsSendingDataToServer(true);
      let payload = {
        is_artist: true,
        username,
        contact: {...userContact},
        password,
        cover_image: coverPhoto,
        profile_image: userProfileImage,
        address: {
          city: city,
          state: state,
          country: country,
        },
      };

      if (!util.hasObjectWithKey(payload, 'is_artist')) {
        payload['is_artist'] = true;
      }

      dispatch(
        personalInfoRequest(payload, res => {
          setIsSendingDataToServer(false);
          if (!!res) {
            mixpanel.track('SignUp', {
              name: username,
              contact: {...userContact},

              RegistrationMethod: 'Phone Number',
              Artist: 'Yes',
            });
            Actions.reset('chooseYourVibe');
          }
        }),
      );
    }
  }

  const renderCustomNavBar = () => (
    <CustomNavbar
      hasBack={true}
      title={strings.PERSONAL_INFO}
      titleStyle={styles.title}
      subTitle={strings.PLEASE_ENTER_DETAILS}
      shouldShowHorizontalBar={true}
    />
  );

  const renderProfileImage = () => (
    <View style={styles.userProfileView}>
      <View>
        <TouchableOpacity
          onPress={() =>
            Actions.jump('gallery', {
              setSelectedItemsHandler: uploadImageToS3AndUpdateImageView,
              shouldSelectSingleItemOnly: true,
              returnSingleItemCapturedByCamera: true,
              hasCoverIamge: false,
              isArtist: true,
              isCrop: true,
            })
          }
          style={
            userProfileImage && !isSendingImageToS3Profile
              ? {}
              : styles.userProfileImg
          }>
          <>
            <FastImage
              style={[
                styles.profileImage,
                !userProfileImage && {
                  height: 110,
                  width: 110,
                  borderRadius: 55,
                  alignSelf: 'center',
                },
              ]}
              source={
                userProfileImage
                  ? {
                      uri: userProfileImage,
                      priority: FastImage.priority.high,
                    }
                  : Images.defaultImageOnboarding
              }
              onLoad={() => {
                setIsSendingImageToS3Profile(false);
              }}
              resizeMode={
                !userProfileImage
                  ? FastImage.resizeMode.contain
                  : FastImage.resizeMode.cover
              }
            />
            <View style={styles.editProfileImgBtn}>
              <TouchableOpacity
                onPress={() =>
                  Actions.jump('gallery', {
                    setSelectedItemsHandler: uploadImageToS3AndUpdateImageView,
                    shouldSelectSingleItemOnly: true,
                    returnSingleItemCapturedByCamera: true,
                    hasCoverIamge: false,
                    isArtist: true,
                    isCrop: true,
                  })
                }></TouchableOpacity>
              {!util.isEmptyValue(userProfileImage) ? (
                <Image source={Images.editIcon} style={styles.editImgIcon} />
              ) : (
                <Text style={styles.plusText}>+</Text>
              )}
            </View>
          </>
          {isSendingImageToS3Profile && (
            <ActivityIndicator
              animating
              size="small"
              color={Colors.white}
              style={styles.imageLoader}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.profileTxtView}>
        <Text style={styles.uploadImageTxt}>{strings.UPLOAD_PROFILE_PIC}</Text>
      </View>
    </View>
  );

  function onCountryChange(_countryName) {
    setCountryError('');
    setCountry(_countryName);
  }

  const countryNamePicker = useMemo(
    () => (
      <CountryNamePicker
        _value={country}
        _error={countryError}
        setCountry={onCountryChange}
      />
    ),
    [country, countryError],
  );

  const renderAddYourAddressSec = () => (
    <View style={AppStyles.mTop20}>
      <Text style={styles.addressFormText}>{strings.ADD_YOUR_ADDRESS}</Text>

      <View style={[AppStyles.mTop30, {zIndex: 1}]}>{countryNamePicker}</View>

      <View style={[AppStyles.mTop20]}>
        <TextInput
          label={strings.STATE}
          labelStyle={styles.addressText}
          ref={stateRef}
          onSubmitEditing={() => cityRef?.current?.focus?.()}
          returnKeyType="next"
          value={state}
          onChangeText={val => {
            setStateError('');
            setState(val);
          }}
          placeholder={strings.ENTER_YOUR_STATE}
          error={stateError}
        />
      </View>

      <View style={AppStyles.mTop20}>
        <TextInput
          label={strings.CITY}
          labelStyle={styles.addressText}
          ref={cityRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          value={city}
          onChangeText={val => {
            setCityError('');
            setCity(val);
          }}
          placeholder={strings.ENTER_YOUR_CITY}
          error={cityError}
        />
      </View>
    </View>
  );

  const renderUploadCoverPhotoSec = useMemo(
    () => (
      <View style={AppStyles.mTop20}>
        <UploadCoverPhoto
          coverPhoto={coverPhoto}
          setCoverPhoto={setCoverPhoto}
          _setIsSendingImageToS3={setIsSendingImageToS3}
        />
      </View>
    ),
    [coverPhoto],
  );

  const renderSubmitBtn = () => (
    <View style={{marginVertical: 50}}>
      <OnBoardingSubmitArrow isLoading={isLoading} onButtonPress={onSubmit} />
    </View>
  );

  const renderGoToProfileModal = () => (
    <ModalView
      isModalVisible={isModalVisible}
      handleButtonOfModal={handleButtonOfModal}
      heading={strings.WELCOME_ONBOARD}
      description1={strings.NOW_YOU_CAN_POST_AND}
      description2={strings.SELLYOUR_ARTS}
      image={Images.becomeAnArtistSuccessIcon}
      buttonText={strings.GO_TO_PROFILE}
    />
  );

  const renderSpinnerLoader = () => (
    <SpinnerLoader _loading={isSendingDataToServer} />
  );

  const inputForm = () => {
    return (
      <View style={styles.textInputCont}>
        <TextInput
          label={strings.USERNAME}
          maxLength={24}
          labelStyle={styles.addressText}
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
            labelStyle={styles.addressText}
            leftIcon={Images.lockIcon}
            onPress={() => setPassVisibilty(!isPasswordVisibile)}
            secureTextEntry={isPasswordVisibile ? false : true}
            placeholderValue={strings.PASSWORD}
            ref={passwordRef}
            onSubmitEditing={() => {
              stateRef.current.focus();
            }}
            returnKeyType="next"
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

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={AppStyles.paddingHorizontalBase}
        showsVerticalScrollIndicator={false}>
        {renderProfileImage()}
        <KeyboardAwareScrollViewComponent scrollEnabled={true}>
          {renderUploadCoverPhotoSec}
          <View style={AppStyles.pBottom30}>{inputForm()}</View>
          {renderAddYourAddressSec()}
          {renderSubmitBtn()}
          {renderGoToProfileModal()}
        </KeyboardAwareScrollViewComponent>
        {renderSpinnerLoader()}
      </ScrollView>
    </View>
  );
}

PersonalInfoArtist.propTypes = {};
PersonalInfoArtist.defaultProps = {};

const mapStateToProps = ({general}) => ({
  currentLocation: general.currentLocation,
});

export default connect(mapStateToProps, null)(PersonalInfoArtist);
