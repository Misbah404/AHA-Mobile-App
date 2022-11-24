// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

// commit

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  modalView: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: Metrics.screenHeight - (Metrics.screenHeight * 70) / 100,
    width: Metrics.screenWidth - (Metrics.screenWidth * 10) / 100,
  },

  heading: {
    fontSize: 22,
    fontFamily: Fonts.type.bold,
    marginTop: 25,
  },

  description: {
    fontSize: Fonts.size.xxSmall,
    fontFamily: Fonts.type.Asap,
  },

  buttonView: {
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 40,
    paddingVertical: 11,

    borderRadius: 10,
  },

  buttonText: {
    fontSize: 15,
    fontFamily: Fonts.type.bold_italic,
    alignSelf: 'center',
  },

  modalCloseIconView: {
    position: 'absolute',
    top: -6,
    right: -4,
  },
  welcomeBoardView: {
    backgroundColor: '#0B1319',
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    width: 302,
    height: 296,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  headingWelComeBoard: {
    fontSize: 22,
    fontFamily: Fonts.type.bold,
    marginTop: 30,
  },
  descriptionWelcomeBoard: {
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.Asap,
    marginTop: 30,
  },
  buttonViewWelcomeBoard: {
    backgroundColor: Colors.background.purple,
    width: 145,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    top: 38,
  },
  modalViewCart: {
    backgroundColor: '#0B1319',
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    width: 302,
    height: 204,
    alignItems: 'center',
    justifyContent: 'center',

    alignSelf: 'center',
    borderRadius: 15,
  },
  headingCart: {
    fontSize: 22,
    fontFamily: Fonts.type.bold,
    marginTop: 35,
  },
  descriptionCart: {
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.Asap,
    // width: 148,
    textAlign: 'center',
  },
  buttonViewCart: {
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 40,
    paddingVertical: 11,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    top: 25,
  },
});
