import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  coverImage: {
    height: Metrics.screenHeight - (Metrics.screenHeight * 40) / 100,
    width: Metrics.screenWidth,
    opacity: 0.5,
  },
  coverImageMain: {
    height: Metrics.screenHeight - (Metrics.screenHeight * 40) / 100,
    width: Metrics.screenWidth,
  },
  imageStyle: {
    borderRadius: 30,
  },
  itemMainView: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 10,
  },
  itemIcon: {height: 48, width: 48, alignSelf: 'center'},
  itemInnerView: {flex: 1, marginLeft: 10, justifyContent: 'center'},
  headTxt: {
    color: Colors.text.lightGray2,
    fontSize: 17,
    fontFamily: Fonts.type.Asap,
  },
  discriptionTxt: {
    color: 'white',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold,
    marginTop: 3,
  },
  eventDetailView: {
    backgroundColor: Colors.background.primary,
    height: Metrics.screenHeight - (Metrics.screenHeight * 45) / 100,
    borderTopEndRadius: 75,
    position: 'absolute',
    left: -1,
    right: -2,
    bottom: -2,
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#AFA3A3',
    paddingLeft: 10,
    flex: 6,
  },
  eventNameTxt: {
    color: 'white',
    fontSize: 26,
    fontFamily: Fonts.type.bold,
  },
  eventDiscriptionTxt: {
    color: 'white',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Asap,
    marginTop: 10,
    marginRight: 30,
  },
  eventDetailScrollView: {
    marginBottom: 70,
    marginTop: 20,
    marginRight: 20,
    borderTopEndRadius: 70,
    backgroundColor: Colors.transparent,
  },
  eventAboutTxt: {
    color: Colors.text.lightGray2,
    fontSize: 20,
    fontFamily: Fonts.type.Asap,
    fontWeight: '500',
  },
  eventAboutDisTxt: {
    color: 'white',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Asap,
    marginTop: 8,
    textAlign: 'left',
    fontWeight: '700',
    textAlign: 'justify',
    lineHeight: 28,
  },
  btnMainView: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnToachOpacity: {
    width: 156,
    height: 45,
    backgroundColor: '#7234F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: Fonts.type.Asap,
    fontWeight: '700',
  },
  backBtn: {
    position: 'absolute',
    top: 35,
    left: 8,
    width: 30,
    height: 30,
    shadowColor: 'rgba(22,36,49,0.4)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  backBtnImage: {
    width: 18,
    height: 18,
    marginTop: 5,
  },
});
