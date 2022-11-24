// import CameraRoll from '@react-native-community/cameraroll';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useMemo, useState} from 'react';
import {
  AppState,
  FlatList,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ActionConst, Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';

import {
  AlbumListBottomSheet,
  BottomSheetComponent,
  Loader,
} from '../../components';
import {appSettingsRequest} from '../../actions/feedActions';
import {appSettings, strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {setSelectedTab} from '../../actions/GeneralActions';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openLimitedPhotoLibraryPicker,
  openSettings,
  check,
} from 'react-native-permissions';
import {mixpanel} from '../../helpers/mixpanelHelper';

function Gallery(props) {
  const {
    setSelectedItemsHandler,
    shouldSelectSingleItemOnly,
    returnSingleItemCapturedByCamera,
    shouldSelectAllMediaType,
    showSequenceNumbersOnSelectedMedia,
    maxLimitOfMediaSelection,
    navigateToPostAnArtScreen,
    hasCoverIamge,
    isArtist,
    isCrop,
  } = props;
  const [hasNextPage, setNextPage] = useState(() => false);
  const [isNextPageLoader, setNextPageLoader] = useState(() => false);
  const [galleryImages, setGalleryImages] = useState(() => []);
  const [endCursor, setEndCursor] = useState(() => undefined);
  const [selectedMediaArr, setSelectedMediaArr] = useState(() => []);
  const [maxImageSize, setMaxImageSize] = useState(() => appSettings.imageSize);
  const [maxVideoSize, setMaxVideoSize] = useState(() => appSettings.videoSize);
  const [permissionResult, setPermissionResult] = useState(() => '');
  const [camarePermissionResult, setCameraPermissionResult] = useState(
    () => false,
  );
  const [isGalleryPermissionGranted, setIsGalleryPermissionGranted] = useState(
    () => true,
  );
  const [albumList, setAlbumList] = useState(() => []);
  const [showAlbumList, setShowAlbumList] = useState(() => false);
  const [selectedAlbumName, setSelectedAlbumName] = useState(() =>
    util.isPlatformAndroid() ? 'Gallery' : 'Recent',
  );
  const isGalleryArrayEmpty = util.isArrayEmpty(galleryImages);
  const dispatch = useDispatch();
  const albumNameListBottomRef = useRef(null);
  let gallery = util.cloneDeepArray(galleryImages);

  if (!!!isGalleryArrayEmpty && util.isFieldNil(gallery[0].isFirst)) {
    gallery.unshift({isFirst: true});
    setGalleryImages(gallery);
  }

  useEffect(() => {
    //askPermissionToRead();
    dispatch(
      appSettingsRequest(res => {
        setMaxImageSize(res?.max_image_size);
        setMaxVideoSize(res?.max_video_size);
      }),
    );
    mixpanel.track('Visit', {PageName: 'Gallery'});

    request(
      util.isPlatformAndroid()
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            setPermissionResult(result);
            break;
          case RESULTS.DENIED:
            setPermissionResult(result);
            break;
          case RESULTS.LIMITED:
            setPermissionResult(result);

            break;
          case RESULTS.GRANTED:
            setPermissionResult(result);
            getPhotos();
            setIsGalleryPermissionGranted(true);
            break;
          case RESULTS.BLOCKED:
            setPermissionResult(result);
            setIsGalleryPermissionGranted(false);
            break;
        }
      })
      .catch(error => {
        // …
      });
    request(
      util.isPlatformAndroid()
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE: {
            setCameraPermissionResult(result);
            break;
          }
          case RESULTS.DENIED: {
            setCameraPermissionResult(result);
            break;
          }
          case RESULTS.LIMITED: {
            setCameraPermissionResult(result);
            break;
          }
          case RESULTS.GRANTED: {
            setCameraPermissionResult(result);

            break;
          }
          case RESULTS.BLOCKED: {
            setCameraPermissionResult(result);
            break;
          }
        }
      })
      .catch(error => {
        // …
      });
  }, []);

  function onNextPress() {
    if (util.isArrayEmpty(selectedMediaArr)) {
      util.topAlertError(strings.NO_IMAGE_SELECTED);
    } else {
      if (!!shouldSelectSingleItemOnly) {
        !isCrop
          ? setSelectedItemsHandler(selectedMediaArr[0])
          : Actions.replace('cropImagePicker', {
              selectedImage: selectedMediaArr[0],
              setSelectedItemsHandler: setSelectedItemsHandler,
              hasCoverIamge,
              isArtist,
            });
        !isCrop && Actions.pop();
      } else {
        if (!!navigateToPostAnArtScreen) {
          Actions.jump('postAnArt', {selectedMediaArr, setSelectedMediaArr});
          return;
        }
        setSelectedItemsHandler(selectedMediaArr);
        Actions.pop();
      }
    }
  }

  function onCameraClick() {
    ImagePicker.openCamera({
      width: 800,
      height: 800,
      cropping: true,
      compressImageQuality: 1,
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      includeBase64: true,
    })
      .then(image => {
        if (!!returnSingleItemCapturedByCamera) {
          const mObj = {
            type: image.mime,
            uri: image.path,
          };
          !isCrop
            ? setSelectedItemsHandler(mObj)
            : Actions.replace('cropImagePicker', {
                selectedImage: mObj,
                setSelectedItemsHandler: setSelectedItemsHandler,
                hasCoverIamge,
                isArtist,
              });
          !isCrop && Actions.pop();
        } else {
          CameraRoll.save(image.path, {type: 'photo', album: 'aha'});
          const mObj = {
            node: {
              type: image.mime,
              image: {
                uri: image.path,
                fileSize: image.size,
              },
            },
          };

          let mGallery = util.cloneDeepArray(galleryImages);
          mGallery.splice(1, 0, mObj);
          setGalleryImages(mGallery);
        }
      })
      .catch(e => {
        util.areValuesEqual(e?.code, 'E_NO_CAMERA_PERMISSION') &&
          openSettings().catch(() => console.log('Cannot open settings'));
      });
  }

  async function markSelectItem(imageNode) {
    const {type, image} = imageNode || undefined;
    const {uri, fileSize} = image || undefined;

    const imageNodeObject = {
      type: type,
      uri: uri,
    };

    if (util.isFieldNil(fileSize)) return;
    let markedItemSizeInBytes = fileSize / 1000000;

    const isTypeVideo = util.includesValue(type, 'video');
    if (!!isTypeVideo) {
      if (markedItemSizeInBytes <= maxVideoSize) {
        markSelected(imageNodeObject);
      } else {
        util.topAlertError(
          `Video ${strings.MEDIA_SIZE_ERROR} ${maxVideoSize} mb`,
        );
      }
    } else {
      if (markedItemSizeInBytes <= maxImageSize) {
        markSelected(imageNodeObject);
      } else {
        util.topAlertError(
          `Image ${strings.MEDIA_SIZE_ERROR} ${maxImageSize} mb`,
        );
      }
    }
  }

  function markSelected(imageNode) {
    const {uri} = imageNode || undefined;
    const isSelected = util.some(selectedMediaArr, item => item?.uri === uri);

    if (!!shouldSelectSingleItemOnly) {
      let _images = [];
      if (!!!isSelected) {
        _images.push(imageNode);
      }
      setSelectedMediaArr(_images);
    } else {
      let _selectedImages = util.cloneDeepArray(selectedMediaArr);
      if (!!isSelected) {
        if (!!showSequenceNumbersOnSelectedMedia) {
          _selectedImages = util.filterArray(
            _selectedImages,
            item => item?.uri != uri,
          );
        } else {
          _selectedImages = util.filterArray(
            _selectedImages,
            item => item != imageNode,
          );
        }
      } else {
        if (
          !!showSequenceNumbersOnSelectedMedia &&
          selectedMediaArr.length >= maxLimitOfMediaSelection
        )
          return;
        _selectedImages.push(imageNode);
      }
      setSelectedMediaArr(_selectedImages);
    }
  }

  function setImagesIntoState(_edges) {
    let _galleryImages = util.cloneDeepArray(galleryImages);
    _galleryImages = [..._galleryImages, ..._edges];
    _galleryImages = util.uniqBy(
      _galleryImages,
      item => item?.node?.image?.uri ?? undefined,
    );
    setGalleryImages(_galleryImages);
  }

  useEffect(() => {
    getPhotos();
  }, [selectedAlbumName]);

  function getPhotos(endCursor) {
    CameraRoll.getAlbums({assetType: 'All'})
      .then(res => {
        let quantityOfMediaToBeFetched = 100;
        if (!!hasNextPage && util.isPlatformAndroid()) {
          quantityOfMediaToBeFetched = Number(endCursor);
        }
        let params = {
          first: quantityOfMediaToBeFetched,
          assetType: !!shouldSelectAllMediaType ? 'All' : 'Photos',
          include: ['fileSize'],
        };
        if (!!endCursor) {
          params.after = endCursor;
        }
        const checkPlatfromAndDefaultAlbum = util.isPlatformAndroid()
          ? util.areValuesEqual(selectedAlbumName, 'Gallery')
          : util.areValuesEqual(selectedAlbumName, 'Recent');
        if (!checkPlatfromAndDefaultAlbum) {
          params['groupTypes'] = 'Album';
          params['groupName'] = selectedAlbumName;
        }
        CameraRoll.getPhotos(params)
          .then(r => {
            setNextPageLoader(false);
            setImagesIntoState(r?.edges ?? 0);
            if (util.isPlatformAndroid()) {
              setEndCursor(r?.page_info?.end_cursor ?? 0);
            } else {
              let data = setEndCursor(r?.page_info?.end_cursor ?? 0);
            }
            setNextPage(r?.page_info?.has_next_page ?? 0);
          })
          .catch(error => {
            setIsGalleryPermissionGranted(false);
          });
        setAlbumList(res);
      })
      .catch(err => console.error(err));
  }

  function loadMoreImages() {
    if (hasNextPage) {
      setNextPageLoader(true);
      getPhotos(endCursor);
    }
  }

  async function askPermissionToRead() {
    if (util.isPlatformAndroid()) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getPhotos();
        setIsGalleryPermissionGranted(true);
      } else {
        setIsGalleryPermissionGranted(false);
      }
    } else {
      getPhotos();
    }
  }

  async function requestCameraPermission() {
    if (util.isPlatformAndroid()) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          onCameraClick();
          setCameraPermissionResult(true);
        } else {
          setCameraPermissionResult(false);
          setIsGalleryPermissionGranted(false);
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      onCameraClick();
    }
  }

  const renderCameraIconView = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cameraIconView}
      onPress={() =>
        !util.areValuesEqual(camarePermissionResult, 'granted')
          ? openSettings().catch(() => console.log('Cannot open settings'))
          : requestCameraPermission()
      }>
      <Image source={Images.cameraIcon} />
    </TouchableOpacity>
  );

  const renderNavBar = () => (
    <View style={styles.navbarView}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          Actions.pop();
          dispatch(setSelectedTab(1));
        }}>
        <Text style={styles.cancelButton}>{strings.CANCEL}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          setShowAlbumList(true);

          util.areValuesEqual(permissionResult, 'granted') &&
            albumNameListBottomRef.current.snapTo(0);
        }}>
        <Text
          style={[
            styles.recentButton,
            !util.areValuesEqual(permissionResult, 'granted') && {
              color: Colors.disableColor,
            },
          ]}>
          {selectedAlbumName}
        </Text>
        <Image
          style={[
            styles.downArrowImg,
            !util.areValuesEqual(permissionResult, 'granted') && {
              tintColor: Colors.disableColor,
            },
          ]}
          tintColor={
            !util.areValuesEqual(permissionResult, 'granted')
              ? Colors.disableColor
              : Colors.white
          }
          source={Images.bottomArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.5} onPress={onNextPress}>
        <Text style={styles.nextButton}>{strings.NEXT}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeaderFlatlist = () => {
    return (
      <View style={styles.viewManage}>
        <View style={{flex: 0.8}}>
          <Text style={styles.txtmanageHeader}>{strings.MANAGEHEADER}</Text>
        </View>
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              openSettings().catch(() => console.log('Cannot open settings'))
            }>
            <Text style={styles.txtManage}>{strings.MANAGE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderGalleryImagesList = () => {
    return (
      <FlatList
        numColumns={3}
        data={galleryImages}
        onEndReachedThreshold={0}
        onEndReached={loadMoreImages}
        ListHeaderComponent={() =>
          !util.areValuesEqual(permissionResult, 'granted') &&
          renderHeaderFlatlist()
        }
        ListFooterComponent={() => {
          return (
            <View style={styles.footLoaderView}>
              <Loader loading={isNextPageLoader} />
            </View>
          );
        }}
        keyExtractor={(_, index) => index}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({item, _}) => {
          const imageNode = item?.node ?? {};

          const {type} = imageNode || '';
          const imageUri = item?.node?.image?.uri ?? undefined;
          const isTypeVideo = util.includesValue(type, 'video');
          const isSelected = util.some(
            selectedMediaArr,
            item => item?.uri === imageUri,
          );
          let mIndex = selectedMediaArr.findIndex(
            item => item?.uri == imageUri && item?.type == type,
          );

          return (
            <>
              {item.isFirst ? (
                renderCameraIconView()
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[{width: '33.33%'}]}
                  onPress={() => markSelectItem(imageNode)}>
                  {!!isTypeVideo && (
                    <Image
                      source={Images.playIcon}
                      style={styles.videoPlayIcon}
                    />
                  )}
                  <Image
                    source={{uri: imageUri}}
                    style={[{height: 122}, isSelected && {opacity: 0.5}]}
                  />
                  {!!isSelected &&
                    (!!showSequenceNumbersOnSelectedMedia ? (
                      <View style={styles.countView}>
                        <Text style={styles.countTxt}>{mIndex + 1}</Text>
                      </View>
                    ) : (
                      <Image
                        source={Images.checkRightIcon}
                        style={styles.rightIcon}
                      />
                    ))}
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />
    );
  };

  const renderPleaseAllowPermissionView = useMemo(
    () => (
      <View style={styles.permissionTextCont}>
        <Text style={styles.pleaseAllowPermissionText}>
          {util.isPlatformAndroid()
            ? strings.PLEASE_ALLOW_GALLERY_PERMISSION_ANDROID
            : strings.PLEASE_ALLOW_GALLERY_PERMISSION}
        </Text>
        <TouchableOpacity
          onPress={() =>
            openSettings().catch(() => console.log('Cannot open settings'))
          }
          style={{alignSelf: 'center'}}>
          <Text style={styles.grandIssueTxtManage}>
            {strings.ENABLE_PHOTO_ACCESS}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [isGalleryPermissionGranted, permissionResult],
  );

  const renderAblumListBottom = () => (
    <View
      style={styles.bottomSheetContainer}
      pointerEvents={showAlbumList ? 'auto' : 'none'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 4,
        }}
        onPress={() => {
          albumNameListBottomRef.current.snapTo(1);
        }}></TouchableOpacity>
      <BottomSheetComponent
        refRBSheet={albumNameListBottomRef}
        _snapPoints={[440, 0]}
        renderView={() => {
          return (
            <AlbumListBottomSheet
              bottomSheetRef={albumNameListBottomRef}
              showAlbumList={showAlbumList}
              albumList={albumList}
              setSelectedAlbumName={setSelectedAlbumName}
              setGalleryImages={setGalleryImages}
              setNextPage={setNextPage}
            />
          );
        }}
        isShowingBottomSheet={showAlbumList}
        onBottomSheetClose={() => setShowAlbumList(false)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderNavBar()}
      <View>
        {!isGalleryArrayEmpty && renderGalleryImagesList()}
        {util.areValuesEqual(permissionResult, 'blocked') &&
          renderPleaseAllowPermissionView}
        {util.areValuesEqual(permissionResult, 'denied') &&
          renderPleaseAllowPermissionView}
      </View>
      {util.areValuesEqual(permissionResult, 'granted') &&
        renderAblumListBottom()}
    </SafeAreaView>
  );
}

Gallery.propTypes = {
  selected: PropTypes.bool,
  shouldSelectSingleItemOnly: PropTypes.bool,
  returnSingleItemCapturedByCamera: PropTypes.bool,
  setSelectedItemsHandler: PropTypes.func,
  shouldSelectAllMediaType: PropTypes.bool,
  showSequenceNumbersOnSelectedMedia: PropTypes.bool,
  maxLimitOfMediaSelection: PropTypes.number,
  navigateToPostAnArtScreen: PropTypes.bool,
};
Gallery.defaultProps = {
  selected: false,
  shouldSelectSingleItemOnly: false,
  returnSingleItemCapturedByCamera: false,
  setSelectedItemsHandler: Function(),
  shouldSelectAllMediaType: false,
  showSequenceNumbersOnSelectedMedia: false,
  maxLimitOfMediaSelection: 5,
  navigateToPostAnArtScreen: false,
};

export default Gallery;
