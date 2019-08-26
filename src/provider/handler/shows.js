import { api } from '../../api';
import { createFeedItem, addItemsImages } from '../../utils';
import { mapItem } from '../../mappers/mapItem';

export async function shows(params) {
  const { title: ptitle } = params;
  try {
    const items = await api.getAllSeries();
    const entry = await addItemsImages(items.map(mapItem));
    return createFeedItem(entry, ptitle);
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
