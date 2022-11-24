import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  keyboardAwareCont: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  container: {
    flexGrow: 1,
    flex: 1,
  },
  profileMainView: {
    paddingLeft: 20,
    paddingRight: 10,
    marginVertical: 10,
    flexDirection: 'row',

    flex: 1,
  },
  profileView: {
    marginRight: '2%',

    flex: 0.13,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  commentSection: {
    flex: 1,
  },
  commentProfile: {
    color: Colors.text.white,
    fontFamily: Fonts.type.semiBold,
    paddingVertical: 2,
    fontSize: Fonts.size.xxxSmall,
  },
  commentDescription: {
    color: Colors.text.white,
    fontFamily: Fonts.type.regular,
  },
  likeCommentView: {
    flex: 0.1,

    alignItems: 'center',

    marginLeft: '2%',
  },
  likeCommentImg: {
    height: 20,
    width: 20,
    marginBottom: 7,
  },
  commentsWriteSection: {
    width: Metrics.screenWidth - 8,
    marginRight: 10,
    height: 70,
    marginLeft: 7,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 20,
    marginHorizontal: 7,
    borderRadius: 10,
    paddingVertical: 7,
    borderColor: '#ededed',
    backgroundColor: '#ededed',
    height: 35,
  },
  MessageSendView: {
    backgroundColor: Colors.background.purple,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: util.isPlatformAndroid() ? 22 : 10,
    borderRadius: 25,
  },
  messageSendIconStyle: {
    width: 18,
    height: 16,
    resizeMode: 'contain',
  },
  likesNumber: {
    color: Colors.text.white,
  },
  loader: {
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    right: 0,
    left: 0,
  },
  loadMoreCommentsLoader: {
    justifyContent: 'center',
    paddingVertical: 40,
  },
  commentArrivalDayText: {
    paddingVertical: 5,
    fontSize: Fonts.size.xxxxSmall,
    fontFamily: Fonts.type.regular,
    color: Colors.text.lightGray1,
  },
  viewMoreReply: {
    fontSize: Fonts.size.xxxxSmall,
    fontFamily: Fonts.type.regular,
    color: Colors.text.lightGray1,
  },
  moreRepliesView: {
    width: '87%',
    alignSelf: 'flex-end',
  },
  moreRepliesMemtionName: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // marginBottom: -5,
  },
  moreRepliesNameTxt: {
    color: Colors.text.white,
    fontFamily: Fonts.type.bold,
  },
  replyView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyTxt: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xxxxSmall,
  },
  moreRepliesCountView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  viewMoreReplyView: {
    width: 30,
    height: 1,
    backgroundColor: Colors.text.lightGray1,
    marginRight: 5,
  },
  hideRepliesView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  hideRepliesViewTxt: {
    width: 30,
    height: 1,
    backgroundColor: Colors.text.lightGray1,
    marginRight: 5,
  },
  seeMoreRepliesView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreRepliesTxt: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xxxxSmall,
  },
  seeMoreRepliesImg: {
    width: 7,
    height: 5,
    marginLeft: 5,
  },
});
