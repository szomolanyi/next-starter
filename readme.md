# Next.js + React + Apollo graphql starter

## Error handling
Errors from Apollo Graphql are handled in HOC components ManagedMutation and ManagedQuery. Almost all errors are thrown and handled in [React Error boundary](https://reactjs.org/docs/error-boundaries.html) AppError or AppErrorModal. 
Some errors are passed to component hierarchy, to allow user errors handling. Currently only [graphQLErrors](https://www.apollographql.com/docs/apollo-server/features/errors) with code BAD_USER_INPUT are passed to components.

## Zeit deploy 
now secret add mongo https://...
now -e MONGODB_URI=@mongo
