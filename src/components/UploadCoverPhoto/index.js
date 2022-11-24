import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {uploadImageToServer} from '../../helpers/ImageUploadHelper';

const UploadCoverPhoto = props => {
  const [isSendingImageToS3, setIsSendingImageToS3] = useState(() => false);
  const {coverPhoto, setCoverPhoto, _setIsSendingImageToS3} = props;

  function uploadImageToS3AndUpdateImageView(_image) {
    setIsSendingImageToS3(true);
    uploadImageToServer(_image.uri, setCoverPhoto, _setIsSendingImageToS3);
  }

  const renderLoader = () => (
    <View style={{position: 'absolute', right: 0, left: 0}}>
      <ActivityIndicator
        animating
        size="small"
        color={Colors.white}
        style={styles.imageLoader}
      />
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
        Actions.jump('gallery', {
          setSelectedItemsHandler: uploadImageToS3AndUpdateImageView,
          shouldSelectSingleItemOnly: true,
          returnSingleItemCapturedByCamera: true,
          hasCoverIamge: true,
          isArtist: true,
          isCrop: true,
        });
      }}>
      {/* image */}
      <View style={styles.imageStyleCont}>
        <FastImage
          style={styles.imageStyle}
          source={
            coverPhoto
              ? {
                  uri: coverPhoto,
                  priority: FastImage.priority.high,
                }
              : Images.defaultImageOnboarding
          }
          onLoad={() => {
            setIsSendingImageToS3(false);
            _setIsSendingImageToS3(false);
          }}
          resizeMode={
            !coverPhoto
              ? FastImage.resizeMode.contain
              : FastImage.resizeMode.cover
          }
        />
        {isSendingImageToS3 && renderLoader()}
      </View>

      {/* upload cover text */}
      <Text style={styles.uploadTextStyle}>{strings.UPLOAD_COVER}</Text>

      {/* plus icon */}
      <View style={styles.plusIconContStyle}>
        <Image
          source={Images.uploadCoverPhotoIcon}
          style={styles.plusIconStyle}
        />
      </View>
    </TouchableOpacity>
  );
};

UploadCoverPhoto.propTypes = {
  coverPhoto: PropTypes.string.isRequired,
  setCoverPhoto: PropTypes.func.isRequired,
  _setIsSendingImageToS3: PropTypes.func,
};
UploadCoverPhoto.defaultProps = {
  _setIsSendingImageToS3: Function(),
};

const mapStateToProps = ({general}) => ({});

export default connect(mapStateToProps, null)(UploadCoverPhoto);
