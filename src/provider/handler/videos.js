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
    items = await addItemsVideos(items);
    parentItem.entry = await addItemsImages(
      items.map(mapItem(feedUrl)),
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
