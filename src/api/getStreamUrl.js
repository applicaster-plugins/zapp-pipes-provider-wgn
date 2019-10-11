import axios from 'axios';
import { config } from '../config';

export async function getStreamUrl() {
  try {
    const response = await axios.get(`${config.api.baseUrl}/wgn-series`);
    return response.data;
  } catch (err) {}
}
