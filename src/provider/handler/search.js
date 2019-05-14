import { createFeedItem, createMediaGroupItem } from '../../utils';
import { api } from '../../api';
import { mapItem } from '../../mappers/mapItem';
import _url from 'url';

export function search(params) {
  const { url = '', query, ignoreImages } = params;
  const aUrl = _url.parse(url, true);
  const { query: qquery, ignoreImages: qignoreImages } = aUrl.query || {};

  const q = query || qquery;
  const _ignoreImages = ignoreImages || qignoreImages;

  return api
    .search(query)
    .then(result => {
      return result.data.map(mapItem);
    })
    .then(items => {
      if (_ignoreImages) {
        return items;
      }
      return Promise.all(
        items.map(item => {
          const { media_id } = item;
          return api.media(media_id);
        })
      ).then(mediaItems => {
        return items.map(item => {
          const { image } =
            mediaItems.find(media => {
              const { id } = media;
              return id === item.media_id;
            }) || {};
          item.media_group.push(createMediaGroupItem(image, 'base'));
          return item;
        });
      });
    })
    .then(items => {
      return items.map(item => {
        delete item.media_id;
        return item;
      });
    })
    .then(items => {
      return createFeedItem(items);
    })
    .catch(err => {
      //TODO: log this error somehow
      return createFeedItem([]);
    });
}
