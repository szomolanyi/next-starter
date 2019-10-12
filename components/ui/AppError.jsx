import { graphQlErrorFilter } from '../../lib/utils';

const AppError = ({ error }) => (
  <div className="section">
    <div className="message is-danger">
      <div className="message-header">
        Error
      </div>
      <div className="message-body">
        {
          graphQlErrorFilter(error).map((err, i) => <p key={i}>{err.message}</p>)
        }
      </div>
    </div>
  </div>
);


export default AppError;
