import gql from 'graphql-tag';

import { APP_MESSAGE } from './queries';

export const typeDefs = gql`
  extend type Query {
    appMessage: AppMessage!
  }

  type AppMessage {
    isOpened: Boolean!,
    messageId: String
  }

  extend type Mutation {
    setAppMessage(id: String!): AppMessage
  }
`;

export const resolvers = {
  Mutation: {
    setAppMessage: (parent, args, context) => {
      const { cache } = context;
      const data = {
        appMessage: {
          __typename: 'AppMessage',
          isOpened: args.id ? true : false,
          messageId: args.id,
        },
      };
      cache.writeQuery({ query: APP_MESSAGE, data });
      return data.appMessage;
    }
  }
};
