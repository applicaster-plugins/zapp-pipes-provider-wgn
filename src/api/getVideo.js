import axios from 'axios';
import { config } from '../config';

export async function getVideo(id) {
  try {
    var itemId = parseInt(id);
    if(itemId == NaN){
      // const response = await axios.get(`${config.api.baseUrl}/tags`);
      // const tags = response.data;
    }
    const response = await axios.get(`${config.api.baseUrl}/wgn-videos/${id}`);
    const video = response.data;
    return { id, video };
  } catch (err) {
    return {};
  }
}
