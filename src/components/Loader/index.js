// @flow

import PropTypes from 'prop-types';
import React from 'react';
import {ActivityIndicator, Animated, StatusBar, View} from 'react-native';
import {Colors} from '../../theme';
import styles from './styles';

export default class Loader extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    loadingFor: PropTypes.string,
    backdropOpacity: PropTypes.number,
    progress: PropTypes.number,
    cancelable: PropTypes.bool,
    onCancelPress: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    loadingFor: '',
    backdropOpacity: 0.3,
    progress: null,
    cancelable: false,
    onCancelPress: undefined,
  };

  componentWillReceiveProps(nextProps) {
    Animated.timing(this._loaderAnimation, {
      toValue: (200 * nextProps.progress) / 100,
      duration: 500,
    }).start();
  }

  _loaderAnimation = new Animated.Value(0);

  render() {
    const {loading} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar networkActivityIndicatorVisible={loading} />
        {loading && (
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              justifyContent: 'center',
              elevation: 6,
            }}>
            <ActivityIndicator animating size="small" color={Colors.white} />
          </View>
        )}
      </View>
    );
  }
}
