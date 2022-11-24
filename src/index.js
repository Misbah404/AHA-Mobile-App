// @flow
navigator.geolocation = require('@react-native-community/geolocation');
import React, {Component} from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundService from 'react-native-background-actions';
import {Provider} from 'react-redux';
import {MessageBar} from './components';
import applyConfigSettings from './config';
import AppNavigator from './navigator';
import DataHandler from './services/DataHandler';
import configureStore from './store';
import {Colors} from './theme';
import {isUploadingPostInBackground} from './actions/UserActions';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const reducers = require('./reducers').default;

applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({isLoading: false});
    }),
  };

  _loadingCompleted() {
    DataHandler.setStore(this.state.store);
  }

  componentDidMount() {}

  render() {
    if (this.state.isLoading) {
      return null;
    }

    if (!BackgroundService.isRunning()) {
      DataHandler.getStore().dispatch(isUploadingPostInBackground(false));
    }

    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
          <>
            <StatusBar
              backgroundColor={Colors.transparent}
              translucent={true}
              barStyle="light-content"
            />

            <Provider store={this.state.store}>
              <AppNavigator />
            </Provider>
            <MessageBar />
          </>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }
}

AppRegistry.registerComponent('AutoConnect', () => App);
console.disableYellowBox = true;
