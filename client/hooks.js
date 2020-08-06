import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { graphQlErrorFilter } from './utils';
import { SET_APP_MESSAGE, CURRENT_USER } from './queries';

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
    setAppMessage({ variables: { messages: errors.map((e) => e.message), severity: 'error' } });
  };
};

export const useUser = () => {
  const onError = useErrorHandler();
  const { loading, error, data } = useQuery(CURRENT_USER, { onError });
  if (error) {
    return {
      loading: false,
      currentUser: null,
      currentUserId: null,
    };
  }
  if (loading) {
    return {
      loading,
      currentUser: null,
      currentUserId: null,
    };
  }
  return {
    loading,
    currentUser: data.currentUser,
    currentUserId: data.currentUser ? data.currentUser._id : null,
  };
};

export const useDeleteTweetModal = () => {
  const [deleteTweetModal, setDeleteTweetModal] = useState({ isOpen: false, _id: null });
  const openDeleteTweetModal = (_id) => setDeleteTweetModal({ isOpen: true, _id });
  const closeDeleteTweetModal = () => setDeleteTweetModal({ isOpen: false, _id: null });
  return [deleteTweetModal, openDeleteTweetModal, closeDeleteTweetModal];
};
