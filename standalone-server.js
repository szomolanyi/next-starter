

const app = require('./server');

app.listen(4000, (err) => {
  if (err) throw err;
  console.log('> Ready on http://localhost:4000');
});
