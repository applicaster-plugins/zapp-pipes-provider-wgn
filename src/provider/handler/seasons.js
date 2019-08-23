import { api } from '../../api';
import { createFeedItem } from '../../utils';
import { mapSeason } from '../../mappers/mapSeason';

export async function seasons(params) {
  const { id, ptitle } = params;
  try {
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

    const entry = seasons.sort((a, b) => a.id - b.id).map(mapSeason(id));

    return createFeedItem(entry, ptitle);
  } catch (err) {
    return createFeedItem([], err.message);
  }
}
