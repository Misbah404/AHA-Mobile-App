import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  searchCompCont: {
    marginTop: Metrics.deviceStatusBarHeight + 10,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150,
  },

  emptyText: {
    color: Colors.text.white,
    fontSize: 16,
    opacity: 0.6,
  },

  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  heading: {
    fontSize: 16,
    color: '#8F8E93',
  },

  moreButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  moreButtonImage: {
    fontWeight: '200',
    height: 8,
    width: 8,
    tintColor: '#8F8E93',
    marginLeft: 8,
    marginTop: 2,
  },

  radiusView: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  radiusView2: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 20,
    overflow: 'hidden',
  },
  filterIcon: {
    width: 12,
    alignSelf: 'center',
    height: 15,
  },
  verticalLine: {
    backgroundColor: Colors.text.lightGray,
    width: 1,
    marginLeft: 8,
  },
  filterHeadingStyle: {
    marginLeft: 10,
    color: Colors.white,
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.normal,
  },
  categoryTextViewSelected: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginRight: 20,
  },
  categoryTextView: {
    marginRight: 20,
  },
  categoryTextSelected: {
    color: Colors.text.white,
    fontSize: 14,
  },
  categoryText: {
    fontSize: 14,
    color: '#8F8E93',
  },
  categoryView: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2A2F',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  emptyViewSec: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight,
  },
  searchToContSec: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
  },
});
