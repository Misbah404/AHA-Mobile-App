// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Image, Keyboard, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {ButtonView} from '..';
import {emptyCreatePostData} from '../../actions/feedActions';
import {setSelectedTab} from '../../actions/GeneralActions';
import {MAIN_TABS_DATA, strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

let tabsData = [
  {
    id: MAIN_TABS_DATA.DASHBOARD_TAB.id,
    icon: MAIN_TABS_DATA.DASHBOARD_TAB.icon,
    key: MAIN_TABS_DATA.DASHBOARD_TAB.key,
    onPress: () => {
      Actions.jump(MAIN_TABS_DATA.DASHBOARD_TAB.key);
    },
    resetTab: () => {
      Actions.reset(MAIN_TABS_DATA.DASHBOARD_TAB.initailScreen);
    },
    iconStyle: {
      height: 20,
      width: 20,
    },
  },
  {
    id: MAIN_TABS_DATA.SEARCH_TAB.id,
    name: MAIN_TABS_DATA.SEARCH_TAB.name,
    icon: MAIN_TABS_DATA.SEARCH_TAB.icon,
    key: MAIN_TABS_DATA.SEARCH_TAB.key,
    selectedIcon: MAIN_TABS_DATA.SEARCH_TAB.selectedIcon,
    onPress: () => {
      Actions.jump(MAIN_TABS_DATA.SEARCH_TAB.key);
    },
    resetTab: () => {
      Actions.reset(MAIN_TABS_DATA.SEARCH_TAB.initailScreen);
    },
    iconStyle: {
      height: 21,
      width: 21,
    },
  },
  {
    id: MAIN_TABS_DATA.COMMUNITY_TAB.id,
    icon: MAIN_TABS_DATA.COMMUNITY_TAB.icon,
    key: MAIN_TABS_DATA.COMMUNITY_TAB.key,
    onPress: () => {
      Actions.jump(MAIN_TABS_DATA.COMMUNITY_TAB.key);
    },
    resetTab: () => {
      Actions.reset(MAIN_TABS_DATA.COMMUNITY_TAB.initailScreen);
    },
    iconStyle: {
      height: 21,
      width: 32,
    },
  },
  {
    id: MAIN_TABS_DATA.PROFILE_TAB.id,
    icon: MAIN_TABS_DATA.PROFILE_TAB.icon,
    key: MAIN_TABS_DATA.PROFILE_TAB.key,
    onPress: () => {
      Actions.jump(MAIN_TABS_DATA.PROFILE_TAB.key);
    },
    resetTab: () => {
      Actions.reset(MAIN_TABS_DATA.PROFILE_TAB.initailScreen);
    },
    iconStyle: {
      height: 20,
      width: 17,
    },
  },
];

const Tabbar = props => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {_isUploadingPostInBackground} = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  let check = _.find(tabsData, {
    id: MAIN_TABS_DATA.GALLERY_TAB.id,
  });
  if (props.userDetails.isArtist && check == undefined) {
    let appendData = {
      id: MAIN_TABS_DATA.GALLERY_TAB.id,
      icon: Images.plusTabbarIcon,
      key: MAIN_TABS_DATA.GALLERY_TAB.key,
      onPress: () => {
        Actions.jump('_gallery', {
          shouldSelectAllMediaType: true,
          showSequenceNumbersOnSelectedMedia: true,
          navigateToPostAnArtScreen: true,
        });
      },
      resetTab: () => {
        dispatch(emptyCreatePostData({}));
        Actions.reset('_gallery', {
          shouldSelectAllMediaType: true,
          showSequenceNumbersOnSelectedMedia: true,
          navigateToPostAnArtScreen: true,
        });
      },
      iconStyle: {
        height: 26,
        width: 26,
      },
    };
    tabsData.splice(2, 0, appendData);
  } else if (!props.userDetails.isArtist && check) {
    _.remove(tabsData, {
      id: MAIN_TABS_DATA.GALLERY_TAB.id,
    });
  }

  const onTabPress = (id, onPress, resetTab, key) => {
    const {selectedTabID} = props;
    if (
      id === MAIN_TABS_DATA.GALLERY_TAB.id &&
      props._isUploadingPostInBackground
    ) {
      util.topAlertError(strings.ALREADY_UPLOADING_POST);
    } else {
      if (selectedTabID === id) {
        resetTab();
      } else {
        onPress();
      }
    }
  };

  const isTabSelected = id => {
    const {selectedTabID} = props;
    return id === selectedTabID;
  };

  return isKeyboardVisible ? (
    <></>
  ) : (
    <View style={[styles.container]}>
      <View style={[AppStyles.flex, AppStyles.flexRow, AppStyles.spaceAround]}>
        {tabsData.map(element => {
          const {id, onPress, icon, resetTab, key} = element;
          const isSelectedTab = isTabSelected(id);

          return (
            <ButtonView
              style={[AppStyles.centerInner, styles.btnView]}
              key={id}
              onPress={() => {
                if (
                  id === MAIN_TABS_DATA.GALLERY_TAB.id &&
                  props._isUploadingPostInBackground
                ) {
                  onTabPress(id, onPress, resetTab, key);
                  return;
                }

                dispatch(setSelectedTab(id));
                onTabPress(id, onPress, resetTab, key);
              }}>
              <View style={[styles.tabWrap]}>
                <Image
                  source={icon}
                  resizeMode="contain"
                  style={[styles.icon, element?.iconStyle]}
                />
                <View
                  style={[
                    styles.horizontalLine,
                    isSelectedTab
                      ? {
                          backgroundColor: Colors.white,
                        }
                      : {backgroundColor: Colors.black},
                  ]}></View>
              </View>
            </ButtonView>
          );
        })}
      </View>
    </View>
  );
};
Tabbar.propTypes = {
  selectedTabID: PropTypes.number,
  setSelectedTab: PropTypes.func,
  defaultTabbar: PropTypes.bool,
};
Tabbar.defaultProps = {
  defaultTabbar: true,
  selectedTabID: MAIN_TABS_DATA.DASHBOARD_TAB.id,
  setSelectedTab: Function(),
};

const mapStateToProps = ({general, user}) => ({
  selectedTabID: general.selectedTabId,
  userDetails: user.data,
  _isUploadingPostInBackground: user.isUploadingPostInBackground,
});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(Tabbar);
