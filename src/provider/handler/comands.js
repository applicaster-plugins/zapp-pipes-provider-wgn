import { feed } from './feed';

const test = () => {
  return new Promise(resolve => resolve({}));
};

export const commands = {
  feed,
  test
};
