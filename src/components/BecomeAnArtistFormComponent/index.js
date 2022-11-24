// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Text} from '..';
import {Images} from '../../theme';
import styles from './styles';

const BecomeAnArtistFormComponent = props => {
  const {title, array, isCommunity} = props;

  return (
    <View style={styles.container}>
      {title !== '' && <Text style={styles.title}>{title}</Text>}

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.searchView}
        onPress={() => Actions.search({array})}>
        <Text style={styles.searchText}>Search Here</Text>
        <View style={styles.borderLine}></View>
      </TouchableOpacity>

      <View style={styles.selectedItemMainView}>
        <FlatList
          numColumns={isCommunity ? 0 : 2}
          horizontal={isCommunity ? true : false}
          showsHorizontalScrollIndicator={false}
          data={array}
          renderItem={({item}) => {
            return (
              <>
                {isCommunity ? (
                  <View style={styles.communityView}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.communityImage}
                    />
                    <Text style={styles.communityText}>{item.title}</Text>

                    <TouchableOpacity style={styles.crossIconCommunity}>
                      <Image source={Images.crossIcon} resizeMode={'contain'} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.selectedItemView}>
                    <Image source={item.image} />
                    <Text style={styles.selectedItemText}>{item.title}</Text>

                    <TouchableOpacity style={styles.crossIcon}>
                      <Image source={Images.crossIcon} resizeMode={'contain'} />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

BecomeAnArtistFormComponent.propTypes = {
  array: PropTypes.array.isRequired,
  title: PropTypes.string,
  isCommunity: PropTypes.bool,
};

BecomeAnArtistFormComponent.defaultProps = {
  title: '',
  isCommunity: false,
};

export default BecomeAnArtistFormComponent;
