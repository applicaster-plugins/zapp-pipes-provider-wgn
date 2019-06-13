import { api } from '../../api';
import { createFeedItem } from '../../utils';
import { mapItem } from '../../mappers/mapItem';

export async function feed(params) {
  const {
    title: ptitle,
    rss,
    image_key,
    auth_id,
    sortBy = '',
    sortByDir = 'asc',
    filter = '',
    filterFields = 'title,summary',
    free = 'true'
  } = params;
  try {
    const result = await api.feed(rss);
    const rootItem = result.rss.channel[0];
    const title = rootItem.title[0];
    const items = rootItem.item;
    const entry = items
      .map(mapItem(auth_id, image_key, free.toLowerCase()==='true'))
      .sort((_a, _b) => {
        if (!sortBy) {
          return -1;
        }

        const a = sortByDir === 'desc' ? _b : _a;
        const b = sortByDir === 'desc' ? _a : _b;

        if (a[sortBy] < b[sortBy]) {
          return -1;
        } else if (a[sortBy] > b[sortBy]) {
          return 1;
        }

        return 0;
      })
      .filter(item => {
        if (!filter) {
          return true;
        }

        const fieldsArr = filterFields.split(',');
        for (let i = 0; i < fieldsArr.length; i++) {
          const field = fieldsArr[i];

          if (
            item[field] &&
            item[field].toLowerCase().indexOf(filter.toLowerCase()) > -1
          ) {
            return true;
          }
        }

        return false;
      });

    return createFeedItem(entry, ptitle || title);
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
