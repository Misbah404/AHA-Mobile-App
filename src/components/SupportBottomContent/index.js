import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import {getSellablePostsRequest} from '../../actions/DashboardActions';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {connect, useDispatch} from 'react-redux';
import util from '../../util';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import Loader from '../Loader';
import {BlurView} from '@react-native-community/blur';
import {useMemo} from 'react';
import {strings} from '../../constants';

function SupportBottomContent(props) {
  const {artirst, sellableArtsList, onBottomSheetClose} = props;
  const [artIDs, setArtIDs] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const dispatch = useDispatch();
  useEffect(() => {
    const params = `?artist_id=${
      artirst?.artistID
    }&offset=${0}&limit=${10}&sellable=true`;
    setIsLoading(true);
    dispatch(
      getSellablePostsRequest(params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsLoading(false);
          setArtIDs(res);
        } else {
          setIsLoading(false);
        }
      }),
    );
  }, [artirst]);

  const renderHorizontalArtsList = useMemo(() => {
    const data = util.filterArray(sellableArtsList, item =>
      artIDs?.includes(item.id),
    );
    return (
      <FlatList
        data={data.slice(0, 9)}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        snapToInterval={Metrics.screenWidth - 20}
        contentContainerStyle={{marginTop: 20}}
        decelerationRate={'fast'}
        renderItem={({item, index}) => {
          const isFirstItem = index === 0;
          const {thumbnail} = item || {};
          if (util.areValuesEqual(index, 8)) {
            return (
              <View style={styles.seeMoreMainView}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.jump('sellableArtsListing', {
                      artistID: artirst.artistID,
                      ArtistName: artirst?.ArtistName,
                    });
                  }}
                  style={[styles.relatedPostView, styles.seeMoreInner]}
                  activeOpacity={0.5}>
                  {!util.isFieldNil(thumbnail) && (
                    <ImageBackground
                      style={[styles.relatedPostView, styles.seeMoreInner]}
                      onLoad={() => setIsLoading(false)}
                      source={{
                        uri: thumbnail,
                      }}
                      imageStyle={{opacity: 0.2}}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'absolute',
                      right: 0,
                      left: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.white,

                        fontFamily: Fonts.type.Asap,
                        fontSize: Fonts.size.small,
                      }}>
                      {strings.SEE_MORE}
                    </Text>
                    <FastImage
                      style={{
                        width: 12,
                        height: 12,
                        marginLeft: 10,
                        transform: [{rotate: '180deg'}],
                      }}
                      source={Images.backButton}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View
                style={{
                  width: (Metrics.screenWidth - 25) / 3,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.singlePostContainer({
                      postID: item.id,
                    });
                  }}
                  style={[
                    styles.relatedPostView,
                    isFirstItem && styles.relatedImgViewFirstItem,
                  ]}
                  activeOpacity={0.5}>
                  {!util.isFieldNil(thumbnail) && (
                    <FastImage
                      style={[
                        {
                          height: 151,
                        },
                        isFirstItem && {
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        },
                      ]}
                      onLoad={() => setIsLoading(false)}
                      source={{
                        uri: thumbnail,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  )}
                  <Text
                    style={styles.suggestionText}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {item.title}
                  </Text>
                  <View style={styles.loaderView}>
                    <Loader loading={isLoading} />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
        }}
        keyExtractor={(_, index) => index}
      />
    );
  }, [artIDs]);

  return (
    <View
      style={{
        borderTopRightRadius: 87,
        borderTopLeftRadius: 0,
        overflow: 'hidden',
      }}>
      <BlurView blurType="dark">
        <View style={styles.containerMian}>
          <Text style={styles.heading}>{artirst.ArtistName}`s Store</Text>
          {!isLoading ? (
            renderHorizontalArtsList
          ) : (
            <View style={{alignSelf: 'center'}}>
              <Loader loading={true} />
            </View>
          )}
        </View>
      </BlurView>
    </View>
  );
}

const mapStateToProps = ({dashboard}) => ({
  sellableArtsList: dashboard.sellablePostsList,
});

export default connect(mapStateToProps, null)(SupportBottomContent);
