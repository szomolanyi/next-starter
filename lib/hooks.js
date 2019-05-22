import { useState } from 'react';

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

export const eslintFix = () => null;
