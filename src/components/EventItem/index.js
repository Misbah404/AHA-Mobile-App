// @flow
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text} from '../';
import {Colors, Images} from '../../theme';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import util from '../../util';
import moment from 'moment';
import {eventDefaultImage} from '../../constants';
import {Actions} from 'react-native-router-flux';

const EventItem = props => {
  const {item} = props;
  const [isLoadingImage, setIsLoadingImage] = useState(() => true);

  let eventDate = moment(item?.StartDate);
  const day = !util.isEmptyValue(item?.StartDate) ? eventDate.format('D') : '';
  let Uri = util.isEmptyValue(item.EventPic)
    ? eventDefaultImage
    : `https:${item.EventPic}`;
  const month = !util.isEmptyValue(item?.StartDate)
    ? eventDate.format('MMMM')
    : '';
  const year = !util.isEmptyValue(item?.StartDate)
    ? eventDate.format('yyyy')
    : '';

  return (
    <TouchableOpacity
      onPress={() => Actions.eventDetails({id: item.id})}
      style={styles.itemEventView}>
      <View style={styles.eventViewDetail}>
        <FastImage
          style={[
            styles.itemEventImage,
            isLoadingImage
              ? {borderColor: Colors.text.lightGray2, borderWidth: 0.5}
              : {},
          ]}
          source={{
            uri: Uri,
            priority: FastImage.priority.high,
          }}
          onLoad={() => setIsLoadingImage(false)}
          resizeMode={FastImage.resizeMode.cover}></FastImage>

        <View
          style={{
            position: 'absolute',
            backgroundColor: Colors.transparent,
            width: '100%',
            bottom: 0,
            zIndex: 99,
          }}>
          <View style={styles.itemEventnNameView}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.itemEventNameTxt}>
              {item?.EventName}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={styles.itemEventDispcriptionTxt}>
            {item?.Headline}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 15,
            top: 5,
          }}>
          <Text style={styles.itemEventDateTxt}>
            {`${day} ${month} ${year}`}
            {!util.isEmptyValue(item.StartTime) && (
              <Text style={styles.itemEventDateTxt}>
                {`,  ${item.StartTime}`}
              </Text>
            )}
            {!util.isEmptyValue(item.EndTime) && (
              <Text style={styles.itemEventDateTxt}>
                {` - ${item.EndTime}`}
              </Text>
            )}
          </Text>
        </View>

        {isLoadingImage && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            size={'small'}
            color={Colors.white}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

EventItem.propTypes = {};
EventItem.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(EventItem);
