// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  roundCorner: {
    borderTopRightRadius: 87,
    borderTopLeftRadius: 0,
    overflow: 'hidden',
  },
  bottomSheetCont: {
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(11, 19, 25, 0.68)',
  },
  ArrowView: {
    right: 10,
    top: 0,
    padding: 8,
    alignSelf: 'flex-end',
  },
  artTxt: {
    color: Colors.white,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Asap,
    marginTop: 20,
  },
  collectionSaveTxt: {
    color: Colors.white,
    fontSize: Fonts.size.xLarge,
    fontFamily: Fonts.type.Asap,
    fontWeight: 'bold',
    marginTop: 5,
  },
  createCollectionView: {
    backgroundColor: Colors.white,
    height: 1,
    marginTop: 20,
  },
  createTxt: {
    color: Colors.white,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.Asap,
    marginTop: 20,
  },
  collectionListItemView: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  collectionListItemImage: {
    marginRight: 10,
    width: 35,
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 17.5,
    backgroundColor: Colors.black,
  },
  sizeView: {
    marginTop: 10,
  },
  sizeText: {
    color: Colors.text.white,
    fontSize: 16,
  },
  emptyRelatedFlatlist: {
    height: '100%',
    marginTop: '5%',
  },
});
