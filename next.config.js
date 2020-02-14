const withSass = require('@zeit/next-sass');
const withTM = require('next-transpile-modules')(['lodash-es', 'use-lodash-debounce-throttle']);

module.exports = () => {
  console.log(`process.env.SERVER_URL: ${process.env.SERVER_URL}`);
  console.log(`process.env.APP_URL: ${process.env.APP_URL}`);
  console.log(`process.env.STANDALONE_GRAPHQL3: ${process.env.STANDALONE_GRAPHQL}`);
  return withTM(withSass({
    env: {
      SERVER_URL: process.env.SERVER_URL,
      APP_URL: process.env.APP_URL,
      STANDALONE_GRAPHQL: process.env.STANDALONE_GRAPHQL ? process.env.STANDALONE_GRAPHQL : 'NO',
      CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
    },
  }));
};
