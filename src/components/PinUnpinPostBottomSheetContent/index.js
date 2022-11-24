// @flow
import {BlurView} from '@react-native-community/blur';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import {connect, useDispatch} from 'react-redux';
import {
  pinToCollectionCreateRequest,
  pinToCollectionListRequest,
  pinUnpinRequest,
  postCollectionPinUnpinRequest,
  postCollectionPinUnpinSuccess,
} from '../../actions/PinActions';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import Loader from '../Loader';
import ModalView from '../ModalView';
import styles from './styles';

const PinUnpinPostBottomSheetContent = props => {
  const {
    pinToCollectionList,
    bottomSheetRef,
    feedItem,
    showPinUnpinPostBottomSheet,
    collectionDetails,
    artistID,
  } = props;
  const {id: collectionID = -1} = collectionDetails || {};
  const {id, thumbnail} = feedItem || {};
  const [pinToCollectionSelectedId, setPinToCollectionSelectedId] = useState(
    () => '',
  );
  const [isPinModal, setPinModal] = useState(() => false);
  const [isLoading, setLoading] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => true);
  const [isNextPage, setIsNextPage] = useState(() => true);
  const [offset, setOffset] = useState(() => 0);
  const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(
    () => false,
  );

  const dispatch = useDispatch();

  const pinToCollectionListCount = util.getCountFormArray(pinToCollectionList);

  useEffect(() => {
    apiCall();
  }, []);

  function apiCall() {
    // setLoading(true);
    const params = `?offset=${offset}&limit=${7}`;
    dispatch(
      pinToCollectionListRequest({}, params, _ => {
        // setLoading(false);
        setIsNextPage(true);
      }),
    );
  }

  function createPinToCollection(text) {
    setIsCreatingNewCollection(true);
    const payload = {
      title: text,
      image: thumbnail,
    };
    bottomSheetRef?.current?.snapTo(1);
    dispatch(
      pinToCollectionCreateRequest(payload, res => {
        setIsCreatingNewCollection(false);
        if (res) {
          const item = res[0];

          selectedPostForPinToCollection(item);
          setPinModal(false);
        } else {
          setPinModal(false);
        }
      }),
    );
  }

  function selectedPostForPinToCollection(item) {
    if (collectionID != -1) {
      const payload = {
        artistID: artistID,
        artist_collection_id: collectionID,
        collection_id: item.id,
        pin: true,
      };

      setPinToCollectionSelectedId(item?.id);
      dispatch(
        postCollectionPinUnpinRequest(payload, res => {
          if (res) {
            bottomSheetRef?.current?.snapTo(1);
            setPinToCollectionSelectedId('');
          }
        }),
      );
      dispatch(postCollectionPinUnpinSuccess(payload));
    } else {
      const payload = {
        art_id: id,
        pin: true,
        collection_id: item.id,
      };
      setPinToCollectionSelectedId(item?.id);
      dispatch(
        pinUnpinRequest(payload, res => {
          if (res) {
            bottomSheetRef?.current?.snapTo(1);
            setPinToCollectionSelectedId('');
          }
        }),
      );
    }
  }

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?offset=${offset}&limit=${7}`;
      dispatch(
        pinToCollectionListRequest({}, params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 7);
            setIsMoreData(false);
            setIsNextPage(true);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  const renderPinToCollection = () => (
    <View>
      <TouchableOpacity
        style={styles.ArrowView}
        onPress={() => {
          bottomSheetRef?.current?.snapTo(1);
        }}>
        <Image source={Images.bottomArrow} resizeMode={'contain'} />
      </TouchableOpacity>
      <View>
        <Text style={styles.artTxt}>{strings.PIN_ART}</Text>
        <Text style={styles.collectionSaveTxt}>
          {strings.SAVE_TO_YOUR_COLLECTION}
        </Text>
        <View style={styles.createCollectionView} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef?.current?.snapTo(1);
            setPinModal(true);
          }}>
          <Text style={styles.createTxt}>
            {strings.CREATE_A_NEW_COLLECTION}
          </Text>
        </TouchableOpacity>
        {!util.isArrayEmpty(pinToCollectionList) && (
          <View>
            {!isLoading && (
              <FlatList
                data={pinToCollectionList}
                style={[
                  pinToCollectionListCount > 4 && {
                    height: 250,
                  },
                ]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => index}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setPinToCollectionSelectedId(item?.id);
                        selectedPostForPinToCollection(item);
                      }}
                      style={styles.sizeView}>
                      <View style={styles.collectionListItemView}>
                        {!util.isFieldNil(item?.image) ? (
                          <FastImage
                            style={styles.collectionListItemImage}
                            onLoad={() => {}}
                            source={{
                              uri: item.image,
                              priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        ) : (
                          <View style={styles.collectionListItemImage}>
                            <Text style={{color: Colors.white}}>
                              {item.title.charAt(0)}
                            </Text>
                          </View>
                        )}
                        {util.areValuesEqual(
                          pinToCollectionSelectedId,
                          item.id,
                        ) && (
                          <View
                            style={{position: 'absolute', top: 5, right: 0}}>
                            <ActivityIndicator color={Colors.white} />
                          </View>
                        )}
                        <Text style={styles.sizeText}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                onRefresh={() => apiCall()}
                refreshing={false}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  <View style={isMoreData && {marginVertical: 20}}>
                    {isMoreData && <ActivityIndicator color={Colors.white} />}
                  </View>
                }
              />
            )}
          </View>
        )}
        <View style={styles.emptyRelatedFlatlist}>
          {!!isLoading ? (
            <View style={{marginTop: '5%'}}>
              <Loader loading={isLoading} />
            </View>
          ) : (
            <>
              {util.isArrayEmpty(pinToCollectionList) && (
                <Image
                  source={Images.NoDataFoundImage}
                  resizeMode={'contain'}
                />
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.roundCorner]}>
      {isPinModal ? (
        <ModalView
          createPinToCollection={createPinToCollection}
          setPinModal={setPinModal}
          isPinModal={isPinModal}
          isSendingDataToServer={isCreatingNewCollection}
        />
      ) : showPinUnpinPostBottomSheet ? (
        <BlurView blurType="dark">
          <View style={styles.bottomSheetCont}>{renderPinToCollection()}</View>
        </BlurView>
      ) : (
        <></>
      )}
    </View>
  );
};

PinUnpinPostBottomSheetContent.propTypes = {
  feedItem: PropTypes.object,
  collectionDetails: PropTypes.object,
  isPinned: PropTypes.bool,
  bottomSheetRef: PropTypes.object,
  showPinUnpinPostBottomSheet: PropTypes.bool,
  artistID: PropTypes.number,
};
PinUnpinPostBottomSheetContent.defaultProps = {
  feedItem: {},
  collectionDetails: {},
  isPinned: false,
  bottomSheetRef: {},
  showPinUnpinPostBottomSheet: false,
  artistID: -1,
};

const mapStateToProps = ({pin}) => ({
  pinToCollectionList: pin.pinToCollectionList,
});
export default connect(mapStateToProps, null)(PinUnpinPostBottomSheetContent);
