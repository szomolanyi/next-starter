import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { graphQlErrorFilter } from './utils';
import { SET_APP_MESSAGE } from './queries';

export const useModal = (isOpenInit) => {
  const [modalOpened, setOpen] = useState(isOpenInit);
  const [modalData, setData] = useState(null);
  const hideModal = () => {
    setOpen(false);
    setData(null);
  };
  const openModal = (newModalData) => {
    setOpen(true);
    setData(newModalData);
  };
  return {
    modalOpened, hideModal, openModal, modalData,
  };
};


export const useErrorHandler = () => {
  const [setAppMessage] = useMutation(SET_APP_MESSAGE);
  return (error) => {
    const errors = graphQlErrorFilter(error);
    setAppMessage({ variables: { messages: errors.map(e => e.message), severity: 'error' } });
  };
};

export const eslintFix = () => null;
