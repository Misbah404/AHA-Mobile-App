// @flow
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {setSinglePostItemId} from '../../actions/DashboardActions';
import {getSinglePostByIDRequest} from '../../actions/feedActions';
import {
  pinUnpinRequest,
  postCollectionPinUnpinSuccess,
} from '../../actions/PinActions';
import {
  BottomSheetComponent,
  BuyPostBottomSheetContent,
  FeedItem,
  NoDataFoundComponent,
  PinUnpinPostBottomSheetContent,
  SupportBottomContent,
} from '../../components';
import {strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

let currentArtArtirst = '';
const SinglePostContainer = props => {
  const {
    postID,
    _currentActiveActionName,
    onDeletePostHandlerCallback,
    shouldCloseCurrentActiveScreenAfterDeletingItem,
    deleteDescriptionText,
    singlePostItems,
    pinToCollectionId,
    isComingFromDeepLinkUrl,
    onBackPressHandler,
    openedSinglePostIndex,
  } = props;

  const dispatch = useDispatch();
  const [isFetchingDataFromServer, setIsFetchingDataFromServer] =
    useState(true);
  const [singlePostItem, setSinglePostItem] = useState(() => {});

  const [isFullViewVisible, setIsFullViewVisible] = useState(() => false);
  const [showBuyPostBottomSheet, setShowBuyPostBottomSheet] = useState(
    () => false,
  );
  const [showPinUnpinPostBottomSheet, setShowPinUnpinPostBottomSheet] =
    useState(() => false);
  const [showSuppportBottomSheet, setShowSuppportBottomSheet] = useState(
    () => false,
  );
  const sheetRef = useRef(null);
  const pinUnpinPostBottomSheetRef = useRef(null);
  const prevPostIDRef = useRef(() => null);
  const supportButtonRef = useRef(null);

  const isActiveScreen = util.areValuesEqual(
    _currentActiveActionName,
    'singlePostContainer',
  );

  useEffect(() => {
    if (postID != prevPostIDRef.current) {
      setIsFetchingDataFromServer(true);
      dispatch(
        getSinglePostByIDRequest(postID, res => {
          setIsFetchingDataFromServer(false);
          if (!util.isEmptyObject(res)) {
            mixpanel.track('Visit', {
              PageName: 'Item Detail',
              ItemName: res.title,
              ItemType: res.type,
              ItemDesigner: res.artist?.profileTagId,
            });
            if (res.isForSale) {
              mixpanel.track('View Item Details', {
                PageName: 'Item Details',
                ItemDesigner: res.artist?.profileTagId,
                isSale: res.isForSale,
                ItemName: res.title,
                ItemCost: res.price > 1 ? res.price : 0,
                ItemID: res.id,
                ItemType: res.type,
              });
            } else {
              mixpanel.track('View Item Details', {
                PageName: 'Item Details',
                ItemDesigner: res.artist?.profileTagId,
                isSale: res.isForSale,
                ItemName: res.title,
                ItemID: res.id,
                ItemType: res.type,
              });
            }
          }
        }),
      );
    }
  }, [prevPostIDRef, postID]);

  useEffect(() => {
    prevPostIDRef.current = postID;
  }, [prevPostIDRef]);
  // useEffect(() => {
  //   if (!util.isEmptyObject(singlePostItem)) {
  //     mixpanel.track('Visit', {
  //       PageName: 'Item Detail',
  //       ItemName: singlePostItem.title,
  //       ItemType: singlePostItem.type,
  //       ItemDesigner: singlePostItem.artist?.profileTagId,
  //     });
  //     if (singlePostItem.isForSale) {
  //       mixpanel.track('View Item Details', {
  //         PageName: 'Item Details',
  //         ItemDesigner: singlePostItem.artist?.profileTagId,
  //         isSale: singlePostItem.isForSale,
  //         ItemName: singlePostItem.title,
  //         ItemCost: singlePostItem.price > 1 ? singlePostItem.price : 0,
  //         ItemID: singlePostItem.id,
  //         ItemType: singlePostItem.type,
  //       });
  //     } else {
  //       mixpanel.track('View Item Details', {
  //         PageName: 'Item Details',
  //         ItemDesigner: singlePostItem.artist?.profileTagId,
  //         isSale: singlePostItem.isForSale,
  //         ItemName: singlePostItem.title,
  //         ItemID: singlePostItem.id,
  //         ItemType: singlePostItem.type,
  //       });
  //     }
  //   }
  // }, [singlePostItem]);

  useEffect(() => {
    const mIndex = util.findIndexById(singlePostItems, postID);
    if (mIndex != -1) {
      setSinglePostItem(singlePostItems[mIndex]);
    }
  }, [singlePostItems]);

  useEffect(() => {
    dispatch(setSinglePostItemId(postID));
  }, [postID, _currentActiveActionName]);

  function onCloseBottomSheet() {
    setIsFullViewVisible(false);
    sheetRef?.current?.snapTo(2);
  }

  function onBottomSheetNodeValueChange(val) {
    if (val > 0.7) setIsFullViewVisible(true);
    else setIsFullViewVisible(false);
  }

  function onBuyButtonPressHandlerCallback() {
    setIsFullViewVisible(false);
    setShowBuyPostBottomSheet(true);
    sheetRef?.current?.snapTo(1);
  }

  function onPinUnpinButtonPressHandlerCallback(payload) {
    const {pin: shouldPinPost, shouldOpenBottomSheet} = payload;
    !!!shouldOpenBottomSheet && dispatch(pinUnpinRequest(payload, _ => {}));
    dispatch(postCollectionPinUnpinSuccess(payload));

    if (!!shouldPinPost && !!shouldOpenBottomSheet) {
      setShowPinUnpinPostBottomSheet(true);
      pinUnpinPostBottomSheetRef.current.snapTo(0);
    }
  }

  const onSupportButtonPressHandlerCallback = artArtirst => {
    console.log({artArtirst});
    currentArtArtirst = artArtirst;
    setShowSuppportBottomSheet(true);
    supportButtonRef?.current?.snapTo(0);
  };

  const renderLoader = useMemo(
    () => (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.background.purple} />
      </View>
    ),
    [isFetchingDataFromServer],
  );

  const renderBackIcon = () => (
    <TouchableOpacity
      onPress={() => {
        if (isComingFromDeepLinkUrl) {
          onBackPressHandler();
        } else {
          Actions.pop();
          setSinglePostItem({});
        }
      }}
      style={styles.btnImage}>
      <Image
        source={Images.backButton}
        resizeMode={'contain'}
        style={styles.backBtnIcon}
      />
    </TouchableOpacity>
  );

  const renderFeedItemView = () => {
    return !util.isEmptyObject(singlePostItem) ? (
      <FeedItem
        feedItem={singlePostItem}
        isSinglePostItem={true}
        shouldPlayVideoOnCurrentScreen={
          openedSinglePostIndex == singlePostItem.id && isActiveScreen
        }
        onDeletePostHandlerCallback={onDeletePostHandlerCallback}
        shouldCloseCurrentActiveScreenAfterDeletingItem={
          shouldCloseCurrentActiveScreenAfterDeletingItem
        }
        pinToCollectionId={pinToCollectionId}
        deleteDescriptionText={deleteDescriptionText}
        onBuyButtonPressHandler={onBuyButtonPressHandlerCallback}
        onPinUnpinButtonPressHandler={onPinUnpinButtonPressHandlerCallback}
        onSupportButtonPressHandler={onSupportButtonPressHandlerCallback}
      />
    ) : (
      <View style={styles.noPostsFoundCont}>
        <NoDataFoundComponent text={strings.NO_POST_FOUND} />
      </View>
    );
  };

  const renderBuyPostBottomSheet = () => (
    <View
      style={styles.bottomSheetContainer}
      pointerEvents={!!showBuyPostBottomSheet ? 'auto' : 'none'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 4,
        }}
        onPress={() => {
          sheetRef.current.snapTo(2);
          setShowBuyPostBottomSheet(false);
          setIsFullViewVisible(false);
        }}></TouchableOpacity>
      <BottomSheetComponent
        refRBSheet={sheetRef}
        _snapPoints={[
          Metrics.screenHeight - (Metrics.screenHeight * 23) / 100,
          210,
          0,
        ]}
        renderView={() =>
          !!showBuyPostBottomSheet ? (
            <BuyPostBottomSheetContent
              sheetRef={sheetRef}
              isFullViewVisible={isFullViewVisible}
              setIsFullViewVisible={setIsFullViewVisible}
              setShowBottomSheet={setShowBuyPostBottomSheet}
              feedItem={singlePostItem}
            />
          ) : (
            <></>
          )
        }
        initialSnap={2}
        setShouldShowBottomSheet={setShowBuyPostBottomSheet}
        isShowingBottomSheet={showBuyPostBottomSheet}
        onBottomSheetClose={onCloseBottomSheet}
        onBottomSheetNodeValueChange={onBottomSheetNodeValueChange}
      />
    </View>
  );

  const renderPinUnpinPostBottomSheet = () => (
    <View
      style={styles.bottomSheetContainer}
      pointerEvents={showPinUnpinPostBottomSheet ? 'auto' : 'none'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 4,
        }}
        onPress={() => {
          pinUnpinPostBottomSheetRef.current.snapTo(1);
          setShowPinUnpinPostBottomSheet(false);
        }}></TouchableOpacity>
      <BottomSheetComponent
        refRBSheet={pinUnpinPostBottomSheetRef}
        _snapPoints={[440, 0]}
        renderView={() => (
          <PinUnpinPostBottomSheetContent
            bottomSheetRef={pinUnpinPostBottomSheetRef}
            setShowBottomSheet={setShowPinUnpinPostBottomSheet}
            showPinUnpinPostBottomSheet={showPinUnpinPostBottomSheet}
            feedItem={singlePostItem}
          />
        )}
        isShowingBottomSheet={showPinUnpinPostBottomSheet}
        onBottomSheetClose={() => setShowPinUnpinPostBottomSheet(false)}
      />
    </View>
  );

  const renderSupportBottomSheet = () => (
    <View
      style={styles.bottomSheetContainer}
      pointerEvents={showSuppportBottomSheet ? 'auto' : 'none'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 4,
        }}
        onPress={() => {
          supportButtonRef.current.snapTo(1);
        }}></TouchableOpacity>
      <BottomSheetComponent
        refRBSheet={supportButtonRef}
        _snapPoints={[230, 0]}
        renderView={() => (
          <SupportBottomContent
            artirst={currentArtArtirst}
            onBottomSheetClose={setShowSuppportBottomSheet}
          />
        )}
        isShowingBottomSheet={showSuppportBottomSheet}
        onBottomSheetClose={() => setShowSuppportBottomSheet(false)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {isFetchingDataFromServer ? (
        renderLoader
      ) : (
        <>
          {renderBackIcon()}
          {renderFeedItemView()}
        </>
      )}
      {renderBuyPostBottomSheet()}
      {renderPinUnpinPostBottomSheet()}
      {renderSupportBottomSheet()}
    </View>
  );
};
SinglePostContainer.propTypes = {
  postID: PropTypes.string.isRequired,
  onDeletePostHandlerCallback: PropTypes.func,
  shouldCloseCurrentActiveScreenAfterDeletingItem: PropTypes.bool,
  deleteDescriptionText: PropTypes.string,
  isComingFromDeepLinkUrl: PropTypes.bool,
  onBackPressHandler: PropTypes.func,
};
SinglePostContainer.defaultProps = {
  onDeletePostHandlerCallback: undefined,
  shouldCloseCurrentActiveScreenAfterDeletingItem: true,
  deleteDescriptionText: strings.ARE_YOU_SURE_TO_DELETE_THIS_POST,
  isComingFromDeepLinkUrl: false,
  onBackPressHandler: () => Actions.pop(),
};

const mapStateToProps = ({general, dashboard}) => ({
  _currentActiveActionName: general.currentActiveActionName,
  singlePostItems: dashboard.singlePostItemData,
  openedSinglePostIndex: dashboard.openedSinglePostIndex,
});
const actions = {};
export default connect(mapStateToProps, actions)(SinglePostContainer);
