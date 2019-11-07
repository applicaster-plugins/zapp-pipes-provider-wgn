import axios from 'axios';
import { config } from '../config';
import { getTagdId } from '../utils/index'

 
export async function getItemsByTag(tag, routType) {
  try {
    console.log("routType: " + routType);
    
    var tagId = await getTagdId(tag);
    var route = "wgn-videos" // default route
    route = routType ?  config.tagMap[routType] : route;
    console.log("route: " + route);
    const response = await axios.get(
      `${config.api.baseUrl}/${route}/?tags=${tagId}&per_page=100`
    );
    return response.data;
  } catch (err) {
    return {}
  }
}

export async function getItemsByTagWithFullPath(fullPath) {
    try {
      const response = await axios.get(
        `${fullPath}&per_page=100`
      );
      return response.data;
    } catch (err) {
      return {}
    }
  }

