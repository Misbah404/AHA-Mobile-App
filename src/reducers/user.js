// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {
  ADDRESSES_LIST,
  ADDRESS_DELETE,
  BECOME_AN_ARTIST,
  CHANGE_EMAIL,
  CLEAR_GALLERY,
  CREATE_ADDRESS,
  EDIT_PROFILE,
  FOLLOW_UNFOLLOW_ARTIST,
  GET_FOLLOWERS_LIST,
  GET_FOLLOWER_SEARCH_LIST,
  GET_FOLLOWING_LIST,
  GET_FOLLOWING_SEARCH_LIST,
  GET_LOGGED_IN_USER_DETAILS,
  GET_POSTS_LIST_BY_USER_ID,
  GET_PROFILE_SECTIONS,
  GET_SELECTED_COMMUNITIES,
  GET_SELECTED_INTERESTS,
  GET_SELECTED_VIBES,
  GET_USER_DETAILS_BY_ID_REQUEST,
  IS_UPLOADING_POST_IN_BACKGROUND,
  MARK_GALLERY_IMAGE_SELECTED,
  REFRESH_TOKEN,
  REMOVE_FOLLOWER,
  SELECT_DEFAULT,
  SET_VISTING_ARTIST_COLLECTION_LISTING,
  UPDATE_ADDRESS,
  UPDATE_USER_PROFILE,
  USER_CONFIRM_OTP_SIGNUP,
  USER_GALLERY,
  USER_SIGNIN,
  USER_SIGNOUT,
  SAVE_PIN_TO_COLLECTIONS_LIST_AGAINST_ARTIST_KEY,
  SAVE_PINNED_POSTS_AND_COLLECTIONS_LIST_AGAINST_ARTIST_KEY,
  POST_COLLECTION_PIN_UNPIN,
  PIN_TO_COLLECTION_AFTER_DELETE_UNPIN,
  SAVE_ORDER_ART_HISTORY_AGAINST_USER_KEY,
  SAVE_USER_COMMUNITIES_AGAINST_KEY,
  MARK_PICKING_POINT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  userDetails: {},
  data: {},
  profileSections: [],
  galleryImages: [],
  create_address: '',
  update_address: '',
  select_default_address: '',
  address_list: [],
  selected_vibes: [],
  selected_interests: [],
  selected_communities: [],
  isUploadingPostInBackground: false,
  profileDetails: {},
  followingSearchList: [],
  followerSearchList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS_LIST.SUCCESS: {
      const {id, followersList} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);
      if (util.hasObjectWithKey(profileDetailsClone, id)) {
        const mFollowersList = profileDetailsClone[id]?.followersList ?? [];
        util.extendObj(profileDetailsClone[id], {
          followersList: util.unionById(mFollowersList, followersList),
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {[id]: {followersList: followersList}});
        util.mergeObj(profileDetailsClone, mObj);
      }
      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }
    case SAVE_PINNED_POSTS_AND_COLLECTIONS_LIST_AGAINST_ARTIST_KEY: {
      const {id, pinnedPostsAndCollectionsList} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);
      if (util.hasObjectWithKey(profileDetailsClone, id)) {
        const mPinnedPostsAndCollectionsList =
          profileDetailsClone[id]?.pinnedPostsAndCollectionsList ?? [];
        util.extendObj(profileDetailsClone[id], {
          pinnedPostsAndCollectionsList: util.unionById(
            mPinnedPostsAndCollectionsList,
            pinnedPostsAndCollectionsList,
          ),
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {
          [id]: {pinnedPostsAndCollectionsList: pinnedPostsAndCollectionsList},
        });
        util.mergeObj(profileDetailsClone, mObj);
      }
      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }

    case SAVE_ORDER_ART_HISTORY_AGAINST_USER_KEY: {
      const {id, orderArtsHistoryList} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);
      if (util.hasObjectWithKey(profileDetailsClone, id)) {
        const mOrderArtsHistoryList =
          profileDetailsClone[id]?.orderArtsHistoryList ?? [];
        util.extendObj(profileDetailsClone[id], {
          orderArtsHistoryList: util.unionById(
            mOrderArtsHistoryList,
            orderArtsHistoryList,
          ),
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {
          [id]: {orderArtsHistoryList: orderArtsHistoryList},
        });
        util.mergeObj(profileDetailsClone, mObj);
      }
      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }
    case SAVE_USER_COMMUNITIES_AGAINST_KEY: {
      const {id, userCommunitiesList} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);
      if (util.hasObjectWithKey(profileDetailsClone, id)) {
        const mUserCommunitiesList =
          profileDetailsClone[id]?.userCommunitiesList ?? [];
        util.extendObj(profileDetailsClone[id], {
          userCommunitiesList: util.unionById(
            mUserCommunitiesList,
            userCommunitiesList,
          ),
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {
          [id]: {userCommunitiesList: userCommunitiesList},
        });
        util.mergeObj(profileDetailsClone, mObj);
      }
      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }

    case SAVE_PIN_TO_COLLECTIONS_LIST_AGAINST_ARTIST_KEY: {
      const {id, pinToCollectionList, offset = 0} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);
      if (util.hasObjectWithKey(profileDetailsClone, id) && offset !== 0) {
        const mCollectionsList =
          profileDetailsClone[id]?.pinToCollectionList ?? [];
        util.extendObj(profileDetailsClone[id], {
          pinToCollectionList: util.unionById(
            mCollectionsList,
            pinToCollectionList,
          ),
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {[id]: {pinToCollectionList: pinToCollectionList}});
        util.mergeObj(profileDetailsClone, mObj);
      }
      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }

    case POST_COLLECTION_PIN_UNPIN.SUCCESS: {
      const {artist_collection_id, pin, artistID} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);

      if (util.hasObjectWithKey(profileDetailsClone, artistID)) {
        // collections list
        let mCollectionsList =
          profileDetailsClone[artistID]?.collectionsList ?? [];
        let mIndex = util.findIndexById(mCollectionsList, artist_collection_id);
        if (mIndex != -1) {
          const _pinLikeCount = mCollectionsList[mIndex]?.pinLikeCount ?? 0;
          mCollectionsList[mIndex].isPinned = pin;
          mCollectionsList[mIndex].pinLikeCount = pin
            ? _pinLikeCount + 1
            : _pinLikeCount - 1;
        }
        util.extendObj(profileDetailsClone[artistID], {
          collectionsList: mCollectionsList,
        });

        // pinned posts and collections list
        let mPinnedPostsAndCollectionsList =
          profileDetailsClone[artistID]?.pinnedPostsAndCollectionsList ?? [];
        let mFoundIndex = util.findIndexById(
          mPinnedPostsAndCollectionsList,
          artist_collection_id,
        );
        if (
          mFoundIndex != -1 &&
          mPinnedPostsAndCollectionsList[mFoundIndex].isCollection
        ) {
          const _pinLikeCount =
            mPinnedPostsAndCollectionsList[mFoundIndex]?.pinLikeCount ?? 0;
          mPinnedPostsAndCollectionsList[mFoundIndex].isPinned = pin;
          mPinnedPostsAndCollectionsList[mFoundIndex].pinLikeCount = pin
            ? _pinLikeCount + 1
            : _pinLikeCount - 1;
        }

        util.extendObj(profileDetailsClone[artistID], {
          postsOfPinnedCollection: mPinnedPostsAndCollectionsList,
        });

        // pin to collections list
        let mPinToCollectionList =
          profileDetailsClone[artistID]?.pinToCollectionList ?? [];
        let mPinToCollectionListIndex = util.findIndexById(
          mPinToCollectionList,
          artist_collection_id,
        );
        if (mPinToCollectionListIndex != -1) {
          const _pinLikeCount =
            mPinToCollectionList[mPinToCollectionListIndex]?.pinLikeCount ?? 0;
          mPinToCollectionList[mPinToCollectionListIndex].pinLikeCount = pin
            ? _pinLikeCount + 1
            : _pinLikeCount - 1;
        }

        util.extendObj(profileDetailsClone[artistID], {
          pinToCollectionList: mPinToCollectionList,
        });
      }

      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }

    case PIN_TO_COLLECTION_AFTER_DELETE_UNPIN: {
      const {artistsIds, ids} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);

      artistsIds.map(artistId => {
        if (util.hasObjectWithKey(profileDetailsClone, artistId)) {
          let mCollectionsList =
            profileDetailsClone[artistId]?.collectionsList ?? [];

          ids.map(id => {
            const currentIndex = util.getIndexOfObjFromArray_byID(
              mCollectionsList,
              id,
            );
            if (currentIndex != -1) {
              mCollectionsList[currentIndex]['isPinned'] = false;
            }
            util.extendObj(profileDetailsClone[artistId], {
              collectionsList: mCollectionsList,
            });
          });
        }
      });

      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }

    case GET_FOLLOWING_LIST.SUCCESS: {
      const {id, followingList} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);
      if (util.hasObjectWithKey(profileDetailsClone, id)) {
        const mFollowingList = profileDetailsClone[id]?.followingList ?? [];
        util.extendObj(profileDetailsClone[id], {
          followingList: util.unionById(mFollowingList, followingList),
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {[id]: {followingList: followingList}});
        util.mergeObj(profileDetailsClone, mObj);
      }
      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }
    case GET_FOLLOWING_SEARCH_LIST.SUCCESS: {
      let followingSearchList = action.data;
      const followingSearchListCloneDeep = util.cloneDeep(
        state.followingSearchList,
      );
      followingSearchList = util.unionById(
        followingSearchListCloneDeep,
        followingSearchList,
      );

      return Immutable.merge(state, {
        followingSearchList: followingSearchList,
      });
    }
    case GET_FOLLOWER_SEARCH_LIST.SUCCESS: {
      let followerSearchList = action.data;
      const followersSearchListCloneDeep = util.cloneDeep(
        state.followerSearchList,
      );
      followerSearchList = util.unionById(
        followersSearchListCloneDeep,
        followerSearchList,
      );

      return Immutable.merge(state, {
        followerSearchList: followerSearchList,
      });
    }
    case REMOVE_FOLLOWER.SUCCESS: {
      const id = action.data;
      const loggedInUserDetails = util.cloneDeep(state.data);
      let searchFollowerListClone = util.cloneDeep(state.followerSearchList);
      const {userId} = loggedInUserDetails;

      let profileDetailsClone = util.cloneDeep(state.profileDetails);
      let mFollowersList = profileDetailsClone[userId]?.followersList ?? [];

      // remove artist/user from my followers list and also remove it from search followers list
      const filteredArray = util.excludeIdFromArray(mFollowersList, id);
      searchFollowerListClone = util.excludeIdFromArray(
        searchFollowerListClone,
        id,
      );
      profileDetailsClone[userId].followersList = filteredArray;

      // remove logged in user from deleted artist following list
      if (util.hasObjectWithKey(profileDetailsClone, 'id')) {
        let mFollowingList = profileDetailsClone[id]?.followingList ?? [];
        const filteredFollowingArray = util.excludeIdFromArray(
          mFollowingList,
          userId,
        );
        profileDetailsClone[id].followingList = filteredFollowingArray;
      }

      // on removing follower from my own list will -1 count of the artist which has been removed.
      if (util.hasObjectWithKey(profileDetailsClone[id], 'details')) {
        let mFollowingCount =
          profileDetailsClone[id]['details']['noOfFollowing'] || 0;

        profileDetailsClone[id]['details']['noOfFollowing'] =
          mFollowingCount - 1;
      }

      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
        followerSearchList: searchFollowerListClone,
      });
    }
    case FOLLOW_UNFOLLOW_ARTIST.SUCCESS: {
      const {item: artistObj, follow} = action.data;
      const {id} = artistObj;
      const loggedInUserDetails = util.cloneDeep(state.data);
      const {userId} = loggedInUserDetails;

      let profileDetailsClone = util.cloneDeep(state.profileDetails);

      // ^^^^^^^^^changes made in following search list start^^^^^^^^^
      let mFollowingSearchList = util.cloneDeep(state.followingSearchList);
      const mIndexOfFollowingSearchList = util.findIndexById(
        mFollowingSearchList,
        id,
      );
      if (mIndexOfFollowingSearchList != -1) {
        mFollowingSearchList[mIndexOfFollowingSearchList].is_following = follow;
      }
      // ^^^^^^^^^changes made in following search list end^^^^^^^^^

      // ^^^^^^^^^changes made in follower search list start^^^^^^^^^
      let mFollowerSearchList = util.cloneDeep(state.followerSearchList);
      const mIndexOfFollowerSearchList = util.findIndexById(
        mFollowerSearchList,
        id,
      );
      if (mIndexOfFollowerSearchList != -1) {
        mFollowerSearchList[mIndexOfFollowerSearchList].is_following = follow;
      }
      // ^^^^^^^^^changes made in follower search list end^^^^^^^^^

      /** 
       changes made in all user/artist objects i.e. isfollowing, following count ,
       followers count, remove artist from logged in following list if the logged in user
       unfollow it from anywhere in the app, these all cases are handled in the below scope.
       **/
      Object.keys(profileDetailsClone).map(function (key, _) {
        let mFollowersList = profileDetailsClone[key]?.followersList ?? [];
        let mFollowingList = profileDetailsClone[key]?.followingList ?? [];

        const mIndexOfFollowerList = util.findIndexById(mFollowersList, id);
        if (mIndexOfFollowerList != -1) {
          mFollowersList[mIndexOfFollowerList].is_following = follow;
        }

        const mIndexOfFollowingList = util.findIndexById(mFollowingList, id);
        if (mIndexOfFollowingList != -1) {
          mFollowingList[mIndexOfFollowingList].is_following = follow;
        }

        // increase/decrease no of followers count of visiting artist
        if (util.areValuesEqual(key, id)) {
          if (util.hasObjectWithKey(profileDetailsClone[id], 'details')) {
            let mFollowersCount =
              profileDetailsClone[key]['details']['noOfFollowers'] || 0;
            mFollowersCount = follow
              ? mFollowersCount + 1
              : mFollowersCount - 1;

            profileDetailsClone[key]['details']['noOfFollowers'] =
              mFollowersCount;
            profileDetailsClone[key]['details']['is_following'] = follow;
          }
        }

        if (util.areValuesEqual(key, userId) && follow) {
          let data = {
            ...artistObj,
            is_following: true,
          };
          mFollowingList.push(data);
        } else if (util.areValuesEqual(key, userId) && !follow) {
          mFollowingList = util.excludeIdFromArray(mFollowingList, id);
        }

        profileDetailsClone[key].followersList = mFollowersList;
        profileDetailsClone[key].followingList = mFollowingList;
      });

      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
        followingSearchList: mFollowingSearchList,
        followerSearchList: mFollowerSearchList,
      });
    }
    case GET_USER_DETAILS_BY_ID_REQUEST.SUCCESS: {
      const mData = action.data;
      const {id} = mData;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);
      if (util.hasObjectWithKey(profileDetailsClone, id)) {
        util.extendObj(profileDetailsClone[id], {details: mData});
      } else {
        let mObj = {};
        Object.assign(mObj, {[id]: {details: mData}});
        util.mergeObj(profileDetailsClone, mObj);
      }
      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }
    case SET_VISTING_ARTIST_COLLECTION_LISTING: {
      const {list} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);

      if (util.hasObjectWithKey(profileDetailsClone, action.data.id)) {
        const stateCollectionList = util.cloneDeepArray(
          profileDetailsClone[action.data.id]?.collectionsList ?? [],
        );
        const actionCollectionList = util.cloneDeepArray(list);
        const mergeArray = actionCollectionList.reduce((acc, curr) => {
          const stored = stateCollectionList.find(
            ({id}) => id === action.data.id,
          );
          if (stored) {
            stored = {...curr};
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);
        util.extendObj(profileDetailsClone[action.data.id], {
          collectionsList: mergeArray,
        });
      } else {
        let mObj = {};
        Object.assign(mObj, {[action.data.id]: {collectionsList: list}});
        util.mergeObj(profileDetailsClone, mObj);
      }

      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }
    case GET_POSTS_LIST_BY_USER_ID.SUCCESS: {
      const {id, list} = action.data;
      let profileDetailsClone = util.cloneDeep(state.profileDetails);

      if (util.hasObjectWithKey(profileDetailsClone, id)) {
        const statePostList = util.cloneDeepArray(
          profileDetailsClone[id]?.postsList,
        );
        const actionPostList = util.cloneDeepArray(list);
        const mergeArray = util.unionById(statePostList, actionPostList);

        util.extendObj(profileDetailsClone[id], {postsList: mergeArray});
      } else {
        let mObj = {};
        Object.assign(mObj, {[id]: {postsList: list}});
        util.mergeObj(profileDetailsClone, mObj);
      }

      return Immutable.merge(state, {
        profileDetails: profileDetailsClone,
      });
    }
    case REFRESH_TOKEN: {
      let newData = util.cloneDeep(state.data);
      newData.access_token = action.data.access_token;
      newData.refresh_token = action.data.refresh_token;

      return Immutable.merge(state, {
        data: newData,
      });
    }
    case USER_CONFIRM_OTP_SIGNUP.SUCCESS:
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }
    case UPDATE_USER_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case BECOME_AN_ARTIST.SUCCESS: {
      const {cover_image} = action.data || undefined;
      const mData = util.cloneDeep(state.data);
      mData['isArtist'] = true;
      mData['cover_image'] = cover_image;
      return Immutable.merge(state, {
        data: mData,
      });
    }

    case MARK_GALLERY_IMAGE_SELECTED.SUCCESS: {
      const {image, single} = action.data;
      let clonedGallery = _.cloneDeep(state.galleryImages);
      if (single) {
        const foundSelected = _.findIndex(clonedGallery, function (o) {
          return o.selected == true;
        });
        if (!_.isUndefined(clonedGallery[foundSelected])) {
          clonedGallery[foundSelected].selected = false;
        }
      }
      const found = _.findIndex(clonedGallery, function (o) {
        return o.node.image.uri == image;
      });
      if (!_.isUndefined(clonedGallery[found].selected)) {
        clonedGallery[found].selected = !clonedGallery[found].selected;
      } else {
        clonedGallery[found].selected = true;
      }

      return Immutable.merge(state, {
        galleryImages: clonedGallery,
      });
    }

    case USER_GALLERY.SUCCESS: {
      let gallery = _.cloneDeep(state.galleryImages);
      gallery = [...gallery, ...action.data];
      return Immutable.merge(state, {
        galleryImages: _.uniqBy(gallery, function (e) {
          return e.node.image.uri;
        }),
      });
    }

    case CLEAR_GALLERY.SUCCESS: {
      return Immutable.merge(state, {
        galleryImages: [],
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case GET_PROFILE_SECTIONS.SUCCESS: {
      return Immutable.merge(state, {
        profileSections: action.data,
      });
    }
    case CREATE_ADDRESS.SUCCESS: {
      let create_address = [];
      create_address.push(action.data);
      let address_List = _.unionBy(create_address, state.address_list, 'id');

      return Immutable.merge(state, {
        address_list: address_List,
      });
    }
    case SELECT_DEFAULT.SUCCESS: {
      const {address_list} = state || {};
      let mAddressList = util.cloneDeepArray(address_list);
      mAddressList.map((item, index) => {
        if (item.id === action.data.id) {
          mAddressList[index]['is_selected'] = true;
        } else {
          mAddressList[index]['is_selected'] = false;
        }
      });
      return Immutable.merge(state, {
        address_list: mAddressList,
      });
    }

    case UPDATE_ADDRESS.SUCCESS: {
      const update_address = action?.data;
      const {id} = update_address;
      const stateAddressList = util.cloneDeepArray(state.address_list);
      const updateIndex = util.getIndexOfObjFromArray_byID(
        stateAddressList,
        id,
      );
      stateAddressList[updateIndex] = update_address;
      return Immutable.merge(state, {
        address_list: stateAddressList,
      });
    }
    case ADDRESSES_LIST.SUCCESS: {
      return Immutable.merge(state, {
        address_list: action.data,
      });
    }
    case ADDRESS_DELETE.SUCCESS: {
      const {address_list} = state;
      const arrayAfterDelete = address_list.filter(function (ele) {
        return ele.id !== parseInt(action.data);
      });
      return Immutable.merge(state, {
        address_list: arrayAfterDelete,
      });
    }

    case EDIT_PROFILE.SUCCESS: {
      const {
        name,
        bio,
        username,
        profile_image,
        facebook,
        instagram,
        tiktok,
        dribble,
        address,
        cover_image,
      } = action?.data ?? '';
      let userData = util.cloneDeep(state.data);
      userData['name'] = name;
      userData['userName'] = username;
      userData['bio'] = bio;
      userData['profileImage'] = profile_image;

      userData['facebookLink'] = facebook;
      userData['instagramLink'] = instagram;
      userData['tiktokLink'] = tiktok;
      userData['dribbleLink'] = dribble;
      userData['cover_image'] = cover_image;
      userData['address'] = address;

      return Immutable.merge(state, {
        data: userData,
      });
    }
    case CHANGE_EMAIL.SUCCESS: {
      const {email} = action?.data ?? '';
      let userData = util.cloneDeep(state.data);
      userData['email'] = email;
      return Immutable.merge(state, {
        data: userData,
      });
    }
    case GET_SELECTED_VIBES.SUCCESS: {
      const mArr = action?.data ?? [];
      return Immutable.merge(state, {
        selected_vibes: mArr,
      });
    }
    case GET_SELECTED_INTERESTS.SUCCESS: {
      const mArr = action?.data ?? [];
      return Immutable.merge(state, {
        selected_interests: mArr,
      });
    }
    case GET_SELECTED_COMMUNITIES.SUCCESS: {
      const mArr = action?.data ?? [];
      return Immutable.merge(state, {
        selected_communities: mArr,
      });
    }
    case GET_LOGGED_IN_USER_DETAILS.SUCCESS: {
      let mData = util.cloneDeep(state.data);
      const {
        address,
        bio,
        cover_image,
        dribble,
        facebook,
        image,
        instagram,
        tiktok,
        profileTagId,
        noOfFollowers,
        noOfFollowing,
      } = action.data || {};

      mData.address = address;
      mData.bio = bio;
      mData.cover_image = cover_image;
      mData.dribbleLink = dribble;
      mData.facebookLink = facebook;
      mData.instagramLink = instagram;
      mData.profileImage = image;
      mData.userName = profileTagId;
      mData.noOfFollowers = noOfFollowers;
      mData.noOfFollowing = noOfFollowing;
      mData.tiktokLink = tiktok;

      return Immutable.merge(state, {
        userDetails: action.data,
        data: mData,
      });
    }
    case IS_UPLOADING_POST_IN_BACKGROUND: {
      return Immutable.merge(state, {
        isUploadingPostInBackground: action.data,
      });
    }

    case MARK_PICKING_POINT.SUCCESS: {
      const newMarkAddress = util.cloneDeep(action.data);
      const {id} = newMarkAddress;
      let stateAddressList = util.cloneDeepArray(state.address_list);
      stateAddressList = stateAddressList.map(obj => {
        return {...obj, is_picking_point: false};
      });
      const updateIndex = util.getIndexOfObjFromArray_byID(
        stateAddressList,
        id,
      );
      if (updateIndex != -1) {
        stateAddressList[updateIndex].is_picking_point = true;
      }
      return Immutable.merge(state, {
        address_list: stateAddressList,
      });
    }
    default:
      return state;
  }
};
