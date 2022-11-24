import util from '../util';
import DataTypes from '../dataTypes';

export function manipulateCommentsList(list) {
  if (util.isArrayEmpty(list)) return [];
  let mComments = [];

  list.forEach(item => {
    let mComment = manipulateCommentObject(item);
    mComments.push(mComment);
  });

  return mComments;
}

export function manipulateCommentObject(item) {
  let mComment = {};
  let commentReplies = [];
  let user = {
    id: '',
    user_id: '',
    name: '',
    username: '',
    profile_image: '',
  };

  /**
   * @type {CommentObj}
   */

  mComment['parent_id'] = item?.parent_id ?? null;
  mComment['id'] = item?.id ?? -1;
  user['id'] = item?.user?.id;
  user['user_id'] = item?.user?.user_id;
  user['name'] = item?.user?.name;
  user['username'] = item?.user?.username;
  user['profile_image'] = item?.user?.profile_image;

  mComment['user'] = user;
  mComment['art_id'] = item?.art_id ?? -1;
  mComment['collection_id'] = item?.collection_id ?? -1;
  mComment['is_my_comment'] = item?.is_my_comment ?? false;
  mComment['created_at'] = item?.created_at ?? new Date();
  mComment['liked'] = item?.liked ?? false;
  mComment['no_of_likes'] = item?.likes ?? 0;
  mComment['body'] = item?.body ?? 'N/A';
  mComment['repliesCount'] = item?.replies_count ?? 0;
  mComment['openReplies'] = false;
  mComment['isLoadingReplies'] = false;
  mComment['recipient'] = item?.recipient ?? {};

  item?.replies?.forEach(item => {
    let mReply = {};
    let user = {
      name: '',
    };

    mReply['parent_id'] = item?.parent_id ?? null;
    mReply['id'] = item?.id ?? -1;
    user.name = item?.user?.name;

    mReply['user'] = user;
    mReply['art_id'] = item?.art_id ?? -1;
    mReply['collection_id'] = item?.collection_id ?? -1;
    mReply['is_my_comment'] = item?.mine ?? false;
    mReply['created_at'] = item?.created_at ?? new Date();
    mReply['liked'] = item?.liked ?? false;
    mReply['no_of_likes'] = item?.likes ?? 0;
    mReply['body'] = item?.body ?? 'N/A';
    commentReplies.push(mReply);
  });

  mComment['replies'] = commentReplies;
  return mComment;
}
