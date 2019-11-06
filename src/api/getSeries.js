import axios from 'axios';
import { config } from '../config';

export async function getSeries(id) {
  try {
    const response = await axios.get(`${config.api.baseUrl}/wgn-series/${id}?per_page=100`);
    return response.data;
  } catch (err) {}
}
