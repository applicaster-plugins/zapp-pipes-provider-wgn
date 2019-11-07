import _url from 'url';
import { api } from '../api';
import { config } from '../config';

export function createMediaGroupItem(src, key) {
  return {
    type: 'image',
    media_item: [
      {
        src,
        key
      }
    ]
  };
}

export function createFeedItem(entry, title) {
  return {
    type: {
      value: 'feed'
    },
    title,
    entry
  };
}

export function updateParamsFromUrl(params) {
  const { url = '' } = params;
  let q = {};
  try {
    const aUrl = _url.parse(url.indexOf('?') === 0 ? url : `?${url}`, true);
    q = aUrl.query;
    Object.keys(q).forEach(key => {
      if (!params[key]) {
        params[key] = q[key];
      }
    });
  } catch (err) {
  } finally {
    return params;
  }
}

export function updateParamsFromPluginConfiguration(providerInterface, params) {
  try {
    const { pluginConfigurations } = providerInterface.appData();
    if (pluginConfigurations) {
      let o;
      try {
        o = JSON.parse(pluginConfigurations);
      } catch (err) {
        o = pluginConfigurations;
      }
      const bc = o['wgnds'];
      Object.keys(bc).forEach(key => {
        if (!params[key]) {
          params[key] = bc[key];
        }
      });
    }
  } catch (err) {
  } finally {
    return params;
  }
}

export function getArrayFieldValue(field, returnObject) {
  if (!field || field.length === 0) {
    return '';
  }

  if (!returnObject) {
    if (typeof field[0] === 'object') {
      return '';
    }
  }
  return field[0];
}

export function getVideoSource(videos) {
  const source = videos.reduce((currentSource, element) => {
    if (
      element.url &&
      element.type &&
      element.type.toLowerCase() === 'video/mp4'
    ) {
      if (currentSource) {
        if (currentSource.height < element.height) {
          return element;
        }
      } else {
        return element;
      }
    }
    return currentSource;
  }, null);
  const { url: src, duration } = source;
  return { src, duration };
}

export async function addItemsImages(items, imageWidth) {
  const images2Id = await Promise.all(
    items.map(item => {
      return api.getImageForItem(item.id);
    })
  );
  images2Id.forEach(imageItem => {
    const { id, images } = imageItem;
    const item = items.find(item => item.id === id);
    if (item) {
      item.media_group = images.map( image => {
        return createMediaGroupItem(image.link, image.key);
      });
    }
  });

  return items;
}

export async function addItemsVideos(items) {
  const videos = await Promise.all(
    items.map(item => {
      let aid = -1;
      try {
        aid = item.videos['full-episodes'].ID;
      } catch (err) {}
      return api.getVideo(aid);
    })
  );
  videos.forEach(videoItem => {
    const { id, video } = videoItem;
    const item = items.find(aitem => {
      try {
        const aid = aitem.videos['full-episodes'].ID;
        return aid === id;
      } catch (err) {
        return false;
      }
    });
    if (item) {
      item.video = video;
    }
  });

  return items;
}


export async function getStreamUrl(id) {
   return await api.getStreamUrl(id);
}

export async function getTagdId(tagParam){
  var tagId = parseInt(tagParam);
  if(isNaN(tagId)){
    return await loadAllTags(0, tagParam);
  }else{
    return tagParam;
  }
}

export async function loadAllTags(index, tagId){
  const response = await axios.get(`${config.api.baseUrl}/tags?per_page=100&page=${index+1}`);
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