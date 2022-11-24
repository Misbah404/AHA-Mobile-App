import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  becomeAnArtistRequest,
  getSelectedCommunitiesRequest,
  getSelectedInterestsRequest,
  getSelectedVibesRequest,
} from '../../actions/UserActions';
import {
  Button,
  CountryNamePicker,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  Loader,
  ModalView,
  SpinnerLoader,
  TextInput,
} from '../../components';
import SelectedCommunity from '../../components/SelectedCommunity';
import SelectedVibeAndInterestItem from '../../components/SelectedVibeAndInterestItem';
import UploadCoverPhoto from '../../components/UploadCoverPhoto';
import {MAIN_TABS_DATA, strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

function BecomeAnArtistFormController(props) {
  const {
    userData,
    _allVibesList,
    _allInterestsList,
    _allCommunitiesList,
    _selectedVibesList,
    _selectedInterestsList,
    _selectedCommunitiesList,
    currentLocation,
  } = props || {};
  const {name, userName} = userData || '';
  const {profileImage} = userData || undefined;

  const [isTermAndConditionCheck, showTermAndConditionCheck] = useState(
    () => false,
  );
  const [isModalVisible, showModalVisibility] = useState(() => false);
  const stateRef = useRef(() => null);
  const cityRef = useRef(() => null);
  const [country, setCountry] = useState(() =>
    currentLocation?.country ? currentLocation?.country : '',
  );
  const [state, setState] = useState(() => '');
  const [city, setCity] = useState(() => '');
  const [countryError, setCountryError] = useState(() => '');
  const [stateError, setStateError] = useState(() => '');
  const [cityError, setCityError] = useState(() => '');
  const [selectedVibesList, setSelectedVibesList] = useState(
    () => _selectedVibesList,
  );
  const [selectedInterestsList, setSelectedInterestsList] = useState(
    () => _selectedInterestsList,
  );
  const [selectedCommunitiesList, setSelectedCommunitiesList] = useState(
    () => _selectedCommunitiesList,
  );
  const [coverPhoto, setCoverPhoto] = useState(() => undefined);
  const [isSendingImageToS3, setIsSendingImageToS3] = useState(() => false);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const [
    isGettingSelectedVibesFromServer,
    setIsGettingSelectedVibesFromServer,
  ] = useState(() => false);
  const [
    isGettingSelectedInterestsFromServer,
    setIsGettingSelectedInterestsFromServer,
  ] = useState(() => false);
  const [
    isGettingSelectedCommunitiesFromServer,
    setIsGettingSelectedCommunitiesFromServer,
  ] = useState(() => false);
  const dispatch = useDispatch();

  useEffect(() => {
    mixpanel.track('Visit', {PageName: 'Become an Artist '});
  }, []);

  useEffect(() => {
    setIsGettingSelectedVibesFromServer(true);
    dispatch(
      getSelectedVibesRequest(function () {
        setIsGettingSelectedVibesFromServer(false);
      }),
    );
  }, [_allVibesList]);

  useEffect(() => {
    setSelectedVibesList(_selectedVibesList);
  }, [_selectedVibesList]);

  useEffect(() => {
    setIsGettingSelectedInterestsFromServer(true);
    dispatch(
      getSelectedInterestsRequest(function () {
        setIsGettingSelectedInterestsFromServer(false);
      }),
    );
  }, [_allInterestsList]);

  useEffect(() => {
    setSelectedInterestsList(_selectedInterestsList);
  }, [_selectedInterestsList]);

  useEffect(() => {
    setIsGettingSelectedCommunitiesFromServer(true);
    dispatch(
      getSelectedCommunitiesRequest(function () {
        setIsGettingSelectedCommunitiesFromServer(false);
      }),
    );
  }, [_allCommunitiesList]);

  useEffect(() => {
    setSelectedCommunitiesList(_selectedCommunitiesList);
  }, [_selectedCommunitiesList]);

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

    if (!!!isTermAndConditionCheck && !!isValid) {
      util.topAlertError(strings.PLEASE_CHECK_TERMS_AND_CONDITIONS);
      Keyboard.dismiss();
      return false;
    }

    if (util.isEmptyValue(coverPhoto)) {
      util.topAlertError(strings.PLEASE_UPLOAD_COVER_PHOTO);
      Keyboard.dismiss();
      return false;
    }

    return isValid;
  };

  function onSubmit() {
    if (isValidData()) {
      Keyboard.dismiss();
      setIsSendingDataToServer(true);
      const payload = {
        vibes: util.getIdsFromArray(selectedVibesList),
        interests: util.getIdsFromArray(selectedInterestsList),
        communities: util.getIdsFromArray(selectedCommunitiesList),
        cover_image: coverPhoto,
        address: {
          city: city,
          state: state,
          country: country,
        },
      };

      dispatch(
        becomeAnArtistRequest(payload, res => {
          setIsSendingDataToServer(false);
          if (!!res) showModalVisibility(true);
        }),
      );
    }
  }

  function deleteItemPressHandler(mId, mArr, mFuncToSetDataIntoState) {
    const mDataArr = util.cloneDeepArray(mArr);
    const mFilteredData = util.filterArray(mDataArr, item => item.id != mId);
    mFuncToSetDataIntoState(mFilteredData);
  }

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.BECOME_AN_ARTIST}
      hasBack
      titleStyle={[styles.navbarText, AppStyles.titleStyleForLeft]}
    />
  );

  const getUserName = () => {
    return `${util.upperFirst(userName)}`;
  };

  const renderProfileNameAndImageSec = () => (
    <View style={styles.userProfileView}>
      <Text style={styles.userNameText} numberOfLines={1}>
        Hi {getUserName()}!
      </Text>
      <Image source={{uri: profileImage}} style={styles.userProfileImg} />
    </View>
  );

  const renderTitleAndSearchSec = (_title, onPress) => (
    <>
      <Text style={styles.title}>{_title}</Text>
      <TouchableOpacity style={styles.searchView} onPress={onPress}>
        <Text style={styles.searchText}>{strings.SEARCH_HERE}</Text>
        <View style={styles.borderLine} />
      </TouchableOpacity>
    </>
  );

  const renderLoader = () => (
    <View style={AppStyles.marginVerticalBase}>
      <Loader loading={true} />
    </View>
  );

  const renderAddYourVibeSec = () => (
    <View style={AppStyles.mTop10}>
      {renderTitleAndSearchSec(strings.ADD_YOUR_VIBE, () => Actions.yourVibe())}
      {isGettingSelectedVibesFromServer ? renderLoader() : <></>}
      <FlatList
        numColumns={2}
        keyExtractor={(_, index) => index}
        showsHorizontalScrollIndicator={false}
        data={selectedVibesList}
        renderItem={item => {
          return (
            <SelectedVibeAndInterestItem
              _item={item.item}
              onCrossIconPress={id =>
                deleteItemPressHandler(
                  id,
                  selectedVibesList,
                  setSelectedVibesList,
                )
              }
            />
          );
        }}
      />
    </View>
  );

  const renderAddYourInterestSec = () => (
    <View style={AppStyles.mTop20}>
      {renderTitleAndSearchSec(strings.ADD_YOUR_INTEREST, () =>
        // Actions.searchInterest(),
        Actions.yourInterest(),
      )}
      {isGettingSelectedInterestsFromServer ? renderLoader() : <></>}
      <FlatList
        numColumns={2}
        keyExtractor={(_, index) => index}
        showsHorizontalScrollIndicator={false}
        data={selectedInterestsList}
        renderItem={item => {
          return (
            <SelectedVibeAndInterestItem
              _item={item.item}
              onCrossIconPress={id =>
                deleteItemPressHandler(
                  id,
                  selectedInterestsList,
                  setSelectedInterestsList,
                )
              }
            />
          );
        }}
      />
    </View>
  );

  const renderAddYourCommunitySec = () => (
    <View style={AppStyles.mTop20}>
      {renderTitleAndSearchSec(strings.ADD_COMMUNITY, () =>
        Actions.searchCommunity(),
      )}
      {isGettingSelectedCommunitiesFromServer ? renderLoader() : <></>}
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={selectedCommunitiesList}
        keyExtractor={(_, index) => index}
        horizontal
        renderItem={item => {
          return (
            <SelectedCommunity
              _item={item.item}
              onCrossIconPress={id =>
                deleteItemPressHandler(
                  id,
                  selectedCommunitiesList,
                  setSelectedCommunitiesList,
                )
              }
            />
          );
        }}
      />
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

  const renderTermsAndConditionSec = () => {
    return (
      <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
        <TouchableOpacity
          style={[AppStyles.flexRow]}
          onPress={() => showTermAndConditionCheck(!isTermAndConditionCheck)}>
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
        <TouchableOpacity onPress={() => Actions.jump('termsAndConditions')}>
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

  const renderUploadCoverPhotoSec = useMemo(
    () => (
      <View style={AppStyles.mTop60}>
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
    <Button
      style={styles.buttonView}
      textStyle={styles.button}
      disabled={isSendingImageToS3}
      onPress={onSubmit}>
      {strings.SUBMIT}
    </Button>
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
      isWelComeOnboard={true}
    />
  );

  const renderSpinnerLoader = () => (
    <SpinnerLoader _loading={isSendingDataToServer} />
  );

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      {renderProfileNameAndImageSec()}
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={AppStyles.paddingHorizontalBase}
        showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollViewComponent scrollEnabled={true}>
          {renderAddYourVibeSec()}
          {renderAddYourInterestSec()}
          {/* {renderAddYourCommunitySec()} */}
          {renderAddYourAddressSec()}

          {renderTermsAndConditionSec()}
          {renderUploadCoverPhotoSec}
          {renderSubmitBtn()}
          {renderGoToProfileModal()}
        </KeyboardAwareScrollViewComponent>
        {renderSpinnerLoader()}
      </ScrollView>
    </View>
  );
}

BecomeAnArtistFormController.propTypes = {};
BecomeAnArtistFormController.defaultProps = {};

const mapStateToProps = ({user, vibes, interests, community, general}) => ({
  userData: user.data,
  _allVibesList: vibes.vibesList,
  _allInterestsList: interests.interestsList,
  _allCommunitiesList: community.communitiesList,
  _selectedVibesList: user.selected_vibes,
  _selectedInterestsList: user.selected_interests,
  _selectedCommunitiesList: user.selected_communities,
  currentLocation: general.currentLocation,
});

export default connect(mapStateToProps, null)(BecomeAnArtistFormController);
