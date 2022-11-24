import util from '../util';

// in this manipulator we are getting some params from API
export function manipulateEventsData(list) {
  if (util.isArrayEmpty(list)) return [];
  let events = [];
  list.forEach((item, index) => {
    events.push(manipulateEventsItem(item, index));
  });
  return events;
}

export function manipulateEventsItem(item, index = 0) {
  let event = {};

  event['id'] = item?.id ?? index;
  event['Attendees'] = item?.Attendees_count ?? 0;
  event['Address'] = item?.Address ?? '';
  event['time'] = item?.time ?? '';
  event['charges'] = item?.charges ?? '';
  event['numberOfSeat'] = item?.Limit ?? 0;
  event['EventName'] = item?.Name ?? '';
  event['Price'] = item?.Price ?? 0;
  event['Paid'] = item?.Paid ?? false;
  event['description'] = item?.Description ?? '';
  event['artistName'] = item?.artist_name ?? '';
  event['isArtist'] = item?.isArtist ?? false;
  event['about'] = item?.about ?? '';
  event['EventPic'] = item?.EventPic ?? '';
  event['BGImage'] = item?.BGImage ?? '';
  event['CreatedDate'] = item?.CreatedDate ?? '';
  event['Sponsors'] = item?.Sponsors ?? null;
  event['StartDate'] = item?.StartDate ?? '';
  event['StartTime'] = item?.StartTime ?? '';
  event['EndTime'] = item?.EndTime ?? '';
  event['email'] = item?.CreatedBy?.authentication?.email?.email ?? '';
  event['fullName'] = item?.CreatedBy?.fullName ?? '';
  event['userName'] = item?.CreatedBy?.userName ?? '';
  event['Summary'] = item?.Summary ?? '';
  event['Headline'] = item?.Headline ?? '';
  event['url'] = util.isEmptyValue(item.url)
    ? 'https://www.google.com/'
    : item.url;

  return event;
}
