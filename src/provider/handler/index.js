import { commands } from './comands';
import {
  updateParamsFromUrl,
  updateParamsFromPluginConfiguration
} from '../../utils';

import { config } from '../../config';

export const handler = nativeBridge => params => {
  const { type } = params;

  params = updateParamsFromUrl(params);
  params = updateParamsFromPluginConfiguration(nativeBridge, params);

  const { env = '' } = params;
  if (env === 'test') {
    config.api.baseUrl = config.api.baseUrlTest;
  }

  return commands[type](params)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
