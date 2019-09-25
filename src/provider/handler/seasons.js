import { api } from '../../api';
import { createFeedItem, addItemsImages } from '../../utils';
import { mapSeason } from '../../mappers/mapSeason';
import { mapItem } from '../../mappers/mapItem';
import queryString from 'query-string';

export async function seasons(params) {
  const { id, imageWidth = 600, title: ptitle } = params;
  try {
    let parentItem = await api.getSeries(id);

    const feedUrl = `wgnds://fetchData?${queryString.stringify(params)}`;

    parentItem = (await addItemsImages([mapItem()(parentItem)], imageWidth))[0];

    const allSeasons = await api.getAllSeasons();
    const items = await api.getSeriesEpisodes(id);
    const seasons = items.reduce((sum, item) => {
      const season = allSeasons.find(
        s =>
          item._wgn_america_season_tax &&
          item._wgn_america_season_tax.length > 0 &&
          s.id === item._wgn_america_season_tax[0]
      );
      if (season && !sum.find(s => s.id === season.id)) {
        sum.push(season);
      }
      return sum;
    }, []);

    parentItem.entry = seasons
      .sort((a, b) => a.id - b.id)
      .map(mapSeason(id, feedUrl));

    if (ptitle) {
      parentItem.title = ptitle;
    }
    return parentItem;
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
