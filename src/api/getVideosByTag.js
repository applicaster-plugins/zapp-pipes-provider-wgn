import axios from 'axios';
import { config } from '../config';

export async function getVideosByTag(tag) {
  try {
    const response = await axios.get(
      `${config.api.baseUrl}/wgn-videos/?tags=${tag}`
    );
    return response.data;
  } catch (err) {}
}
