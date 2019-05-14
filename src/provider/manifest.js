export const manifest = {
  handlers: ['feed', 'test'],
  help: {
    feed: {
      description: 'retrieves a hearst rss feed',
      params: {
        rss: 'rss url',
        image_key: 'optional. image key to use',
        auth_id: 'authId/s to populate'
      }      
    },
    test: {
      description: 'test'
    }
  }
};
