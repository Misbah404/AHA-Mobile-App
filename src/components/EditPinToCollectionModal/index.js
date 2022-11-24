import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {KeyboardAwareScrollViewComponent, TextInput} from '..';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import ButtonView from '../ButtonView';
import styles from './styles';

const EditPinToCollectionModal = props => {
  const {
    heading,
    onChangeEditField,
    collectionName,
    setModalVisibility,
    isModalVisible,
    onSubmitEditModal,
    error,
    isLoading,
    isPrivacy,
  } = props;
  const [isPublicBtnSelected, setIsPublicBtnSelected] = useState(
    () => isPrivacy,
  );

  return (
    <KeyboardAwareScrollViewComponent>
      <Modal
        visible={isModalVisible}
        avoidKeyboard={true}
        coverScreen={true}
        backdropOpacity={0.4}
        style={{zIndex: 1}}
        onBackdropPress={() => {
          setModalVisibility(false);
        }}>
        <ImageBackground
          source={Images.EditPinToCollectionBackground}
          style={styles.container}>
          <View style={{marginHorizontal: 15}}>
            {!!!util.isEmptyValue(heading) && (
              <Text style={styles.headingTextStyle}>
                {strings.COLLECTION_NAME}
              </Text>
            )}
            <TextInput
              value={collectionName}
              autoFocus={false}
              multiline={true}
              maxLength={40}
              onChangeText={text => {
                onChangeEditField(text);
              }}
              style={[
                util.isPlatformAndroid
                  ? styles.inputTextStyleAndroid
                  : styles.inputTextStyleIos,
              ]}
              returnKeyType="done"
              onSubmitEditing={() => onSubmitEditModal(isPublicBtnSelected)}
              placeholder="Type Here"
              placeholderColor={Colors.white}
              error={error}
            />
            <Text style={[styles.headingTextStyle]}>
              {strings.COLLECTION_PRIVACY}
            </Text>
            <View style={styles.btnRowView}>
              <ButtonView
                style={[
                  styles.btn,
                  !isPublicBtnSelected && {
                    backgroundColor: Colors.background.purple,
                  },
                ]}
                onPress={() => {
                  setIsPublicBtnSelected(false);
                }}>
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
            </View>

            <ButtonView
              onPress={() => onSubmitEditModal(isPublicBtnSelected)}
              style={{marginTop: 20, width: 70}}>
              {!isLoading ? (
                <Text style={styles.saveBtn}>{strings.SAVE}</Text>
              ) : (
                <ActivityIndicator
                  style={{marginRight: 25}}
                  color={Colors.white}
                />
              )}
            </ButtonView>
          </View>
        </ImageBackground>
      </Modal>
    </KeyboardAwareScrollViewComponent>
  );
};

EditPinToCollectionModal.propTypes = {
  heading: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};
EditPinToCollectionModal.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(EditPinToCollectionModal);
