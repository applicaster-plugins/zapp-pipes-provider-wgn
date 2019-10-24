import axios from 'axios';
import { config } from '../config';

export async function getVideosByTag(tag) {
  try {
    var tagId = await getTagdId(tag);
    console.log(tagId);
    if(!tagId){
      tagId = "elad"
    }
    const response = await axios.get(
      `${config.api.baseUrl}/wgn-videos/?tags=${tagId}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);

    return {}
  }
}

async function getTagdId(tagParam){
  var tagId = parseInt(tagParam);
  if(isNaN(tagId)){
    return await loadAllTags(0, tagParam);
  }else{
    return tagParam;
  }
}


async function loadAllTags(index, tagId){
  const response = await axios.get(`${config.api.baseUrl}/tags?per_page=100&page=${index+1}`);
  console.log("ELAD");

  console.log(response.headers);
  var numberOfPage = undefined;
  if(response.headers){
    numberOfPage = response.headers["x-wp-totalpages"];
    numberOfPage = parseInt(numberOfPage);
  }
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


