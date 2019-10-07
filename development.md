# Application state
TODO: client-schema.js

# Registered components

Components, which are displayed dynamicaly depending on application state are defined and rendered by [RegisteredComponent](../blob/master/lib/hocs.js).

For example custom messages displayed on AppMessageModal can be defined as registered component.

# Error handling

## GraphQL errors
All graphql errors can be handled with [useErrorHandler](../blob/master/lib/hooks.js) hook. Hook recognizes two kind of erros: 
* Known errors, defined in [isKnownError](../blob/master/lib/utils.js) function. Known errors are returned to calling component and error processing is handled by component: component can display error in own way or simply pass it to [AppMessageModal](../blob/master/components/AppMessageModal.jsx) component.
* Unknown erors, which includes also network errors and other global errors are automatically passed to [AppMessageModal](../blob/master/components/AppMessageModal.jsx) component. AppMessageModal is component which can be used to show application errors, notifications or all other messages.

## Other errors
React render errors are not handled.

