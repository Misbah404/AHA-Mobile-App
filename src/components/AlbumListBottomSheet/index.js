// @flow
import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Colors, Fonts, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

const AlbumListBottomSheet = props => {
  const {
    albumList,
    setGalleryImages,
    bottomSheetRef,
    setSelectedAlbumName,
    showAlbumList,
    setNextPage,
  } = props;

  const renderAlbumNameList = () => {
    const albumData = util.cloneDeepArray(albumList);
    const afterAddDefaultAlbum = {
      title: util.isPlatformAndroid() ? 'Gallery' : 'Recent',
      count: 0,
    };
    albumData.unshift(afterAddDefaultAlbum);
    const titles = albumData.map(item => item?.title);
    const filteredData = albumData.filter(
      ({title}, index) => !titles.includes(title, index + 1),
    );

    return (
      <FlatList
        data={filteredData}
        style={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{padding: 20, flex: 1}}
              onPress={() => {
                setSelectedAlbumName(item?.title);
                setNextPage(false);
                setGalleryImages([]);
                bottomSheetRef?.current?.snapTo(1);
              }}>
              <View>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: Fonts.size.medium,
                    fontFamily: Fonts.type.medium,
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index}
      />
    );
  };

  return (
    <View style={[styles.roundCorner]}>
      {showAlbumList && (
        <BlurView blurType="dark">
          <View style={styles.bottomSheetCont}>{renderAlbumNameList()}</View>
        </BlurView>
      )}
    </View>
  );
};

AlbumListBottomSheet.propTypes = {};
AlbumListBottomSheet.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(AlbumListBottomSheet);
