export const manifest = {
  handlers: ['shows', 'seasons', 'episodes', 'test'],
  help: {
    shows: {
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
