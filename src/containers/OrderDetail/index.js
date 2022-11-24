import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  changeOrderPrivacyRequest,
  getOrderHistoryDetailRequest,
} from '../../actions/orderHistoryActions';
import {
  CustomNavbar,
  EditPinPrivacyModal,
  Loader,
  ModalOrderChange,
  OrderDetailComponent,
  OrderTrackingComponent,
} from '../../components';
import FileViewer from 'react-native-file-viewer';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './Styles';
import {salesOrderHistoryDetailsRequest} from '../../actions/SalesActions';
import {mixpanel} from '../../helpers/mixpanelHelper';
import RNFetchBlob from 'rn-fetch-blob';

const ORDER_STATUS = {
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
};

function OrderDetail(props) {
  const {isFromSales, details} = props || {};

  const [isModalOpen, setIsModalOpen] = useState(() => false);
  const [isEditable, setEditable] = useState(() => false);
  const [afterChangeStatus, setAfterChangeStatus] = useState(() => '');
  const [privacyModalVisibility, setPrivacyModalVisibility] = useState(
    () => false,
  );
  const [isSendingPrivacyStatusToServer, setIsSendingPrivacyStatusToServer] =
    useState(() => false);
  const [isFetchingDataFromServer, setIsFetchingDataFromServer] = useState(
    () => true,
  );
  const [orderDetail, setOrderDetail] = useState(() => {});
  const [shippoLabelUrl, setShippoLabelUrl] = useState(() => null);
  const [trackingUrl, setTrackingUrl] = useState(() => null);
  const {
    arts,
    shipment_charges,
    status,
    subtotal,
    total,
    thumbnail,
    user,
    address,
    id,
    card,
    isSelectedPrivacyOptionIsPublic = false,
  } = orderDetail || {};
  const {brand} = card || {};
  const {country, state, title, street} = address || {};
  const {profile_image, username, isArtist} = user || {};
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetchingDataFromServer(true);
    mixpanel.track('Visit', {PageName: 'Order Details'});

    const {orderID, artId, id} = details || {};
    if (!!isFromSales) {
      const params = `${id}`;
      dispatch(
        salesOrderHistoryDetailsRequest(params, res => {
          if (res) {
            setOrderDetail(res);
            setShippoLabelUrl(res?.arts[0]?.shippo_label_url ?? null);
            setTrackingUrl(res?.arts[0]?.tracking_url ?? null);
            setIsFetchingDataFromServer(false);
          }
        }),
      );
    } else {
      const params = `${orderID}`;
      if (!util.isUndefinedValue(orderID)) {
        dispatch(
          getOrderHistoryDetailRequest(params, res => {
            if (res) {
              setOrderDetail(res);
              setTrackingUrl(res?.arts[0]?.tracking_url ?? null);
              setIsFetchingDataFromServer(false);
            }
          }),
        );
      }
    }
  }, []);

  useEffect(() => {
    if (
      util.areValuesEqual(status, ORDER_STATUS.COMPLETED) ||
      util.areValuesEqual(status, ORDER_STATUS.CANCELLED)
    ) {
      setEditable(true);
    }
  }, [status]);

  useEffect(() => {
    {
      statusCompleteOrCancel;
    }
  }, [afterChangeStatus]);

  const statusCompleteOrCancel = useMemo(() => {
    if (
      util.areValuesEqual(afterChangeStatus, ORDER_STATUS.COMPLETED) ||
      util.areValuesEqual(afterChangeStatus, ORDER_STATUS.CANCELLED)
    ) {
      setEditable(true);
    }
    if (
      util.areValuesEqual(afterChangeStatus, 'completed') ||
      util.areValuesEqual(afterChangeStatus, 'cancelled')
    ) {
      setEditable(true);
    }
  }, [afterChangeStatus]);

  const downloadPDFPer = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download Photos',
            buttonPositive: 'OK',
          },
        ).then(async () => {
          downloadPDF();
        });
      } catch (err) {
        console.log({err});
      }
    } else {
      downloadPDF();
    }
  };

  const downloadPDF = () => {
    const {config, fs} = RNFetchBlob;
    const date = new Date();

    const dirs = RNFetchBlob.fs.dirs;
    const android = RNFetchBlob.android;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        title: 'Shipment Label',
        overwrite: true,
        mediaScannable: true,
        description: 'Downloading...',
        path: `${dirs.DownloadDir}/AHA Shipment/${
          date.getTime() + date.getSeconds()
        }.pdf`,
      },
      appendExt: 'pdf',
    };

    config(options)
      .fetch(
        'GET',
        shippoLabelUrl,
        //'https://deliver.goshippo.com/966af8b199404127af2e0a9620376683.pdf?Expires=1697805786&Signature=aW7IwctoEhucmf6TpAVZaX~4GRLCD4R6GggaEriLJZtURlXm5soN-hecVH5A7cZvQBf1JxP-Kza56RhF2rmocJSJ9KT1oFETlbiBFgHPUu3PJC5loFiNLZs-23ddXJExkQHrjTtKQowMImE8QeDK~4C6y~OXRLzZnuVVOTP9BNEYyrBuY99nfAcPPPcxv3r980iAiw-kYg6FtfxbUWsbJscQ9-OJf0440k6xiNeja5MXglKBzJwnbSZ1-lc2Ue7PzNU2rS1E~GX-vWgKTDQtFULvtOX1H-glLX3RONJJsCN~c8H~giPgRNFfffjtC38KN8Vwx98fWlWf2q0V5aKBbg__&Key-Pair-Id=APKAJRICFXQ2S4YUQRSQ',
        {
          'Content-Type': 'multipart/form-data',
          'Cache-Control': 'no-store',
        },
      )
      .then(res => {
        if (Platform.OS === 'android') {
          android.actionViewIntent(res.path(), 'application/pdf');
        }
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.previewDocument(res.path());
        }
      })
      .catch(err => {
        console.log({err});
      });
  };

  const onEditIconBtnPressHandler = () => {
    setPrivacyModalVisibility(!privacyModalVisibility);
  };

  const onSavePrivacyBtnPressHandlerCB = isPublicBtnSelected => {
    setIsSendingPrivacyStatusToServer(true);
    const payload = {
      order_id: id,
      is_public: isPublicBtnSelected,
    };
    dispatch(
      changeOrderPrivacyRequest(payload, () => {
        setIsSendingPrivacyStatusToServer(false);
        setPrivacyModalVisibility(false);
      }),
    );
  };
  const navBar = () => (
    <CustomNavbar
      title={isFromSales ? status : strings.ORDER_DETAIL}
      titleStyle={AppStyles.titleStyleForLeft}
      hasBack
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      rightBtnImage={
        isFromSales
          ? !util.isNullValue(shippoLabelUrl) &&
            util.areValuesEqual(status, 'Processing')
            ? Images.ShipmentLabel
            : {}
          : Images.editCollectionIcon
      }
      rightImageStyle={isFromSales ? {} : styles.editPrivacyIcon}
      rightBtnPress={
        isFromSales
          ? !util.isNullValue(shippoLabelUrl) &&
            util.areValuesEqual(status, 'Processing')
            ? downloadPDFPer
            : () => {}
          : onEditIconBtnPressHandler
      }
    />
  );

  const renderOrderCartList = () => (
    <FlatList
      data={arts}
      keyExtractor={(_, index) => index}
      renderItem={({item}) => {
        return (
          <OrderDetailComponent
            itemStatus={
              !util.isEmptyValue(afterChangeStatus)
                ? afterChangeStatus?.charAt(0).toUpperCase() +
                  afterChangeStatus?.slice(1)
                : status
            }
            isFromSales={isFromSales}
            item={item}
          />
        );
      }}
    />
  );

  const renderOrderDetail = () => (
    <View style={styles.totalMainView}>
      <View style={styles.subTotalView}>
        <Text style={styles.subTotalText}>{strings.SUB_TOTAL}</Text>
        <Text style={styles.subTotalText}>${subtotal}</Text>
      </View>

      <View style={[styles.subTotalView, AppStyles.mTop20]}>
        <Text style={styles.subTotalText}>{strings.SHIPMENT_FEE}</Text>
        <Text style={styles.subTotalText}>
          $
          {!util.areValuesEqual(shipment_charges, 0)
            ? Number(shipment_charges)?.toFixed(2)
            : 0}
        </Text>
      </View>

      <View style={styles.borderStyle}></View>

      <View style={styles.totalView}>
        <Text style={styles.totalText}>{`Total :  $${total}`}</Text>

        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            AppStyles.mTop5,
          ]}>
          <Text style={styles.totalText}>Pay by : </Text>
          <Text style={[styles.totalText, {fontFamily: Fonts.type.bold}]}>
            {brand}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderUserDetails = () => (
    <TouchableOpacity
      style={styles.userDetailView}
      activeOpacity={0.8}
      onPress={() =>
        Actions.jump('visitedProfile', {
          feedItem: {
            artist: {
              id: user?.id,
            },
          },
          isArtirst: isArtist,
        })
      }>
      <Text style={styles.userDetailTitle}>{strings.DETAILS}</Text>
      <View style={styles.userDetailViewTxt}>
        <View style={styles.userDetailInnerViewImg}>
          <Image style={styles.userDetailImg} source={{uri: profile_image}} />
          <View style={styles.userDetailNameView}>
            <Text style={{color: Colors.white}}>{strings.USERNAME}</Text>
            <Text style={styles.userDetailNameTxt}>{username}</Text>
          </View>
        </View>
        <View>
          <Image
            style={styles.userDetailCircleArrowImg}
            source={Images.angleCircleArrow}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAddress = () => (
    <View style={styles.addressMainView}>
      <Text style={styles.addressTxtTitle}>{strings.ADDRESS}</Text>
      <Text style={styles.addressTxt}>
        {street}, {state}, {country}
      </Text>
    </View>
  );

  const renderStatus = () => (
    <View style={styles.statusView}>
      <View style={{flex: 0.9}}>
        <Text
          style={{
            color: Colors.white,
            fontSize: Fonts.size.small,
          }}>
          Status |{' '}
          {afterChangeStatus
            ? afterChangeStatus?.charAt(0).toUpperCase() +
              afterChangeStatus?.slice(1)
            : status}
        </Text>
      </View>
      {!util.areValuesEqual(status, 'Returned') ? (
        <>
          {util.areValuesEqual(status, 'Dispatched') &&
          !util.areValuesEqual(shipment_charges, 0) ? (
            <View style={{flex: 0.1}}></View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setIsModalOpen(!isModalOpen);
              }}
              style={styles.statusTouchOp}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.type.regular,
                  fontSize: Fonts.size.small,
                }}>
                {strings.EDIT}
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View style={{flex: 0.1}}></View>
      )}
    </View>
  );

  const renderPrivacyModal = useMemo(
    () => (
      <EditPinPrivacyModal
        isModalVisible={privacyModalVisibility}
        setModalVisibility={setPrivacyModalVisibility}
        selectedButtonIsPublic={isSelectedPrivacyOptionIsPublic}
        artID={-1}
        title={strings.CHANGE_ORDER_PRIVACY}
        onSaveBtnPressHandlerCallback={onSavePrivacyBtnPressHandlerCB}
        isLoadingCallBack={isSendingPrivacyStatusToServer}
      />
    ),
    [privacyModalVisibility, isSendingPrivacyStatusToServer],
  );

  const renderTrackingView = () => (
    <View style={{marginVertical: 7}}>
      <OrderTrackingComponent />
    </View>
  );
  return (
    <View style={styles.container}>
      {navBar()}
      {!!isFetchingDataFromServer ? (
        <Loader loading={isFetchingDataFromServer} />
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {renderOrderCartList()}
          {isFromSales && renderUserDetails()}

          {isFromSales && !util.isUndefinedValue(address) && renderAddress()}
          {!isEditable && isFromSales && renderStatus()}
          {/* {isFromSales && renderTrackingView()} */}
          {renderOrderDetail()}

          {isFromSales && (
            <ModalOrderChange
              isModalVisible={isModalOpen}
              setModalVisibility={setIsModalOpen}
              status={
                afterChangeStatus
                  ? afterChangeStatus?.charAt(0).toUpperCase() +
                    afterChangeStatus?.slice(1)
                  : status
              }
              orderID={id}
              arts={arts[0]}
              id={details?.id ? details?.id : 0}
              setAfterChangeStatus={setAfterChangeStatus}
              isShipment={
                !util.areValuesEqual(shipment_charges, 0) &&
                util.areValuesEqual(status, 'Processing')
              }
            />
          )}
        </ScrollView>
      )}
      {renderPrivacyModal}
    </View>
  );
}
OrderDetail.propTypes = {
  details: PropTypes.object.isRequired,
};
OrderDetail.defaultProps = {};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, null)(OrderDetail);
