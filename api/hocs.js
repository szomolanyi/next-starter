/*
Not used for know
*/

const { ApolloError, UserInputError } = require('apollo-server-express');

const errorHandler = func => async () => {
  try {
    return await func();
  } catch (error) {
    console.log({ error });
    if (error.code === 11000) {
      throw new UserInputError('Comment already defined', {
        errfields: {
          title: 'Uz mam', // TODO: remove this
        },
      });
    } else {
      throw new ApolloError('Internal error');
    }
  }
};

module.exports = { errorHandler };
