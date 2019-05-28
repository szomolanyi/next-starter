import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';

import initApollo from './apollo-client';

function parseCookies(req) {
  return req ? req.headers.cookie || '' : document.cookie;
}

export default App => class Apollo extends React.Component {
  // static displayName = 'withApollo(App)' TODO: do we need it ?

  static async getInitialProps(ctx) {
    const { Component, router, ctx: { req, res } } = ctx;

    let appProps = {};
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(ctx);
    }

    // Run all GraphQL queries in the component tree
    // and extract the resulting data
    const apollo = initApollo({}, {

      getToken: () => {
        const token = parseCookies(req);
        return token;
      },
    });
    ctx.ctx.apolloClient = apollo;

    if (res && res.finished) {
      // When redirecting, the response is finished.
      // No point in continuing to render
      return {};
    }

    if (!process.browser) {
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloClient={apollo}
          />,
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error);
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();
    }

    // Extract query data from the Apollo store
    const apolloState = apollo.cache.extract();

    return {
      ...appProps,
      apolloState,
    };
  }

  constructor(props) {
    super(props);
    // `getDataFromTree` renders the component first, the client is passed off as a property.
    // After that rendering is done using Next's normal rendering pipeline
    this.apolloClient = initApollo(props.apolloState, {
      getToken: () => {
        const token = parseCookies();
        return token;
      },
    });
  }

  render() {
    return <App {...this.props} apolloClient={this.apolloClient} />;
  }
};
