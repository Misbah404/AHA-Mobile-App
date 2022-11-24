import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import {
  ArtItem,
  CustomNavbar,
  NoDataFoundComponent,
  UserPublicProfileComponent,
  VibeItem,
} from '../../components';
import {
  userProfile,
  UserProfileImageCollection,
  UserProfileImagePin,
} from '../../constants';
import {AppStyles, Images} from '../../theme';
import styles from './UserPublicProfileStyles';

export default function UserPublicProfileView(props) {
  const {collectionViewSelected, handleTabbar, artViewSelected} = props;

  const renderArtItem = ({item, _}) => <ArtItem artItem={item} />;

  const renderArtsList = () => (
    <FlatList
      data={UserProfileImagePin}
      style={AppStyles.flex}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <NoDataFoundComponent text={strings.NO_POSTS_FOUND} />
      )}
      renderItem={renderArtItem}
      keyExtractor={(_, index) => index}
    />
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'cover'}
        style={[styles.imageBackground]}
        source={{uri: userProfile.profileImage}}>
        <CustomNavbar
          titleStyle={AppStyles.titleStyleForCenter}
          leftRightButtonWrapperStyle={{justifyContent: 'center'}}
          hasBack
          backgroundColor="transparent"
          rightBtnImage={Images.settingIcon}
          rightBtnPress={() => Actions.setting()}
        />
        <UserPublicProfileComponent />

        {/* tabbar */}
        <View
          style={[
            styles.tabbarMainView,
            userProfile.isArtist && AppStyles.mTop20,
          ]}>
          {/* please Dont remove inline style */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={[
                styles.tabbarView,
                artViewSelected && styles.tabbarViewSelected,
              ]}
              onPress={() => handleTabbar('art')}>
              <Image source={Images.artIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabbarView,
                collectionViewSelected && styles.tabbarViewSelected,
              ]}
              onPress={() => handleTabbar('collection')}>
              <Image source={Images.CollectionIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}>
        {artViewSelected == true && renderArtsList()}

        {collectionViewSelected == true && (
          <FlatList
            numColumns={3}
            data={UserProfileImageCollection}
            keyExtractor={(_, index) => index}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <VibeItem _item={item} />}
          />
        )}
      </ScrollView>
    </View>
  );
}
