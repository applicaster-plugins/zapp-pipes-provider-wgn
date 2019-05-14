import { api } from '../../api';
import { createFeedItem } from '../../utils';
import { mapItem } from '../../mappers/mapItem';

export async function feed(params) {
  const { title: ptitle, rss, image_key, auth_id } = params;
  try {
    const result = await api.feed(rss);
    const rootItem = result.rss.channel[0];
    const title = rootItem.title[0];
    const items = rootItem.item;
    return createFeedItem(
      items.map(mapItem(auth_id, image_key)),
      ptitle || title
    );
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
