export const manifest = {
  handlers: ['shows', 'seasons', 'episodes', 'videos', 'tags', 'test'],
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
    videos: {
      description: 'retrieves videos by tag',
      params: {
        tag: 'tag'
      }
    },
    tags: {
      description: 'retrieves items by tag',
      params: {
        tag: 'tag id',
        type: 'tag type, videos/episodes/series.',
        full_path: 'full path to the wordpress entry point',
      }
    },
    test: {
      description: 'test'
    }
  }
};
