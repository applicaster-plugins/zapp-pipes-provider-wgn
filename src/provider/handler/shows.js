import { api } from '../../api';
import { createFeedItem, addItemsImages } from '../../utils';
import { mapItem } from '../../mappers/mapItem';
import queryString from 'query-string';

export async function shows(params) {
  const { title: ptitle, imageWidth = 600 } = params;
  try {
    const items = await api.getAllSeries();
    const feedUrl = `wgnds://fetchData?${queryString.stringify(params)}`;
    const entry = await addItemsImages(items.map(mapItem(feedUrl)), imageWidth);
    return createFeedItem(entry, ptitle);
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
