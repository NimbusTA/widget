import {
  createContext,
  useMemo,
  useCallback,
  useState,
  FC,
  PropsWithChildren,
} from 'react';

import {
  AccountModalParachain,
  WalletConnectModalParachain,
} from 'common/wallets';

export type ModalContextValue = {
  openModal: (modal: MODAL) => void;
  closeModal: () => void;
};

export enum MODAL {
  connect,
  account,
}

export const ModalContext = createContext({} as ModalContextValue);

type CommonType = {
  onClose: () => void;
};

type ModalType = CommonType & {
  Component: any;
  open: boolean;
};

const Modal: FC<ModalType> = ({ open, Component, ...common }) => {
  return <Component open={open} {...common} />;
};

const modals = [
  { type: MODAL.account, Component: AccountModalParachain },
  { type: MODAL.connect, Component: WalletConnectModalParachain },
];

export const ModalsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [active, setActive] = useState<MODAL | null>(null);

  const openModal = useCallback((modal: MODAL) => {
    setActive(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActive(null);
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [closeModal, openModal],
  );

  const common: CommonType = {
    onClose: closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.map(({ type, Component }) => (
        <Modal
          key={`Modal-${type.toString()}`}
          Component={Component}
          open={active === type}
          {...common}
        />
      ))}
    </ModalContext.Provider>
  );
};
