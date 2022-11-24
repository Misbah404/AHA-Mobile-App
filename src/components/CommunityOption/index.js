// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground, StyleSheet, TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '..';
import { Colors, Images, Metrics } from '../../theme';
import util from '../../util';


const CommunityOption = props => {
  const [selectedItems, setSelectedItems] = useState([]);
  const {array, isSelectAble} = props;

  const onItemPress = item => {
    let mselectedItems = _.cloneDeep(selectedItems);

    if (mselectedItems && _.find(mselectedItems, {id: item.id})) {
      setSelectedItems(
        _.filter(mselectedItems, interest => {
          return interest.id != item.id;
        }),
      );
    } else if (!_.isNil(item)) {
      mselectedItems.push(item);
      setSelectedItems(mselectedItems);
    }
  };

  return (
    <FlatList
      numColumns={2}
      data={array}
      keyExtractor={(_, index) => index}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.view]}
            onPress={() => {
              item.action();
            }}>
            <ImageBackground
              source={{uri: item.image}}
              resizeMode={'cover'}
              style={[styles.imageBackground]}>
              <Text style={[styles.titleText]}>{item.title}</Text>

              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                colors={
                  util.doesArrayContainsParticularId(selectedItems, item.id)
                    ? ['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)']
                    : [
                        'rgba(0, 0, 0, 0.5)',
                        'rgba(0, 0, 0, 0.3)',
                        'rgba(0, 0, 0, 0.1)',
                        'rgba(0, 0, 0, 0)',
                      ]
                }
                style={[
                  util.doesArrayContainsParticularId(selectedItems, item.id)
                    ? styles.linearGradientBottomSeleced
                    : styles.linearGradientBottom,
                ]}></LinearGradient>
            </ImageBackground>

            {isSelectAble && (
              <>
                {util.doesArrayContainsParticularId(selectedItems, item.id) && (
                  <View style={styles.checkIconView}>
                    <Image
                      source={Images.checkRightIcon}
                      resizeMode={'cover'}
                    />
                  </View>
                )}
              </>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

CommunityOption.propTypes = {
  array: PropTypes.array.isRequired,
};

CommunityOption.defaultProps = {};

export default CommunityOption;

// @flow

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(22,36,49,0.28)',
  },

  view: {
    width: '50.01%',
    borderWidth: 1,
    borderColor: Colors.background.primary,
    backgroundColor: 'rgba(22,36,49,0.28)',
  },

  titleText: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.text.white,
    zIndex: 2,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    top: -20,
  },

  imageBackground: {
    height: Metrics.screenHeight / 2.45,
    justifyContent: 'flex-end',
    paddingVertical: 5,
    backgroundColor: 'rgba(29,36,49,0.28)',
  },

  linearGradientBottom: {
    position: 'absolute',
    bottom: -1,
    top: 60,
    width: '100%',
    zIndex: 1,
  },

  linearGradientBottomSeleced: {
    position: 'absolute',
    bottom: -1,
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  checkIconView: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 2,
  },
});
