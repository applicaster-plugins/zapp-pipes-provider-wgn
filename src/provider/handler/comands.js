import { feed } from './feed';
import { episodes } from './episodes';
import { seasons } from './seasons';

const test = () => {
  return new Promise(resolve => resolve({}));
};

export const commands = {
  feed,
  episodes,
  seasons,
  test
};
