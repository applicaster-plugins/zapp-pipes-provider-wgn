import { api } from '../../api';
import { createFeedItem, addItemsImages, addItemsVideos } from '../../utils';
import { mapItem } from '../../mappers/mapItem';
import queryString from 'query-string';

export async function videos(params) {
  const { tag, imageWidth = 600, title: ptitle } = params;
  try {
    const feedUrl = `wgnds://fetchData?${queryString.stringify(params)}`;

    const parentItem = {
      type: { value: 'feed' },
      id: `${tag}`
    };

    let items = await api.getVideosByTag(tag);
    parentItem.entry = await addItemsImages(
      items
        .map(item => {
          item.video = { 'video-meta': item['video-meta'] };
          return item;
        })
        .map(await mapItem(feedUrl)),
      imageWidth
    );

    if (ptitle) {
      parentItem.title = ptitle;
    }
    return parentItem;
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
