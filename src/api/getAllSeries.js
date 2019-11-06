import axios from 'axios';
import { config } from '../config';

export async function getAllSeries() {
  try {
    const response = await axios.get(`${config.api.baseUrl}/wgn-series?parent=0&per_page=100`);
    return response.data;
  } catch (err) {}
}
