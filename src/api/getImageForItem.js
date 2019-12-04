import axios from 'axios';
import { config } from '../config';

export async function getImageForItem(id) {
  try {
    const response = await axios.get(
      `${config.api.baseUrl}/media?parent=${id}`
    );
    const images = getImageList(response.data);
    return { id, images };
  } catch (err) {
    return {};
  }
}

function  getImageList(array){
   var response = [
     {
      key: "image_base_poster",
      lable:"poster",
      link: ""
     },
     {
      key: "image_base_16x9",
      lable:"16x9",
      link: ""
     },
     {
      key: "image_base_1x1",
      lable:"1x1",
      link: ""
     },
     {
      key: "image_base_3x4",
      lable:"3x4",
      link: ""
     },
     {
      key: "image_base_4x3",
      lable:"4x3",
      link: ""
     }
  ];
  
  if(array && array.length > 0 ){
    var image_base_link = undefined;
    response.map(image => {
        array.map(item => {
          if(item.image_tags){
            item.image_tags.map(tag => {
              //image base link should be 16x9 ratio in order to support TV
              if(tag.name == "16x9"){
                image_base_link = item.source_url;
              }
              if (image.lable == tag.name){
                image.link = item.source_url;
                return;
              }
            })
            return;
          }
        })
    })

    if(!image_base_link){
      image_base_link =  array[0].source_url
    }

     response.push(
     {
       key: "image_base",
       lable:"image_base",
       link: image_base_link 
      }
    )
  }
   
  return response;
}
