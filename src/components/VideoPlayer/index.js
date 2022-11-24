// @flow
import InViewPort from '@coffeebeanslabs/react-native-inviewport';
import React, {PureComponent} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Video from 'react-native-fast-video';
import {AppStyles, Colors} from '../../theme';
import styles from './styles';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isMounted: false,
      isLoading: true,
      shouldPlayVideo: true,
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    });
  }

  render() {
    const {_item, shouldPlayVideo} = this.props;

    const {isMounted} = this.state;
    const {uri, thumbnail} = _item || undefined;

    const shouldPause = !this.state.isVisible || !shouldPlayVideo;

    return (
      <View style={AppStyles.flex}>
        <InViewPort
          delay={150}
          onChange={isVisible => {
            if (this.state.isVisible !== isVisible && !!isMounted) {
              this.setState({isVisible: isVisible});
            }
          }}
          style={[AppStyles.flex]}>
          <View>
            <Video
              source={
                //{ uri: "https://d2of6bhnpl91ni.cloudfront.net/cms/vertical-video-story-ad-b7093b9783.mp4" }
                //https://ahauserposts.s3.amazonaws.com/uploads%2F790
                //https://d2xpc5462svwha.cloudfront.net/53088811f1e4cbdb4e57c893cd6edaf1.png
                {uri: uri}
              }
              cacheName={`aha_video_${Math.random(10)}`}
              playInBackground={false}
              paused={shouldPause}
              posterResizeMode="cover"
              playWhenInactive={false}
              resizeMode="cover"
              repeat={true}
              disableFocus={true}
              poster={thumbnail}
              controls={false}
              fullscreen={false}
              maxBitRate={2000}
              onLoadStart={() =>
                this.setState({
                  isLoading: true,
                })
              }
              onBuffer={() =>
                this.setState({
                  isLoading: true,
                })
              }
              onProgress={() =>
                this.setState({
                  isLoading: false,
                })
              }
              onLoad={() =>
                this.setState({
                  isLoading: false,
                })
              }
              bufferConfig={{
                minBufferMs: 20000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000,
              }}
              maxBitRate={50000}
              style={styles.videoView}
            />
            <View style={styles.loaderStyle}>
              {this.state.isLoading && (
                <ActivityIndicator
                  animating
                  size="small"
                  color={Colors.white}
                />
              )}
            </View>
          </View>
        </InViewPort>
      </View>
    );
  }
}

VideoPlayer.propTypes = {};
VideoPlayer.defaultProps = {};

export default VideoPlayer;
