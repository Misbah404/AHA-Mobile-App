import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../theme';
import styles from './styles';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
export default function OrderArtItem(props) {
  const {item} = props;
  const {size, title, total, thumbnail, description, art_id} = item;
  const [isLoadingImage, setIsLoadingImage] = useState(() => true);
  return (
    <TouchableOpacity
      onPress={() =>
        Actions.singlePostContainer({
          postID: art_id,
          isComingFromDeepLinkUrl: false,
        })
      }
      activeOpacity={0.8}
      style={{
        borderWidth: 1,
        borderColor: Colors.background.primary,
        width: '33.33%',
      }}>
      <FastImage
        style={[
          styles.image,
          isLoadingImage
            ? {borderWidth: 0.5, borderColor: Colors.text.lightGray2}
            : {},
        ]}
        onLoad={() => setIsLoadingImage(false)}
        source={{
          uri: thumbnail,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        {!!isLoadingImage && (
          <View style={styles.imageLoadingStyle}>
            <ActivityIndicator animating size="small" color={Colors.white} />
          </View>
        )}

        <View style={styles.titleSecCont}>
          <Text style={styles.txtTotal}>${total}</Text>
          <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.title}>
            {title}
          </Text>
        </View>
        {!util.isEmptyValue(size) && (
          <View style={styles.viewSize}>
            <Text style={styles.txtTotal}>{size}</Text>
          </View>
        )}
      </FastImage>
    </TouchableOpacity>
  );
}
