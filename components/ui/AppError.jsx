import { graphQlErrorFilter } from '../../lib/utils';

const handleErrors = (error) => {
  console.log({ m: 'handleError', error });
  const filtered = graphQlErrorFilter(error);
  if (filtered.unknownError) {
    filtered.knownErrors.push(filtered.unknownError);
  }
  return filtered.knownErrors;
};

const AppError = ({ error }) => (
  <div className="section">
    <div className="message is-danger">
      <div className="message-header">
        Error
      </div>
      <div className="message-body">
        {
          handleErrors(error).map((err, i) => <p key={i}>{err.message}</p>)
        }
      </div>
    </div>
  </div>
);


export default AppError;
