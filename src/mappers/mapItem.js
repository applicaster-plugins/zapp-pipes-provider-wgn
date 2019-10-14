import moment from 'moment';
import { getStreamUrl } from '../utils';

export function mapItem(feed_parent_ds_url) {
  return async function(item) {
    try {
      const {
        id,
        title: { rendered: title },
        excerpt: { rendered: summary = '' } = {},
        date: _published,
        links,
        video
      } = item;

      const published = moment(new Date(_published)).format();

      let link;
      try {
        const href = links.self[0].href;
        link = {
          type: 'text/html',
          rel: 'alternate',
          href
        };
      } catch (err) {}

      let type = 'link';
      let src = `wgnds://fetchData?type=seasons&id=${id}&parentFeedUrl=${encodeURIComponent(
        feed_parent_ds_url
      )}`;
      let extensions = {};
      if (video) {
        try {
          let free = true;
          if (video['video-meta']['akamai-player'].id) {
            type = 'video/hls';
            src = video['video-meta']['akamai-player']['hls_id'];
          } else {
            type = 'video/ooyala';
            src =  await getStreamUrl(video['video-meta']['ooyala-player']['code']);
          }
          free = video['video-meta']['akamai-player'].auth !== '1';

          const dataSourceUrl = { feed_parent_ds_url };

          extensions = { free, dataSourceUrl };
        } catch (err) {}
      } else {
      }

      const open_with_plugin_id = 'VideoInfoScreenRN';
      const year = new Date(_published).getFullYear();
      extensions.open_with_plugin_id = open_with_plugin_id;
      extensions.year = year;

      const content = { type, src };

      const itemTypeValue = video ? 'video' : 'feed';

      return {
        type: {
          value: itemTypeValue
        },
        id,
        title,
        published,
        summary,
        content,
        link,
        extensions
      };
    } catch (err) {
      return {};
    }
  };
}
