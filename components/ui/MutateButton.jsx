import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { SET_APP_MESSAGE } from '../../lib/queries';

const MutateButton = ({ variables, mutateFunc, title }) => {
  const [setAppMessage] = useMutation(SET_APP_MESSAGE);
  const [isLoading, setLoading] = useState('');
  return (
    <button
      type="button"
      className={`button ${isLoading}`}
      onClick={() => {
        setLoading('is-loading');
        mutateFunc({ variables })
          .then(() => setLoading(''))
          .catch(() => {
            setLoading('');
            setAppMessage({
              variables:
              {
                message: 'Unexpected error has occured. Try to refresh page and retry operation',
                severity: 'error',
              },
            });
          });
      }}
    >
      {title}
    </button>
  );
};

export default MutateButton;
