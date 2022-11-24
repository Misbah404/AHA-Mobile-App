import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  createCollectionRequest,
  updateCollectionRequest,
} from '../../actions/collection';
import {
  Button,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  SpinnerLoader,
  TextInput,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {uploadImageToServer} from '../../helpers/ImageUploadHelper';
import {editCommunityRequest} from '../../actions/communityActions';

function CommunityEdit(props) {
  const {communityDetails} = props || {};
  const {image, profile_name, instagram, dribble, facebook, tiktok, id} =
    communityDetails;

  const [isSendingImageToS3, setIsSendingImageToS3] = useState(() => false);
  const [communityImage, setCommunityImage] = useState(() => image);
  const [title, setTitle] = useState(() => profile_name);
  const [titleError, setTitleError] = useState(() => '');
  const [showSpinnerLoader, setShowSpinnerLoader] = useState(() => false);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const titleRef = useRef(() => null);
  const [userFacebookLink, setUserFacebookLink] = useState(() => facebook);
  const [userInstagramLink, setUserInstagramLink] = useState(() => instagram);
  const [userTiktokLink, setUserTiktokLink] = useState(() => tiktok);
  const [userDribbleLink, setUserDribbleLink] = useState(() => dribble);
  const facebookRef = useRef(() => null);
  const instagramRef = useRef(() => null);
  const tiktokRef = useRef(() => null);
  const dribbbleRef = useRef(() => null);
  const [userFacebookLinkError, setUserFacebookLinkError] = useState(() => '');
  const [userInstagramLinkError, setUserInstagramLinkError] = useState(
    () => '',
  );
  const [userTiktokLinkError, setUserTiktokLinkError] = useState(() => '');
  const [userDribbleLinkError, setUserDribbleLinkError] = useState(() => '');
  const dispatch = useDispatch();

  function isValid() {
    let validate = true;

    setUserDribbleLinkError('');
    setUserTiktokLinkError('');
    setUserInstagramLinkError('');
    setUserFacebookLinkError('');
    if (util.isFieldNil(communityImage)) {
      util.topAlertError(strings.PLEASE_UPLOAD_COMMUNITY_IMAGE);
      validate = false;
    }

    if (util.isEmptyValue(title)) {
      setTitleError(strings.REQUIRED_FIELD);
      titleRef?.current?.focus?.();
      validate = false;
    }

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
    if (validate) Keyboard.dismiss();
    return validate;
  }

  function uploadImageToS3AndUpdateImageView(_image) {
    uploadImageToServer(_image.uri, setCommunityImage, setIsSendingImageToS3);
  }

  function onSubmit() {
    if (!!isValid()) {
      setIsSendingDataToServer(true);
      const payload = {
        name: title,
        image: communityImage,
        instagram: userInstagramLink,
        dribble: userDribbleLink,
        facebook: userFacebookLink,
        tiktok: userTiktokLink,
      };
      const params = `${id}`;
      dispatch(
        editCommunityRequest(params, payload, res => {
          if (res) {
            Actions.pop();
          }
          setIsSendingDataToServer(false);
        }),
      );
    }
  }

  const renderCustomNavBar = useMemo(
    () => (
      <CustomNavbar
        hasBack
        title={'Edit Community'}
        titleStyle={AppStyles.titleStyleForCenter}
      />
    ),
    [],
  );

  const renderImageLoader = () => (
    <ActivityIndicator
      animating
      size="small"
      color={Colors.white}
      style={styles.imageLoader}
    />
  );

  const renderCommunityImageView = useMemo(
    () => (
      <View style={styles.profileImageView}>
        {/* <View style={{position: 'relative'}}>
          <FastImage
            imageStyle={styles.imageStyle}
            style={styles.coverImage}
            onLoad={() => setIsSendingImageToS3(false)}
            source={{
              uri: communityImage,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}>
            {isSendingImageToS3 && renderImageLoader()}
          </FastImage>
          <View style={[styles.editProfileImgBtn]}>
            <TouchableOpacity
              onPress={() =>
                Actions.jump('gallery', {
                  setSelectedItemsHandler: uploadImageToS3AndUpdateImageView,
                  shouldSelectSingleItemOnly: true,
                  returnSingleItemCapturedByCamera: true,
                  hasCoverIamge: true,
                  isArtist: true,
                })
              }>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={{position: 'relative'}}>
          <View style={styles.profileImageCont}>
            <FastImage
              style={styles.profileImage}
              source={{
                uri: communityImage,
                priority: FastImage.priority.high,
              }}
              onLoad={() => setIsSendingImageToS3(false)}
              resizeMode={FastImage.resizeMode.cover}
            />

            {isSendingImageToS3 && renderImageLoader()}
          </View>
          <View style={[styles.editProfileImgBtn]}>
            <TouchableOpacity
              onPress={() =>
                Actions.jump('gallery', {
                  setSelectedItemsHandler: uploadImageToS3AndUpdateImageView,
                  shouldSelectSingleItemOnly: true,
                  returnSingleItemCapturedByCamera: true,
                  hasCoverIamge: false,
                  isArtist: true,
                  isCrop: false,
                })
              }>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [communityImage, isSendingImageToS3],
  );

  const renderAddTitleSection = () => (
    <View style={{marginHorizontal: 10}}>
      <TextInput
        label={strings.NAME}
        value={title}
        maxLength={100}
        placeholder={strings.NATURAL_ART}
        labelStyle={styles.labelStyle}
        onSubmitEditing={() => Keyboard.dismiss()}
        ref={titleRef}
        onChangeText={val => {
          setTitleError('');
          setTitle(val);
        }}
        returnKeyType="done"
        error={titleError}
      />
    </View>
  );
  const renderSocialMediaLinksOptions = () => (
    <View style={[styles.textInputMainView, AppStyles.mBottom20]}>
      <Text style={styles.socialLinkHeading}>{strings.LINK}</Text>

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
  const renderSaveBtn = () => (
    <View style={styles.buttonView}>
      <Button
        color={Colors.text.white}
        style={styles.button}
        textStyle={styles.buttonText}
        disabled={isSendingDataToServer || isSendingImageToS3}
        isLoading={isSendingDataToServer}
        onPress={() => onSubmit()}>
        {strings.SAVE}
      </Button>
    </View>
  );

  const renderSpinnerLoader = () => (
    <SpinnerLoader _loading={showSpinnerLoader} />
  );
  return (
    <>
      {renderCustomNavBar}
      {renderSpinnerLoader()}
      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        style={styles.container}>
        <>
          {renderCommunityImageView}
          {renderAddTitleSection()}
          {renderSocialMediaLinksOptions()}
          {renderSaveBtn()}
        </>
      </KeyboardAwareScrollViewComponent>
    </>
  );
}

CommunityEdit.propTypes = {
  collectionId: PropTypes.number,
  setCollectionTitle: PropTypes.func,
};
CommunityEdit.defaultProps = {
  collectionId: -1,
  setCollectionTitle: Function(),
};

const mapStateToProps = ({vibes, user}) => ({});

export default connect(mapStateToProps, null)(CommunityEdit);
