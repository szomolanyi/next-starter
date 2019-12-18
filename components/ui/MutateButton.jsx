import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { SET_APP_MESSAGE } from '../../lib/queries';

const MutateButton = ({ mutateFunc, mutateOpts, title }) => {
  const [setAppMessage] = useMutation(SET_APP_MESSAGE);
  const [isLoading, setLoading] = useState(false);
  return (
    <button
      type="button"
      className={`button ${isLoading ? 'is-loading' : ''}`}
      onClick={() => {
        setLoading(true);
        mutateFunc(mutateOpts)
          .then(() => setLoading(false))
          .catch(() => {
            setLoading(false);
            setAppMessage({
              variables:
              {
                messages: ['Unexpected error has occured. Try to refresh page and retry operation'],
                severity: 'error',
              },
            });
          });
      }}
      disabled={isLoading}
    >
      {title}
    </button>
  );
};

export default MutateButton;
