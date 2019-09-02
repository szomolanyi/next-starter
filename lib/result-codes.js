/* list of application errors */

const resultsList = {
  OK: 'Successfull operation',
  TOKEN_NOT_FOUND: 'Token was not found or it is timed out.',
  USER_NOT_FOUND: 'We were unable to find a user for this token.',
  ALREADY_VERIFIED: 'Your email has been already verified.',
};

const createResult = code => ({
  code,
  message: resultsList[code],
});

module.exports = createResult;
