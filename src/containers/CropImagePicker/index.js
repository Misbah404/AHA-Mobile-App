import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import {Actions} from 'react-native-router-flux';
export default function CropImagePicker(props) {
  const {selectedImage, hasCoverIamge, isArtist, setSelectedItemsHandler} =
    props;

  const pickSingle = (cropit, circular) => {
    ImagePicker.openCropper({
      path: selectedImage.uri,
      width: hasCoverIamge ? 200 : 100,
      height: hasCoverIamge ? 150 : 100,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then(image => {
        setSelectedItemsHandler({type: 'image', uri: image.path});
        Actions.pop();
      })
      .catch(err => {
        if (err?.code?.match(/E_PICKER_CANCELLED/)) {
          Actions.pop();
        } else {
        }
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.background.primary}}>
      {pickSingle(false, !hasCoverIamge, 200, 150)}
    </View>
  );
}
