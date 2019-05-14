import axios from 'axios';
import xml2js from 'xml2js-parser';

export async function feed(rss) {
  try {
    const response = await axios.get(rss);
    const preserveChildrenOrder = true;
    const explicitChildren = true;
    const result = xml2js.parseStringSync(response.data, {
      preserveChildrenOrder,
      explicitChildren
    });
    return result;    
  } catch (err) {

  }
}
