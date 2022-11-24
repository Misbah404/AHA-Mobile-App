import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getPostsAndCollectionsOfPinnedCollectionRequest,
  editPinToCollectionRequest,
  deletePinToCollectionRequest,
  deletePinToCollectionSuccess,
  pinToCollectionAfterDeletePin,
} from '../../actions/PinActions';
import {
  ArtItem,
  CollectionItem,
  CustomNavbar,
  EditPinToCollectionModal,
  Loader,
  NoDataFoundComponent,
  SpinnerLoader,
} from '../../components';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const PinCollectionListing = props => {
  const {
    collectionDetails,
    isPin,
    pinToCollectionList,
    pinToCollectionId,
    pinnedPostsAndCollectionListing,
    artistID,
  } = props || {};

  const {id: collectionId} = collectionDetails || {};
  const findIndexCurrentItem = util.getIndexOfObjFromArray_byID(
    pinToCollectionList,
    collectionId,
  );
  const pinCollectionItem = pinToCollectionList[findIndexCurrentItem];
  const {
    title = '',
    isMyCollection,
    isPublic,
  } = util.isUndefinedValue(artistID) ? pinCollectionItem : collectionDetails;

  const [isRemoveCollectionModalVisible, setRemoveCollectionModalVisibility] =
    useState(() => false);
  const [isDeletingCollectionFromServer, setIsDeletingCollectionFromServer] =
    useState(() => false);
  const [isDeletingPostFromCollection, setIsDeletingPostFromCollection] =
    useState(() => false);
  const [collectionName, setCollectionName] = useState(() => title);
  const [collectionNameError, setCollectionNameError] = useState(() => '');
  const [isEditModal, setIsEditModal] = useState(() => false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEditModal, setIsLoadingEditModal] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [pinPostsAndCollectionListingIds, setPinPostsAndCollectionListingIds] =
    useState(() => []);
  const [
    pinnedPostsAndCollectionListData,
    setPinnedPostsAndCollectionListData,
  ] = useState(() => []);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    let params = `${collectionId}?offset=${offset}&limit=${15}`;
    if (!util.isUndefinedValue(artistID)) {
      params += `&artist_id=${artistID}`;
    }
    dispatch(
      getPostsAndCollectionsOfPinnedCollectionRequest(params, res => {
        setPinPostsAndCollectionListingIds(res);
        if (!util.isArrayEmpty(res)) {
          setIsNextPage(true);
          setPinPostsAndCollectionListingIds(res);
        } else {
          setIsNextPage(false);
        }
        setIsLoading(false);
      }),
    );
  }, []);

  useEffect(() => {
    const data = util.filterArray(pinnedPostsAndCollectionListing, item => {
      return util.isArrayIncludesValue(
        pinPostsAndCollectionListingIds,
        item.id,
      );
    });
    setPinnedPostsAndCollectionListData(data);
  }, [pinPostsAndCollectionListingIds, pinnedPostsAndCollectionListing]);

  function removePinToCollection(status) {
    setModalVisibility(false);
    setIsDeletingCollectionFromServer(true);
    const ids = pinnedPostsAndCollectionListing.map(item => item.id);
    const artistsIds = pinnedPostsAndCollectionListing.map(
      item => item?.artist?.id,
    );
    const data = {ids, artistsIds};
    status && dispatch(pinToCollectionAfterDeletePin(data));
    const payload = {
      delete_pinned_items: status,
    };
    const params = `${collectionId}`;
    dispatch(
      deletePinToCollectionRequest(params, payload, res => {
        setIsDeletingCollectionFromServer(false);
        if (!!res) {
          Actions.pop();
          setTimeout(() => {
            dispatch(deletePinToCollectionSuccess(params));
          }, 1000);
        }
      }),
    );
  }

  function deleteCollectionAndPin(status) {
    removePinToCollection(status);
  }
  function deleteCollectionAndUnPin(status) {
    removePinToCollection(status);
  }

  function setModalVisibility(_val) {
    setRemoveCollectionModalVisibility(!!_val);
  }

  const renderCustomNavBar = useMemo(() => {
    const shouldShowEditDeleteIcon = !!isMyCollection;

    return (
      <CustomNavbar
        title={title}
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={{
          justifyContent: 'center',
          width: 30,
        }}
        leftBtnImage={Images.backButton}
        leftBtnPress={() => Actions.pop()}
        backgroundColor="transparent"
        rightBtnImage={
          shouldShowEditDeleteIcon ? Images.deleteCollectionIcon : undefined
        }
        rightBtnPress={() =>
          shouldShowEditDeleteIcon ? setModalVisibility(true) : Function()
        }
        rightBtnImageSecond={
          shouldShowEditDeleteIcon ? Images.editCollectionIcon : undefined
        }
        rightBtnPressSecond={() =>
          shouldShowEditDeleteIcon ? setIsEditModal(true) : Function()
        }
        rightBtnStyleSecond={styles.rightBtnStyleSecond}
      />
    );
  }, [pinToCollectionList, pinnedPostsAndCollectionListing]);

  const renderRemoveCollectionModal = () => (
    <DeleteOrRemoveModal
      heading={strings.DELETE_PIN_COLLECTION}
      optionalBtnText={strings.DELETE_PIN}
      description={strings.PIN_TO_COLLECTION_DELETE_DESCRIPTION}
      positiveBtnText={strings.DELETE_UNPIN}
      negativeBtnText={strings.DONT_DELETE}
      optionBtnHandler={() => deleteCollectionAndPin(false)}
      positiveBtnPressHandler={() => deleteCollectionAndUnPin(true)}
      setModalVisibility={() => setModalVisibility()}
      isModalVisible={isRemoveCollectionModalVisible}
      containerStyle={styles.deleteModal}
    />
  );

  const renderSpinnerLoader = () => (
    <SpinnerLoader
      _loading={
        !!isDeletingCollectionFromServer || !!isDeletingPostFromCollection
      }
    />
  );

  function loadMoreData() {
    if (isNextPage && pinnedPostsAndCollectionListData.length >= 14) {
      setIsMoreData(true);
      let params = `${collectionId}?offset=${offset}&limit=${15}`;
      if (!util.isUndefinedValue(artistID)) {
        params += `&artist_id=${artistID}`;
      }
      dispatch(
        getPostsAndCollectionsOfPinnedCollectionRequest(params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 15);
            setIsNextPage(true);
            setIsMoreData(false);

            const perviousIds = util.cloneDeepArray(
              pinPostsAndCollectionListingIds,
            );
            const comingIds = util.cloneDeepArray(res);
            const afterConcat = perviousIds.concat(comingIds);
            setPinPostsAndCollectionListingIds(afterConcat);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  const renderPinnedPostsAndCollectionsList = useMemo(
    () => (
      <FlatList
        data={pinnedPostsAndCollectionListData}
        style={AppStyles.flex}
        numColumns={3}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const isCollection = item?.isCollection ?? false;
          const {id, artist} = item || {};
          return isCollection ? (
            <CollectionItem
              isPin={true}
              item={item}
              onItemPress={() => {
                Actions.postsListingOfCollection({
                  collectionDetails: item,
                  isPin: false,
                  pinToCollectionId: id,
                  artistID: artist?.id,
                });
              }}
            />
          ) : (
            <ArtItem
              artItem={item}
              isComeFromCollection={isMyCollection}
              pinToCollectionId={pinToCollectionId}
              deleteDescriptionText={strings.DELETE_POST_FROM_COLLECTION}
            />
          );
        }}
        ListEmptyComponent={() => (
          <NoDataFoundComponent
            text={isPin ? strings.NO_PIN_FOUND : strings.NO_POSTS_FOUND}
          />
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={isMoreData && {marginVertical: 20}}>
            {isMoreData && <ActivityIndicator color={Colors.white} />}
          </View>
        }
      />
    ),
    [
      pinnedPostsAndCollectionListData,
      pinnedPostsAndCollectionListing,
      pinPostsAndCollectionListingIds,
      isMoreData,
    ],
  );

  const EditCollectionModal = () => {
    return (
      <EditPinToCollectionModal
        isModalVisible={isEditModal}
        heading={strings.DELETE_ADDRESS}
        setModalVisibility={setIsEditModal}
        collectionName={collectionName}
        error={collectionNameError}
        onChangeEditField={onChangeEditField}
        onSubmitEditModal={onSubmitEditModal}
        isLoading={isLoadingEditModal}
        isPrivacy={isPublic}
      />
    );
  };

  function onChangeEditField(text) {
    setCollectionName(text);
    setCollectionNameError('');
  }

  const onSubmitEditModal = isPublic => {
    if (!util.isEmptyValue(collectionName)) {
      const payload = {
        title: collectionName,
        is_public: isPublic,
      };
      const params = `${collectionId}`;
      setIsLoadingEditModal(true);
      dispatch(
        editPinToCollectionRequest(params, payload, res => {
          setIsLoadingEditModal(false);
          setIsEditModal(false);
        }),
      );
    } else {
      setCollectionNameError(strings.REQUIRED_FIELD);
    }
  };

  return (
    <View style={styles.container}>
      {renderCustomNavBar}
      {renderSpinnerLoader()}
      {renderRemoveCollectionModal()}
      {isLoading ? (
        <View style={styles.collectionLoader}>
          <Loader loading={true} />
        </View>
      ) : (
        renderPinnedPostsAndCollectionsList
      )}
      {isEditModal && EditCollectionModal()}
    </View>
  );
};

PinCollectionListing.propTypes = {};
PinCollectionListing.defaultProps = {};

const mapStateToProps = ({pin}) => ({
  pinnedPostsAndCollectionListing: pin.pinnedPostsAndCollectionListing,
  pinToCollectionList: pin.pinToCollectionList,
});
export default connect(mapStateToProps)(PinCollectionListing);
