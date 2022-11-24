import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 20,
  },

  labelStyle: {
    color: '#A2A5B8',
    fontSize: 14,
  },

  addSizeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  sizeheadingMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  sizeheadingView: {
    width: '28%',
    marginRight: '4%',
  },

  sizeheading: {
    color: '#A2A5B8',
    fontSize: 14,
  },

  textInputMainView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: -10,
  },
  containerStyleInput: {
    marginTop: 20,
  },

  textInputView: {
    width: '28%',
    marginRight: '4%',
  },

  textInput: {
    borderBottomWidth: 1,
    // borderBottomColor: Colors.grey1,
    color: Colors.text.white,
    paddingHorizontal: 8,
  },

  crossIconView: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  crossIconImage: {width: 15, height: 15, marginRight: 5},
  buttonView: {
    alignItems: 'center',
    marginTop: 20,
    bottom: 10,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonStyle: {
    fontSize: 17,
    fontFamily: Fonts.type.bold,
    color: Colors.text.white,
  },
  title: {
    fontSize: Fonts.size.xSmall,
    color: Colors.text.becomeAnArtist,
  },
  searchView: {
    ...AppStyles.mTop10,
  },
  borderLine: {
    borderBottomColor: Colors.border.secondary,
    borderBottomWidth: 1,
    opacity: 0.8,
    ...AppStyles.pTop10,
  },
  errorText: {
    color: Colors.red,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Asap,
    ...AppStyles.mTop5,
  },
  searchText: {
    fontSize: Fonts.size.normal,
    paddingHorizontal: 5,
    color: Colors.text.primary,
  },
  sellAnArtAndCommunityView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  toggleLabelText: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.type.medium,
  },
  dollarImage: {
    width: 8,
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 12,
  },
  remainingQuantityView: {
    marginTop: 20,
    paddingBottom: 6,
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1,
  },
  remainingQuantityTxt: {color: Colors.white},
});
