export const config = {
  api: {
    baseUrl: 'https://wgnamerica.com/wp-json/wp/v2',
    baseUrlTest: 'https://wgnamerica-com-preprod.go-vip.net/wp-json/wp/v2',
    secret: 'm_wfjkDsOmF28lNfDW9lPS6_LM_sUkrlJ4J2RdQT',
    api_key: 's4cGsyOnQjTMDB24ULBewLJLcOCK.P604C',
  },
  IMAGE_SIZES: [
    { key: 'image_base', width: 0, height: 0 },
    { key: 'image_base_16x9', width: 600, height: 337, ratio: 16 / 9 },
    { key: 'image_base_4x3', width: 600, height: 450, ratio: 4 / 3 },
    { key: 'image_base_16x5', width: 600, height: 187, ratio: 16 / 5 },
    { key: 'image_base_1x1', width: 600, height: 600, ratio: 1 / 1 },
    { key: 'image_base_9x16', width: 337, height: 600, ratio: 9 / 16 },
    { key: 'image_base_3x4', width: 450, height: 600, ratio: 3 / 4 }
  ],
  DEFAULT_IMAGE_WIDTH: 600,
  tagMap = {
    videos: "wgn-videos",
    episodes: "wgn-series",
    series: "wgn-episodes"
  }

};
