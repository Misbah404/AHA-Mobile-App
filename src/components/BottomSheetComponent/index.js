// @flow
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import {AppStyles, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

function BottomSheetComponent(props) {
  const {
    renderViewHeader,
    renderView,
    refRBSheet,
    onBottomSheetClose,
    onBottomSheetNodeValueChange,
    _snapPoints,
    initialSnap,
    isShowingBottomSheet,
  } = props;
  const {call, onChange} = Animated;
  let drawerCallbackNode = new Animated.Value(0);

  const onCallback = ([value]) => {
    onBottomSheetNodeValueChange(1 - value); // this is something varies from 0-1)
  };

  let snapLastIndex = util.isPlatformAndroid()
    ? Metrics.screenHeight * 0.16
    : Metrics.screenHeight * 0.18;
  let snapMidIndex = util.isPlatformAndroid()
    ? Metrics.screenHeight * 0.47
    : Metrics.screenHeight * 0.49;

  const MAX_HEIGHT_BOTTOM_SHEET = util.isPlatformAndroid()
    ? Metrics.screenHeight * 0.91
    : Metrics.screenHeight * 0.88;

  const [snapIndexList, setSnapIndexList] = useState(() => [
    MAX_HEIGHT_BOTTOM_SHEET,
    snapMidIndex,
    snapLastIndex,
  ]);

  const rbSheetSec = () => {
    return (
      <>
        <BottomSheet
          onCloseEnd={() => {
            onBottomSheetClose();
          }}
          ref={refRBSheet}
          snapPoints={_snapPoints}
          initialSnap={initialSnap}
          borderRadius={10}
          renderHeader={() =>
            isShowingBottomSheet ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  height: 55,
                  width: '80%',
                  backgroundColor: 'transparent',
                }}></View>
            ) : (
              <></>
            )
          }
          renderContent={renderView}
          enabledInnerScrolling={false}
          enabledContentTapInteraction={false}
          enabledContentGestureInteraction={false}
          enabledGestureInteraction={true}
          callbackNode={drawerCallbackNode}
        />
        <Animated.Code
          exec={onChange(
            drawerCallbackNode,
            call([drawerCallbackNode], onCallback),
          )}
        />
      </>
    );
  };

  const onCloseSheet = () => {
    onBottomSheetClose();
  };

  const renderContentOfBottomSheet = () => (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.bottomSheetContainerPressStyle}
        onPress={onCloseSheet}>
        <View />
      </TouchableOpacity>
      <View style={{flex: 1, top: 10}}>
        <TouchableOpacity
          onPress={onCloseSheet}
          activeOpacity={1}
          style={{top: -40, height: 90, top: 0}}>
          <View />
        </TouchableOpacity>
        {rbSheetSec()}
      </View>
    </>
  );

  return <View style={AppStyles.flex}>{renderContentOfBottomSheet()}</View>;
}

BottomSheetComponent.propTypes = {
  renderViewHeader: PropTypes.any,
  renderView: PropTypes.any,
  refRBSheet: PropTypes.any,
  onBottomSheetClose: PropTypes.func,
  onBottomSheetNodeValueChange: PropTypes.func,
  _snapPoints: PropTypes.array.isRequired,
  initialSnap: PropTypes.number,
  isShowingBottomSheet: PropTypes.bool,
};

BottomSheetComponent.defaultProps = {
  renderViewHeader: Function(),
  onBottomSheetClose: Function(),
  renderView: Function(),
  onBottomSheetNodeValueChange: Function(),
  initialSnap: 1,
  isShowingBottomSheet: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(BottomSheetComponent);
