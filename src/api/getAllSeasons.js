import axios from 'axios';
import { config } from '../config';

export async function getAllSeasons() {
  try {
    const response = await axios.get(
      `${config.api.baseUrl}/_wgn_america_season_tax`
    );
    return response.data;
  } catch (err) {}
}
