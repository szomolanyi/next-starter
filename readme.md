# Next.js + React + Apollo graphql starter

## Devopment
Rename .env.template to .env and edit variables
now dev

## Error handling
There are 2 kind of errors :
* User errors which are propagated to UI. Most of them are thrown from GraphQL resolvers as UserInputError [graphQLErrors](https://www.apollographql.com/docs/apollo-server/features/errors/).
* All other errors are handled in [React Error boundary](https://reactjs.org/docs/error-boundaries.html) AppError or AppErrorModal

All GraphQL errors are intercepted in HOC (TODO), than UserInputError is propagated to UI, others errors are thrown and handled id React Error Boundary components.

TODO: Errors from Apollo Graphql are handled in HOC components ManagedMutation and ManagedQuery. Almost all errors are thrown and handled in [React Error boundary](https://reactjs.org/docs/error-boundaries.html) AppError or AppErrorModal. 
Some errors are passed to component hierarchy, to allow user errors handling. Currently only [graphQLErrors](https://www.apollographql.com/docs/apollo-server/features/errors) with code BAD_USER_INPUT are passed to components.

## Zeit deploy 
now secret add mongo https://...
now secret add sendgrid ...
now -e MONGODB_URI=@mongo -e SENDGRID_API_KEY=@sendgrid -e GRAPHQL_URI=https://next-starter.fomo1.now.sh/graphql
