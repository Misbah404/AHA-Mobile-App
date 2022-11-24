// @flow
import Immutable from 'seamless-immutable';
import {
  GET_COMMENTS_LIST,
  POST_COMMENT,
  EMPTY_COMMENTS_LIST,
  LIKE_UNLIKE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  USER_SIGNOUT,
  GET_COMMENT_REPLIES,
  HIDE_SHOW_REPLIES,
  EMPTY_REPLIES_OBJECT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  commentsList: [],
  commentRepliesList: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPTY_COMMENTS_LIST: {
      return Immutable.merge(state, {
        commentsList: [],
      });
    }
    case GET_COMMENTS_LIST.SUCCESS: {
      const stateCommentList = util.cloneDeepArray(action.data);
      let mCommentList = util.cloneDeepArray(state.commentsList);
      mCommentList = util.unionById(mCommentList, stateCommentList);
      return Immutable.merge(state, {
        commentsList: mCommentList,
      });
    }
    case POST_COMMENT.SUCCESS: {
      const {parent_id, repliesCount} = action.data || {};
      let mCommentList = util.cloneDeepArray(state.commentsList);
      let commentRepliesListClone = util.cloneDeep(state.commentRepliesList);
      if (!util.isNullValue(parent_id)) {
        if (util.hasObjectWithKey(commentRepliesListClone, parent_id)) {
          let mRepliesList =
            commentRepliesListClone[parent_id]?.repliesList ?? [];
          const commingObjectArr = [];
          commingObjectArr.push(action.data);
          util.extendObj(commentRepliesListClone[parent_id], {
            repliesList: util.unionById(mRepliesList, commingObjectArr),
          });
          let mIndex = util.findIndexById(mCommentList, parent_id);
          mCommentList[mIndex]['repliesCount'] = mRepliesList?.length + 1;
        } else {
          const commingObjectArr = [];
          commingObjectArr.push(action.data);
          let mObj = {};
          Object.assign(mObj, {
            [parent_id]: {
              repliesList: commingObjectArr,
              remainingComments: 0,
            },
          });
          util.mergeObj(commentRepliesListClone, mObj);
          let mIndex = util.findIndexById(mCommentList, parent_id);
          mCommentList[mIndex]['openReplies'] = true;
          mCommentList[mIndex]['repliesCount'] = 1;
        }
      } else {
        mCommentList.unshift(action.data);
      }

      return Immutable.merge(state, {
        commentsList: mCommentList,
        commentRepliesList: commentRepliesListClone,
      });
    }
    case LIKE_UNLIKE_COMMENT.SUCCESS: {
      let {id, parent_id} = action.data;
      let mCommentList = util.cloneDeepArray(state.commentsList);
      let commentRepliesListClone = util.cloneDeep(state.commentRepliesList);
      if (!util.isNullValue(parent_id)) {
        if (util.hasObjectWithKey(commentRepliesListClone, parent_id)) {
          let mRepliesList =
            commentRepliesListClone[parent_id]?.repliesList ?? [];
          const indexReplies = util.findIndexById(mRepliesList, id);
          if (!!mRepliesList[indexReplies].liked) {
            mRepliesList[indexReplies]['no_of_likes'] =
              mRepliesList[indexReplies].no_of_likes - 1;
          } else {
            mRepliesList[indexReplies]['no_of_likes'] =
              mRepliesList[indexReplies].no_of_likes + 1;
          }
          mRepliesList[indexReplies]['liked'] =
            !mRepliesList[indexReplies]?.liked;

          util.extendObj(commentRepliesListClone[parent_id], {
            repliesList: mRepliesList,
          });
        }
      } else {
        let mIndex = util.findIndexById(mCommentList, id);
        if (!!mCommentList[mIndex].liked) {
          mCommentList[mIndex]['no_of_likes'] =
            mCommentList[mIndex].no_of_likes - 1;
        } else {
          mCommentList[mIndex]['no_of_likes'] =
            mCommentList[mIndex].no_of_likes + 1;
        }
        mCommentList[mIndex]['liked'] = !mCommentList[mIndex].liked;
      }

      return Immutable.merge(state, {
        commentsList: mCommentList,
        commentRepliesList: commentRepliesListClone,
      });
    }
    case DELETE_COMMENT.SUCCESS: {
      const {id, parent_id} = action.data;
      let mCommentList = util.cloneDeepArray(state.commentsList);
      let commentRepliesListClone = util.cloneDeep(state.commentRepliesList);
      if (util.hasObjectWithKey(commentRepliesListClone, parent_id)) {
        const mRepliesList =
          commentRepliesListClone[parent_id]?.repliesList ?? [];
        util.extendObj(commentRepliesListClone[parent_id], {
          repliesList: util.filterArray(mRepliesList, item => item.id != id),
        });
        let mIndex = util.findIndexById(mCommentList, parent_id);
        mCommentList[mIndex]['repliesCount'] =
          mCommentList[mIndex].repliesCount - 1;
      } else {
        mCommentList = util.filterArray(mCommentList, item => item.id != id);
      }

      return Immutable.merge(state, {
        commentsList: mCommentList,
        commentRepliesList: commentRepliesListClone,
      });
    }
    case EDIT_COMMENT.SUCCESS: {
      const {id, body, parent_id} = action.data;

      let commentRepliesListClone = util.cloneDeep(state.commentRepliesList);
      let mCommentList = util.cloneDeepArray(state.commentsList);

      if (util.hasObjectWithKey(commentRepliesListClone, parent_id)) {
        const mRepliesList =
          commentRepliesListClone[parent_id]?.repliesList ?? [];
        let mIndex = util.findIndexById(mRepliesList, id);
        mRepliesList[mIndex]['body'] = body;
        util.extendObj(commentRepliesListClone[parent_id], {
          repliesList: mRepliesList,
        });
      } else {
        let mIndex = util.findIndexById(mCommentList, id);
        mCommentList[mIndex]['body'] = body;
      }

      return Immutable.merge(state, {
        commentsList: mCommentList,
        commentRepliesList: commentRepliesListClone,
      });
    }
    case GET_COMMENT_REPLIES.SUCCESS: {
      const {replies, remainingComments, parentId, offset} = action.data;
      let commentRepliesListClone = util.cloneDeep(state.commentRepliesList);
      if (util.hasObjectWithKey(commentRepliesListClone, parentId)) {
        const mRepliesList =
          commentRepliesListClone[parentId]?.repliesList ?? [];
        util.extendObj(commentRepliesListClone[parentId], {
          repliesList: util.areValuesEqual(offset, 0)
            ? replies
            : util.unionById(mRepliesList, replies),
          remainingComments: remainingComments,
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {
          [parentId]: {
            repliesList: replies,
            remainingComments: remainingComments,
          },
        });
        util.mergeObj(commentRepliesListClone, mObj);
      }

      return Immutable.merge(state, {
        commentRepliesList: commentRepliesListClone,
      });
    }
    case HIDE_SHOW_REPLIES: {
      const {parentId, open, isLoadingReplies} = action.data;
      let mCommentList = util.cloneDeepArray(state.commentsList);
      let mIndex = util.findIndexById(mCommentList, parentId);
      mCommentList[mIndex]['openReplies'] = open;
      mCommentList[mIndex]['isLoadingReplies'] = isLoadingReplies;
      return Immutable.merge(state, {
        commentsList: mCommentList,
      });
    }
    case EMPTY_REPLIES_OBJECT: {
      return Immutable.merge(state, {
        commentRepliesList: {},
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
