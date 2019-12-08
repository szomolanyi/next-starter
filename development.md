# Development modes
There are 3 dev mode available. Currently "Standalone GraphQL server and serverless Nexp App" is recomended mode, because Next build for GraphQL has poor performance.

There are 3 important environment settings in .env and .env.build files :
* SERVER_URL: URL of server where Graphql and some others endpoints are running
* APP_URL: URL where Next app is running
* STANDALONE_GRAPHQL: should be YES if Standalone GraphQL server is used to setup [cors](https://www.npmjs.com/package/cors) appropriately.

## Standalone GraphQL server and serverless Next app
```code sh
npm run dev
```
Use [concurently](https://www.npmjs.com/package/concurrently) to start separate GraphQL express server and serverless local app.

Environment :
```code sh
SERVER_URL=http://localhost:4000
APP_URL=http://localhost:3000
STANDALONE_GRAPHQL=YES
```
## Now serverless on localhost mode
```code sh
npm run nowdev
```
Starts serverless application in localhost, GraphQL server is run as serverless [Node.js runtime](https://zeit.co/docs/runtimes#official-runtimes/node-js)

Environment :
```code sh
SERVER_URL=http://localhost:3000
APP_URL=http://localhost:3000
STANDALONE_GRAPHQL=NO
```
## Programmatically start server
```code sh
npm run dev-standalone
```
Starts index.js, which programmaticaly creates [custom next app](https://nextjs.org/docs#custom-server-and-routing) with embeded GraphQL server. 

Environment :
```code sh
SERVER_URL=http://localhost:3000
APP_URL=http://localhost:3000
STANDALONE_GRAPHQL=NO
```

# Deployment
## Deployment to Zeit.co
```code sh
npm run now
```
### Required secrets
```code sh
now secrets add mongo "mongodb://xxx"
now secrets add sendgrid "xxx"
now secrets add google_app_clientid "xxx"
now secrets add google_app_secret "xxx"
```

### Environment variables
TODO: where environment is defined (now*json, next.config.js)
```
"SENDGRID_API_KEY": "@sendgrid",
"MONGODB_URI": "@mongo",
"STANDALONE_GRAPHQL": "NO",
"SERVER_URL": "https://next-starter.fomo1.now.sh",
"APP_URL": "https://next-starter.fomo1.now.sh",
"APP_EMAIL": "nextstarter@nextstarter.sk"
```

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

