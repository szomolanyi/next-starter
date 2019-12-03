const next = require('next');
const withSass = require('@zeit/next-sass');

// create next app
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
  dev,
  conf: withSass({
    env: {
      SERVER_URL: 'http://localhost:3000',
      APP_URL: 'http://localhost:3000',
      STANDALONE_GRAPHQL: process.env.STANDALONE_GRAPHQL ? process.env.STANDALONE_GRAPHQL : 'NO',
    },
  }),
});
const handle = nextApp.getRequestHandler();
const app = require('./server');

nextApp.prepare()

  .then(() => {
    app.get('*', (req, res) => handle(req, res));

    app.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
