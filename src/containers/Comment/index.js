import moment from 'moment';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  RefreshControl,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  deleteCommentRequest,
  emptyCommentsListReducer,
  getCommentRepliesReqiuest,
  getCommentsListRequest,
  hideAndShowRepliesList,
  likeCommentRequest,
  postCommentRequest,
} from '../../actions/CommentActions';
import {
  ActionBottomSheet,
  CustomNavbar,
  Loader,
  NoDataFoundComponent,
  TextInput,
} from '../../components';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './Styles';
import {mixpanel} from '../../helpers/mixpanelHelper';

const Comment = props => {
  const limit = 10;
  const limitReplies = 9;
  let itemRrepliesObject = {};
  const {
    _commentsList,
    art_id = '',
    collection_id = '',
    feedItem,
    commentRepliesList,
    loggedInUserDetails,
  } = props || {};
  const {userId: LoginUserId} = loggedInUserDetails;
  const [isFetchingDataFromServer, setIsFetchingDataFromServer] = useState(
    () => false,
  );
  const [isSendingCommentToServer, setIsSendingCommentToServer] = useState(
    () => false,
  );
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(
    () => false,
  );
  const [commentBody, setCommentBody] = useState(() => '');
  const [replyCommentName, setReplyCommentName] = useState(() => {});
  const [selectedCommentObj, setSelectedCommentObj] = useState(() => '');
  const [hasMoreComments, setHasMoreComments] = useState(() => true);
  const [actionSheetVisible, setActionSheetVisible] = useState(() => false);
  const [gettingRepliesByParentId, setGettingRepliesByParentId] = useState(
    () => false,
  );
  const [offset, setOffset] = useState(() => 0);
  const [confirmationModalVisibility, setConfirmationModalVisibility] =
    useState(() => false);
  const commentBodyRef = useRef(() => null);
  const flatListRef = useRef(() => null);
  const actionSheetRef = useRef(() => null);
  const bottomSheetRef = useRef(() => null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetchingDataFromServer(true);
    mixpanel.track('Visit', {
      PageName: 'Comment',
      ArtistName: feedItem?.artist?.profileTagId,
      PostTitle: feedItem?.title,
    });
    getCommentsListFromAPI();

    return () => {
      dispatch(emptyCommentsListReducer());
    };
  }, []);

  function getCommentsListFromAPI() {
    const param = `?offset=${offset}&limit=${limit}&art_id=${art_id}`;
    dispatch(
      getCommentsListRequest(param, response => {
        const {status, data} = response || {};
        const {remaining_comments = 0} = data || {};
        if (status && remaining_comments < 1) {
          setHasMoreComments(false);
        }

        setIsFetchingDataFromServer(false);
        setIsLoadingMoreComments(false);
      }),
    );
  }

  function loadMoreCommentsFromAPI() {
    if (hasMoreComments && !isLoadingMoreComments) {
      setIsLoadingMoreComments(true);
      const param = `?offset=${offset}&limit=${limit}&art_id=${art_id}`;
      dispatch(
        getCommentsListRequest(param, response => {
          const {status, data} = response || {};
          const {remaining_comments = 0} = data || {};
          if (status && remaining_comments < 1) {
            setHasMoreComments(false);
          }
          setOffset(offset + 10);
          setIsLoadingMoreComments(false);
        }),
      );
    }
  }

  function likeUnlikeCommentPressHandler(id, liked, parent_id) {
    const payload = {id, liked, parent_id};
    dispatch(likeCommentRequest(payload, () => {}));
  }

  function deleteCommentPressHandler() {
    const {id, parent_id} = selectedCommentObj;
    let params = `${id}`;
    if (!util.isNullValue(parent_id)) {
      params += `?parent_id=${parent_id}`;
    }
    const payload = {
      id,
      parent_id,
    };

    dispatch(deleteCommentRequest(payload, params, () => {}));
  }

  function onPostComment() {
    setIsSendingCommentToServer(true);
    flatListRef?.current?.scrollToOffset({animated: true, offset: 0});

    let payload = {
      body: commentBody,
    };
    if (!util.isEmptyValue(String(art_id))) {
      payload['art_id'] = art_id;
    }
    if (!util.isEmptyValue(String(replyCommentName))) {
      payload['parent_id'] = replyCommentName?.parentId;
      payload['recipient_id'] = replyCommentName?.recipient;
    }
    if (!util.isEmptyValue(String(collection_id))) {
      payload['collection_id'] = collection_id;
    }

    dispatch(
      postCommentRequest(payload, res => {
        if (!!res) setCommentBody('');
        setIsSendingCommentToServer(false);
        setReplyCommentName({});
      }),
    );
  }

  const renderLoader = () => (
    <View style={styles.loader}>
      <Loader loading={isFetchingDataFromServer} />
    </View>
  );

  const renderMoreCommentsLoader = () => (
    <View style={styles.loadMoreCommentsLoader}>
      <Loader loading={isLoadingMoreComments} />
    </View>
  );

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.COMMENTS}
      hasBack
      titleStyle={AppStyles.titleStyleForCenter}
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
    />
  );

  const postOnCommentreply = item => {
    commentBodyRef?.current?.focus?.();
    setCommentBody(`@${item.user.username} `);
    setReplyCommentName({
      Name: item?.user?.username,
      parentId: !util.isNullValue(item?.parent_id) ? item.parent_id : item?.id,
      recipient: item?.user?.user_id,
    });
  };

  const getParentReplies = (parentId, offset) => {
    setGettingRepliesByParentId(parentId);
    const params = `${parentId}/replies?offset=${offset}&limit=${limitReplies}`;
    const payload = {
      parentId: parentId,
      offset,
    };
    util.areValuesEqual(offset, 0) &&
      dispatch(
        hideAndShowRepliesList({parentId, open: true, isLoadingReplies: true}),
      );

    dispatch(
      getCommentRepliesReqiuest(payload, params, res => {
        if (res) {
          util.areValuesEqual(offset, 0) &&
            dispatch(
              hideAndShowRepliesList({
                parentId,
                open: true,
                isLoadingReplies: false,
              }),
            );
        }
      }),
    );
  };

  const renderMoreReplies = (parentId, openReplies) => {
    const {remainingComments, repliesList} = commentRepliesList[parentId] || {};
    if (util.isUndefinedValue(repliesList)) {
      return <></>;
    } else {
      return (
        <View style={styles.moreRepliesView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={repliesList}
            keyExtractor={(_, index) => index}
            contentContainerStyle={{flex: 1}}
            renderItem={({item}) => {
              const {
                id,
                user,
                body,
                no_of_likes,
                created_at,
                liked,
                is_my_comment,
                parent_id,
                recipient,
              } = item;
              const {username, profile_image, user_id, is_artist} = user || {};
              const {
                is_artist: is_artistRecepient,
                username: usernameRecepient,
                user_id: userIdRecepient,
              } = recipient;
              const isName = body.includes(usernameRecepient);
              let massageBody = body;
              if (isName) {
                massageBody = body.replace(`@${usernameRecepient}`, '');
              }
              return (
                <View style={[styles.profileMainView]}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      util.areValuesEqualWith(LoginUserId, user_id)
                        ? Actions.jump('_profile_tab')
                        : Actions.artistProfileWithoutTabs({
                            feedItem: {artist: {id: user_id}},
                            isArtirst: is_artist,
                          })
                    }
                    style={[styles.profileView]}>
                    <FastImage
                      style={styles.profileIcon}
                      source={{
                        uri: profile_image,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}></FastImage>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!is_my_comment}
                    style={{flex: 0.8}}
                    onLongPress={() => {
                      setSelectedCommentObj(item);
                      setActionSheetVisible(true);
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.commentSection}>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() =>
                            util.areValuesEqualWith(LoginUserId, user_id)
                              ? Actions.jump('_profile_tab')
                              : Actions.artistProfileWithoutTabs({
                                  feedItem: {artist: {id: user_id}},
                                  isArtirst: is_artist,
                                })
                          }>
                          <Text style={styles.commentProfile}>{username}</Text>
                        </TouchableOpacity>

                        <Text
                          style={[
                            styles.commentDescription,
                            {
                              justifyContent: 'center',
                              alignItems: 'center',
                            },
                          ]}>
                          {isName && (
                            <TouchableOpacity
                              onPress={() =>
                                util.areValuesEqualWith(
                                  LoginUserId,
                                  userIdRecepient,
                                )
                                  ? Actions.jump('_profile_tab')
                                  : Actions.artistProfileWithoutTabs({
                                      feedItem: {artist: {id: userIdRecepient}},
                                      isArtirst: is_artistRecepient,
                                    })
                              }
                              style={styles.moreRepliesMemtionName}>
                              <Text style={styles.moreRepliesNameTxt}>
                                @{usernameRecepient}
                              </Text>
                            </TouchableOpacity>
                          )}
                          <View>
                            <Text style={styles.commentDescription}>
                              {massageBody}
                            </Text>
                          </View>
                        </Text>
                        <View style={styles.replyView}>
                          <Text style={styles.commentArrivalDayText}>
                            {moment(created_at)?.fromNow()}
                          </Text>
                          <TouchableOpacity
                            onPress={() => postOnCommentreply(item)}
                            style={{marginLeft: 5}}>
                            <Text style={styles.replyTxt}>Reply</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={[styles.likeCommentView, {padding: 3.5}]}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        likeUnlikeCommentPressHandler(id, !liked, parent_id)
                      }>
                      <Image
                        source={
                          !!liked ? Images.heartIconFill : Images.heartIcon
                        }
                        style={styles.likeCommentImg}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                    <Text style={styles.likesNumber}>{no_of_likes}</Text>
                  </View>
                </View>
              );
            }}
          />
          {!util.areValuesEqual(remainingComments, 0) ? (
            <TouchableOpacity
              onPress={() => getParentReplies(parentId, repliesList?.length)}
              style={styles.moreRepliesCountView}>
              <View style={styles.viewMoreReplyView} />
              <Text style={styles.viewMoreReply}>
                View {remainingComments} more replies
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                dispatch(hideAndShowRepliesList({parentId, open: false}))
              }
              style={styles.hideRepliesView}>
              <View style={styles.hideRepliesViewTxt} />
              <Text style={styles.viewMoreReply}>Hide replies</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  const renderComments = useMemo(
    () => (
      <>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={_commentsList}
          ref={flatListRef}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreCommentsFromAPI}
          refreshing={false}
          onRefresh={getCommentsListFromAPI}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => getCommentsListFromAPI()}
              tintColor={Colors.pullToRefreshLoader}
            />
          }
          keyExtractor={(_, index) => index}
          renderItem={({item}) => {
            const {
              id,
              user,
              body,
              no_of_likes,
              created_at,
              liked,
              is_my_comment,
              replies,
              repliesCount,
              openReplies,
              parent_id,
              isLoadingReplies,
            } = item;
            const {username, profile_image, user_id, is_artist} = user;
            return (
              <View style={{flex: 1}}>
                <View style={[styles.profileMainView]}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      util.areValuesEqualWith(LoginUserId, user_id)
                        ? Actions.jump('_profile_tab')
                        : Actions.artistProfileWithoutTabs({
                            feedItem: {artist: {id: user_id}},
                            isArtirst: is_artist,
                          })
                    }
                    style={[styles.profileView]}>
                    <FastImage
                      style={styles.profileIcon}
                      source={{
                        uri: profile_image,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}></FastImage>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!is_my_comment}
                    style={{flex: 0.8}}
                    onLongPress={() => {
                      setSelectedCommentObj(item);
                      setActionSheetVisible(true);
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.commentSection}>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() =>
                            util.areValuesEqualWith(LoginUserId, user_id)
                              ? Actions.jump('_profile_tab')
                              : Actions.artistProfileWithoutTabs({
                                  feedItem: {artist: {id: user_id}},
                                  isArtirst: is_artist,
                                })
                          }>
                          <Text style={styles.commentProfile}>{username}</Text>
                        </TouchableOpacity>

                        <Text style={styles.commentDescription}>{body}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.commentArrivalDayText}>
                            {moment(created_at)?.fromNow()}
                          </Text>
                          <TouchableOpacity
                            onPress={() => postOnCommentreply(item)}
                            style={{marginLeft: 5}}>
                            <Text
                              style={{
                                color: Colors.white,
                                fontFamily: Fonts.type.bold,
                                fontSize: Fonts.size.xxxxSmall,
                              }}>
                              Reply
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {!util.areValuesEqual(repliesCount, 0) && !openReplies && (
                          <>
                            <TouchableOpacity
                              onPress={() => getParentReplies(item?.id, 0)}
                              style={styles.seeMoreRepliesView}>
                              <Text style={styles.seeMoreRepliesTxt}>
                                {strings.MORE}({repliesCount})
                              </Text>
                              <FastImage
                                style={styles.seeMoreRepliesImg}
                                source={Images.DropDownLine}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </TouchableOpacity>
                          </>
                        )}
                        {isLoadingReplies && (
                          <Text style={styles.commentArrivalDayText}>
                            Loading...
                          </Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.likeCommentView}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        likeUnlikeCommentPressHandler(id, !liked, parent_id)
                      }>
                      <Image
                        source={
                          !!liked ? Images.heartIconFill : Images.heartIcon
                        }
                        style={styles.likeCommentImg}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                    <Text style={styles.likesNumber}>{no_of_likes}</Text>
                  </View>
                </View>
                {!util.areValuesEqual(repliesCount, 0) &&
                  openReplies &&
                  !isLoadingReplies &&
                  renderMoreReplies(item?.id, openReplies)}
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <NoDataFoundComponent text={strings.NO_COMMENTS_FOUND} />
          )}
          ListFooterComponent={
            !!isLoadingMoreComments ? renderMoreCommentsLoader() : <></>
          }
        />
      </>
    ),
    [
      _commentsList,
      isLoadingMoreComments,
      gettingRepliesByParentId,
      itemRrepliesObject,
    ],
  );

  const cancelParentReply = () => {
    setReplyCommentName({});
    setCommentBody('');
  };

  const renderCommentWriteSection = () => (
    <View style={styles.commentsWriteSection}>
      {!util.isEmptyObject(replyCommentName) && (
        <View
          style={{
            height: 40,
            width: '100%',
            backgroundColor: Colors.text.lightGray1,
            position: 'absolute',
            bottom: 50,
            alignItems: 'center',
            paddingLeft: 20,
            flexDirection: 'row',
          }}>
          <Text style={{flex: 0.95}}>
            Replying to @{replyCommentName?.Name}
          </Text>
          <TouchableOpacity onPress={cancelParentReply}>
            <FastImage
              style={{width: 16, height: 16}}
              source={Images.crossIcon}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{flex: 0.95}}>
        <TextInput
          ref={commentBodyRef}
          style={styles.textInput}
          placeholder={strings.DO_COMMENTS}
          placeholderTextColor={'gray'}
          selectionColor={Colors.appColorDarkBlue1}
          cursorColor={Colors.appColorDarkBlue1}
          onSubmitEditing={() => onPostComment()}
          returnKeyType="done"
          value={commentBody}
          onChangeText={val => {
            setCommentBody(val);
          }}
        />
      </View>
      <TouchableOpacity
        disabled={util.isEmptyValue(commentBody)}
        style={styles.MessageSendView}
        onPress={() => onPostComment()}>
        {!!isSendingCommentToServer ? (
          <ActivityIndicator animating size="small" color={Colors.white} />
        ) : (
          <Image
            source={Images.MessageSendIcon}
            style={styles.messageSendIconStyle}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  const actionSheet = () => {
    const firstBtnAction = () => {
      Keyboard.dismiss();
      setActionSheetVisible(false);
      Actions.editComment({_commentObj: selectedCommentObj});
    };
    const secondBtnAction = () => {
      setActionSheetVisible(false);
      setConfirmationModalVisibility(true);
    };
    const cancelBtnAction = () => {
      setActionSheetVisible(false);
    };

    const valuesCallback = value => {
      if (value === 0) {
        firstBtnAction();
      }
      if (value === 1) {
        secondBtnAction();
      }
      if (value === 2) {
        cancelBtnAction();
      }
    };

    const textOptions = ['Edit', 'Delete', 'Cancel'];

    return (
      <ActionBottomSheet
        valuesCallback={valuesCallback}
        textOptions={textOptions}
        cancelBtnAction={() => {
          setActionSheetVisible(false);
        }}
      />
    );
  };

  const renderDeleteModal = useMemo(
    () => (
      <DeleteOrRemoveModal
        heading={strings.DELETE_COMMENT}
        description={strings.ARE_YOU_SURE_TO_DELETE_THIS_COMMENT}
        positiveBtnText={strings.DELETE}
        negativeBtnText={strings.DONT_DELETE}
        positiveBtnPressHandler={() => {
          setConfirmationModalVisibility(false);
          deleteCommentPressHandler();
        }}
        setModalVisibility={() =>
          setConfirmationModalVisibility(!confirmationModalVisibility)
        }
        isModalVisible={confirmationModalVisibility}
      />
    ),
    [confirmationModalVisibility],
  );

  return (
    <View style={styles.keyboardAwareCont}>
      {renderCustomNavBar()}
      <View style={styles.container}>
        {!!isFetchingDataFromServer ? renderLoader() : renderComments}
      </View>
      {renderCommentWriteSection()}
      {!util.isPlatformAndroid() && <KeyboardSpacer />}
      {!!actionSheetVisible && actionSheet()}
      {confirmationModalVisibility && renderDeleteModal}
    </View>
  );
};

Comment.propTypes = {};
Comment.defaultProps = {};

const mapStateToProps = ({comments, user}) => ({
  _commentsList: comments.commentsList,
  commentRepliesList: comments.commentRepliesList,
  loggedInUserDetails: user.data,
});
const actions = {};

export default connect(mapStateToProps, actions)(Comment);
