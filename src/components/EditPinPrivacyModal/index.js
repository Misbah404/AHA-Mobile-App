import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect, useDispatch} from 'react-redux';
import {changePinPrivacyRequest} from '../../actions/DashboardActions';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import ButtonView from '../ButtonView';
import styles from './styles';

const EditPinToCollectionModal = props => {
  const {
    setModalVisibility,
    isModalVisible,
    collectionId,
    selectedButtonIsPublic,
    artID,
    title,
    onSaveBtnPressHandlerCallback,
    isLoadingCallBack,
  } = props;

  const [isPublicBtnSelected, setIsPublicBtnSelected] = useState(
    selectedButtonIsPublic,
  );

  useEffect(() => {
    setIsPublicBtnSelected(selectedButtonIsPublic);
  }, [selectedButtonIsPublic]);

  const [isLoading, setIsLoading] = useState(() => false);
  const dispatch = useDispatch();

  function onSaveBtnPressHandler() {
    setIsLoading(true);
    const payload = {
      art_id: artID,
      is_public: isPublicBtnSelected,
      artist_collection_id: collectionId,
    };
    dispatch(
      changePinPrivacyRequest(payload, () => {
        setIsLoading(false);
        setModalVisibility(false);
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
    if (util.isFieldNil(isSelected)) return <></>;
    return (
      <ButtonView
        onPress={() => {
          setIsPublicBtnSelected(!isPublicBtnSelected);
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

  const renderPrivateButton = () => {
    return (
      <ButtonView
        onPress={() => {
          setIsPublicBtnSelected(false);
        }}
        style={[
          styles.btn,
          !isPublicBtnSelected && {
            backgroundColor: Colors.background.purple,
          },
        ]}>
        <Text
          style={[
            styles.btnTxt,
            !isPublicBtnSelected && {
              color: Colors.white,
            },
          ]}>
          {strings.PRIVATE}
        </Text>
        {!isPublicBtnSelected && (
          <Image style={styles.checkIcon} source={Images.check} />
        )}
      </ButtonView>
    );
  };

  const renderPublicButton = () => {
    return (
      <ButtonView
        onPress={() => {
          setIsPublicBtnSelected(true);
        }}
        style={[
          styles.btn,
          isPublicBtnSelected && {
            backgroundColor: Colors.background.purple,
          },
        ]}>
        <Text
          style={[
            styles.btnTxt,
            isPublicBtnSelected && {
              color: Colors.white,
            },
          ]}>
          {strings.PUBLIC}
        </Text>
        {isPublicBtnSelected && (
          <Image style={styles.checkIcon} source={Images.check} />
        )}
      </ButtonView>
    );
  };

  const renderSaveButton = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={
        util.isFieldNil(onSaveBtnPressHandlerCallback)
          ? onSaveBtnPressHandler
          : () => onSaveBtnPressHandlerCallback(isPublicBtnSelected)
      }>
      <Text style={styles.saveBtn}>{strings.SAVE}</Text>
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
          <Text style={styles.headingTextStyle}>{title}</Text>
          <View style={styles.btnRowView}>
            {renderPrivateButton()}
            {renderPublicButton()}
          </View>
          {isLoading || isLoadingCallBack ? renderLoader() : renderSaveButton()}
        </View>
      </ImageBackground>
    </Modal>
  );
};

EditPinToCollectionModal.propTypes = {
  heading: PropTypes.string,
  artID: PropTypes.number,
  collectionId: PropTypes.number,
  title: PropTypes.string,
  privacyStatusIsPublic: PropTypes.bool,
  onSaveBtnPressHandlerCallback: PropTypes.func,
  isLoadingCallBack: PropTypes.bool.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
};
EditPinToCollectionModal.defaultProps = {
  artID: -1,
  collectionId: -1,
  title: '',
  onSaveBtnPressHandlerCallback: undefined,
  isLoadingCallBack: false,
  privacyStatusIsPublic: false,
  heading: '',
};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(EditPinToCollectionModal);
