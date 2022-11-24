import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  deleteCollectionRequest,
  deleteMultiCollection,
  getCollectionDetailsRequest,
} from '../../actions/collection';
import {deletePostFromCollectionRequest} from '../../actions/feedActions';
import {
  pinUnpinListUpdate,
  postCollectionPinUnpinRequest,
  postCollectionPinUnpinSuccess,
} from '../../actions/PinActions';
import _ from 'lodash';
import {getPostsListByUserIDRequest} from '../../actions/UserActions';
import {
  ArtItem,
  BottomSheetComponent,
  CustomNavbar,
  EditPinPrivacyModal,
  NoDataFoundComponent,
  PinUnpinPostBottomSheetContent,
  SpinnerLoader,
} from '../../components';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {mixpanel} from '../../helpers/mixpanelHelper';
const PostsListingOfCollection = props => {
  const {
    collectionDetails,
    artistID,
    isPin,
    postsOfPinnedCollection,
    pinToCollectionId,
    _collectionDetailsWithPostsList,
    _collectionsArtsList,
    currentActiveActionName,
  } = props || {};

  const {id: collectionId, postId, artist} = collectionDetails || {};

  const {
    title = '',
    isMyCollection,
    isSelectedPrivacyOptionIsPublic,
    isPinned,
    pinLikeCount,
  } = _collectionDetailsWithPostsList?.[collectionId] || {};
  const pinUnpinPostBottomSheetRef = useRef(null);

  const [isRemoveCollectionModalVisible, setRemoveCollectionModalVisibility] =
    useState(() => false);
  const [isRemoveMultiPostModalVisible, setRemoveMultiPostModalVisibility] =
    useState(() => false);
  const [isDeletingCollectionFromServer, setIsDeletingCollectionFromServer] =
    useState(() => false);
  const [isDeletingPostFromCollection, setIsDeletingPostFromCollection] =
    useState(() => false);
  const [collectionTitle, setCollectionTitle] = useState(() => title);
  const [isGettingPostsListFromServer, setIsGettingPostsListFromServer] =
    useState(() => false);
  const [isSelected, setIsSelected] = useState(() => false);
  const [multiSelectedPostIndex, setMultiSelectedPostIndex] = useState(
    () => [],
  );
  const [pinPrivacyModalVisibility, setPinPrivacyModalVisibility] = useState(
    () => false,
  );
  const [artsListing, setArtsListing] = useState(() => []);
  const [artsListingIds, setArtsListingIds] = useState(() => []);
  const [isPinnedCollection, setIsPinnedCollection] = useState(() => isPinned);
  const [showPinUnpinPostBottomSheet, setShowPinUnpinPostBottomSheet] =
    useState(() => false);
  const [privacyStatus, setPrivacyStatus] = useState(
    isSelectedPrivacyOptionIsPublic,
  );
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [pinLikeUnLikeCount, setPinLikeUnLike] = useState(() => pinLikeCount);
  const dispatch = useDispatch();

  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: 'Collection',
      collectionName: collectionDetails.title,
    });
  }, []);

  useEffect(() => {
    const {
      title = '',
      isPinned,
      pinLikeCount,
      isSelectedPrivacyOptionIsPublic,
    } = _collectionDetailsWithPostsList?.[collectionId] || {};
    setCollectionTitle(title);
    setIsPinnedCollection(isPinned);
    setPinLikeUnLike(pinLikeCount);
    setPrivacyStatus(isSelectedPrivacyOptionIsPublic);
  }, [_collectionDetailsWithPostsList[collectionId]]);

  useEffect(() => {
    setPinLikeUnLike(pinLikeCount);
  }, [pinLikeCount]);

  useEffect(() => {
    if (
      util.areValuesEqual(currentActiveActionName, 'postsListingOfCollection')
    ) {
      let params = `${collectionId}`;
      if (!util.isFieldNil(artistID)) {
        params += `?artist_id=${artistID}`;
      }
      params += `&offset=${0}&limit=${15}`;
      setIsGettingPostsListFromServer(true);
      dispatch(
        getCollectionDetailsRequest(params, res => {
          if (res) {
            setIsNextPage(true);
            setArtsListingIds(res);
          } else {
            setIsNextPage(false);
            setArtsListingIds([]);
          }
          setTimeout(() => {
            setIsGettingPostsListFromServer(false);
          }, 500);
        }),
      );
    }
  }, [currentActiveActionName]);

  function loadMore() {
    if (isNextPage) {
      let params = `?collection_id=${collectionId}&offset=${offset}&limit=${15}`;
      if (!!!util.isFieldNil(artistID)) {
        params += `&artist_id=${artistID}`;
      }

      const payload = {
        id: artistID,
      };
      setIsMoreData(true);
      dispatch(
        getPostsListByUserIDRequest(payload, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 15);
            setIsMoreData(false);
            const stateData = util.cloneDeepArray(artsListing);
            const comingData = util.cloneDeepArray(res);
            const mergeArray = util.unionById(stateData, comingData);
            setArtsListing(mergeArray);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  function removeCollection() {
    setModalVisibility(false);
    setIsDeletingCollectionFromServer(true);
    dispatch(
      deleteCollectionRequest(collectionId, function (res) {
        setIsDeletingCollectionFromServer(false);
        if (!!res) {
          Actions.pop();
        }
      }),
    );
  }

  function deleteMultiPostFromCollection(artIdArray) {
    setIsDeletingPostFromCollection(true);
    setModalVisibilityRemovePost(false);
    const payload = {
      collection_id: collectionId,
      art_id: artIdArray,
    };
    dispatch(
      deletePostFromCollectionRequest(payload, res => {
        if (!!res) {
          const mIdsList = util.filterArray(
            artsListingIds,
            item => !artIdArray.includes(item),
          );
          setArtsListingIds(mIdsList);
          dispatch(deleteMultiCollection(payload));
          setIsSelected(false);
        }
        setIsDeletingPostFromCollection(false);
      }),
    );
  }

  function deletePostFromCollection(postID) {
    setIsDeletingPostFromCollection(true);

    const payload = {
      collection_id: collectionId,
      art_id: [postID],
    };
    dispatch(
      deletePostFromCollectionRequest(payload, res => {
        if (!!res) {
          const mFilteredData = util.excludeIdFromArray(artsListing, postID);
          setArtsListing(mFilteredData);
          Actions.pop();
        }
        setIsDeletingPostFromCollection(false);
      }),
    );
  }

  function multiSelectedItem(index) {
    const checkIndexHave = util.findIndexByString(
      multiSelectedPostIndex,
      index,
    );
    if (checkIndexHave != -1) {
      const removeSelectedItem = multiSelectedPostIndex.filter(
        item => item != index,
      );
      setMultiSelectedPostIndex(removeSelectedItem);
    } else {
      let arrayAddIndex = util.cloneDeepArray(multiSelectedPostIndex);
      arrayAddIndex.push(index);
      setMultiSelectedPostIndex(arrayAddIndex);
    }
  }

  function setModalVisibility(_val) {
    setRemoveCollectionModalVisibility(!!_val);
  }

  function setModalVisibilityRemovePost(_val) {
    setRemoveMultiPostModalVisibility(!!_val);
  }

  function deleteFunctionality() {
    if (!!!isSelected) {
      setModalVisibility(true);
    } else {
      multiSelectedPostIndex?.length > 0 && setModalVisibilityRemovePost(true);
    }
  }

  function navBarRightDeleteImage() {
    const shouldShowEditDeleteIcon = !!isMyCollection;
    if (!!!isSelected) {
      return shouldShowEditDeleteIcon ? Images.deleteCollectionIcon : undefined;
    } else {
      return shouldShowEditDeleteIcon && multiSelectedPostIndex?.length > 0
        ? Images.deleteCollectionIcon
        : undefined;
    }
  }

  function collectionPinUnpin(shouldOpenBottomSheet) {
    const payload = {
      artistID: artistID || artist.id,
      artist_collection_id: collectionId,
      pin: !isPinnedCollection,
      pinLikeCount: pinLikeCount,
    };

    if (!shouldOpenBottomSheet) {
      dispatch(postCollectionPinUnpinRequest(payload, _ => {}));
      dispatch(postCollectionPinUnpinSuccess(payload));

      setTimeout(() => {
        setIsPinnedCollection(!isPinnedCollection);
        setPinLikeUnLike(
          isPinnedCollection ? pinLikeUnLikeCount - 1 : pinLikeUnLikeCount + 1,
        );
      }, 100);
    }

    if (!!shouldOpenBottomSheet && !isPinnedCollection) {
      setShowPinUnpinPostBottomSheet(true);
      pinUnpinPostBottomSheetRef.current.snapTo(0);
    }
    if (!shouldOpenBottomSheet) {
      dispatch(
        pinUnpinListUpdate(postId, !isPinnedCollection, collectionDetails),
      );
    }
  }

  const renderCustomNavBar = () => {
    const shouldShowEditDeleteIcon = !!isMyCollection;

    return (
      <CustomNavbar
        title={collectionTitle}
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={{
          justifyContent: 'center',
          width: 30,
        }}
        leftBtnImage={Images.backButton}
        leftBtnPress={() => Actions.pop()}
        backgroundColor="transparent"
        rightBtnImage={navBarRightDeleteImage()}
        rightBtnPress={() =>
          shouldShowEditDeleteIcon ? deleteFunctionality() : Function()
        }
        rightBtnImageSecond={
          !isSelected && shouldShowEditDeleteIcon
            ? Images.editCollectionIcon
            : undefined
        }
        rightBtnPressSecond={() =>
          !isSelected && shouldShowEditDeleteIcon
            ? Actions.createCollection({
                isEditCollectionView: true,
                collectionId: collectionId,
                setCollectionTitle: setCollectionTitle,
              })
            : Function()
        }
        rightBtnStyleSecond={styles.rightBtnStyleSecond}
        rightImageStyle={{
          width: 18,
          height: 20,
          right: 10,
        }}
      />
    );
  };

  const renderCustomNavBarVisitUser = () => {
    return (
      <CustomNavbar
        title={collectionTitle}
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={{justifyContent: 'center', width: 30}}
        leftBtnImage={Images.backButton}
        leftBtnPress={() => Actions.pop()}
        backgroundColor="transparent"
        rightBtnImage={
          !!isPinnedCollection
            ? Images.filledHeartIcon
            : Images.unfilledHeartIcon
        }
        rightBtnImageSecond={
          !!isPinnedCollection ? Images.lockIconCollection : undefined
        }
        leftRightButtonWrapperStyleSecond={{width: 30}}
        rightBtnPress={() => collectionPinUnpin(false)}
        rightBtnOnLongPress={() => collectionPinUnpin(true)}
        rightBtnPressSecond={() =>
          !!isPinnedCollection
            ? setPinPrivacyModalVisibility(!pinPrivacyModalVisibility)
            : Function()
        }
        rightBtnStyleSecond={{
          width: 27,
          height: 27,
          right: 10,
          top: 1,
        }}
        disableRightTxtBtn={true}
        rightImageStyle={{
          width: 28,
          height: 28,
          right: 10,
        }}
        rightCornerText={pinLikeUnLikeCount}
      />
    );
  };

  const renderRemoveCollectionModal = () => (
    <DeleteOrRemoveModal
      heading={strings.DELETE_COLLECTION}
      description={strings.DELETE_DESTRIBUTION}
      positiveBtnText={strings.DELETE}
      negativeBtnText={strings.DONT_DELETE}
      positiveBtnPressHandler={() => removeCollection()}
      setModalVisibility={() => setModalVisibility()}
      isModalVisible={isRemoveCollectionModalVisible}
    />
  );

  const renderRemoveAllPostFromCollectionModal = () => (
    <DeleteOrRemoveModal
      heading={strings.DELETE_POSTS}
      description={`${strings.DELETE_DESTRIBUTION_POSTS} ${multiSelectedPostIndex?.length} posts from the collection?`}
      positiveBtnText={strings.DELETE}
      negativeBtnText={strings.DONT_DELETE}
      positiveBtnPressHandler={() =>
        deleteMultiPostFromCollection(multiSelectedPostIndex)
      }
      setModalVisibility={() => setModalVisibilityRemovePost()}
      isModalVisible={isRemoveMultiPostModalVisible}
    />
  );

  const renderSpinnerLoader = () => (
    <SpinnerLoader
      _loading={
        !!isDeletingCollectionFromServer || !!isDeletingPostFromCollection
      }
    />
  );

  const renderMultiSelectedBtn = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setIsSelected(!isSelected);
          setMultiSelectedPostIndex([]);
        }}
        style={styles.multiSelectedBtn}>
        <Text style={styles.multiSelectedTxt}>
          {!isSelected ? `Select` : `Cancel`}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderArtItem = ({item, _}) => (
    <ArtItem
      artItem={item}
      multiSelectedPostIndex={multiSelectedPostIndex}
      isSelected={isSelected}
      isComeFromCollection={isMyCollection}
      multiSelectedItem={multiSelectedItem}
      pinToCollectionId={pinToCollectionId}
      onDeletePostHandlerCallback={deletePostFromCollection}
      deleteDescriptionText={strings.DELETE_POST_FROM_COLLECTION}
    />
  );

  const renderArtsList = useMemo(
    () => (
      <FlatList
        data={util.filterArray(_collectionsArtsList, item =>
          artsListingIds.includes(item.id),
        )}
        style={AppStyles.flex}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <NoDataFoundComponent
            text={isPin ? strings.NO_PIN_FOUND : strings.NO_POSTS_FOUND}
          />
        )}
        renderItem={renderArtItem}
        keyExtractor={(_, index) => index}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={isMoreData && {marginVertical: 40}}>
            {isMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    ),
    [
      postsOfPinnedCollection,
      isSelected,
      _collectionDetailsWithPostsList,
      artsListingIds,
      multiSelectedPostIndex,
      _collectionsArtsList,
    ],
  );

  const renderPinUnpinPostBottomSheet = () => (
    <View
      style={styles.bottomSheetContainer}
      pointerEvents={showPinUnpinPostBottomSheet ? 'auto' : 'none'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
        }}
        onPress={() => {
          pinUnpinPostBottomSheetRef.current.snapTo(1);
        }}></TouchableOpacity>
      <BottomSheetComponent
        refRBSheet={pinUnpinPostBottomSheetRef}
        _snapPoints={[440, 0]}
        renderView={() => (
          <PinUnpinPostBottomSheetContent
            bottomSheetRef={pinUnpinPostBottomSheetRef}
            showPinUnpinPostBottomSheet={showPinUnpinPostBottomSheet}
            collectionDetails={collectionDetails}
            artistID={artistID}
          />
        )}
        isShowingBottomSheet={showPinUnpinPostBottomSheet}
        onBottomSheetClose={() => setShowPinUnpinPostBottomSheet(false)}
      />
    </View>
  );

  const renderPrivacyModal = useMemo(
    () => (
      <EditPinPrivacyModal
        collectionId={collectionId}
        isModalVisible={pinPrivacyModalVisibility}
        setModalVisibility={setPinPrivacyModalVisibility}
        selectedButtonIsPublic={privacyStatus}
        artID={-1}
        title={strings.COLLECTION_PRIVACY}
      />
    ),
    [
      pinPrivacyModalVisibility,
      _collectionDetailsWithPostsList?.[collectionId],
    ],
  );

  return (
    <View style={styles.container}>
      {isMyCollection ? renderCustomNavBar() : renderCustomNavBarVisitUser()}
      {isMyCollection &&
        !util.isArrayEmpty(artsListingIds) &&
        renderMultiSelectedBtn()}
      {isGettingPostsListFromServer ? (
        <View style={styles.collectionLoader}>
          <SpinnerLoader _loading={true} />
        </View>
      ) : (
        renderArtsList
      )}
      {renderSpinnerLoader()}
      {renderRemoveCollectionModal()}
      {renderRemoveAllPostFromCollectionModal()}
      {renderPinUnpinPostBottomSheet()}
      {renderPrivacyModal}
    </View>
  );
};

PostsListingOfCollection.propTypes = {
  artistID: PropTypes.string,
};
PostsListingOfCollection.defaultProps = {
  artistID: undefined,
};

const mapStateToProps = ({pin, collection, general}) => ({
  postsOfPinnedCollection: pin.postsOfPinnedCollection,
  _collectionDetailsWithPostsList: collection.collectionDetails,
  _collectionsArtsList: collection.collectionArtsListing,
  currentActiveActionName: general.currentActiveActionName,
});
export default connect(mapStateToProps)(PostsListingOfCollection);
