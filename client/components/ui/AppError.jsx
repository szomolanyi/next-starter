import { graphQlErrorFilter } from '../../utils';

const AppError = ({ error }) => (
  <div className="section">
    <div className="message is-danger">
      <div className="message-header">
        Error
      </div>
      <div className="message-body">
        {
          // eslint-disable-next-line react/no-array-index-key
          graphQlErrorFilter(error).map((err, i) => <p key={i}>{err.message}</p>)
        }
      </div>
    </div>
  </div>
);

export default AppError;
