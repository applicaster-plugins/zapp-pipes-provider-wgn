import moment from 'moment';

export function mapItem(item) {
  try {
    const {
      id,
      title: { rendered: title },
      content: { rendered: summary = '' } = {},
      date: _published,
      links
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

    const type = 'link';
    const src = `wgnds://fetchData?type=series&id=${id}`;
    const content = { type, src };

    return {
      type: {
        value: 'feed'
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
