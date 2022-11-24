import util from '../util';
export function manipulateListNotification(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtList = [];
  list.forEach((item, index) => {
    let mArtObj = {};
    mArtObj['id'] = item.id ?? 0;
    mArtObj['title'] = item.title ?? '';
    mArtObj['image'] = 'https://source.unsplash.com/1024x768/?girl';
    mArtObj['ArtistProfile'] = 'https://source.unsplash.com/1024x768/?girl';
    mArtObj['date'] = '12/05/2021';
    mArtObj['created_at'] = '5/05/2021';
    mArtObj['message'] = 'following me';

    mArtList.push(mArtObj);
  });
  return mArtList;
}
