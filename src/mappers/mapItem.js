import moment from 'moment';

export function mapItem(item) {
  try {
    const {
      id,
      title: { rendered: title },
      content: { rendered: summary = '' } = {},
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

    if (video) {
      try {
        if (video['video-meta']['akamai-player'].id) {
          type = 'video/hls';
          src = video['video-meta']['akamai-player']['hls_id'];
        } else {
          type = 'video/ooyala';
          src = video['video-meta']['ooyala-player']['player_id'];
        }
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
      link
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}
