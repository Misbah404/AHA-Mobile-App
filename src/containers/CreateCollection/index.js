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
  getCollectionDetailsByIdRequest,
  updateCollectionRequest,
} from '../../actions/collection';
import {
  Button,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  SpinnerLoader,
  TextInput,
} from '../../components';
import SelectedVibeAndInterestItem from '../../components/SelectedVibeAndInterestItem';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {uploadImageToServer} from '../../helpers/ImageUploadHelper';
import {mixpanel} from '../../helpers/mixpanelHelper';

const CreateCollection = props => {
  const {isEditCollectionView, collectionId, setCollectionTitle} = props || {};
  const [isSendingImageToS3, setIsSendingImageToS3] = useState(() => false);
  const [collectionImage, setCollectionImage] = useState(() => undefined);
  const [isPublicCollectionSelected, setIsPublicCollectionSelected] = useState(
    () => false,
  );
  const [title, setTitle] = useState(() => '');
  const [titleError, setTitleError] = useState(() => '');
  const [selectedVibesList, setSelectedVibesList] = useState(() => []);
  const [vibesListError, setVibesListError] = useState(() => '');
  const [showSpinnerLoader, setShowSpinnerLoader] = useState(() => false);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const titleRef = useRef(() => null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!isEditCollectionView) {
      setShowSpinnerLoader(true);
      dispatch(
        getCollectionDetailsByIdRequest(collectionId, function (res, data) {
          if (res) {
            const {
              title = '',
              is_public = false,
              image = undefined,
              vibes = [],
            } = data;
            setTitle(title);
            setIsPublicCollectionSelected(is_public);
            setCollectionImage(image);
            setSelectedVibesList(vibes);
          }
          setShowSpinnerLoader(false);
        }),
      );
    }
    mixpanel.track('Visit', {
      PageName: 'Create Collection',
    });
  }, []);

  function selectedVibesListCallBack(_list = []) {
    setSelectedVibesList(_list);
  }

  function isValid() {
    let isValidData = true;

    if (util.isFieldNil(collectionImage)) {
      util.topAlertError(strings.PLEASE_UPLOAD_COLLECTION_IMAGE);
      isValidData = false;
    }

    if (util.isEmptyValue(title)) {
      setTitleError(strings.REQUIRED_FIELD);
      titleRef?.current?.focus?.();
      isValidData = false;
    }
    if (util.isArrayEmpty(selectedVibesList)) {
      setVibesListError(strings.REQUIRED_FIELD);
      isValidData = false;
    }
    if (isValidData) Keyboard.dismiss();
    return isValidData;
  }

  function onSubmitOrUpdateCollection() {
    if (!!isValid()) {
      setIsSendingDataToServer(true);
      const payload = {
        title: title,
        image: collectionImage,
        is_public: isPublicCollectionSelected,
        vibes: util.getIdsFromArray(selectedVibesList),
      };
      if (!!isEditCollectionView) {
        dispatch(
          updateCollectionRequest(collectionId, payload, res => {
            if (res) {
              setCollectionTitle(title);
              Actions.pop();
            }
            setIsSendingDataToServer(false);
          }),
        );
      } else {
        dispatch(
          createCollectionRequest(payload, res => {
            if (res) Actions.pop();
            setIsSendingDataToServer(false);
          }),
        );
      }
    }
  }

  function deleteItemPressHandler(mId, mArr, mFuncToSetDataIntoState) {
    const mDataArr = util.cloneDeepArray(mArr);
    const mFilteredData = util.filterArray(mDataArr, item => item.id != mId);
    mFuncToSetDataIntoState(mFilteredData);
  }

  function uploadImageToS3AndUpdateImageView(_image) {
    uploadImageToServer(_image.uri, setCollectionImage, setIsSendingImageToS3);
  }

  const renderCustomNavBar = useMemo(
    () => (
      <CustomNavbar
        hasBack
        title={
          isEditCollectionView
            ? strings.EDIT_COLLECTION
            : strings.CREATE_COLLECTION
        }
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

  const renderCollectionImageView = useMemo(
    () => (
      <View style={styles.profileImageView}>
        <View style={{position: 'relative'}}>
          <View style={styles.profileImageCont}>
            <FastImage
              style={styles.profileImage}
              source={{
                uri: collectionImage,
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
              {!!isEditCollectionView ? (
                <Image source={Images.editIcon} style={styles.editImgIcon} />
              ) : (
                <Text style={styles.plusText}>+</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [collectionImage, isSendingImageToS3],
  );

  const renderAddTitleSection = () => (
    <TextInput
      label={strings.ADD_TITLE}
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
  );

  const renderTitleAndSearchSec = (_title, onPress) => (
    <>
      <Text style={styles.title}>{_title}</Text>
      <TouchableOpacity style={styles.searchView} onPress={onPress}>
        <Text style={styles.searchText}>{strings.SEARCH_HERE}</Text>
        <View style={styles.borderLine} />
        {!util.isEmptyValue(vibesListError) && (
          <Text style={styles.errorText}>{vibesListError}</Text>
        )}
      </TouchableOpacity>
    </>
  );

  const renderAddYourVibeSec = useMemo(
    () => (
      <View style={AppStyles.mTop30}>
        {renderTitleAndSearchSec(strings.ADD_COLLECTION_VIBE, () => {
          setVibesListError('');
          Actions.searchVibe({
            _selectedVibes: selectedVibesList,
            callBack: selectedVibesListCallBack,
          });
        })}
        <FlatList
          numColumns={2}
          keyExtractor={(_, index) => index}
          showsHorizontalScrollIndicator={false}
          data={selectedVibesList}
          contentContainerStyle={AppStyles.mTop5}
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
    ),
    [selectedVibesList, vibesListError],
  );

  const renderPrivateAndPublicBtn = (_onPress, isSelected, btnText) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.privacyView, isSelected && styles.privacyViewSelected]}
      onPress={() => _onPress()}>
      <Text
        style={[styles.privacyText, isSelected && styles.privacyTextSelected]}>
        {btnText}
      </Text>
      {isSelected && (
        <Image source={Images.rightIconLight} resizeMode={'contain'} />
      )}
    </TouchableOpacity>
  );

  const renderCollectionPrivacySection = () => (
    <View style={AppStyles.mTop30}>
      <Text style={styles.labelStyle}>{strings.COLLECTION_PRIVACY}</Text>
      <View style={styles.privacyMainView}>
        {renderPrivateAndPublicBtn(
          () => setIsPublicCollectionSelected(false),
          !!!isPublicCollectionSelected,
          strings.PRIVATE,
        )}

        {renderPrivateAndPublicBtn(
          () => setIsPublicCollectionSelected(true),
          !!isPublicCollectionSelected,
          strings.PUBLIC,
        )}
      </View>
    </View>
  );

  const renderCreateOrUpdateCollectionBtn = () => (
    <View style={styles.buttonView}>
      <Button
        color={Colors.text.white}
        style={styles.button}
        textStyle={styles.buttonText}
        disabled={isSendingDataToServer || isSendingImageToS3}
        isLoading={isSendingDataToServer}
        onPress={() => onSubmitOrUpdateCollection()}>
        {isEditCollectionView ? strings.UPDATE : strings.CREATE_COLLECTION}
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
          {renderCollectionImageView}
          {renderAddTitleSection()}
          {renderAddYourVibeSec}
          {renderCollectionPrivacySection()}
          {renderCreateOrUpdateCollectionBtn()}
        </>
      </KeyboardAwareScrollViewComponent>
    </>
  );
};
CreateCollection.propTypes = {
  isEditCollectionView: PropTypes.bool,
  collectionId: PropTypes.number,
  setCollectionTitle: PropTypes.func,
};
CreateCollection.defaultProps = {
  isEditCollectionView: false,
  collectionId: -1,
  setCollectionTitle: Function(),
};

const mapStateToProps = ({vibes, user}) => ({});

export default connect(mapStateToProps, null)(CreateCollection);
