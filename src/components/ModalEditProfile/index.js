// @flow
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollViewComponent, Text} from '..';
import {AppStyles, Images} from '../../theme';
import styles from './styles';

const ModalEditProfile = props => {
  const {isModalVisible, setModalVisible, buttonText, heading, description1} =
    props || {};

  return (
    <KeyboardAwareScrollViewComponent>
      <Modal isVisible={isModalVisible}>
        <View style={[styles.welcomeBoardView]}>
          <Image
            source={Images.becomeAnArtistSuccessIcon}
            style={{marginTop: 15}}
          />

          <Text style={styles.headingWelComeBoard}>{heading}</Text>
          <Text style={[styles.descriptionWelcomeBoard]}>{description1}</Text>
          <TouchableOpacity
            style={styles.buttonViewWelcomeBoard}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAwareScrollViewComponent>
  );
};

ModalEditProfile.propTypes = {};

ModalEditProfile.defaultProps = {};

export default ModalEditProfile;
