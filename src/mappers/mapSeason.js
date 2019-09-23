export function mapSeason(parentId, parentFeedUrl) {
  return function(item) {
    try {
      const { id, name: title } = item;

      const type = 'link';
      const src = `wgnds://fetchData?type=episodes&id=${parentId}&season=${id}&parentFeedUrl=${encodeURIComponent(
        parentFeedUrl
      )}`;
      const content = { type, src };

      return {
        type: {
          value: 'feed'
        },
        id,
        title,
        content
      };
    } catch (err) {
      return {};
    }
  };
}
