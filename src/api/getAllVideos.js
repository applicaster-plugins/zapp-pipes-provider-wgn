import axios from 'axios';
import { config } from '../config';

export async function getAllVideos() {
  try {
    const response = await axios.get(`${config.api.baseUrl}/wgn-videos?per_page=100`);
    return response.data;
  } catch (err) {}
}
