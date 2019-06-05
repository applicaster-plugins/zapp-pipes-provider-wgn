export const manifest = {
  handlers: ['feed', 'test'],
  help: {
    feed: {
      description: 'retrieves a hearst rss feed',
      params: {
        rss: 'rss url',
        image_key: 'optional. image key to use',
        auth_id: 'authId/s to populate',
        sortBy: 'optional. sort by field name',
        sortByDir: 'optional. sort by direction (asc/desc)',
        filter: 'optional. search filter value',
        filterFields: 'optional. search filter field names'
      }
    },
    test: {
      description: 'test'
    }
  }
};
