import PropTypes from 'prop-types';
import React from 'react';
import {ActivityIndicator, Image as RNImage} from 'react-native';
import {Colors} from '../../theme';

export default class Image extends React.PureComponent {
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
      .isRequired,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const {source, setLoading, isLoading, style} = this.props;

    return (
      <>
        <RNImage
          source={source}
          onLoadStart={setLoading(true)}
          onLoadEnd={setLoading(false)}
          style={[style, {backgroundColor: 'rgba(69,85,117,0.7)'}]}
        />
        {isLoading && (
          <ActivityIndicator
            style={{
              left: 30,
              top: 10,
              position: 'absolute',
            }}
            color={Colors.white}
          />
        )}
      </>
    );
  }
}
