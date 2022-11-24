import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 12,
  },

  mainViewGraph: {
    backgroundColor: '#0B1319',
    borderRadius: 9,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  daysMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  daysView: {
    borderWidth: 1,
    borderColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: Colors.white,
  },

  daysViewSelected: {
    backgroundColor: Colors.background.primary,
  },

  days: {
    color: Colors.background.primary,
    fontSize: 16,
  },

  daysSelected: {
    color: Colors.text.white,
  },

  thisMonthText: {
    color: Colors.text.white,
    fontSize: 16,
  },
  thismonthSale: {
    color: Colors.text.white,
    fontSize: 19,
    fontFamily: Fonts.type.semiBold,
  },

  mainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  view: {
    backgroundColor: '#0B1319',
    width: '48%',
    marginVertical: 7,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
  },

  title: {
    color: Colors.text.white,
    fontSize: 16,
  },

  quantity: {
    color: Colors.text.white,
    fontSize: 21,
    fontFamily: Fonts.type.semiBold,
    marginTop: 2,
  },
  refreshingLoader: {
    backgroundColor: Colors.background.primary,
    paddingVertical: 20,
  },
});
