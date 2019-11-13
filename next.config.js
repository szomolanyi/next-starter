const withSass = require('@zeit/next-sass');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
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
