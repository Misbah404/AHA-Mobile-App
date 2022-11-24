import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  totalMainView: {
    backgroundColor: '#0B1319',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 4,
  },

  subTotalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  subTotalText: {
    fontSize: 13,
    color: Colors.text.white,
  },

  borderStyle: {
    borderWidth: 1,
    borderColor: '#2C3943',
    marginVertical: 30,
  },

  totalView: {
    alignItems: 'flex-end',
  },

  totalText: {
    fontSize: 16,
    color: Colors.text.white,
  },
  addressMainView: {
    backgroundColor: Colors.background.darkBlue,
    padding: 20,
    marginTop: 6,
  },
  addressTxtTitle: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.semiBold,
  },
  addressTxt: {
    color: Colors.white,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    marginTop: 10,
  },
  userDetailView: {
    backgroundColor: Colors.background.darkBlue,
    padding: 20,
  },
  userDetailTitle: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.semiBold,
  },
  userDetailViewTxt: {flexDirection: 'row', alignItems: 'center'},
  userDetailInnerViewImg: {flexDirection: 'row', marginTop: 10, flex: 1},
  userDetailImg: {borderRadius: 25, width: 50, height: 50},
  userDetailNameView: {marginLeft: 10, alignSelf: 'center'},
  userDetailNameTxt: {
    color: Colors.white,
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.small,
  },
  userDetailCircleArrowImg: {width: 18, height: 19, resizeMode: 'contain'},
  statusView: {
    backgroundColor: Colors.background.darkBlue,
    padding: 20,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTouchOp: {
    flex: 0.1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPrivacyIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    top: 1,
  },
});
