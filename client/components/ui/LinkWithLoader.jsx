import { useState } from 'react';
import Loading from './Loading';

const LinkWithLoader = ({ action, children, ...rest }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const submitWithLoader = async () => {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);
    await action();
    setSubmitting(false);
  };
  return (
    <a
      onClick={isSubmitting ? null : () => submitWithLoader()}
      onKeyPress={isSubmitting ? null : () => submitWithLoader()}
      {...rest}
    >
      {
        isSubmitting && <Loading size="small" />
      }
      {children}
    </a>
  );
};

export default LinkWithLoader;
