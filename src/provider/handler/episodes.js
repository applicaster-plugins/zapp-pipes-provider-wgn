import { api } from '../../api';
import { createFeedItem, addItemsImages, addItemsVideos } from '../../utils';
import { mapItem } from '../../mappers/mapItem';
import queryString from 'query-string';

export async function episodes(params) {
  const { id, season, imageWidth = 600, title: ptitle, tag } = params;
  try {
    const feedUrl = `wgnds://fetchData?${queryString.stringify(params)}`;

    let parentItem;
    if (season) {
      const allSeasons = await api.getAllSeasons();
      const seasonItem =
        allSeasons.find(s => parseInt(s.id) === parseInt(season)) || {};
      parentItem = {
        type: { value: 'feed' },
        id: `${id}_${season}`,
        title: seasonItem.name
      };
    } else {
      parentItem = await api.getSeries(id);
      parentItem = (await addItemsImages(
        [mapItem()(parentItem)],
        imageWidth
      ))[0];
    }

    let items = await api.getSeriesEpisodes(id, season);
    items = await addItemsVideos(items);
    parentItem.entry = await addItemsImages(
      await Promise.all(items.map(mapItem(feedUrl))),
      imageWidth
    );

    if (ptitle) {
      parentItem.title = ptitle;
    }
    return parentItem;
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
