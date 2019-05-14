import { commands } from './comands';
import {
  updateParamsFromUrl,
  updateParamsFromPluginConfiguration
} from '../../utils';

export const handler = nativeBridge => params => {
  const { type } = params;

  params = updateParamsFromUrl(params);
  params = updateParamsFromPluginConfiguration(nativeBridge, params);

  return commands[type](params)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
