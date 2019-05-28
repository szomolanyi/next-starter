const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      target: 'serverless',
      env: {
        GRAPHQL_URI: 'http://localhost:3000/graphql',
      },
    };
  }

  /* production */
  return {
    target: 'serverless',
    env: {
      GRAPHQL_URI: 'https://next-starter.fomo1.now.sh/graphql',
    },
  };
};
