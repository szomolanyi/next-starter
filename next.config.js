const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  console.log(phase)
  console.log(defaultConfig)
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      target: 'serverless',
      env: {
        GRAPHQL_URI: "http://localhost:3000/graphql"
      }
    }
  }
  else {
    /* production */
    return {
      target: 'serverless',
        env: {
          GRAPHQL_URI: "https://ns-fomo.now.sh/graphql"
      }
    }
  }
}
