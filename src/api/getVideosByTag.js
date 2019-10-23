import axios from 'axios';
import { config } from '../config';

export async function getVideosByTag(tag) {
  try {
    var tagId = await getTagdId(tag);
    const response = await axios.get(
      `${config.api.baseUrl}/wgn-videos/?tags=${tagId}`
    );
    return response.data;
  } catch (err) {
    return {}
  }
}

async function getTagdId(tagParam){
  var tagId = parseInt(tagParam);
  if(isNaN(tagId)){
    return await loadAllTags(0, tagParam);
  }else{
    return tag;
  }
}


async function loadAllTags(index, tagId){
  const response = await axios.get(`${config.api.baseUrl}/tags?per_page=100&page=${index+1}`);
  var numberOfPage = response.headers["x-wp-totalpages"];
  numberOfPage = parseInt(numberOfPage);

  var tag = response.data.filter(tag => {
    return tag.name == tagId
  })
  
  if(tag && tag.length > 0){
    return tag[0].id;
  }else if (numberOfPage && numberOfPage - 1 > index){
    return await loadAllTags(index + 1, tagId)
  }else{
    return null;
  }
}


