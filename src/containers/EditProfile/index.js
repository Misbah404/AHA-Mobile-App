import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _, {truncate} from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {editProfileRequest} from '../../actions/UserActions';
import {
  BecomeAnArtistButton,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  TextInput,
  CountryNamePicker,
  ModalEditProfile,
  ModalView,
} from '../../components';
import UploadCoverPhoto from '../../components/UploadCoverPhoto';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {uploadImageToServer} from '../../helpers/ImageUploadHelper';
import {mixpanel} from '../../helpers/mixpanelHelper';

function EditProfileController(props) {
  const {userDetails, screen, isModalVisible, currentLocation} = props;
  const {
    name: _name,
    userName: _userName,
    bio: _bio,
    facebookLink,
    instagramLink,
    tiktokLink,
    dribbleLink,
    profileImage = undefined,
    address,
    cover_image = undefined,
    loginBubbleUserFirstTime,
    loginType,
    isArtist,
  } = userDetails || '';
  const {state, city, country} = address || {};
  const stateRef = useRef(() => null);
  const cityRef = useRef(() => null);
  const [name, setName] = useState(() => _name);
  const [userProfileImage, setUserProfileImage] = useState(() => profileImage);
  const [userName, setUserName] = useState(() => _userName);
  const [userBio, setUserBio] = useState(() => _bio);
  const [userFacebookLink, setUserFacebookLink] = useState(() => facebookLink);
  const [userInstagramLink, setUserInstagramLink] = useState(
    () => instagramLink,
  );
  const [userTiktokLink, setUserTiktokLink] = useState(() => tiktokLink);
  const [userDribbleLink, setUserDribbleLink] = useState(() => dribbleLink);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const [stateEdit, setStateEdit] = useState(() => state);
  const [cityEdit, setCityEdit] = useState(() => city);
  const [stateError, setStateError] = useState(() => '');
  const [cityError, setCityError] = useState(() => '');
  const [isSendingImageToS3, setIsSendingImageToS3] = useState(() => false);
  const [isCoverLoader, setIsCoverLoader] = useState(() => false);
  const nameRef = useRef(() => null);
  const usernameRef = useRef(() => null);
  const bioRef = useRef(() => null);
  const facebookRef = useRef(() => null);
  const instagramRef = useRef(() => null);
  const tiktokRef = useRef(() => null);
  const dribbbleRef = useRef(() => null);

  const [nameError, setNameError] = useState(() => '');
  const [userNameError, setUserNameError] = useState(() => '');
  const [userBioError, setUserBioError] = useState(() => '');
  const [coverPhoto, setCoverPhoto] = useState(() => cover_image);
  const [userFacebookLinkError, setUserFacebookLinkError] = useState(() => '');
  const [userInstagramLinkError, setUserInstagramLinkError] = useState(
    () => '',
  );
  const [countryEdit, setCountryEdit] = useState(() =>
    country ? country : currentLocation.country,
  );
  const [countryError, setCountryError] = useState(() => '');

  const [userTiktokLinkError, setUserTiktokLinkError] = useState(() => '');
  const [userDribbleLinkError, setUserDribbleLinkError] = useState(() => '');
  const [isKeyboardVisible, setKeyboardVisible] = useState(() => false);
  const [isVisibleFirtTimeUserModal, setIsVisibleFirtTimeUserModal] = useState(
    () => isModalVisible,
  );
  const dispatch = useDispatch();

  const isUserProfile = util.areValuesEqual(screen, 'userProfile');

  useEffect(() => {
    mixpanel.track('Visit', {PageName: 'Edit Profile'});
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const uploadToServer = _image => {
    uploadImageToServer(_image.uri, setUserProfileImage, setIsSendingImageToS3);
  };
  const validation = () => {
    let validate = true;
    setNameError('');
    setUserNameError('');
    setUserBioError('');

    if (!!!isUserProfile) {
      setUserDribbleLinkError('');
      setUserTiktokLinkError('');
      setUserInstagramLinkError('');
      setUserFacebookLinkError('');
      if (
        !util.isEmptyValueWithoutTrim(userDribbleLink) &&
        !util.isValidURL(userDribbleLink)
      ) {
        setUserDribbleLinkError(strings.INVALID_URL_FOUND);
        dribbbleRef?.current?.focus?.();
        validate = false;
      }

      if (
        !util.isEmptyValueWithoutTrim(userTiktokLink) &&
        !util.isValidURL(userTiktokLink)
      ) {
        setUserTiktokLinkError(strings.INVALID_URL_FOUND);
        tiktokRef?.current?.focus?.();
        validate = false;
      }

      if (
        !util.isEmptyValueWithoutTrim(userInstagramLink) &&
        !util.isValidURL(userInstagramLink)
      ) {
        setUserInstagramLinkError(strings.INVALID_URL_FOUND);
        instagramRef?.current?.focus?.();
        validate = false;
      }

      if (
        !util.isEmptyValueWithoutTrim(userFacebookLink) &&
        !util.isValidURL(userFacebookLink)
      ) {
        setUserFacebookLinkError(strings.INVALID_URL_FOUND);
        facebookRef?.current?.focus?.();
        validate = false;
      }
      if (util.isEmptyValue(coverPhoto)) {
        util.topAlertError(strings.PLEASE_UPLOAD_COVER_PHOTO);
        Keyboard.dismiss();
        return false;
      }
      if (util.isEmptyValue(cityEdit)) {
        setCityError(strings.REQUIRED_FIELD);
        cityRef?.current?.focus?.();
        validate = false;
      } else if (!util.isValidName(cityEdit)) {
        setCityError(strings.INVALID_CITY);
        cityRef?.current?.focus?.();
        validate = false;
      }

      if (util.isEmptyValue(stateEdit)) {
        setStateError(strings.REQUIRED_FIELD);
        stateRef?.current?.focus?.();
        validate = false;
      } else if (!util.isValidName(stateEdit)) {
        setStateError(strings.INVALID_STATE);
        stateRef?.current?.focus?.();
        validate = false;
      }
      if (util.isEmptyValue(countryEdit)) {
        setCountryError(strings.REQUIRED_FIELD);
        validate = false;
      }

      if (isSendingImageToS3) {
        Keyboard.dismiss();
        return false;
      }
      if (isCoverLoader) {
        Keyboard.dismiss();
        return false;
      }
      if (isCoverLoader && isSendingImageToS3) {
        Keyboard.dismiss();
        return false;
      }
    }
    if (!util.isEmptyValueWithoutTrim(name)) {
      if (util.isEmptyValue(name)) {
        setNameError(strings.INVALID_NAME);
        nameRef?.current?.focus?.();
        validate = false;
      }
    }
    if (util.isEmptyValue(userName)) {
      setUserNameError(strings.REQUIRED_FIELD);
      usernameRef?.current?.focus?.();
      validate = false;
    } else if (!util.isValidUserName(userName)) {
      setUserNameError(strings.FOR_VALID_USERNAME);
      usernameRef?.current?.focus?.();
      validate = false;
    }
    if (isSendingImageToS3) {
      Keyboard.dismiss();
      return false;
    }
    if (!!validate) Keyboard.dismiss();
    return validate;
  };

  const onSubmit = () => {
    if (validation()) {
      setIsSendingDataToServer(true);
      const payload = {
        name: name,
        username: userName,
        bio: util.trim(userBio),
        profile_image: userProfileImage,
      };
      if (!isUserProfile) {
        payload['facebook'] = userFacebookLink;
        payload['instagram'] = userInstagramLink;
        payload['tiktok'] = userTiktokLink;
        payload['dribble'] = userDribbleLink;
        payload['cover_image'] = coverPhoto;
        payload['address'] = {
          city: cityEdit,
          state: stateEdit,
          country: countryEdit,
        };
      }
      dispatch(
        editProfileRequest(payload, res => {
          setIsSendingDataToServer(false);
          if (res) {
            if (isModalVisible) {
              Actions.reset('dashboard');
            } else {
              Actions.replace('_profile_tab');
            }
          }
        }),
      );
    }
  };

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.EDIT_PROFILE}
      titleStyle={AppStyles.titleStyleForCenter}
      style={AppStyles.mBottom0}
      rightBtnImage={
        isSendingImageToS3 || isCoverLoader
          ? Images.clickDisable
          : Images.rightIconLight
      }
      disableRightBtnImage={isSendingImageToS3 || isCoverLoader}
      rightBtnPress={() => onSubmit()}
      leftBtnImage={Images.crossIconLight}
      rightImageStyle={{width: 22, height: 22}}
      leftBtnPress={() => {
        if (isModalVisible) {
          Actions.reset('dashboard');
        } else {
          Actions.pop();
        }
      }}
      leftRightButtonWrapperStyle={AppStyles.centerInner}
    />
  );

  const renderLoader = () => (
    <ActivityIndicator
      animating
      size="small"
      color={Colors.white}
      style={styles.imageLoader}
    />
  );

  const renderProfileImageView = () => (
    <View style={styles.profileImageView}>
      <View style={{position: 'relative'}}>
        <View style={styles.profileImageCont}>
          <FastImage
            style={styles.profileImage}
            source={{
              uri: userProfileImage,
              priority: FastImage.priority.high,
            }}
            onLoad={() => setIsSendingImageToS3(false)}
            resizeMode={FastImage.resizeMode.cover}
          />
          {isSendingImageToS3 && renderLoader()}
        </View>
        <View style={styles.editProfileImgBtn}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              Actions.jump('gallery', {
                setSelectedItemsHandler: uploadToServer,
                shouldSelectSingleItemOnly: true,
                returnSingleItemCapturedByCamera: true,
                hasCoverIamge: false,
                isArtist: isArtist,
                isCrop: true,
              });
            }}>
            <Image source={Images.editIcon} style={styles.editImgIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderUserInfoTextInputFields = () => (
    <View style={styles.textInputMainView}>
      <View>
        <TextInput
          label={strings.NAME}
          placeholder={strings.NAME}
          labelStyle={styles.textInputLabel}
          onChangeText={name => {
            setNameError('');
            setName(name);
          }}
          maxLength={30}
          ref={nameRef}
          onSubmitEditing={() => usernameRef?.current?.focus?.()}
          returnKeyType="next"
          textInputValue={name}
          error={nameError}
        />
      </View>

      <View style={[AppStyles.mTop25]}>
        <TextInput
          label={strings.USERNAME}
          placeholder={strings.USERNAME}
          labelStyle={styles.textInputLabel}
          onChangeText={userName => {
            setUserNameError('');
            setUserName(userName);
          }}
          maxLength={24}
          ref={usernameRef}
          onSubmitEditing={() => bioRef?.current?.focus?.()}
          returnKeyType="next"
          textInputValue={userName}
          error={userNameError}
        />
      </View>

      <View style={[AppStyles.mTop25]}>
        <TextInput
          label={strings.BIO}
          placeholder={strings.BIO}
          maxLength={80}
          labelStyle={styles.textInputLabel}
          onChangeText={userBio => {
            setUserBioError('');
            setUserBio(userBio);
          }}
          ref={bioRef}
          returnKeyType={!isUserProfile ? 'next' : util.lowerCase(strings.DONE)}
          onSubmitEditing={
            !isUserProfile
              ? () => facebookRef?.current?.focus?.()
              : () => onSubmit()
          }
          textInputValue={userBio}
          error={userBioError}
        />
      </View>
    </View>
  );

  const renderSocialMediaLinksOptions = () => (
    <View style={[styles.textInputMainView, AppStyles.mBottom20]}>
      <Text style={styles.socialLinkHeading}>{strings.ADD_SOCIAL_LINK}</Text>

      <View>
        <TextInput
          label={strings.FACEBOOK}
          placeholder={strings.ADD_HERE}
          labelStyle={styles.textInputLabel}
          onChangeText={link => {
            setUserFacebookLinkError('');
            setUserFacebookLink(link);
          }}
          ref={facebookRef}
          onSubmitEditing={() => instagramRef?.current?.focus?.()}
          returnKeyType="next"
          textInputValue={userFacebookLink}
          error={userFacebookLinkError}
        />
      </View>

      <View style={[AppStyles.mTop25]}>
        <TextInput
          label={strings.INSTAGRAM}
          placeholder={strings.ADD_HERE}
          labelStyle={styles.textInputLabel}
          onChangeText={link => {
            setUserInstagramLinkError('');
            setUserInstagramLink(link);
          }}
          ref={instagramRef}
          onSubmitEditing={() => tiktokRef?.current?.focus?.()}
          returnKeyType="next"
          textInputValue={userInstagramLink}
          error={userInstagramLinkError}
        />
      </View>

      <View style={[AppStyles.mTop25]}>
        <TextInput
          label={strings.TIKTOK}
          placeholder={strings.ADD_HERE}
          labelStyle={styles.textInputLabel}
          onChangeText={link => {
            setUserTiktokLinkError('');
            setUserTiktokLink(link);
          }}
          ref={tiktokRef}
          onSubmitEditing={() => dribbbleRef?.current?.focus?.()}
          returnKeyType="next"
          textInputValue={userTiktokLink}
          error={userTiktokLinkError}
        />
      </View>

      <View style={[AppStyles.mTop25]}>
        <TextInput
          label={strings.DRIBBBLE}
          placeholder={strings.ADD_HERE}
          labelStyle={styles.textInputLabel}
          onChangeText={link => {
            setUserDribbleLinkError('');
            setUserDribbleLink(link);
          }}
          ref={dribbbleRef}
          onSubmitEditing={() => onSubmit()}
          returnKeyType="done"
          textInputValue={userDribbleLink}
          error={userDribbleLinkError}
        />
      </View>
    </View>
  );

  const renderSpinnerLoader = () => (
    <Spinner
      visible={isSendingDataToServer}
      color={'#5D3FD3'}
      size={'large'}
      overlayColor="rgba(1, 1, 1, 0.85)"
      textStyle={{color: 'white', fontWeight: '600'}}
    />
  );

  const renderUploadCoverPhotoSec = useMemo(
    () => (
      <View style={AppStyles.mTop20}>
        <UploadCoverPhoto
          coverPhoto={coverPhoto}
          setCoverPhoto={setCoverPhoto}
          _setIsSendingImageToS3={setIsCoverLoader}
        />
      </View>
    ),
    [coverPhoto],
  );

  const countryNamePicker = useMemo(
    () => (
      <CountryNamePicker
        _value={countryEdit}
        _error={countryError}
        setCountry={onCountryChange}
      />
    ),
    [countryEdit, countryError],
  );
  function onCountryChange(_countryName) {
    setCountryError('');
    setCountryEdit(_countryName);
  }

  const renderYourAddressSec = () => (
    <View style={[AppStyles.mTop20, {marginLeft: 20}]}>
      <Text style={styles.addressFormText}>{strings.CHANGE_YOUR_ADDRESS}</Text>

      <View style={[AppStyles.mTop30, {zIndex: 1}]}>{countryNamePicker}</View>

      <View style={[AppStyles.mTop20]}>
        <TextInput
          label={strings.STATE}
          labelStyle={styles.addressText}
          ref={stateRef}
          onSubmitEditing={() => cityRef?.current?.focus?.()}
          returnKeyType="next"
          value={stateEdit}
          onChangeText={val => {
            setStateError('');
            setStateEdit(val);
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
          onSubmitEditing={onSubmit}
          value={cityEdit}
          onChangeText={val => {
            setCityError('');
            setCityEdit(val);
          }}
          placeholder={strings.ENTER_YOUR_CITY}
          error={cityError}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.mainContSec}>
      {renderCustomNavBar()}
      {renderSpinnerLoader()}
      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        style={styles.container}>
        {renderProfileImageView()}
        {!!!isUserProfile && renderUploadCoverPhotoSec}
        {renderUserInfoTextInputFields()}
        {!!!isUserProfile && renderYourAddressSec()}
        {!!!isUserProfile && renderSocialMediaLinksOptions()}
      </KeyboardAwareScrollViewComponent>
      {isVisibleFirtTimeUserModal && (
        <ModalEditProfile
          isModalVisible={isVisibleFirtTimeUserModal}
          setModalVisible={setIsVisibleFirtTimeUserModal}
          heading={strings.WELCOME_ONBOARD}
          description1={strings.PLEASE_UPDATE_YOUR_PROFILE}
          image={Images.becomeAnArtistSuccessIcon}
          buttonText={strings.UPDATE}
          isWelComeOnboard={true}
        />
      )}
      {isUserProfile && !isKeyboardVisible && (
        <View style={[AppStyles.flex, {justifyContent: 'flex-end'}]}>
          <BecomeAnArtistButton
            onPress={() => {
              Actions.becomeAnArtistForm();
            }}
          />
        </View>
      )}
    </View>
  );
}
EditProfileController.propTypes = {
  screen: PropTypes.string,
};
EditProfileController.defaultProps = {screen: ''};

const mapStateToProps = ({user, general}) => ({
  userDetails: user.data,
  currentLocation: general.currentLocation,
});

export default connect(mapStateToProps, null)(EditProfileController);
