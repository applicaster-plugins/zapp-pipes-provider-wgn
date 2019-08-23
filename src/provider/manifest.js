export const manifest = {
  handlers: ['feed', 'seasons', 'episodes', 'test'],
  help: {
    feed: {
      description: 'retrieves a wgn series feed',
      params: {}
    },
    episodes: {
      description: 'retrieves episodes specific wgn series',
      params: {
        id: 'series id'
      }
    },
    seasons: {
      description: 'retrieves seasons specific wgn series',
      params: {
        id: 'series id'
      }
    },
    test: {
      description: 'test'
    }
  }
};
