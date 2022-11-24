import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import util from '../../util';
import {Colors} from '../../theme';
import styles from './styles';
import {Actions} from 'react-native-router-flux';

export default function CommunityItem(props) {
  const {item, onPress} = props;
  const {profile_name, image, isFollowing} = item;
  const [isLoadingImage, setIsLoadingImage] = useState(() => true);

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={1}
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
          uri: image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {!!isLoadingImage && (
        <View style={styles.imageLoadingStyle}>
          <ActivityIndicator animating size="small" color={Colors.white} />
        </View>
      )}

      <View style={styles.titleSecCont}>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
          {profile_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
