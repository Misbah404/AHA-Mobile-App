// @flow
import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from '..';
import { strings, userProfile } from '../../constants';
import { AppStyles, Colors, Images } from '../../theme';
import styles from './styles';

const UserPublicProfileComponent = props => {
  const [follow, setFollow] = useState(false);
  return (
    <>
      <View style={styles.profilePicView}>
        {/* <Image
          source={{uri: userProfile.profileImage}}
          style={styles.profilePic}
        /> */}
        <Text style={styles.profileName}>{userProfile.name}</Text>
        {userProfile.isArtist && (
          <Text
            style={[{fontSize: 10, marginTop: 2, color: Colors.text.white}]}>
            {userProfile.followers} Followers
          </Text>
        )}

        {userProfile.isArtist && (
          <>
            <View
              style={[
                AppStyles.mTop20,
                AppStyles.alignItemsCenter,
                {
                  flexDirection: 'row',
                  marginLeft: 20,
                  justifyContent: 'space-evenly',
                },
              ]}>
              <TouchableOpacity
                style={follow ? styles.followingButtonView : styles.buttonView}
                onPress={() => setFollow(!follow)}>
                {follow ? (
                  <Text style={styles.button}>{strings.FOLLOWING}</Text>
                ) : (
                  <Text style={styles.button}>{strings.FOLLOW}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.followingButtonView}
                onPress={() => alert('Support the Artist')}>
                <Text style={styles.button}>{strings.SUPPORT}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.socialMediaMainView}>
              <TouchableOpacity
                onPress={() => userProfile.tittokLink}
                style={styles.socialMediaView}
                activeOpacity={0.4}>
                <Image source={Images.tiktokIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => userProfile.instagramLink}
                style={styles.socialMediaView}
                activeOpacity={0.4}>
                <Image source={Images.instagramIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => userProfile.facebookLink}
                style={styles.socialMediaView}
                activeOpacity={0.4}>
                <Image source={Images.facebookIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => userProfile.dribbleLink}
                style={styles.socialMediaView}
                activeOpacity={0.4}>
                <Image source={Images.dribbleIcon} />
              </TouchableOpacity>
            </View>
          </>
        )}

        <Text
          style={[
            styles.profileDescription,
            userProfile.isArtist && AppStyles.mTop20,
          ]}>
          {userProfile.bio}
        </Text>
      </View>

      {!userProfile.isArtist && (
        <View style={styles.followView}>
          <TouchableOpacity style={styles.buttonView} activeOpacity={0.5}>
            <Text style={styles.button}>{strings.FOLLOW}</Text>
          </TouchableOpacity>
        </View>
      )}

      {userProfile.isArtist && (
        <View style={AppStyles.mTop15}>
          <FlatList
            data={userProfile.interest}
            horizontal
            keyExtractor={(_, index) => index}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
            renderItem={({item}) => {
              return (
                <View style={styles.selectedItemView}>
                  <Image source={item.image} />
                  <Text style={styles.selectedItemText}>{item.title}</Text>
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

UserPublicProfileComponent.propTypes = {};

UserPublicProfileComponent.defaultProps = {};

export default UserPublicProfileComponent;
