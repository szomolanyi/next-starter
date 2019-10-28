# GraphQL

## Response type
TODO popis Response typu (code, message), sluzi ako navratova hodnota operacii, verify apod

# Application state

Application state is managed in [Apollo local state](https://www.apollographql.com/docs/react/data/local-state/). Local state schema is defined in [client-schema.js](../blob/master/lib/client-schema.js).

Out of the box, local state consists of:
* AppMessage type - holds application message displayed with [AppMessageModal](../blob/master/components/AppMessageModal.jsx) component.

# Registered components

Components, which are displayed dynamicaly depending on application state are defined and rendered by [RegisteredComponent](../blob/master/lib/hocs.js).

For example custom messages displayed on AppMessageModal can be defined as registered component.

# Error handling

## GraphQL errors

App recognises two kind of errors:
1. Errors which are known and expected and obviously they are result of wrong user input.
2. Errors which are unexpected, for example result of network failures or application bugs.

Utility function [graphQlErrorFilter](../blob/master/lib/tools.js) takes GraphQL error object, filters unexpected errors and returns flat array of errors.

Graphql errors can be handled in following ways :
1. Call [graphQlErrorFilter](../blob/master/lib/tools.js) directly and display errors directly in component. 
2. Use hook [useErrorHandler](../blob/master/lib/hooks.js) to display errors in [AppMessageModal](../blob/master/components/AppMessageModal.jsx) component.
3. Display [AppError](../blob/master/components/ui/AppError.jsx).
 
## TODO: implement react boundary or not

## Other errors
React render errors are not handled.

# Example - social application

## Graphql schema

1. Posts schema api/posts/Posts.js
```code js
TODO
```

2. Posts Mongoose model models/posts.js

3. Posts resolvers api/posts/resolvers.js

4. Prepare UI
4.1 Prepare queries : lib/queries.js
4.2 Posts page : pages/posts.jsx
4.3 Posts component : components/posts/Posts.jsx
