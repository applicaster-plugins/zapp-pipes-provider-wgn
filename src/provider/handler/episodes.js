import { api } from '../../api';
import { createFeedItem, addItemsImages, addItemsVideos } from '../../utils';
import { mapItem } from '../../mappers/mapItem';

export async function episodes(params) {
  const { id, season, parentFeedUrl = '', imageWidth = 600 } = params;
  try {
    let parentItem = await api.getSeries(id);
    parentItem = (await addItemsImages([mapItem()(parentItem)], imageWidth))[0];

    let items = await api.getSeriesEpisodes(id, season);
    items = await addItemsVideos(items);
    parentItem.entry = await addItemsImages(
      items.map(mapItem(parentFeedUrl)),
      imageWidth
    );
    return parentItem;
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
