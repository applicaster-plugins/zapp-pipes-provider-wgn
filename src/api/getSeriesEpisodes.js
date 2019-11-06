import axios from 'axios';
import { config } from '../config';

export async function getSeriesEpisodes(id, season) {
  try {
    const response = await axios.get(
      `${config.api.baseUrl}/wgn-episodes?parent=${id}&per_page=100`
    );
    return response.data.filter(item => {
      if (!season) return true;

      return (
        item._wgn_america_season_tax &&
        item._wgn_america_season_tax.length > 0 &&
        season == item._wgn_america_season_tax[0]
      );
    });
  } catch (err) {}
}
