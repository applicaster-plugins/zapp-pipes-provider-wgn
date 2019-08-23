import axios from 'axios';
import { config } from '../config';

export async function getImageForItem(id) {
  try {
    const response = await axios.get(
      `${config.api.baseUrl}/media?parent=${id}`
    );
    const image = response.data[0].guid.rendered;
    return { id, image };
  } catch (err) {
    return {};
  }
}
