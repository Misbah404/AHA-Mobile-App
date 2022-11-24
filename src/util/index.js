// @flow
import {
  chunk,
  cloneDeep,
  every,
  extend,
  filter,
  find,
  findIndex,
  has,
  includes,
  isEmpty,
  isEqual,
  isNil,
  isUndefined,
  lowerCase,
  merge,
  round,
  size,
  some,
  trim,
  unionBy,
  uniqBy,
  upperCase,
  upperFirst,
  gt,
  isEqualWith,
  isNull,
} from 'lodash';
import moment from 'moment';
import {AppState, Linking, Platform, PermissionsAndroid} from 'react-native';
import {MessageBarManager} from 'react-native-message-bar';
import {Actions} from 'react-native-router-flux';
import {refreshToken, userSignOutSuccess} from '../actions/UserActions';
import {authV1, BASE_URL} from '../config/WebService';
import {setSelectedTab} from '../actions/GeneralActions';
import Geocoder from 'react-native-geocoder';
import {
  DATE_FORMAT3,
  DEEP_LINK_SCREEN_CONSTS,
  MAIN_TABS_DATA,
  MESSAGE_TYPES,
  setSelectedTabId,
  strings,
  TIME_FORMAT1,
  NOTIFICATIONS,
} from '../constants';
import DataHandler from '../services/DataHandler';
import {Colors, Images} from '../theme';
import {notificationCountIncDec} from '../actions/NotificationsActions';
import SplashScreen from 'react-native-splash-screen';

const today = moment().toDate();
const yesterday = moment().subtract(1, 'day').toDate();
const tomorrow = moment().add(1, 'day').toDate();

