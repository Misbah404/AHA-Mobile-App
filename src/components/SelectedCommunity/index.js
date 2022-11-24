import PropTypes from 'prop-types';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Text} from '../';
import {Images} from '../../theme';
import styles from './styles';

const SelectedCommunity = props => {
  const {_item, onCrossIconPress} = props;

  return (
    <View style={styles.communityView}>
      <Image
        source={{uri: _item?.image ?? undefined}}
        style={styles.communityImage}
      />
      <Text style={styles.communityText}>{_item?.title ?? ''}</Text>

      <TouchableOpacity
        style={styles.crossIconCommunity}
        onPress={() => onCrossIconPress(_item.id)}>
        <Image source={Images.crossIcon} resizeMode={'contain'} />
      </TouchableOpacity>
    </View>
  );
};

SelectedCommunity.propTypes = {
  _item: PropTypes.object.isRequired,
  onCrossIconPress: PropTypes.func.isRequired,
};
SelectedCommunity.defaultProps = {};

const mapStateToProps = ({general}) => ({});
export default connect(mapStateToProps, null)(SelectedCommunity);
