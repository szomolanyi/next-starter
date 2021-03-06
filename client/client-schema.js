import { gql } from '@apollo/client';

import { APP_MESSAGE } from './queries';

export const typeDefs = gql`
  extend type Query {
    appMessage: AppMessage!
  }

  type AppMessage {
    isOpened: Boolean!
    component: String
    messages: [String]
    severity: String
  }

  extend type Mutation {
    setAppMessage(messages: [String], component: String, severity: String): AppMessage
  }

  extend type Mutation {
    closeAppMessage: AppMessage
  }
`;

export const resolvers = {
  Mutation: {
    setAppMessage: (parent, args, context) => {
      const { cache } = context;
      const data = {
        appMessage: {
          __typename: 'AppMessage',
          isOpened: true,
          component: args.component || null,
          messages: args.messages || [],
          severity: args.severity || 'info',
        },
      };
      cache.writeQuery({ query: APP_MESSAGE, data });
      return data.appMessage;
    },
    closeAppMessage: (parent, args, context) => {
      const { cache } = context;
      cache.writeQuery({
        query: APP_MESSAGE,
        data: {
          appMessage: {
            __typename: 'AppMessage',
            isOpened: false,
            component: null,
            messages: [],
            severity: null,
          },
        },
      });
    },
  },
};
