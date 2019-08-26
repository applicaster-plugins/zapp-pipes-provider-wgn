import { api } from '../../api';
import { createFeedItem, addItemsImages, addItemsVideos } from '../../utils';
import { mapItem } from '../../mappers/mapItem';

export async function episodes(params) {
  const { id, ptitle, season } = params;
  try {
    let items = await api.getSeriesEpisodes(id, season);
    items = await addItemsVideos(items);
    const entry = await addItemsImages(items.map(mapItem));
    return createFeedItem(entry, ptitle);
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