class Util {
  keyExtractor = (item: Object, index: number) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url: 'string') {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length > 5;
  }
  isValidName(name) {
    return /^[a-zA-Z '.]*$/.test(name);
  }
  isOnlyNumber(number) {
    return number.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
  }

  isValidUserName(username) {
    var regexp = /^\S*$/;
    return regexp.test(username);
  }

  timeStampToDate(timeStamp) {
    return moment.unix(timeStamp).toString();
  }

  topAlert(message, alertType = 'success') {
    MessageBarManager.showAlert({
      message,
      alertType,
      viewTopInset: 10,
      viewBottomInset: 10,
      viewTopInset: 30,
      position: 'top',
      stylesheetError: {
        backgroundColor: Colors.green,
        messageColor: '#fff',
        borderRadius: 30,
        height: 50,
      },
    });
  }

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    MessageBarManager.showAlert({
      message,
      alertType,
      viewTopInset: 10,
      viewBottomInset: 10,
      viewTopInset: 30,

      position: 'top',
      stylesheetError: {
        backgroundColor: '#E74C3C',
        messageColor: '#fff',
        borderRadius: 30,
        height: 50,
        strokeColor: Colors.transparent,
      },
    });
  }

  getDeepLinkUrl = (screenName, dataToShare, profileName) => {
    let finalUrl = '';
    const {id = -1} = dataToShare || {};
    switch (screenName) {
      case DEEP_LINK_SCREEN_CONSTS.ART: {
        finalUrl = `${BASE_URL}/${DEEP_LINK_SCREEN_CONSTS.ART}/${profileName}/${id}`;
        break;
      }
      case DEEP_LINK_SCREEN_CONSTS.PROFILE: {
        finalUrl = `${BASE_URL}/${DEEP_LINK_SCREEN_CONSTS.PROFILE}/${profileName}/${id}`;
        break;
      }
    }
    return `${finalUrl}`;
  };

  deepLinkNavigation = url => {
    setSelectedTabId(MAIN_TABS_DATA.DASHBOARD_TAB.id);

    const isUserLoggedIn =
      DataHandler.getStore().getState().user?.data?.access_token ?? false;
    if (!isUserLoggedIn) {
      SplashScreen.hide();
      Actions.reset('login', {url: url});
      return;
    }
    if (!this.isFieldNil(url)) {
      const data = url.split('/');
      const screenName = data?.[3] || undefined;
      const isArtist = this.areValuesEqual(data?.[4], 'artist');

      const mId = data?.[5] || 0;
      SplashScreen.hide();
      if (!this.isFieldNil(screenName)) {
        switch (screenName) {
          case DEEP_LINK_SCREEN_CONSTS.ART: {
            Actions.jump('singlePostContainerDeepLinking', {
              postID: mId,
              isComingFromDeepLinkUrl: true,
              onBackPressHandler: () => Actions.reset('dashboard'),
            });
            break;
          }
          case DEEP_LINK_SCREEN_CONSTS.PROFILE: {
            const isMyProfile = this.areValuesEqual(
              mId,
              DataHandler.getStore().getState().user?.data?.userId ?? -1,
            );

            if (!!isMyProfile) {
              Actions.jump('_profile_tab');
            } else {
              Actions.jump('visitedProfile', {
                feedItem: {artist: {id: mId}},
                isArtirst: isArtist,
              });
            }
            break;
          }
        }
      }
    } else {
      SplashScreen.hide();
      Actions.reset('dashboard');
    }
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  capitalizeString(string) {
    return upperCase(string);
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user.data.access_token;
  }

  getFileExtension = url => {
    return url.slice((Math.max(0, url.lastIndexOf('.')) || Infinity) + 1);
  };
  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    if (url) {
      Linking.openURL(url).catch(() => {
        this.topAlertError(strings.INVALID_URL_FOUND);
      });
    } else {
      console.log("Don't know how to open URI: ");
    }
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }

  isOnlyWhiteSpace(str) {
    return !str.trim();
  }

  onlySpaces(str) {
    return str.trim().length === 0;
  }

  numberCount(count) {
    let number = null;
    if (count <= 9) {
      number = count;
    } else if (count > 9) {
      number = '9+';
    }
    return number;
  }

  isFieldNil = field => {
    return isNil(field);
  };

  isArrayEmpty = mArr => {
    return isEmpty(mArr);
  };

  cloneDeepArray = mArr => cloneDeep(mArr);

  cloneDeep = toClone => cloneDeep(toClone);

  findDataFromArray = (mArr, mObj) => find(mArr, mObj);

  findData = (mArr, mFunc) => findIndex(mArr, mFunc);

  chunk = (mArr, num) => chunk(mArr, num);

  isArrayIncludesValue = (mArr, mValue) => includes(mArr, mValue);

  isStringsIncludesValue = (mStr, mValue) => includes(mStr, mValue);

  includesValue = (mStr, mValue) => includes(mStr, mValue);
  isNullValue = Value => isNull(Value);

  findIndexByString = (mArr, mString) =>
    findIndex(mArr, item => item === mString);

  areValuesEqual = (objA, objB) => isEqual?.(objA, objB);
  areValuesEqualWith = (objA, objB) =>
    isEqualWith?.(objA.toLowerCase(), objB.toLowerCase());
  areGreaterThan = (valueGreate, objB) => gt?.(valueGreate, objB);

  isEmptyValue = (value = '') => isEmpty(String(value?.trim()));

  isAllArraysEmpty = (...value) => {
    return value.every(item => this.isArrayEmpty(item));
  };

  isEmptyObject = (value = {}) => isEmpty(value);
  isUndefinedValue = value => isUndefined(value);

  isEmptyValueWithoutTrim = (value = '') => isEmpty(String(value));

  excludeIdFromArray = (mArr, id) => filter(mArr, item => item.id != id);
  excludeIdFromArray_forOrder = (mArr, id) =>
    filter(mArr, item => item.id != id);

  filterArray = (mArr, mFunc) => filter(mArr, mFunc);

  trim = value => trim(value);

  doesArrayContainsParticularId = (array, mId) => {
    if (find(array, {id: mId})) return true;
    else return false;
  };

  hasObjectWithKey = (mObj, key) => has(mObj, key);

  getIndexOfObjFromArray_byID = (mArr, id) =>
    findIndex(mArr, item => item.id == id);
  getIndexOfObjFromArray_byID_forOrder = (mArr, id) =>
    findIndex(mArr, item => item.id == id);

  getIdsFromArray = mArr => {
    let idsArr = [];
    mArr.map(item => {
      if (!this.isFieldNil(item)) idsArr.push(item.id);
    });
    return idsArr;
  };

  getCountFormArray = arr => size(arr);

  upperFirst = mStr => upperFirst(mStr);

  lowerCase = mStr => lowerCase(mStr);

  some = (mArr, _obj) => some(mArr, _obj);

  every = (mArr, _func) => every(mArr, _func);

  uniqBy = (mArr, _func) => uniqBy(mArr, _func);

  roundValue = val => round(val);

  unionBy = (mArrOne, mArrTwo) => unionBy(mArrOne, mArrTwo, 'id');

  unionById = (mArrOne, mArrTwo) => {
    let mArrOneClone = this.cloneDeepArray(mArrOne);
    let mArrTwoClone = this.cloneDeepArray(mArrTwo);

    if (this.isArrayEmpty(mArrOneClone) || this.isArrayEmpty(mArrTwoClone)) {
      if (!this.isArrayEmpty(mArrOneClone)) return mArrOneClone;
      else return mArrTwoClone;
    }

    mArrOneClone = unionBy(mArrOne, mArrTwo, 'id');
    for (let i = 0; i < mArrTwo.length; i++) {
      const mIndex = this.findIndexById(mArrOneClone, mArrTwo[i].id);
      mArrOneClone[mIndex] = mArrTwo[i];
    }
    return mArrOneClone;
  };

  findIndexById = (mArr, id) => findIndex(mArr, item => item.id == id);

  extendObj = (obj, obj2) => extend(obj, obj2);
  mergeObj = (obj, obj2) => merge(obj, obj2);

  isSameDay = date => moment(date).isSame(today, 'day');

  isYesterday = date => moment(date).isSame(yesterday, 'day');

  isTomorrow = date => moment(date).isSame(tomorrow, 'day');

  removeDuplicatesObjectFromArray(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  appIsInForeground = () => AppState.currentState === 'active';
  appIsInBackground = () => AppState.currentState === 'background';

  getDateAndTimeText = (date, format = DATE_FORMAT3) => {
    let str = '';
    if (!!this.isSameDay(date))
      str = `Today, ${this.getFormattedDateTime(date, TIME_FORMAT1)}`;
    else if (!!this.isYesterday(date))
      str = `Yesterday, ${this.getFormattedDateTime(date, TIME_FORMAT1)}`;
    else str = this.getFormattedDateTime(date, format);
    return str;
  };

  isValidImageUrl(url) {
    if (this.isFieldNil(url)) return;
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  getCreditCardImage = cardType => {
    let cardTypeBrandName = String(cardType).toLocaleLowerCase();
    if (this.includesValue(cardTypeBrandName, 'master'))
      return Images.mastercardIcon;
    else if (this.includesValue(cardTypeBrandName, 'visa'))
      return Images.visaCardLogo;
    else if (this.includesValue(cardTypeBrandName, 'american'))
      return Images.americanExpressCardLogo;
    else if (this.includesValue(cardTypeBrandName, 'discover'))
      return Images.discoverCardLogo;
    else if (this.includesValue(cardTypeBrandName, 'jcb'))
      return Images.jcbCardIcon;
    else if (this.includesValue(cardTypeBrandName, 'diners'))
      return Images.dinersCardIcon;
    else {
      return Images.defaultCardIcon;
    }
  };

  generateGuid() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  kFormatter(num) {
    if (isNaN(num)) return 0;
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  }

  getCurrentUserRefreshToken() {
    return DataHandler.getStore().getState().user.data.refresh_token;
  }

  async refreshAccessToken() {
    let options = Object.assign({method: 'POST'});
    let data = {};
    data.token = this.getCurrentUserRefreshToken();

    options.body = JSON.stringify(data);

    try {
      const response = await fetch(
        `${BASE_URL}${authV1}refresh-token`,
        options,
      );

      const responseJson = await response.json();
      DataHandler.getStore().dispatch(refreshToken(responseJson.data));
      return responseJson.data.access_token;
    } catch (error) {
      DataHandler.getStore().dispatch(userSignOutSuccess());
      return false;
    }
  }

  getLoginUserId = () => {
    const userId = DataHandler.getStore().getState().user.data.userId;

    return userId;
  };

  getDurationTime = (createdAt, duration) => {
    let now = moment();
    let createAt = moment(createdAt);
    let diff = now.diff(createAt, duration);

    return diff;
  };

  manipulateDataForSectionList = mArray => {
    const format = {
      NEW: 'New',
      TODAY: 'Today',
      WEEK: 'This Week',
      MONTH: 'This Month',
      OTHER: 'Others',
    };

    let notificationData = [];
    let newNotifications = [];
    let todayNotifications = [];
    let weekNotifications = [];
    let monthNotifications = [];
    let othersNotifications = [];

    mArray?.map(item => {
      const {isSeen, createdAt} = item || {};

      const today = moment();
      const isNew = this.areValuesEqual(isSeen, false);
      const isTodaysNotification = moment().isSame(createdAt, 'day');

      const beginWeek = moment(today).startOf('isoweek');
      const isWeekNotification = moment(createdAt).isBetween(beginWeek, today);

      const beginMonth = moment(today).startOf('month');
      const isMonthNotification = moment(createdAt).isBetween(
        beginMonth,
        beginWeek,
      );

      if (isNew) {
        let objectItem = this.cloneDeep(item);
        let mints = this.getDurationTime(createdAt, 'minutes');
        if (mints < 60) {
          objectItem['duration'] = this.areValuesEqual(mints, 0)
            ? 'now'
            : mints + 'm';
        } else {
          let hrs = mints / 60;
          objectItem['duration'] = Math.round(hrs) + 'h';
        }
        newNotifications.push(objectItem);
      } else {
        if (isTodaysNotification) {
          let objectItem = this.cloneDeep(item);
          let mints = this.getDurationTime(createdAt, 'minutes');
          if (mints <= 60) {
            objectItem['duration'] = this.areValuesEqual(mints, 0)
              ? 'now'
              : mints + 'm';
          } else {
            let hrs = mints / 60;
            objectItem['duration'] = Math.round(hrs) + 'h';
          }
          todayNotifications.unshift(objectItem);
        } else if (!!isWeekNotification) {
          let objectItem = this.cloneDeep(item);
          let days = this.getDurationTime(createdAt, 'days') + 1;
          objectItem['duration'] = Math.round(days) + 'd';
          weekNotifications.unshift(objectItem);
        } else if (!!isMonthNotification) {
          let objectItem = this.cloneDeep(item);
          let weeks = (this.getDurationTime(createdAt, 'days') + 1) / 7;

          objectItem['duration'] =
            weeks < 1
              ? this.getDurationTime(createdAt, 'days') + 1 + 'd'
              : Math.round(weeks) + 'w';
          monthNotifications.unshift(objectItem);
        } else {
          let objectItem = this.cloneDeep(item);
          let months = this.getDurationTime(createdAt, 'months');
          objectItem['duration'] =
            months < 1 ? 1 + 'M' : Math.round(months) + 'M';
          othersNotifications.push(objectItem);
        }
      }
    });

    if (!this.isArrayEmpty(newNotifications)) {
      notificationData.push({
        title: format.NEW,
        data: newNotifications,
      });
    }
    if (!this.isArrayEmpty(todayNotifications)) {
      notificationData.push({
        title: format.TODAY,
        data: todayNotifications,
      });
    }
    if (!this.isArrayEmpty(weekNotifications)) {
      notificationData.push({
        title: format.WEEK,
        data: weekNotifications,
      });
    }
    if (!this.isArrayEmpty(monthNotifications)) {
      notificationData.push({
        title: format.MONTH,
        data: monthNotifications,
      });
    }
    if (!this.isArrayEmpty(othersNotifications)) {
      notificationData.push({
        title: format.OTHER,
        data: othersNotifications,
      });
    }
    return notificationData;
  };

  notificationsNavigation = (data, isFromPushNotification = false) => {
    const cloneData = cloneDeep(data);

    switch (cloneData.type) {
      case NOTIFICATIONS.USER_FOLLOWED_YOU: {
        isFromPushNotification &&
          DataHandler.getStore().dispatch(notificationCountIncDec(-1));
        Actions.visitedProfile({
          feedItem: {
            artist: {
              id: cloneData?.user?.id,
            },
          },
          isArtirst: cloneData?.user?.is_artist,
        });

        break;
      }
      case NOTIFICATIONS.ORDER_PLACED: {
        DataHandler.getStore().dispatch(setSelectedTab(5));
        isFromPushNotification &&
          DataHandler.getStore().dispatch(notificationCountIncDec(-1));
        const details = {
          orderID: cloneData?.order?.id,
          artId: cloneData?.post?.id,
          id: cloneData?.order?.order_art_id,
        };
        Actions.orderDetail({details, isFromSales: true});
        break;
      }
      case NOTIFICATIONS.ORDER_STATUS_CHANGED: {
        isFromPushNotification &&
          DataHandler.getStore().dispatch(notificationCountIncDec(-1));
        DataHandler.getStore().dispatch(setSelectedTab(5));
        const details = {
          orderID: cloneData?.order?.id,
          artId: cloneData?.post?.id,
        };
        Actions.orderDetail({details, isFromSales: false});
        break;
      }
      case NOTIFICATIONS.COMMENT_ON_ART: {
        isFromPushNotification &&
          DataHandler.getStore().dispatch(notificationCountIncDec(-1));
        Actions.singlePostContainer({
          postID: cloneData?.post?.id,
        });
        Actions.comment({art_id: cloneData?.post?.id});
        break;
      }
      case NOTIFICATIONS.LIKE_ON_COMMENT: {
        isFromPushNotification &&
          DataHandler.getStore().dispatch(notificationCountIncDec(-1));
        Actions.singlePostContainer({
          postID: cloneData?.post?.id,
        });
        Actions.comment({art_id: cloneData?.post?.id});
        break;
      }
      case NOTIFICATIONS.ART_WAS_PINNED: {
        isFromPushNotification &&
          DataHandler.getStore().dispatch(notificationCountIncDec(-1));
        Actions.singlePostContainer({postID: cloneData?.post?.id});
        break;
      }
      case NOTIFICATIONS.ART_SOLDOUT: {
        isFromPushNotification &&
          DataHandler.getStore().dispatch(notificationCountIncDec(-1));
        Actions.singlePostContainer({postID: cloneData?.post?.id});
        break;
      }
      case NOTIFICATIONS.PAYMENT_EXPIRED: {
        isFromPushNotification &&
          DataHandler.getStore().dispatch(notificationCountIncDec(-1));
        DataHandler.getStore().dispatch(setSelectedTab(5));
        Actions.wallet();
        break;
      }
      default: {
        Actions.reset('_dashboard_tab');
        break;
      }
    }
  };

  async getCoordinates() {
    /* eslint-disable */

    const self = this;
    return new Promise(async function (resolve, reject) {
      let granted = undefined;

      if (self.isPlatformAndroid()) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      } else {
        navigator.geolocation.requestAuthorization();
      }

      if (
        !self.isPlatformAndroid() ||
        (self.isPlatformAndroid() &&
          granted === PermissionsAndroid.RESULTS.GRANTED)
      ) {
        navigator.geolocation.getCurrentPosition(
          geo_success => {
            /* const latitude = 24.89749;
            const longitude = 67.077764; */
            const {latitude, longitude} = geo_success.coords;

            const location = {};
            location['coordinates'] = {
              latitude,
              longitude,
            };
            Geocoder.geocodePosition({lat: latitude, lng: longitude})
              .then(res => {
                const _res = res[0];
                location['name'] = _res.locality + ', ' + _res.country;
                resolve(_res);
              })
              .catch(err => {
                location['name'] = '';
                resolve(location);
              });
          },
          geo_error => {
            resolve(geo_error);
          },
          {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
        );
      } else {
        resolve({error: 'Android permission required'});
      }
    });

    /* eslint-enable */
  }

  knowLoginuserIsArtistOrNot = () => {
    const isUserLoginArtist =
      DataHandler.getStore().getState().user?.data?.isArtist ?? false;

    return isUserLoginArtist;
  };

  checkCardExpired = (cardMonth, cardYear) => {
    const currentDate = new Date();
    const currenMonth = moment(currentDate).format('MM');
    const currentYear = moment(currentDate).format('YYYY');
    if (this.areValuesEqual(Number(currentYear), cardYear)) {
      if (this.areValuesEqual(Number(currenMonth), cardMonth)) {
        return currenMonth > cardMonth ? true : false;
      }
    }
    return false;
  };

  calculateWidthWithMonthCount = data => {
    var width = 200;
    data.map(() => {
      width += 50;
    });

    return width;
  };

  getLargerValueInArrayForGraph(arr) {
    let i;

    let max = 0;

    for (i = 0; i < arr.length; i++) {
      if (arr[i]?.y > max) {
        max = arr[i]?.y;
      }
    }

    return this.areValuesEqual(max, 0) ? 20 : max;
  }
  validationForShipmentWeight(weight, massUnit) {
    let valid = false;
    if (this.areValuesEqual(massUnit, 'g')) {
      if (weight <= 32000) {
        valid = true;
      } else {
        valid = false;
      }
    }
    if (this.areValuesEqual(massUnit, 'oz')) {
      if (weight <= 1128) {
        valid = true;
      } else {
        valid = false;
      }
    }
    if (this.areValuesEqual(massUnit, 'lb')) {
      if (weight <= 70) {
        valid = true;
      } else {
        valid = false;
      }
    }
    if (this.areValuesEqual(massUnit, 'kg')) {
      if (weight <= 32) {
        valid = true;
      } else {
        valid = false;
      }
    }
    return valid;
  }

  checkIsLinksHas = socialMediaLinksArr => {
    const ishasLinks = socialMediaLinksArr.some(item => item.link);
    return ishasLinks;
  };
}

export default new Util();
