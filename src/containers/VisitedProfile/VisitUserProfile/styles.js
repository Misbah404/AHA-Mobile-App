import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  tabbarMainView: {
    height: 30,
    marginTop: 0,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.white,
    backgroundColor: Colors.background.primary,
  },

  tabbarView: {
    paddingBottom: 10,
    width: 40,
    paddingHorizontal: 30,
    ...AppStyles.centerInner,
  },

  tabbarViewSelected: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    paddingBottom: 15,
    width: 40,
    paddingHorizontal: 30,
    ...AppStyles.centerInner,
  },

  navbarText: {
    textAlign: 'center',
    marginRight: -20,
  },

  collectionNameView: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    paddingVertical: 15,
  },

  collectionName: {
    color: Colors.text.white,
    fontSize: 17,
    fontFamily: Fonts.type.bold,
  },

  viewAllButton: {
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 4,
  },

  viewAllText: {
    color: Colors.text.white,
  },

  pinCollectionHeadingView: {
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.white,
    borderBottomColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  pinCollectionHeading: {
    color: Colors.text.white,
    fontFamily: Fonts.type.bold,
    fontSize: 17,
  },

  picTabbarMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  picTabbarSelected: {
    backgroundColor: Colors.background.purple,
    flex: 0.5,
    alignItems: 'center',
    paddingVertical: 12,
  },

  picTabbarView: {
    backgroundColor: '#432b93',
    flex: 0.5,
    alignItems: 'center',
    paddingVertical: 12,
  },

  picTabbarTextSelected: {
    color: 'white',
    fontFamily: Fonts.type.bold_italic,
    fontSize: 15,
    opacity: 1,
  },

  picTabbarText: {
    color: 'white',
    fontFamily: Fonts.type.bold,
    fontSize: 15,
    opacity: 0.5,
  },
  noCollectionFoundText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.normal,
    color: Colors.text.primary,
    alignSelf: 'center',
    ...AppStyles.mTop20,
  },
  rightBtnStyleSecond: {
    top: 2,
  },
  collectionLoader: {
    height: 60,
    marginTop: 150,
  },
  coverImage: {
    backgroundColor: Colors.background.primary,
  },
  IsBackgroungImageStyle: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 120,
  },
  iconShad: {
    shadowColor: 'rgba(22,36,49,0.4)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  loadingDataSec: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
  },
});
