import { useCallback, useContext } from 'react';

import { SubstrateModalContext, MODAL } from '../provider';

type UseModal = (modal: MODAL) => {
  openModal: () => void;
  closeModal: () => void;
};

export const useSubstrateModal: UseModal = (modal) => {
  const methods = useContext(SubstrateModalContext);

  const openModal = useCallback(() => {
    methods.openModal(modal);
  }, [methods, modal]);

  return {
    openModal,
    closeModal: methods.closeModal,
  };
};
