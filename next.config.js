const withSass = require('@zeit/next-sass');

module.exports = () => {
  console.log(`process.env.SERVER_URL: ${process.env.SERVER_URL}`);
  console.log(`process.env.APP_URL: ${process.env.APP_URL}`);
  console.log(`process.env.STANDALONE_GRAPHQL3: ${process.env.STANDALONE_GRAPHQL}`);
  return withSass({
    env: {
      SERVER_URL: process.env.SERVER_URL,
      APP_URL: process.env.APP_URL,
      STANDALONE_GRAPHQL: process.env.STANDALONE_GRAPHQL ? process.env.STANDALONE_GRAPHQL : 'NO',
    },
  });
};
