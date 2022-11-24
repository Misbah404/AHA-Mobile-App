// @flow
import PropTypes from 'prop-types';
import React, {useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollViewComponent, Text} from '..';
import {TextInput} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const ModalView = props => {
  const {
    isModalVisible,
    handleButtonOfModal,
    handleCrossButtonOfModal,
    heading,
    description1,
    description2,
    image,
    buttonText,
    isCrossIconVisible,
    isPinModal,
    setPinModal,
    createPinToCollection,
    isWelComeOnboard,
    isSendingDataToServer,
    showModalTwoOption,
  } = props || {};

  const inputRef = useRef(() => null);
  const [createPinToCollectionTxt, setCreatePinToCollectionTxt] = useState(
    () => '',
  );
  const [createPinToCollectionTxtError, setCreatePinToCollectionTxtError] =
    useState(() => '');

  function validation() {
    let isValidData = true;
    if (util.isEmptyValue(createPinToCollectionTxt)) {
      setCreatePinToCollectionTxtError(strings.REQUIRED_FIELD);
      isValidData = false;
    }
    return isValidData;
  }

  const createPinToCollectionClick = () => {
    if (!!validation()) {
      createPinToCollection(createPinToCollectionTxt);
    }
  };

  const renderLoader = useMemo(
    () => <ActivityIndicator animating size="small" color={Colors.white} />,
    [isSendingDataToServer],
  );

  return (
    <KeyboardAwareScrollViewComponent>
      {isWelComeOnboard && (
        <Modal isVisible={isModalVisible}>
          <View style={[styles.welcomeBoardView]}>
            <Image source={image} style={{marginTop: 15}} />

            <Text style={styles.headingWelComeBoard}>{heading}</Text>
            <Text style={[styles.descriptionWelcomeBoard]}>{description1}</Text>
            <Text style={styles.description}>{description2}</Text>
            <TouchableOpacity
              style={styles.buttonViewWelcomeBoard}
              onPress={handleButtonOfModal}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>

            {isCrossIconVisible == true && (
              <TouchableOpacity
                style={styles.modalCloseIconView}
                onPress={handleCrossButtonOfModal}>
                <Image
                  source={Images.crossIcon}
                  style={{width: 22, height: 22}}
                />
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      )}

      <Modal isVisible={isModalVisible}>
        <View style={[styles.modalViewCart]}>
          <Image source={image} style={{marginTop: 30}} />

          <Text style={styles.headingCart}>{heading}</Text>
          <Text style={[styles.descriptionCart, AppStyles.mTop20]}>
            {description1}
          </Text>
          <Text style={styles.description}>{description2}</Text>
          <TouchableOpacity
            style={styles.buttonViewCart}
            onPress={handleButtonOfModal}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>

          {isCrossIconVisible == true && (
            <TouchableOpacity
              style={styles.modalCloseIconView}
              onPress={handleCrossButtonOfModal}>
              <Image
                source={Images.crossIcon}
                style={{width: 28, height: 28}}
              />
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      <Modal
        onBackdropPress={() => {
          setCreatePinToCollectionTxtError('');
          setCreatePinToCollectionTxt('');
          setPinModal(false);
        }}
        avoidKeyboard={true}
        coverScreen={true}
        backdropOpacity={0.4}
        isVisible={isPinModal}>
        <ImageBackground
          source={Images.ModalBackgroundImage}
          style={[styles.modalView]}>
          <Text style={styles.heading}>{strings.CREATE_A_NEW_COLLECTION}</Text>
          <TextInput
            ref={inputRef}
            value={createPinToCollectionTxt}
            autoFocus={false}
            multiline={true}
            maxLength={40}
            onChangeText={text => {
              setCreatePinToCollectionTxtError('');
              setCreatePinToCollectionTxt(text);
            }}
            style={{
              borderBottomColor: Colors.white,
              borderBottomWidth: 1,
              marginTop: 35,
              color: Colors.white,
            }}
            returnKeyType="done"
            onSubmitEditing={createPinToCollectionClick}
            placeholder="Type Here"
            placeholderColor={Colors.white}
            error={createPinToCollectionTxtError}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 30,
              left: 20,
            }}>
            {isSendingDataToServer ? (
              renderLoader
            ) : (
              <TouchableOpacity onPress={createPinToCollectionClick}>
                <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                  {strings.CREATE}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </Modal>
    </KeyboardAwareScrollViewComponent>
  );
};

ModalView.propTypes = {
  heading: PropTypes.string,
  description1: PropTypes.string,
  description2: PropTypes.string,
  image: PropTypes.string,
  buttonText: PropTypes.string,
  isCrossIconVisible: PropTypes.bool,
  isPinModal: PropTypes.bool,
  isSendingDataToServer: PropTypes.bool,
};

ModalView.defaultProps = {
  heading: '',
  description1: '',
  description2: '',
  image: '',
  buttonText: '',
  isCrossIconVisible: false,
  isPinModal: false,
  isSendingDataToServer: false,
};

export default ModalView;
