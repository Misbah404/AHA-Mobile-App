// @flow
import PropTypes from 'prop-types';
import React, {useMemo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Share from 'react-native-share';
import {connect, useDispatch} from 'react-redux';
import {Text} from '../';
import {pinUnpinListUpdate} from '../../actions/PinActions';
import {deleteFeedRequest} from '../../actions/DashboardActions';
import {DEEP_LINK_SCREEN_CONSTS, strings} from '../../constants';
import {Images} from '../../theme';
import util from '../../util';
import DeleteOrRemoveModal from '../DeleteOrRemoveModal';
import SpinnerLoader from '../SpinnerLoader';
import EditPinPrivacyModal from '../EditPinPrivacyModal';
import styles from './styles';

const OPTION_SLUGS = {
  like_icon: 'like_unlike_icon',
};

const ArtOptions = props => {
  const {
    feedItem,
    onDeletePostHandlerCallback,
    shouldCloseCurrentActiveScreenAfterDeletingItem,
    deleteDescriptionText,
    onBuyButtonPressHandler,
    onPinUnpinButtonPressHandler,
    pinToCollectionId,
    collectionDetails,
    onSupportButtonPressHandler,
  } = props;

  const dispatch = useDispatch();
  const {
    id,
    isPinned,
    isMyPost,
    max_quantity = 0,
    isForSale,
    isSelectedPrivacyOptionIsPublic,
    pinLikeCount,
    artist,
  } = feedItem || {};
  const {id: artistID} = artist || {};
  const [isLoading, showLoaderVisibility] = useState(() => false);
  const [pinPrivacyModalVisibility, setPinPrivacyModalVisibility] = useState(
    () => false,
  );

  const [deleteModalVisibility, setDeleteModalVisibility] = useState(
    () => false,
  );

  let isPostAlreadySoldOut = max_quantity < 1;

  const onPinIconPressHandler = shouldOpenBottomSheet => {
    let payload = {
      art_id: id,
      pin: isPinned ? false : true,
      collection_id: pinToCollectionId,
      shouldOpenBottomSheet: shouldOpenBottomSheet,
    };
    util.isUndefinedValue(pinToCollectionId) && delete payload.collection_id;
    onPinUnpinButtonPressHandler(payload);
    if (!shouldOpenBottomSheet && util.isUndefinedValue(pinToCollectionId)) {
      dispatch(pinUnpinListUpdate(id, !isPinned, feedItem));
    }
  };

  const options = [
    !!isMyPost && {
      id: 0,
      image: Images.editCollectionIcon,
      title: strings.EDIT,
      onPress: () => editPost(),
    },
    !!!isMyPost && {
      /**
       isPinned is representing isLike.
       as per the initial client requirements this icon is used to pin/unpin the
       post but after the slightly change in requirements now this
       icon is used to like/unlike the post.
       but name is not changed in the app yet. so isPinned is representing isLike
       */
      id: 1,
      image: !!isPinned ? Images.filledHeartIcon : Images.unfilledHeartIcon,
      title: !!isPinned ? strings.UN_LIKE : strings.LIKE,
      onPress: () => onPinIconPressHandler(false),
      onLongPress: () => onPinIconPressHandler(true),
      slug: OPTION_SLUGS.like_icon,
    },

    !isMyPost &&
      !!isPinned && {
        id: 2,
        image: Images.LockIconDashboard,
        title: strings.PRIVACY,
        onPress: () => setPinPrivacyModalVisibility(!pinPrivacyModalVisibility),
      },
    !!isForSale &&
      !!!isMyPost && {
        id: 3,
        image: isPostAlreadySoldOut ? Images.soldOut : Images.buyIcon,
        title: strings.BUY,
        onPress: isPostAlreadySoldOut
          ? Function()
          : () => {
              onBuyButtonPressHandler();
            },
        style: isPostAlreadySoldOut ? styles.soldOutIcon : styles.buyIcon,
      },
    !isForSale &&
      !isMyPost && {
        id: 4,
        image: Images.supportArtistIcon,
        title: strings.SUPPORT,
        onPress: () => {
          onSupportButtonPressHandler({
            artistID,
            ArtistName: artist?.profileTagId,
          });
        },

        style: styles.supportArtistIcon,
      },
    {
      id: 5,
      image: Images.commentIcon,
      title: strings.COMMENTS,
      onPress: () => {
        Actions.jump('comment', {art_id: id, feedItem});
      },
    },
    !!isMyPost && {
      id: 6,
      image: Images.deleteCollectionIcon,
      title: strings.DELETE,
      onPress: () => setDeleteModalVisibility(true),
      style: styles.deleteAndBuyIcon,
    },
    true && {
      id: 7,
      image: Images.shareIcon,
      title: strings.SHARE,
      style: [styles.deleteAndBuyIcon, {width: 26, height: 26}],
      onPress: async () => {
        const data = {
          id: id,
        };
        const shareOptions = {
          // message: 'Checkout this awesome art on AHA.',
          url: util.getDeepLinkUrl(DEEP_LINK_SCREEN_CONSTS.ART, data, 'post'),
        };
        try {
          const ShareResponse = await Share.open(shareOptions);
        } catch (error) {}
      },
    },
  ];

  // default case is handled for deleting dashboard post
  function deleteFeedHandler() {
    showLoaderVisibility(true);
    dispatch(
      deleteFeedRequest(id, function (res) {
        showLoaderVisibility(false);
        if (!!res && !!shouldCloseCurrentActiveScreenAfterDeletingItem) {
          Actions.pop();
        }
      }),
    );
  }

  function editPost() {
    Actions.postAnArtEdit({feedItem});
  }

  const renderDeleteModal = useMemo(
    () => (
      <DeleteOrRemoveModal
        heading={strings.DELETE_POST}
        description={deleteDescriptionText}
        positiveBtnText={strings.DELETE}
        negativeBtnText={strings.DONT_DELETE}
        positiveBtnPressHandler={() => {
          setDeleteModalVisibility(false);
          util.isFieldNil(onDeletePostHandlerCallback)
            ? deleteFeedHandler()
            : onDeletePostHandlerCallback(id);
        }}
        setModalVisibility={() =>
          setDeleteModalVisibility(!deleteModalVisibility)
        }
        isModalVisible={deleteModalVisibility}
      />
    ),
    [deleteModalVisibility],
  );

  const renderSpinnerLoader = useMemo(
    () => <SpinnerLoader _loading={isLoading} />,
    [isLoading],
  );

  return (
    <View style={styles.verticalOptionsCont}>
      <View style={styles.singleOptionCont}>
        <TouchableOpacity
          onPress={() => {
            if (!!isMyPost) Actions.jump('_profile_tab');
            else Actions.jump('visitedProfile', {feedItem, isArtirst: true});
          }}>
          <Image
            source={
              feedItem?.artist
                ? {uri: feedItem?.artist?.image}
                : Images.profileImage
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {options.map((item, index) => {
          return !!item ? (
            <TouchableOpacity
              activeOpacity={0.5}
              key={index}
              style={styles.singleOptionTextAndImgCont}
              onPress={item.onPress}
              onLongPress={item?.onLongPress}>
              <Image
                source={item.image}
                style={[styles.optionIcon, item.style]}
              />
              <Text style={[styles.title]}>{item.title}</Text>
              {util.areValuesEqual(item?.slug, OPTION_SLUGS.like_icon) && (
                <Text style={[styles.title]}>({`${pinLikeCount}`})</Text>
              )}
            </TouchableOpacity>
          ) : (
            <View key={index}></View>
          );
        })}
        {renderDeleteModal}
        {renderSpinnerLoader}
      </View>
      <EditPinPrivacyModal
        artID={id}
        isModalVisible={pinPrivacyModalVisibility}
        setModalVisibility={setPinPrivacyModalVisibility}
        selectedButtonIsPrivate={isSelectedPrivacyOptionIsPublic}
        title={strings.PIN_PRIVACY}
        selectedButtonIsPublic={isSelectedPrivacyOptionIsPublic}
      />
    </View>
  );
};

ArtOptions.propTypes = {
  onDeletePostHandlerCallback: PropTypes.func,
  deleteDescriptionText: PropTypes.string,
  onBuyButtonPressHandler: PropTypes.func,
  onPinUnpinButtonPressHandler: PropTypes.func,
  feedItem: PropTypes.object,
  collectionDetails: PropTypes.object,
  onSupportButtonPressHandler: PropTypes.func,
};
ArtOptions.defaultProps = {
  onDeletePostHandlerCallback: undefined,
  shouldCloseCurrentActiveScreenAfterDeletingItem: true,
  deleteDescriptionText: strings.ARE_YOU_SURE_TO_DELETE_THIS_POST,
  onBuyButtonPressHandler: Function(),
  onPinUnpinButtonPressHandler: Function(),
  feedItem: {},
  collectionDetails: {},
  onSupportButtonPressHandler: Function(),
};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(ArtOptions);
