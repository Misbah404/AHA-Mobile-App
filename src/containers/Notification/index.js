import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getNotificationRequest,
  notificationCountRead,
} from '../../actions/NotificationsActions';
import {CustomNavbar, NoDataFoundComponent} from '../../components';
import {NOTIFICATIONS_TYPE, strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

function Notification(props) {
  const {notificationsList} = props;
  const [isLoading, setIslLoading] = useState(() => true);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const dispatch = useDispatch();
  useEffect(() => {
    apiCall();
    dispatch(notificationCountRead(0));
  }, []);

  const apiCall = () => {
    const params = `?offset=${0}&limit=${15}`;
    dispatch(
      getNotificationRequest(params, res => {
        if (!util.isArrayEmpty(res)) {
          setIsNextPage(true);
          setIslLoading(false);
        } else {
          setIsNextPage(false);
          setIslLoading(false);
        }
      }),
    );
  };

  const navBar = useMemo(
    () => (
      <CustomNavbar
        title={strings.NOTIFICATIONS}
        titleStyle={AppStyles.titleStyleForCenter}
        hasBack
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    ),
    [],
  );
  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?offset=${offset}&limit=${15}`;
      dispatch(
        getNotificationRequest(params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 15);
            setIsMoreData(false);
            setIsNextPage(true);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  function renderItems(item) {
    const {user, duration, post, title} = item || {};

    return (
      <View style={{marginTop: 5}}>
        {/* Someone Follow you */}
        {util.areValuesEqual(
          item?.type,
          NOTIFICATIONS_TYPE.USER_FOLLOWED_YOU,
        ) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <TouchableOpacity
              onPress={() => {
                Actions.visitedProfile({
                  feedItem: {
                    artist: {
                      id: item?.user?.id,
                    },
                  },
                  isArtirst: item?.user?.is_artist,
                });
              }}
              style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <View style={styles.nameAndSentenceView}>
              <View style={styles.userName}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.visitedProfile({
                      feedItem: {
                        artist: {
                          id: item?.user?.id,
                        },
                      },
                      isArtirst: item?.user?.is_artist,
                    });
                  }}>
                  <Text style={styles.itemTxt}>{user?.username}</Text>
                </TouchableOpacity>
                <Text style={styles.itemMessageTxt}>{' followed you.'}</Text>
              </View>
              <Text style={styles.hrsTxt}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
        {/* Someone Order  */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.ORDER_PLACED) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <TouchableOpacity
              onPress={() => {
                Actions.visitedProfile({
                  feedItem: {
                    artist: {
                      id: item?.user?.id,
                    },
                  },
                  isArtirst: item?.user?.is_artist,
                });
              }}
              style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <View style={styles.nameAndSentenceView}>
              <View style={styles.userName}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.visitedProfile({
                      feedItem: {
                        artist: {
                          id: item?.user?.id,
                        },
                      },
                      isArtirst: item?.user?.is_artist,
                    });
                  }}>
                  <Text style={styles.itemTxt}>{user?.username}</Text>
                </TouchableOpacity>
                <Text style={styles.itemMessageTxt}>{' placed an order.'}</Text>
              </View>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
            <FastImage
              style={styles.postImg}
              source={{
                uri: post?.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}
        {/* Someone Change Order Status */}
        {util.areValuesEqual(
          item?.type,
          NOTIFICATIONS_TYPE.ORDER_STATUS_CHANGED,
        ) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <TouchableOpacity
              onPress={() => {
                Actions.visitedProfile({
                  feedItem: {
                    artist: {
                      id: item?.user?.id,
                    },
                  },
                  isArtirst: item?.user?.is_artist,
                });
              }}
              style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <View style={styles.nameAndSentenceView}>
              <View style={styles.userName}>
                <Text style={[styles.itemMessageTxt]}>{title}.</Text>
              </View>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
            <FastImage
              style={styles.postImg}
              source={{
                uri: post?.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}
        {/* Someone comment on Art */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.COMMENT_ON_ART) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <TouchableOpacity
              onPress={() => {
                Actions.visitedProfile({
                  feedItem: {
                    artist: {
                      id: item?.user?.id,
                    },
                  },
                  isArtirst: item?.user?.is_artist,
                });
              }}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <View style={styles.nameAndSentenceView}>
              <View style={[styles.userName]}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.visitedProfile({
                      feedItem: {
                        artist: {
                          id: item?.user?.id,
                        },
                      },
                      isArtirst: item?.user?.is_artist,
                    });
                  }}>
                  <Text style={styles.itemTxt}>{user?.username}</Text>
                </TouchableOpacity>
                <Text style={[styles.itemMessageTxt]}>
                  {'  commented on your art.'}
                </Text>
              </View>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>

            <FastImage
              style={styles.postImg}
              source={{
                uri: post?.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}
        {/* Someone Like on Comment */}
        {util.areValuesEqual(
          item?.type,
          NOTIFICATIONS_TYPE.LIKE_ON_COMMENT,
        ) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
              console.log({item});
            }}
            style={styles.itemLikeView}>
            <TouchableOpacity
              onPress={() => {
                Actions.visitedProfile({
                  feedItem: {
                    artist: {
                      id: item?.user?.id,
                    },
                  },
                  isArtirst: item?.user?.is_artist,
                });
              }}
              style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <View style={styles.nameAndSentenceView}>
              <View style={styles.userName}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.visitedProfile({
                      feedItem: {
                        artist: {
                          id: item?.user?.id,
                        },
                      },
                      isArtirst: item?.user?.is_artist,
                    });
                  }}>
                  <Text style={styles.itemTxt}>{user?.username}</Text>
                </TouchableOpacity>
                <Text style={styles.itemMessageTxt}>
                  {'  liked your comment.'}
                </Text>
              </View>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
            <FastImage
              style={styles.postImg}
              source={{
                uri: post?.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}
        {/* Someone Like/pin Art */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.ART_WAS_PINNED) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              {true ? (
                <TouchableOpacity
                  onPress={() => {
                    Actions.visitedProfile({
                      feedItem: {
                        artist: {
                          id: item?.user?.id,
                        },
                      },
                      isArtirst: item?.user?.is_artist,
                    });
                  }}>
                  <FastImage
                    style={styles.img}
                    source={{
                      uri: user?.profile_image,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.imgNoView}>
                  <Text style={{color: Colors.white}}>
                    {item.message.substring(0, 1).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.nameAndSentenceView}>
              <View style={styles.userName}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.visitedProfile({
                      feedItem: {
                        artist: {
                          id: item?.user?.id,
                        },
                      },
                      isArtirst: item?.user?.is_artist,
                    });
                  }}>
                  <Text style={styles.itemTxt}>{user?.username}</Text>
                </TouchableOpacity>
                <Text style={styles.itemMessageTxt}>
                  {'  pinned your art.'}
                </Text>
              </View>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>

            <FastImage
              style={styles.postImg}
              source={{
                uri: post?.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}
        {/* Art SoldOut */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.ART_SOLDOUT) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <TouchableOpacity
              onPress={() => {
                Actions.visitedProfile({
                  feedItem: {
                    artist: {
                      id: item?.user?.id,
                    },
                  },
                  isArtirst: item?.user?.is_artist,
                });
              }}
              style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <View style={styles.nameAndSentenceView}>
              <View style={styles.userName}>
                <Text style={[styles.itemMessageTxt, {marginLeft: 0}]}>
                  {title}
                </Text>
              </View>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
            <FastImage
              style={styles.postImg}
              source={{
                uri: post?.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}
        {/* Payment Card Expire */}
        {util.areValuesEqual(
          item?.type,
          NOTIFICATIONS_TYPE.PAYMENT_EXPIRED,
        ) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.nameAndSentenceView}>
              <View style={styles.userName}>
                <Text style={[styles.itemMessageTxt]}>{title}.</Text>
              </View>
              <Text style={styles.hrsTxt}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  function renderNotificationsList() {
    const data = util.manipulateDataForSectionList(notificationsList);

    return (
      <View style={styles.selectionListView}>
        <SectionList
          style={styles.selectionListStyle}
          onRefresh={() => apiCall()}
          refreshing={isLoading}
          contentContainerStyle={{paddingBottom: 40}}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => renderItems(item)}
          renderSectionHeader={({section: {title}}) => {
            if (util.areValuesEqual(title, 'New')) {
              return (
                <>
                  <View style={styles.newView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </>
              );
            } else if (util.areValuesEqual(title, 'Today')) {
              return (
                <View>
                  <View style={styles.earlierView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </View>
              );
            } else if (util.areValuesEqual(title, 'This Week')) {
              return (
                <View>
                  <View style={styles.earlierView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </View>
              );
            } else if (util.areValuesEqual(title, 'This Month')) {
              return (
                <View>
                  <View style={styles.earlierView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </View>
              );
            } else if (util.areValuesEqual(title, 'Others')) {
              return (
                <View>
                  <View style={styles.earlierView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </View>
              );
            }
          }}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() => (
            <NoDataFoundComponent text={strings.NO_NOTIFICATIONS_FOUND} />
          )}
          ListFooterComponent={
            <View style={isMoreData && {marginVertical: 40}}>
              {isMoreData && <ActivityIndicator color={Colors.white} />}
            </View>
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {navBar}
      {!isLoading && renderNotificationsList()}
    </View>
  );
}

Notification.propTypes = {};
Notification.defaultProps = {};

const mapStateToProps = ({notifications}) => ({
  notificationsList: notifications?.notificationList,
});

export default connect(mapStateToProps)(Notification);
