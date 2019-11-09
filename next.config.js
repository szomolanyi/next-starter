const withSass = require('@zeit/next-sass');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
/*
module.exports = withSass({
  // config options here
  env: {
    GRAPHQL_URI: 'http://localhost:4000/graphql',
  },
});
*/
module.exports = (phase, { defaultConfig }) => {
  console.log(`phase: ${phase}`);
  console.log(`process.env.GRAPHQL_URI: ${process.env.GRAPHQL_URI}`);
  console.log( `process.env.STANDALONE_GRAPHQL3: ${process.env.STANDALONE_GRAPHQL}`);
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withSass({
      env: {
        GRAPHQL_URI: process.env.GRAPHQL_URI,
        STANDALONE_GRAPHQL: process.env.STANDALONE_GRAPHQL ? process.env.STANDALONE_GRAPHQL : 'NO',
      },
    });
  }
  return withSass({});
};
