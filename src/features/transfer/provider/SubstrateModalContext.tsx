import {
  createContext,
  useMemo,
  useCallback,
  useState,
  FC,
  PropsWithChildren,
} from 'react';

import AccountModalSubstrate from 'features/transfer/components/accountModalSubstrate';
import WalletConnectModal from 'features/transfer/components/walletConnectModalSubstrate';

export type ModalContextValue = {
  openModal: (modal: MODAL) => void;
  closeModal: () => void;
};

export enum MODAL {
  account,
  connect,
}

export const SubstrateModalContext = createContext({} as ModalContextValue);

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
  { type: MODAL.connect, Component: WalletConnectModal },
  { type: MODAL.account, Component: AccountModalSubstrate },
];

export const SubstrateModalsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
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
    <SubstrateModalContext.Provider value={value}>
      {children}
      {modals.map(({ type, Component }) => (
        <Modal
          key={`Modal-${type.toString()}`}
          Component={Component}
          open={active === type}
          {...common}
        />
      ))}
    </SubstrateModalContext.Provider>
  );
};
