import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getEventDetailsRequest} from '../../actions/EventActions';
import {SpinnerLoader} from '../../components';
import {eventDetailDefaultImage} from '../../constants';
import {Images, Colors, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

function EventDetails(props) {
  const {eventsDetails, id} = props;
  const {
    EventPic,
    StartDate,
    EventName,
    Headline,
    Attendees,
    Address,
    Price,
    EndTime,
    numberOfSeat,
    fullName,
    description,
    url,
    StartTime,
  } = eventsDetails || {};
  const [isLoadingImage, setIsLoadingImage] = useState(() => true);
  const [isSpinnerLoader, setIsSpinnerLoader] = useState(() => true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSpinnerLoader(true);
    const params = `${id}`;
    dispatch(
      getEventDetailsRequest(params, res => {
        setIsSpinnerLoader(false);
      }),
    );
  }, []);

  const renderCoverImageAndDetailsSec = () => {
    let Uri = util.isEmptyValue(EventPic)
      ? eventDetailDefaultImage
      : `https:${EventPic}`;
    return (
      <View style={styles.coverImageMain}>
        <FastImage
          style={styles.coverImage}
          source={{
            uri: Uri,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          {isLoadingImage && (
            <ActivityIndicator
              style={{
                position: 'absolute',
                top: 0,
                bottom: 150,
                right: 0,
                left: 0,
              }}
              size={'small'}
              color={Colors.white}
            />
          )}
        </FastImage>
        <TouchableOpacity onPress={() => Actions.pop()} style={styles.backBtn}>
          <FastImage
            style={styles.backBtnImage}
            onLoad={() => setIsLoadingImage(false)}
            source={Images.backButton}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    );
  };
  function renderEventDetailItem(icon, headTxt, discriptionTxt) {
    return (
      <View style={styles.itemMainView}>
        <FastImage
          style={styles.itemIcon}
          source={icon}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.itemInnerView}>
          <Text style={styles.headTxt}>{headTxt}</Text>
          <Text numberOfLines={1} style={styles.discriptionTxt}>
            {discriptionTxt}
          </Text>
        </View>
      </View>
    );
  }

  function renderEventDetails() {
    let eventDate = moment(StartDate);
    const day = !util.isEmptyValue(StartDate) ? eventDate.format('DD') : '';
    const month = !util.isEmptyValue(StartDate) ? eventDate.format('MMMM') : '';
    const year = !util.isEmptyValue(StartDate) ? eventDate.format('yyyy') : '';

    return (
      <View style={styles.eventDetailView}>
        <>
          <ScrollView
            style={styles.eventDetailScrollView}
            showsVerticalScrollIndicator={false}>
            <View style={{borderTopLeftRadius: 80}}>
              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom: 0,
                }}>
                <Text numberOfLines={2} style={styles.eventNameTxt}>
                  {EventName}
                </Text>
                {!util.isEmptyValue(Headline) && (
                  <Text style={styles.eventDiscriptionTxt}>{Headline}</Text>
                )}
              </View>
              {!util.areValuesEqual(Attendees, 0) &&
                renderEventDetailItem(Images.attendee, 'Attendees', Attendees)}
              {!util.isEmptyValue(Address) &&
                renderEventDetailItem(Images.Location, 'Address', Address)}
              {!util.isEmptyValue(day) &&
                renderEventDetailItem(
                  Images.Date,
                  'Event Time',
                  `${day} ${month} ${year}${
                    !util.isEmptyValue(StartTime) ? `, ${StartTime}` : ''
                  }${!util.isEmptyValue(EndTime) ? ` - ${EndTime}` : ''}`,
                )}
              {!util.areValuesEqual(Price, 0) &&
                renderEventDetailItem(Images.charges, 'Charges', `$${Price}`)}
              {!util.areValuesEqual(numberOfSeat, 0) &&
                renderEventDetailItem(
                  Images.numberSeat,
                  'Number Of Seats',
                  numberOfSeat,
                )}
              {!util.isEmptyValue(fullName) &&
                renderEventDetailItem(
                  Images.profilepicSold,
                  fullName,
                  'Artist',
                )}
              {!util.isEmptyValue(description) && (
                <View style={{marginHorizontal: 12, marginTop: 20}}>
                  <Text style={styles.eventAboutTxt}>About Event</Text>
                  <Text style={styles.eventAboutDisTxt}>{description}</Text>
                </View>
              )}
            </View>
          </ScrollView>
          <View style={styles.btnMainView}>
            <TouchableOpacity
              onPress={() => Actions.eventsWebView({url})}
              style={styles.btnToachOpacity}>
              <Text style={styles.btnTxt}>Visit Event Page</Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isSpinnerLoader && renderCoverImageAndDetailsSec()}
      {!isSpinnerLoader && renderEventDetails()}
      <SpinnerLoader _loading={isSpinnerLoader} />
    </View>
  );
}

EventDetails.propTypes = {};
EventDetails.defaultProps = {};

const mapStateToProps = ({events}) => ({
  eventsDetails: events.eventsDetail,
});
export default connect(mapStateToProps, null)(EventDetails);
