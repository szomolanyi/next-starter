import gql from 'graphql-tag';

export const APP_MESSAGE = gql`
query appMessage {
  appMessage @client {
    isOpened
    component
    messages
    severity
  }
}
`;

export const SET_APP_MESSAGE = gql`
mutation setAppMessage($messages: [String], $component: String, $severity: String) {
  setAppMessage(messages: $messages, component: $component, severity: $severity) @client {
    isOpened
  }
}
`;

export const CLOSE_APP_MESSAGE = gql`
mutation closeAppMessage {
  closeAppMessage @client {
    isOpened
  }
}
`;
