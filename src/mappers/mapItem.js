import moment from 'moment';
import { getStreamUrl } from '../utils';
import he from 'he';

export function mapItem(feed_parent_ds_url) {
  return async function(item) {
    try {
      const {
        id,
        title: { rendered: title },
        excerpt: { rendered: summary = '' } = {},
        date: _published,
        links,
        video
      } = item;
      const decodedTitle = he.decode(title);
      const decodedSummary = he.decode(summary);
      const published = moment(new Date(_published)).format();

      let link;
      try {
        const href = links.self[0].href;
        link = {
          type: 'text/html',
          rel: 'alternate',
          href
        };
      } catch (err) {}

      let type = 'link';
      let src = `wgnds://fetchData?type=seasons&id=${id}&parentFeedUrl=${encodeURIComponent(
        feed_parent_ds_url
      )}`;
      let extensions = { free: true };
      
      if (video) {
        try {
          if (video['video-meta']['akamai-player'].id || video['video-meta']['akamai-player'].hls_id) {
            type = 'video/hls';
            src = video['video-meta']['akamai-player']['hls_id'];
            extensions.free = video['video-meta']['akamai-player'].auth !== '1';
          } else {
            type = 'video/ooyala';
            src =  await getStreamUrl(video['video-meta']['ooyala-player']['code']);
          }
        } catch (err) {}
      } else {
      }
      
      const open_with_plugin_id = 'VideoInfoScreenRN';
      const year = "";// new Date(_published).getFullYear();
      extensions.open_with_plugin_id = open_with_plugin_id;
      extensions.year = year;

      const content = { type, src };

      const itemTypeValue = video ? 'video' : 'feed';      
      extensions.dataSourceUrl = getTag(itemTypeValue, item, title, feed_parent_ds_url);
      return {
        type: {
          value: itemTypeValue
        },
        id,
        title: decodedTitle,
        published,
        summary: decodedSummary,
        content,
        link,
        extensions
      };
    } catch (err) {
      return {};
    }
  };
}


function getTag(type, item, title, feed_parent_ds_url){
  const dataSourceUrl ={};
  var relatedUrl;
  var tag = item.related_items_tag && item.related_items_tag.href ?  item.related_items_tag.href : undefined;
  if(!tag){    
    //fallback for any case that we don't have related items. 
    if(type == "video"){
      relatedUrl = feed_parent_ds_url
    }else{
      tag = title.toLowerCase().replace(/ /g, "-") + "-related";
      relatedUrl = `wgnds://fetchData?type=videos&tag=${tag}&title=${encodeURIComponent(title)}`
    }
  }else{
    relatedUrl = `wgnds://fetchData?type=tags&full_path=${encodeURIComponent(tag)}&title=${encodeURIComponent(title)}`
  }
  dataSourceUrl.feed_parent_ds_url =  relatedUrl;
  return dataSourceUrl;
}