import {Image} from 'react-native-compressor';
import {BASE_URL} from '../config/WebService';
import RNConvertPhAsset from 'react-native-convert-ph-asset';
import {FFmpegKit} from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import util from '../util';

const uploadImageToServer = async (file, setUploadImageUri, setLoader) => {
  let imageUri = file;
  try {
    imageUri = await Image.compress(imageUri, {
      compressionMethod: 'auto',
    });
  } catch (errorWhileCompressingImage) {
    alert({
      error: 'errorWhileCompressingImage err 1' + errorWhileCompressingImage,
    });
    console.log({
      error: 'errorWhileCompressingImage err 1' + errorWhileCompressingImage,
    });
  }

  let URL = '';
  let typeOfUris = util.cloneDeepArray(imageUri);
  for (let index = 0; index < typeOfUris.length; index++) {
    delete typeOfUris[index].uri;
  }

  const payload = {
    number_of_url: typeOfUris,
  };
  setLoader(true);
  try {
    await fetch(`${BASE_URL}/api/v1/aws/sign-url`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
      }),
    })
      .then(response => response.json())
      .then(result => {
        URL = result.data[0];
      });
  } catch (error) {}

  const fileExt = util.getFileExtension(file);
  const media = {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'imageFile.' + fileExt,
  };

  await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: media,
    ACL: 'public-read',
  })
    .then(result => {})
    .catch(err => console.error('err', err));

  let imageUrl = URL.split('?')[0];

  setUploadImageUri(imageUrl);
};

const multiMediaUploadToServer = async (file, setUploadImageUri) => {
  const params = `?number_of_url=${file?.length}`;

  let typeOfUris = util.cloneDeepArray(file);
  for (let index = 0; index < typeOfUris.length; index++) {
    delete typeOfUris[index].uri;
  }

  const payload = {
    number_of_url: typeOfUris,
  };

  let comingSignedUri = [];
  let URL = '';

  try {
    await fetch(`${BASE_URL}/api/v1/aws/sign-url`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
      }),
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(result => {
        comingSignedUri = result.data;
      });
  } catch (error) {}

  if (!util.isArrayEmpty(comingSignedUri)) {
    const uploadMedia = [];
    for (let index = 0; index < comingSignedUri.length; index++) {
      uploadMedia.push(uploadToS3BySigned(file, comingSignedUri[index], index));
    }
    let mediaUpload = file;
    await Promise.all(uploadMedia).then(uploadedImgs => {
      uploadMedia.map((_, index) => {
        mediaUpload[index]['uri'] = uploadedImgs[index];

        if (index === comingSignedUri.length - 1) {
          setUploadImageUri(mediaUpload);
        }
      });
    });
  }
};

async function cacheResourcePath(sourcePath) {
  const uriComponents = sourcePath.split('/');
  const fileNameAndExtension = uriComponents[
    uriComponents.length - 1
  ].replaceAll(' ', '');

  const destPath = `${RNFS.CachesDirectoryPath}/${fileNameAndExtension}`;

  await RNFS.copyFile(sourcePath, destPath);
  return destPath;
}

/**
 * I write a litte util method to convert localIdentifier to assetURL in JavaScript
 * @param localIdentifier looks like 91B1C271-C617-49CE-A074-E391BA7F843F/L0/001
 * @param ext the extension: JPG, PNG, MOV
 * @returns {string}
 */
export const convertLocalIdentifierToAssetLibrary = (localIdentifier, ext) => {
  const hash = localIdentifier.split('/')[0];
  return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
};

async function uploadToS3BySigned(
  file,
  item,
  index,
  setUploadImageUri,
  comingSignedUri,
) {
  const fileExt = util.getFileExtension(file[index].uri);

  let mediaUri = file[index].uri;

  const mediaType = file[index].type;
  try {
    if (util.includesValue(mediaType, 'image')) {
      mediaUri = await Image.compress(mediaUri, {
        compressionMethod: 'auto',
      });
    } else {
      if (!util.isPlatformAndroid()) {
        await RNConvertPhAsset.convertVideoFromUrl({
          url: mediaUri,
          convertTo: 'mpeg4',
          quality: 'medium',
        })
          .then(response => {
            console.log(response);
            mediaUri = response.path;
          })
          .catch(err => {
            console.log(err);
          });
      }

      const finalVideo = `${RNFS.CachesDirectoryPath}/audioVideoFinal.mp4`;
      await cacheResourcePath(mediaUri).then(async rVideoUrl => {
        const ffmpegCmdString = `-y -i ${rVideoUrl} -vcodec libx264 -crf 21 -preset ultrafast ${finalVideo}`;
        await FFmpegKit.execute(ffmpegCmdString).then(async result => {
          mediaUri = finalVideo;
        });
      });
    }
  } catch (errorWhileCompressingImage) {
    alert({
      error: 'errorWhileCompressingImage err 2' + errorWhileCompressingImage,
    });
    console.log({
      error: 'errorWhileCompressingImage err 2' + errorWhileCompressingImage,
    });
  }
  const media = {
    uri: 'file://' + mediaUri,
    type: mediaType,
    name: 'mediaFile.' + fileExt,
  };
  await fetch(item, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: media,
    ACL: 'public-read',
  })
    .then(result => {})
    .catch(err => console.error('err', err));
  let imageUrl = item.split('?')[0];
  return imageUrl;
}

export {uploadImageToServer, multiMediaUploadToServer};
