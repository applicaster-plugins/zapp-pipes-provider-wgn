import axios from 'axios';
import { config } from '../config';

export async function getAllVideos() {
  try {
    const response = await axios.get(`${config.api.baseUrl}/wgn-videos`);
    return response.data;
  } catch (err) {}
}
