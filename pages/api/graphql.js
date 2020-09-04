import { ApolloServer } from 'apollo-server-micro';
import nc from 'next-connect';
import schema from '../../server/api';
import common from '../../server/common';

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req.user,
    login: req.login.bind(req),
    logout: req.logout.bind(req),
  }),
  formatError: (err) => {
    console.log(err);
    return err;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default nc()
  .use(common)
  .use(apolloServer.createHandler({ path: '/api/graphql' }));
