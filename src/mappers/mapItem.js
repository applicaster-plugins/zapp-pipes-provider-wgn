import moment from 'moment';

export function mapItem(item) {
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
    let src = `wgnds://fetchData?type=series&id=${id}`;
    let extensions;
    if (video) {
      try {
        let free = true;
        if (video['video-meta']['akamai-player'].id) {
          type = 'video/hls';
          src = video['video-meta']['akamai-player']['hls_id'];
        } else {
          type = 'video/ooyala';
          src = video['video-meta']['ooyala-player']['player_id'];
        }
        free = video['video-meta']['akamai-player'].auth !== '1';
        extensions = { free };
      } catch (err) {}
    } else {
    }
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
}
