import _url from 'url';

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
    const aUrl = _url.parse(url, true);
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
      const bc = o['hearstds'];
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
  return source.url;
}
