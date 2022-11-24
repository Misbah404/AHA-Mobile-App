// @flow
import PropTypes from 'prop-types';
import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollViewComponent} from '..';
import {
  salesOrderStatusChangeRequest,
  salesOrderStatusChangeSuccess,
} from '../../actions/SalesActions';
import {TextInput, ButtonView} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const ModalOrderChange = props => {
  const {
    setModalVisibility,
    isModalVisible,
    orderID,
    arts,
    setAfterChangeStatus,
    status,
    id,
    isShipment,
  } = props;
  const [isPublicBtnSelected, setIsPublicBtnSelected] = useState();
  const [statusChange, setStatusChange] = useState(() => status);
  const [firstBtnTxt, setFirstBtnTxt] = useState(() => status);
  const [secondBtnTxt, setSecondBtnTxt] = useState(() => '');
  const [isDisableSaveBtn, setIsDisableSaveBtn] = useState(() => false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsPublicBtnSelected();

    if (util.areValuesEqual(status, 'Dispatched')) {
      setFirstBtnTxt('Completed');
      setStatusChange('completed');
    } else if (util.areValuesEqual(status, 'In Queue')) {
      setFirstBtnTxt('Processing');
      setSecondBtnTxt('Cancelled');
      setStatusChange('processing');
    } else if (util.areValuesEqual(status, 'Processing')) {
      setFirstBtnTxt('Dispatched');
      setSecondBtnTxt('Cancelled');
      setStatusChange('dispatched');
    }
  }, [status]);

  useEffect(() => {
    if (isShipment && util.areValuesEqual(status, 'Processing')) {
      setFirstBtnTxt('Cancelled');
      setStatusChange('cancelled');
    }
  }, []);

  useEffect(() => {
    if (isPublicBtnSelected && util.areValuesEqual(status, 'Dispatched')) {
      setIsDisableSaveBtn(true);
    } else {
      setIsDisableSaveBtn(false);
    }
  }, [isPublicBtnSelected, statusChange]);

  const [isLoading, setIsLoading] = useState(() => false);

  function onSaveBtnPressHandler() {
    setIsLoading(true);

    const payload = {
      order_id: orderID,
      art_id: arts?.id,
      status: statusChange?.toLowerCase(),
      order_art_id: id,
    };

    dispatch(
      salesOrderStatusChangeRequest(payload, res => {
        setIsLoading(false);
        setModalVisibility(false);
        if (res) {
          setAfterChangeStatus(statusChange);

          const data = {
            id,
            statusChange,
            status,
          };
          dispatch(salesOrderStatusChangeSuccess(data));
        }
      }),
    );
  }

  const renderLoader = () => (
    <ActivityIndicator
      style={styles.loaderStyle}
      animating
      size="small"
      color={Colors.white}
    />
  );

  const renderButton = (isSelected, btnText) => {
    return (
      <ButtonView
        onPress={() => {
          setIsPublicBtnSelected(!isPublicBtnSelected);
          setStatusChange(btnText);
        }}
        style={[
          styles.btn,
          isSelected && {
            backgroundColor: Colors.background.purple,
          },
        ]}>
        <Text
          style={[
            styles.btnTxt,
            isSelected && {
              color: Colors.white,
            },
          ]}>
          {btnText}
        </Text>
        {isSelected && <Image style={styles.checkIcon} source={Images.check} />}
      </ButtonView>
    );
  };

  const renderSaveButton = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisableSaveBtn}
      onPress={onSaveBtnPressHandler}>
      <Text
        style={[
          styles.saveBtn,
          isDisableSaveBtn && {color: Colors.disableColor},
        ]}>
        {strings.SAVE}
      </Text>
    </TouchableOpacity>
  );
  return (
    <Modal
      hasBackdrop={true}
      visible={isModalVisible}
      style={{zIndex: 1}}
      onBackdropPress={() => {
        setModalVisibility(false);
      }}>
      <ImageBackground
        source={Images.EditPinToCollectionBackground}
        style={styles.container}
        resizeMode={'stretch'}>
        <View style={{marginHorizontal: 15}}>
          <Text
            style={{
              color: Colors.white,
              fontFamily: Fonts.type.semiBold,
              fontSize: Fonts.size.medium,
            }}>
            Order Status
          </Text>
          <View style={styles.btnRowView}>
            {isShipment && util.areValuesEqual(status, 'Processing') ? (
              renderButton(true, firstBtnTxt)
            ) : (
              <>
                {renderButton(!isPublicBtnSelected, firstBtnTxt)}
                {!util.areValuesEqual(status, 'Dispatched') &&
                  renderButton(isPublicBtnSelected, secondBtnTxt)}
              </>
            )}
          </View>
          {isLoading ? renderLoader() : renderSaveButton()}
        </View>
      </ImageBackground>
    </Modal>
  );
};

ModalOrderChange.propTypes = {
  heading: PropTypes.string,
  description1: PropTypes.string,
  description2: PropTypes.string,
  image: PropTypes.string,
  buttonText: PropTypes.string,
  isCrossIconVisible: PropTypes.bool,
  isPinModal: PropTypes.bool,
};

ModalOrderChange.defaultProps = {
  heading: '',
  description1: '',
  description2: '',
  image: '',
  buttonText: '',
  isCrossIconVisible: false,
  isPinModal: false,
};

export default ModalOrderChange;
