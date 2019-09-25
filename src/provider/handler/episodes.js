import { api } from '../../api';
import { createFeedItem, addItemsImages, addItemsVideos } from '../../utils';
import { mapItem } from '../../mappers/mapItem';
import queryString from 'query-string';

export async function episodes(params) {
  const { id, season, imageWidth = 600, title: ptitle } = params;
  try {
    const feedUrl = `wgnds://fetchData?${queryString.stringify(params)}`;

    let parentItem = await api.getSeries(id);
    parentItem = (await addItemsImages([mapItem()(parentItem)], imageWidth))[0];

    let items = await api.getSeriesEpisodes(id, season);
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
