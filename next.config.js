const withTM = require('next-transpile-modules')(['lodash-es', 'use-lodash-debounce-throttle']);

module.exports = () => {
  console.log(`process.env.NEXT_PUBLIC_SERVER_URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
  console.log(`process.env.APP_URL: ${process.env.APP_URL}`);
  return withTM({
    analyticsId: 'xTCJiv9XFRCkUcLNeczVVWK9wn2',
  });
};
