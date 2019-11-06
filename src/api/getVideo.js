import axios from 'axios';
import { config } from '../config';

export async function getVideo(id) {
  try {
    const response = await axios.get(`${config.api.baseUrl}/wgn-videos/${id}?per_page=100`);
    const video = response.data;
    return { id, video };
  } catch (err) {
    return {};
  }
}
