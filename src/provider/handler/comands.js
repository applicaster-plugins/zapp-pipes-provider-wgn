import { shows } from './shows';
import { episodes } from './episodes';
import { seasons } from './seasons';
import { videos } from './videos';
import { tags } from './tag';

const test = () => {
  return new Promise(resolve => resolve({}));
};

export const commands = {
  shows,
  episodes,
  seasons,
  videos,
  tags,
  test
};
