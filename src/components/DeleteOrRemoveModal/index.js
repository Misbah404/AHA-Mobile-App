import PropTypes from 'prop-types';
import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const DeleteOrRemoveModal = props => {
  const {
    heading,
    description,
    positiveBtnText,
    negativeBtnText,
    optionBtnHandler,
    positiveBtnPressHandler,
    setModalVisibility,
    isModalVisible,
    optionalBtnText,
    containerStyle,
  } = props;

  return (
    <Modal
      visible={isModalVisible}
      style={{zIndex: 1}}
      onBackdropPress={() => {
        setModalVisibility(false);
      }}>
      <ImageBackground
        source={Images.ModalBackgroundImage}
        style={containerStyle ? containerStyle : styles.container}>
        {!!!util.isEmptyValue(heading) && (
          <Text style={styles.headingTextStyle}>{heading}</Text>
        )}
        <Text style={styles.descTextStyle}>{description}</Text>
        <View style={[styles.horizontalLine, AppStyles.mTop15]} />

        {!util.isEmptyValue(optionalBtnText) && (
          <>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                optionBtnHandler();
              }}>
              <Text style={styles.positiveNegativeBtnText}>
                {optionalBtnText}
              </Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
          </>
        )}

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => positiveBtnPressHandler()}>
          <Text style={styles.positiveNegativeBtnText}>{positiveBtnText}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            setModalVisibility(false);
          }}>
          <Text style={styles.positiveNegativeBtnText}>{negativeBtnText}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  );
};

DeleteOrRemoveModal.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  optionalBtnText: PropTypes.string,
  positiveBtnText: PropTypes.string.isRequired,
  negativeBtnText: PropTypes.string.isRequired,
  positiveBtnPressHandler: PropTypes.func.isRequired,
  optionBtnHandler: PropTypes.func,
  setModalVisibility: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  containerStyle: PropTypes.func,
};
DeleteOrRemoveModal.defaultProps = {
  optionalBtnText: '',
};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(DeleteOrRemoveModal);
