import { api } from '../../api';
import { createFeedItem, addItemsImages } from '../../utils';
import { mapItem } from '../../mappers/mapItem';

export async function episodes(params) {
  const { id, ptitle, season } = params;
  try {
    const items = await api.getSeriesEpisodes(id, season);
    const entry = await addItemsImages(items.map(mapItem));
    return createFeedItem(entry, ptitle);
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
