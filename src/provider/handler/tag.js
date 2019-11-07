import { api } from '../../api';
import { createFeedItem, addItemsImages, addItemsVideos } from '../../utils';
import { mapItem } from '../../mappers/mapItem';
import queryString from 'query-string';

export async function tags(params) {
  const { tag, type, full_path, title: ptitle } = params;
  try {
    const feedUrl = `wgnds://fetchData?${queryString.stringify(params)}`;

    const parentItem = {
      type: { value: 'feed' },
      id: `${tag}`
    };

    let items;
    if(full_path){
        items = await api.getItemsByTagWithFullPath(full_path);
    }else{
        items =  await api.getVideosByTag(tag, type);
    }
   
    parentItem.entry = await addItemsImages(
     await Promise.all(
        items
        .map(item => {
          item.video = { 'video-meta': item['video-meta'] };
          return item;
        })
        .map(mapItem(feedUrl))
      ),
      undefined
    );

    if (ptitle) {
      parentItem.title = ptitle;
    }
    return parentItem;
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
